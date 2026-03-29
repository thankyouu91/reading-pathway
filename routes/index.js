const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  const lang = 'vi';
  const rows = db.prepare('SELECT section, content_key, content_value, content_type FROM content WHERE lang = ?').all(lang);

  const c = {};
  for (const row of rows) {
    if (!c[row.section]) c[row.section] = {};
    c[row.section][row.content_key] = row.content_value;
  }

  res.render('landing', { c, lang, languages: db.LANGUAGES });
});

module.exports = router;
