const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const db = require('../database/db');
const requireAuth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Models
const User = require('../models/User');
const Content = require('../models/Content');
const Submission = require('../models/Submission');
const BlogPost = require('../models/BlogPost');

// Login rate limit
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });

// Lockout with auto-cleanup
const loginAttempts = new Map();
const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000;

setInterval(() => {
  const now = Date.now();
  for (const [key, record] of loginAttempts) {
    if (now - record.lastAttempt > LOCKOUT_DURATION) loginAttempts.delete(key);
  }
}, 5 * 60 * 1000);

function checkLockout(u) { const r = loginAttempts.get(u); if (!r) return false; if (r.count >= LOCKOUT_THRESHOLD && Date.now() - r.lastAttempt < LOCKOUT_DURATION) return true; if (r.count >= LOCKOUT_THRESHOLD) loginAttempts.delete(u); return false; }
function recordFail(u) { const r = loginAttempts.get(u) || { count: 0, lastAttempt: 0 }; r.count++; r.lastAttempt = Date.now(); loginAttempts.set(u, r); }

// CSRF
function csrfCheck(req, res, next) {
  const token = req.body._csrf;
  if (!token || token !== req.session.csrfToken) return res.status(403).send('Phien khong hop le. Tai lai trang.');
  next();
}

// Upload
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'public', 'images', 'uploads'),
  filename: (req, file, cb) => cb(null, crypto.randomBytes(8).toString('hex') + path.extname(file.originalname).toLowerCase())
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    cb(null, /\.(jpeg|jpg|png|svg|webp|gif)$/i.test(path.extname(file.originalname)) && /^image\//.test(file.mimetype));
  }
});

const SECTIONS = {
  nav: 'Navigation', hero: 'Hero Banner', program: 'Tổng Quan Chương Trình',
  activities: '9 Hoạt Động Trophy9', levels: 'Cấp Độ T1-T6',
  pathway: 'Lộ Trình Học', achieve3000: 'Achieve3000',
  ielts: 'Pre-IELTS & IELTS', comparison: 'Bảng So Sánh',
  b2b: 'Trường Học & Trung Tâm', contact: 'Liên Hệ & Form', footer: 'Footer'
};

// ===== LOGIN =====
router.get('/login', (req, res) => res.render('admin/login', { error: null, csrfToken: res.locals.csrfToken }));

router.post('/login', loginLimiter, csrfCheck, async (req, res) => {
  const { username, password } = req.body;
  if (checkLockout(username || '')) return res.render('admin/login', { error: 'Tài khoản bị khóa 15 phút.', csrfToken: res.locals.csrfToken });

  const user = User.findByUsername(username);
  if (user && await User.verifyPassword(password, user.password_hash)) {
    loginAttempts.delete(username);
    const adminId = user.id, adminUser = user.username;
    req.session.regenerate((err) => {
      if (err) return res.status(500).send('Login error');
      req.session.adminId = adminId;
      req.session.adminUser = adminUser;
      req.session.csrfToken = crypto.randomBytes(32).toString('hex');
      res.redirect('/admin');
    });
  } else {
    recordFail(username || 'unknown');
    res.render('admin/login', { error: 'Sai tài khoản hoặc mật khẩu', csrfToken: res.locals.csrfToken });
  }
});

router.get('/logout', (req, res) => { req.session.destroy(() => res.redirect('/admin/login')); });

// ===== DASHBOARD =====
router.get('/', requireAuth, (req, res) => {
  res.render('admin/dashboard', {
    user: req.session.adminUser, sections: SECTIONS,
    totalSubmissions: Submission.countTotal(),
    unreadSubmissions: Submission.countUnread(),
    totalContent: db.prepare('SELECT COUNT(*) as c FROM content').get().c
  });
});

// ===== SECTIONS =====
router.get('/sections', requireAuth, (req, res) => {
  const lang = req.query.lang || 'vi';
  const counts = Content.countBySection(lang);
  for (const key of Object.keys(SECTIONS)) if (!counts[key]) counts[key] = 0;
  res.render('admin/sections', { sections: SECTIONS, counts, user: req.session.adminUser, lang, languages: db.LANGUAGES });
});

router.get('/sections/:section', requireAuth, (req, res) => {
  const { section } = req.params;
  const lang = req.query.lang || 'vi';
  if (!SECTIONS[section]) return res.redirect('/admin/sections');
  const rows = Content.getBySection(section, lang);
  res.render('admin/edit-section', { section, sectionName: SECTIONS[section], rows, lang, languages: db.LANGUAGES, user: req.session.adminUser, success: req.query.success === '1', csrfToken: res.locals.csrfToken });
});

