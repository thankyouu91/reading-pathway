const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../database/db');
const requireAuth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Rate limit login
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

// Multer for image uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'public', 'images', 'uploads'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    cb(null, /jpeg|jpg|png|svg|webp|gif/.test(file.mimetype));
  }
});

// Section display names
const SECTIONS = {
  nav: 'Navigation',
  hero: 'Hero Banner',
  program: 'Tong Quan Chuong Trinh',
  activities: '9 Hoat Dong Trophy9',
  levels: 'Cap Do T1-T6',
  pathway: 'Lo Trinh Hoc',
  achieve3000: 'Achieve3000',
  ielts: 'Pre-IELTS & IELTS',
  comparison: 'Bang So Sanh',
  b2b: 'Truong Hoc & Trung Tam',
  contact: 'Lien He & Form',
  footer: 'Footer'
};

// ===== LOGIN =====
router.get('/login', (req, res) => {
  res.render('admin/login', { error: null });
});

router.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);

  if (user && bcrypt.compareSync(password, user.password_hash)) {
    req.session.adminId = user.id;
    req.session.adminUser = user.username;
    return res.redirect('/admin');
  }
  res.render('admin/login', { error: 'Sai tai khoan hoac mat khau' });
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
    user: req.session.adminUser,
    sections: SECTIONS,
    totalSubmissions,
    unreadSubmissions,
    totalContent
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
    section,
    sectionName: SECTIONS[section],
    rows,
    lang,
    languages: db.LANGUAGES,
    user: req.session.adminUser,
    success: req.query.success === '1'
  });
});

router.post('/sections/:section', requireAuth, (req, res) => {
  const section = req.params.section;
  const lang = req.body._lang || 'vi';
  const updates = { ...req.body };
  delete updates._lang;

  const stmt = db.prepare('UPDATE content SET content_value = ?, updated_at = CURRENT_TIMESTAMP WHERE lang = ? AND section = ? AND content_key = ?');

  const updateAll = db.transaction(() => {
    for (const [key, value] of Object.entries(updates)) {
      stmt.run(value, lang, section, key);
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
    submissions,
    page,
    totalPages: Math.ceil(total / limit),
    total,
    user: req.session.adminUser
  });
});

router.post('/submissions/:id/read', requireAuth, (req, res) => {
  db.prepare('UPDATE submissions SET is_read = 1 WHERE id = ?').run(req.params.id);
  res.redirect('/admin/submissions');
});

router.get('/submissions/export', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all();
  let csv = 'ID,Ho Ten,SDT,Email,Do Tuoi,Muc Tieu,Da Doc,Ngay\n';
  rows.forEach(r => {
    csv += `${r.id},"${r.parent_name}","${r.phone}","${r.email}","${r.child_age}","${r.goal}",${r.is_read ? 'Co' : 'Chua'},"${r.created_at}"\n`;
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
    mainImages,
    uploadedImages,
    user: req.session.adminUser,
    success: req.query.success === '1'
  });
});

router.post('/images/upload', requireAuth, upload.single('image'), (req, res) => {
  res.redirect('/admin/images?success=1');
});

module.exports = router;
