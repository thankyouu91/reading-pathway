const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const createDOMPurify = require('isomorphic-dompurify');
const DOMPurify = createDOMPurify;

const SITE_URL = process.env.SITE_URL || 'https://reading-pathway-production.up.railway.app';

// Origin check for API routes (replaces CSRF for JSON APIs)
router.use((req, res, next) => {
  if (req.method === 'GET') return next();
  const origin = req.headers.origin || req.headers.referer || '';
  const allowed = [SITE_URL, 'http://localhost:3000', 'http://localhost'];
  if (!allowed.some(o => origin.startsWith(o))) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});

// Rate limit: 5 submissions per minute
const formLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: 'Qua nhieu yeu cau. Vui long thu lai sau.' }
});

// Validation rules
const contactRules = [
  body('parentName').trim().notEmpty().isLength({ min: 2, max: 200 }).escape(),
  body('phone').trim().notEmpty().matches(/^[\d\s\-\+\(\)]{8,20}$/),
  body('email').trim().isEmail().normalizeEmail(),
  body('childAge').optional().trim().isLength({ max: 50 }).escape(),
  body('goal').optional().trim().isLength({ max: 100 }).escape()
];

router.post('/contact', formLimiter, contactRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Vui long kiem tra lai thong tin' });
  }

  const { parentName, phone, email, childAge, goal } = req.body;

  try {
    const clean = (s) => DOMPurify.sanitize(s || '', { ALLOWED_TAGS: [] });
    db.prepare('INSERT INTO submissions (parent_name, phone, email, child_age, goal) VALUES (?, ?, ?, ?, ?)')
      .run(clean(parentName), clean(phone), clean(email), clean(childAge), clean(goal));
    res.json({ success: true, message: 'Dang ky thanh cong!' });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Submission error:`, err.message);
    res.status(500).json({ error: 'Loi he thong' });
  }
});

// Health check
router.get('/health', (req, res) => {
  try {
    db.prepare('SELECT 1').get();
    res.json({ status: 'ok', uptime: Math.floor(process.uptime()) });
  } catch (err) {
    res.status(503).json({ status: 'error' });
  }
});

module.exports = router;
