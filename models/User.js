const db = require('../database/db');
const bcrypt = require('bcrypt');

// Auth cache
const userCache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

module.exports = {
  findByUsername(username) {
    return db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);
  },

  async verifyPassword(password, hash) {
    return bcrypt.compare(password || '', hash);
  },

  existsById(id) {
    const cached = userCache.get(id);
    if (cached && Date.now() - cached.time < CACHE_TTL) return true;

    const user = db.prepare('SELECT id FROM admin_users WHERE id = ?').get(id);
    if (user) {
      userCache.set(id, { time: Date.now() });
      return true;
    }
    return false;
  }
};
