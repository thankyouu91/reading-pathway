const express = require('express');
const router = express.Router();
const db = require('../database/db');
const Submission = require('../models/Submission');
const Content = require('../models/Content');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

const SITE_URL = process.env.SITE_URL || 'https://reading-pathway-production.up.railway.app';

// Origin check
router.use((req, res, next) => {
  if (req.method === 'GET') return next();
  const origin = req.headers.origin || req.headers.referer || '';
  const allowed = [SITE_URL, 'http://localhost:3000', 'http://localhost'];
  if (!allowed.some(o => origin.startsWith(o))) return res.status(403).json({ error: 'Forbidden' });
  next();
});

// Rate limit
const formLimiter = rateLimit({ windowMs: 60 * 1000, max: 5, message: { error: 'Qua nhieu yeu cau.' } });

// Validation
const contactRules = [
  body('parentName').trim().notEmpty().isLength({ min: 2, max: 200 }).escape(),
  body('phone').trim().notEmpty().matches(/^[\d\s\-\+\(\)]{8,20}$/),
  body('email').trim().isEmail().normalizeEmail(),
  body('childAge').optional().trim().isLength({ max: 50 }).escape(),
  body('goal').optional().trim().isLength({ max: 100 }).escape()
];

// Contact form
router.post('/contact', formLimiter, contactRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: 'Vui long kiem tra lai thong tin' });

  try {
    Submission.create(req.body);
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

// API v1 - Content
router.get('/v1/content/:lang?', (req, res) => {
  const lang = req.params.lang || 'vi';
  const c = Content.getAll(lang);
  res.json({ success: true, data: c });
});

// API v1 - Blog posts
router.get('/v1/blog', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const result = require('../models/BlogPost').findPublished({ page });
  res.json({ success: true, data: result });
});

module.exports = router;
