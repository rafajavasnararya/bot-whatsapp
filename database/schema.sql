PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS members(id TEXT PRIMARY KEY,phone TEXT NOT NULL,email TEXT,instagram_ref TEXT,tiktok_ref TEXT,po_affiliation TEXT,consent_at TEXT,retention_until TEXT,status TEXT DEFAULT 'active');
CREATE TABLE IF NOT EXISTS orders(id TEXT PRIMARY KEY,member_id TEXT,brand TEXT NOT NULL,product TEXT NOT NULL,amount INTEGER NOT NULL,status TEXT NOT NULL,receipt_hash TEXT,created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS audit_logs(id INTEGER PRIMARY KEY AUTOINCREMENT,actor TEXT,action TEXT,target TEXT,created_at TEXT NOT NULL,metadata_json TEXT);
CREATE TABLE IF NOT EXISTS approved_chats(chat_id TEXT PRIMARY KEY,approved_by TEXT,approved_at TEXT NOT NULL,active INTEGER DEFAULT 1);
CREATE TABLE IF NOT EXISTS admin_confirmations(id INTEGER PRIMARY KEY AUTOINCREMENT,chat_id TEXT,action TEXT,status TEXT,requested_at TEXT NOT NULL,decided_at TEXT,decided_by TEXT);