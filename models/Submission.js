const db = require('../database/db');
const createDOMPurify = require('isomorphic-dompurify');
const DOMPurify = createDOMPurify;

module.exports = {
  create({ parentName, phone, email, childAge, goal }) {
    const clean = (s) => DOMPurify.sanitize(s || '', { ALLOWED_TAGS: [] });
    return db.prepare('INSERT INTO submissions (parent_name, phone, email, child_age, goal) VALUES (?, ?, ?, ?, ?)')
      .run(clean(parentName), clean(phone), clean(email), clean(childAge), clean(goal));
  },

  findAll({ page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;
    const total = db.prepare('SELECT COUNT(*) as c FROM submissions').get().c;
    const rows = db.prepare('SELECT * FROM submissions ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, offset);
    return { rows, total, page, totalPages: Math.ceil(total / limit) };
  },

  markRead(id) {
    db.prepare('UPDATE submissions SET is_read = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);
  },

  countTotal() {
    return db.prepare('SELECT COUNT(*) as c FROM submissions').get().c;
  },

  countUnread() {
    return db.prepare('SELECT COUNT(*) as c FROM submissions WHERE is_read = 0').get().c;
  },

  exportAll() {
    return db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all();
  }
};