router.post('/sections/:section', requireAuth, csrfCheck, (req, res) => {
  const { section } = req.params;
  if (!SECTIONS[section]) return res.status(400).send('Invalid');
  const lang = req.body._lang || 'vi';
  const updates = { ...req.body }; delete updates._lang; delete updates._csrf;
  Content.updateBatch(section, updates, lang);
  res.redirect(`/admin/sections/${section}?lang=${lang}&success=1`);
});

// ===== BLOG =====
router.get('/blog', requireAuth, (req, res) => {
  res.render('admin/blog', { posts: BlogPost.findAll(), user: req.session.adminUser, csrfToken: res.locals.csrfToken });
});

router.get('/blog/new', requireAuth, (req, res) => {
  res.render('admin/blog-edit', { post: null, user: req.session.adminUser, csrfToken: res.locals.csrfToken });
});

router.get('/blog/edit/:id', requireAuth, (req, res) => {
  const post = BlogPost.findById(req.params.id);
  if (!post) return res.redirect('/admin/blog');
  res.render('admin/blog-edit', { post, user: req.session.adminUser, csrfToken: res.locals.csrfToken });
});

router.post('/blog/save', requireAuth, csrfCheck, (req, res) => {
  BlogPost.save(req.body);
  res.redirect('/admin/blog');
});

router.post('/blog/delete/:id', requireAuth, csrfCheck, (req, res) => {
  BlogPost.delete(req.params.id);
  res.redirect('/admin/blog');
});

// ===== SUBMISSIONS =====
router.get('/submissions', requireAuth, (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const { rows: submissions, total, totalPages } = Submission.findAll({ page });
  res.render('admin/submissions', { submissions, page, totalPages, total, user: req.session.adminUser, csrfToken: res.locals.csrfToken });
});

router.post('/submissions/:id/read', requireAuth, csrfCheck, (req, res) => {
  Submission.markRead(req.params.id);
  res.redirect('/admin/submissions');
});

router.get('/submissions/export', requireAuth, (req, res) => {
  const esc = (v) => { const s = (v||'').toString().replace(/"/g,'""'); return /^[=+\-@|]/.test(s) ? `"'${s}"` : `"${s}"`; };
  const rows = Submission.exportAll();
  let csv = 'ID,Ten,SDT,Email,Cap,Muc Tieu,Ngay\n';
  rows.forEach(r => { csv += `${r.id},${esc(r.parent_name)},${esc(r.phone)},${esc(r.email)},${esc(r.child_age)},${esc(r.goal)},${esc(r.created_at)}\n`; });
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=submissions.csv');
  res.send('\uFEFF' + csv);
});

// ===== IMAGES =====
router.get('/images', requireAuth, (req, res) => {
  const imgDir = path.join(__dirname, '..', 'public', 'images');
  const uploadDir = path.join(imgDir, 'uploads');
  const mainImages = fs.readdirSync(imgDir).filter(f => !fs.statSync(path.join(imgDir, f)).isDirectory());
  const uploadedImages = fs.existsSync(uploadDir) ? fs.readdirSync(uploadDir) : [];
  res.render('admin/images', { mainImages, uploadedImages, user: req.session.adminUser, success: req.query.success === '1', csrfToken: res.locals.csrfToken });
});

router.post('/images/upload', requireAuth, csrfCheck, upload.single('image'), (req, res) => {
  res.redirect('/admin/images?success=1');
});

// ===== SYSTEM STATUS =====
router.get('/system', requireAuth, (req, res) => {
  const dbPath = path.join(__dirname, '..', 'database', 'reading-pathway.db');
  const dbSize = fs.existsSync(dbPath) ? (fs.statSync(dbPath).size / 1024 / 1024).toFixed(2) : '0';
  const mem = process.memoryUsage();
  res.json({
    uptime: Math.floor(process.uptime()),
    memory: { rss: (mem.rss / 1024 / 1024).toFixed(1) + 'MB', heap: (mem.heapUsed / 1024 / 1024).toFixed(1) + 'MB' },
    database: { sizeMB: dbSize, submissions: Submission.countTotal(), blogPosts: BlogPost.findAll().length },
    node: process.version
  });
});

module.exports = router;
