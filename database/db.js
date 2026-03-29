const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'reading-pathway.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

// Create tables with multi-language support
db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lang TEXT NOT NULL DEFAULT 'vi',
    section TEXT NOT NULL,
    content_key TEXT NOT NULL,
    content_value TEXT NOT NULL DEFAULT '',
    content_type TEXT DEFAULT 'text',
    sort_order INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(lang, section, content_key)
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    child_age TEXT,
    goal TEXT,
    lang TEXT DEFAULT 'vi',
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    cover_image TEXT DEFAULT '',
    meta_description TEXT DEFAULT '',
    meta_keywords TEXT DEFAULT '',
    is_published INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Available languages
db.LANGUAGES = {
  vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
  en: { name: 'English', flag: '🇺🇸' },
  lo: { name: 'ພາສາລາວ', flag: '🇱🇦' },
  km: { name: 'ភាសាខ្មែរ', flag: '🇰🇭' }
};

module.exports = db;
