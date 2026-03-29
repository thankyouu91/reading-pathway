const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Contact form submission
router.post('/contact', (req, res) => {
  const { parentName, phone, email, childAge, goal } = req.body;

  if (!parentName || !phone || !email) {
    return res.status(400).json({ error: 'Vui long dien day du thong tin' });
  }

  try {
    const stmt = db.prepare('INSERT INTO submissions (parent_name, phone, email, child_age, goal) VALUES (?, ?, ?, ?, ?)');
    stmt.run(parentName, phone, email, childAge || '', goal || '');
    res.json({ success: true, message: 'Dang ky thanh cong!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Loi he thong' });
  }
});

module.exports = router;
