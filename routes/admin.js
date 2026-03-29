const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const db = require('../database/db');
const requireAuth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');
const createDOMPurify = require('isomorphic-dompurify');
const DOMPurify = createDOMPurify;

// Login rate limit: 5 attempts per 15 minutes
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });

// Account lockout tracking (in-memory)
const loginAttempts = new Map();
const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function checkLockout(username) {
  const record = loginAttempts.get(username);
  if (!record) return false;
  if (record.count >= LOCKOUT_THRESHOLD) {
    if (Date.now() - record.lastAttempt < LOCKOUT_DURATION) return true;
    loginAttempts.delete(username);
  }
  return false;
}

function recordFailedLogin(username) {
  const record = loginAttempts.get(username) || { count: 0, lastAttempt: 0 };
  record.count++;
  record.lastAttempt = Date.now();
  loginAttempts.set(username, record);
}

function clearLoginAttempts(username) {
  loginAttempts.delete(username);
}

// CSRF check middleware
function csrfCheck(req, res, next) {
  const token = req.body._csrf;
  if (!token || token !== req.session.csrfToken) {
    return res.status(403).send('Phien lam viec khong hop le. Vui long tai lai trang.');
  }
  next();
}

// File upload with sanitized filename
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'public', 'images', 'uploads'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = crypto.randomBytes(8).toString('hex') + ext;
    cb(null, safeName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedExt = /\.(jpeg|jpg|png|svg|webp|gif)$/i;
    const allowedMime = /^image\/(jpeg|png|svg\+xml|webp|gif)$/;
    if (allowedExt.test(path.extname(file.originalname)) && allowedMime.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Chi chap nhan file hinh anh'));
    }
  }
});

// Section names
const SECTIONS = {
  nav: 'Navigation', hero: 'Hero Banner', program: 'Tong Quan Chuong Trinh',
  activities: '9 Hoat Dong Trophy9', levels: 'Cap Do T1-T6',
  pathway: 'Lo Trinh Hoc', achieve3000: 'Achieve3000',
  ielts: 'Pre-IELTS & IELTS', comparison: 'Bang So Sanh',
  b2b: 'Truong Hoc & Trung Tam', contact: 'Lien He & Form', footer: 'Footer'
};

// ===== LOGIN =====
router.get('/login', (req, res) => {
  res.render('admin/login', { error: null, csrfToken: res.locals.csrfToken });
});

router.post('/login', loginLimiter, csrfCheck, (req, res) => {
  const { username, password } = req.body;

  // Check lockout
  if (checkLockout(username || '')) {
    return res.render('admin/login', {
      error: 'Tai khoan bi khoa tam thoi. Vui long thu lai sau 15 phut.',
      csrfToken: res.locals.csrfToken
    });
  }

  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);

  if (user && bcrypt.compareSync(password || '', user.password_hash)) {
    clearLoginAttempts(username);
    // Regenerate session to prevent fixation
    const adminId = user.id;
    const adminUser = user.username;
    req.session.regenerate((err) => {
      if (err) return res.status(500).send('Login error');
      req.session.adminId = adminId;
      req.session.adminUser = adminUser;
      req.session.csrfToken = crypto.randomBytes(32).toString('hex');
      res.redirect('/admin');
    });
  } else {
    recordFailedLogin(username || 'unknown');
    res.render('admin/login', {
      error: 'Sai tai khoan hoac mat khau',
      csrfToken: res.locals.csrfToken
    });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// ===== DASHBOARD =====
router.get('/', requireAuth, (req, res) => {
  const totalSubmissions = db.prepare('SELECT COUNT(*) as count FROM submissions').get().count;
  const unreadSubmissions = db.prepare('SELECT COUNT(*) as count FROM submissions WHERE is_read = 0').get().count;
  const totalContent = db.prepare('SELECT COUNT(*) as count FROM content').get().count;
  res.render('admin/dashboard', {
    user: req.session.adminUser, sections: SECTIONS,
    totalSubmissions, unreadSubmissions, totalContent
  });
});

// ===== SECTIONS =====
router.get('/sections', requireAuth, (req, res) => {
  const lang = req.query.lang || 'vi';
  const counts = {};
  for (const key of Object.keys(SECTIONS)) {
    counts[key] = db.prepare('SELECT COUNT(*) as count FROM content WHERE section = ? AND lang = ?').get(key, lang).count;
  }
  res.render('admin/sections', { sections: SECTIONS, counts, user: req.session.adminUser, lang, languages: db.LANGUAGES });
});

router.get('/sections/:section', requireAuth, (req, res) => {
  const section = req.params.section;
  const lang = req.query.lang || 'vi';
  if (!SECTIONS[section]) return res.redirect('/admin/sections');

  const rows = db.prepare('SELECT * FROM content WHERE section = ? AND lang = ? ORDER BY sort_order').all(section, lang);
  res.render('admin/edit-section', {
    section, sectionName: SECTIONS[section], rows, lang,
    languages: db.LANGUAGES, user: req.session.adminUser,
    success: req.query.success === '1', csrfToken: res.locals.csrfToken
  });
});

router.post('/sections/:section', requireAuth, csrfCheck, (req, res) => {
  const section = req.params.section;
  if (!SECTIONS[section]) return res.status(400).send('Invalid section');

  const lang = req.body._lang || 'vi';
  const updates = { ...req.body };
  delete updates._lang;
  delete updates._csrf;

  const stmt = db.prepare('UPDATE content SET content_value = ?, updated_at = CURRENT_TIMESTAMP WHERE lang = ? AND section = ? AND content_key = ?');
  const updateAll = db.transaction(() => {
    for (const [key, value] of Object.entries(updates)) {
      const sanitized = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
      stmt.run(sanitized, lang, section, key);
    }
  });
  updateAll();
  res.redirect(`/admin/sections/${section}?lang=${lang}&success=1`);
});

// ===== SUBMISSIONS =====
router.get('/submissions', requireAuth, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;
  const total = db.prepare('SELECT COUNT(*) as count FROM submissions').get().count;
  const submissions = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, offset);
  res.render('admin/submissions', {
    submissions, page, totalPages: Math.ceil(total / limit), total,
    user: req.session.adminUser, csrfToken: res.locals.csrfToken
  });
});

router.post('/submissions/:id/read', requireAuth, csrfCheck, (req, res) => {
  db.prepare('UPDATE submissions SET is_read = 1 WHERE id = ?').run(req.params.id);
  res.redirect('/admin/submissions');
});

router.get('/submissions/export', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all();
  let csv = 'ID,Ten,SDT,Email,Cap,Muc Tieu,Ngay\n';
  rows.forEach(r => {
    csv += `${r.id},"${(r.parent_name||'').replace(/"/g,'""')}","${r.phone}","${r.email}","${r.child_age||''}","${r.goal||''}","${r.created_at}"\n`;
  });
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
  res.render('admin/images', {
    mainImages, uploadedImages, user: req.session.adminUser,
    success: req.query.success === '1', csrfToken: res.locals.csrfToken
  });
});

router.post('/images/upload', requireAuth, csrfCheck, upload.single('image'), (req, res) => {
  res.redirect('/admin/images?success=1');
});

module.exports = router;
