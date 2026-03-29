const db = require('../database/db');

module.exports = function requireAuth(req, res, next) {
  if (!req.session || !req.session.adminId) {
    return res.redirect('/admin/login');
  }

  // Verify user still exists in database
  const user = db.prepare('SELECT id FROM admin_users WHERE id = ?').get(req.session.adminId);
  if (!user) {
    req.session.destroy();
    return res.redirect('/admin/login');
  }

  next();
};
