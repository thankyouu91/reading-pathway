const db = require('../database/db');
const createDOMPurify = require('isomorphic-dompurify');
const DOMPurify = createDOMPurify;

// In-memory cache
const cache = new Map();
const CACHE_TTL = 60 * 1000;

module.exports = {
  getAll(lang = 'vi') {
    const cached = cache.get(lang);
    if (cached && Date.now() - cached.time < CACHE_TTL) return cached.data;

    const rows = db.prepare('SELECT section, content_key, content_value, content_type FROM content WHERE lang = ?').all(lang);
    const c = {};
    for (const row of rows) {
      if (!c[row.section]) c[row.section] = {};
      c[row.section][row.content_key] = row.content_type === 'image'
        ? row.content_value
        : DOMPurify.sanitize(row.content_value, { ALLOWED_TAGS: [] });
    }

    cache.set(lang, { data: c, time: Date.now() });
    return c;
  },

  getBySection(section, lang = 'vi') {
    return db.prepare('SELECT * FROM content WHERE section = ? AND lang = ? ORDER BY sort_order').all(section, lang);
  },

  countBySection(lang = 'vi') {
    const rows = db.prepare('SELECT section, COUNT(*) as count FROM content WHERE lang = ? GROUP BY section').all(lang);
    const counts = {};
    rows.forEach(r => { counts[r.section] = r.count; });
    return counts;
  },

  update(section, key, value, lang = 'vi') {
    const sanitized = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
    db.prepare('UPDATE content SET content_value = ?, updated_at = CURRENT_TIMESTAMP WHERE lang = ? AND section = ? AND content_key = ?')
      .run(sanitized, lang, section, key);
  },

  updateBatch(section, updates, lang = 'vi') {
    const stmt = db.prepare('UPDATE content SET content_value = ?, updated_at = CURRENT_TIMESTAMP WHERE lang = ? AND section = ? AND content_key = ?');
    const tx = db.transaction(() => {
      for (const [key, value] of Object.entries(updates)) {
        const sanitized = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
        stmt.run(sanitized, lang, section, key);
      }
    });
    tx();
    this.invalidateCache();
  },

  invalidateCache() { cache.clear(); }
};
