const User = require('../models/User');

module.exports = function requireAuth(req, res, next) {
  if (!req.session || !req.session.adminId) {
    return res.redirect('/admin/login');
  }

  if (!User.existsById(req.session.adminId)) {
    req.session.destroy();
    return res.redirect('/admin/login');
  }

  next();
};
