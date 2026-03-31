require('dotenv').config();
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';
const SITE_URL = process.env.SITE_URL || 'https://reading-pathway-production.up.railway.app';

// Auto-seed database on first run
const db = require('./database/db');
const contentCount = db.prepare('SELECT COUNT(*) as c FROM content').get().c;
if (contentCount === 0) {
  console.log('Empty database, running seed...');
  require('./database/seed');
  require('./database/fix-missing');
  require('./database/fix-b2b');
}

// Auto-seed blog posts if missing
const blogCount = db.prepare('SELECT COUNT(*) as c FROM blog_posts WHERE is_published=1').get().c;
if (blogCount === 0) {
  console.log('No blog posts found, seeding blog posts...');
  require('./database/seed');
}

// Auto-migration: upsert full Cdimex contact info
const upsertContact = db.prepare("INSERT OR REPLACE INTO content (lang, section, content_key, content_value, content_type, sort_order) VALUES (?,?,?,?,?,?)");
[
  ['vi','footer','contact_company','CÔNG TY CỔ PHẦN XUẤT NHẬP KHẨU VÀ PHÁT TRIỂN VĂN HÓA','text',195],
  ['vi','footer','contact_address_hcm','99A Nguyễn Văn Trỗi, Phường Phú Nhuận, TP. Hồ Chí Minh','text',200],
  ['vi','footer','contact_address_hn','94 Nguyễn Hy Quang, Phường Đống Đa, Hà Nội','text',201],
  ['vi','footer','contact_phone','(+84 28) 399 70 829','text',202],
  ['vi','footer','contact_email','info@cdimex.com.vn','text',203],
  ['vi','footer','contact_website','www.bookmedi.vn','text',204],
  ['vi','footer','contact_hours','Thứ 2 - Thứ 6: 8:00 - 17:30','text',205],
  ['en','footer','contact_company','IMPORT EXPORT AND CULTURAL DEVELOPMENT JOINT STOCK COMPANY','text',195],
  ['en','footer','contact_address_hcm','99A Nguyen Van Troi, Phu Nhuan Ward, Ho Chi Minh City','text',200],
  ['en','footer','contact_address_hn','94 Nguyen Hy Quang, Dong Da Ward, Hanoi','text',201],
  ['en','footer','contact_phone','(+84 28) 399 70 829','text',202],
  ['en','footer','contact_email','info@cdimex.com.vn','text',203],
  ['en','footer','contact_website','www.bookmedi.vn','text',204],
  ['en','footer','contact_hours','Mon - Fri: 8:00 - 17:30','text',205],
  ['lo','footer','contact_company','IMPORT EXPORT AND CULTURAL DEVELOPMENT JOINT STOCK COMPANY','text',195],
  ['lo','footer','contact_address_hcm','99A Nguyen Van Troi, Phu Nhuan Ward, Ho Chi Minh City','text',200],
  ['lo','footer','contact_address_hn','94 Nguyen Hy Quang, Dong Da Ward, Hanoi','text',201],
  ['lo','footer','contact_phone','(+84 28) 399 70 829','text',202],
  ['lo','footer','contact_email','info@cdimex.com.vn','text',203],
  ['lo','footer','contact_website','www.bookmedi.vn','text',204],
  ['lo','footer','contact_hours','Mon - Fri: 8:00 - 17:30','text',205],
  ['km','footer','contact_company','IMPORT EXPORT AND CULTURAL DEVELOPMENT JOINT STOCK COMPANY','text',195],
  ['km','footer','contact_address_hcm','99A Nguyen Van Troi, Phu Nhuan Ward, Ho Chi Minh City','text',200],
  ['km','footer','contact_address_hn','94 Nguyen Hy Quang, Dong Da Ward, Hanoi','text',201],
  ['km','footer','contact_phone','(+84 28) 399 70 829','text',202],
  ['km','footer','contact_email','info@cdimex.com.vn','text',203],
  ['km','footer','contact_website','www.bookmedi.vn','text',204],
  ['km','footer','contact_hours','Mon - Fri: 8:00 - 17:30','text',205],
].forEach(r => upsertContact.run(...r));
console.log('Migration: upserted Cdimex contact info');

// Auto-migration: add stat_5 if missing
const stat5 = db.prepare("SELECT id FROM content WHERE lang='vi' AND section='hero' AND content_key='stat_5_number'").get();
if (!stat5) {
  db.prepare("INSERT OR IGNORE INTO content (lang, section, content_key, content_value, content_type, sort_order) VALUES ('vi','hero','stat_5_number','20K+','text',55)").run();
  db.prepare("INSERT OR IGNORE INTO content (lang, section, content_key, content_value, content_type, sort_order) VALUES ('vi','hero','stat_5_label','Tài Liệu Chuyên Ngành','text',56)").run();
  console.log('Migration: added stat_5');
}

// Daily backup
db.backupTo();
setInterval(() => db.backupTo(), 24 * 60 * 60 * 1000);

// Compression (gzip/brotli)
app.use(compression());

// Request logging
app.use(morgan(IS_PROD ? 'combined' : 'dev'));

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://lottie.host", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://lottie.host", "https://stories.freepiklabs.com", "https://www.google-analytics.com", "https://region1.google-analytics.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  hsts: IS_PROD ? { maxAge: 31536000, includeSubDomains: true } : false
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Cookies & Body parsing
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Session (hardened)
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
app.use(session({
  secret: SESSION_SECRET,
  name: '_rp_sid',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 8 * 60 * 60 * 1000,
    httpOnly: true,
    secure: IS_PROD,
    sameSite: 'lax'
  }
}));

// CSRF token generation
app.use((req, res, next) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString('hex');
  }
  res.locals.csrfToken = req.session.csrfToken;
  next();
});

// Make SITE_URL available to all views
app.locals.siteUrl = SITE_URL;

// HTTPS redirect in production
if (IS_PROD) {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, `https://${req.hostname}${req.url}`);
    }
    next();
  });
}

// Static files with cache
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: IS_PROD ? '7d' : 0,
  etag: true
}));

// Routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));
app.use('/blog', require('./routes/blog'));
app.use('/admin', require('./routes/admin'));

// 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error handler (improved)
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path}`, err.stack || err.message);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).send('File qua lon (toi da 5MB)');
  }

  res.status(err.statusCode || 500).send(IS_PROD ? 'Server error' : err.message);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Admin: http://localhost:${PORT}/admin`);
});

module.exports = app;
