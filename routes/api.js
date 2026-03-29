const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const createDOMPurify = require('isomorphic-dompurify');
const DOMPurify = createDOMPurify;

// Rate limit: 5 submissions per minute per IP
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
    const stmt = db.prepare('INSERT INTO submissions (parent_name, phone, email, child_age, goal) VALUES (?, ?, ?, ?, ?)');
    stmt.run(clean(parentName), clean(phone), clean(email), clean(childAge), clean(goal));
    res.json({ success: true, message: 'Dang ky thanh cong!' });
  } catch (err) {
    console.error('Submission error');
    res.status(500).json({ error: 'Loi he thong' });
  }
});

module.exports = router;
