PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS customers(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 whatsapp TEXT UNIQUE NOT NULL,
 name TEXT,
 gmail TEXT,
 tiktok_handle TEXT,
 instagram_handle TEXT,
 po_virtual TEXT,
 bot_paused INTEGER DEFAULT 0,
 identity_status TEXT DEFAULT 'PENDING',
 consent_at TEXT,
 created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS identity_documents(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 customer_id INTEGER NOT NULL,
 doc_type TEXT NOT NULL,
 storage_uri TEXT NOT NULL,
 sha256 TEXT NOT NULL,
 encrypted INTEGER NOT NULL DEFAULT 1,
 created_at TEXT NOT NULL,
 FOREIGN KEY(customer_id) REFERENCES customers(id)
);
CREATE TABLE IF NOT EXISTS orders(
 id TEXT PRIMARY KEY,
 customer_id INTEGER,
 whatsapp TEXT NOT NULL,
 customer_name TEXT NOT NULL,
 brand TEXT,
 product TEXT NOT NULL,
 quantity TEXT NOT NULL,
 amount INTEGER DEFAULT 0,
 status TEXT NOT NULL,
 note TEXT,
 created_at TEXT NOT NULL,
 closed_at TEXT,
 FOREIGN KEY(customer_id) REFERENCES customers(id)
);
CREATE TABLE IF NOT EXISTS order_items(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 order_id TEXT NOT NULL,
 sku TEXT,
 product_name TEXT,
 quantity INTEGER,
 unit_price INTEGER,
 line_total INTEGER,
 FOREIGN KEY(order_id) REFERENCES orders(id)
);
CREATE TABLE IF NOT EXISTS payments(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 order_id TEXT NOT NULL,
 method TEXT,
 reference TEXT,
 amount INTEGER,
 status TEXT,
 paid_at TEXT,
 FOREIGN KEY(order_id) REFERENCES orders(id)
);
CREATE TABLE IF NOT EXISTS audit_log(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 actor TEXT,
 action TEXT,
 entity_type TEXT,
 entity_id TEXT,
 metadata_json TEXT,
 created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS group_approvals(
 group_jid TEXT PRIMARY KEY,
 group_name TEXT,
 approved_by TEXT,
 approved_at TEXT,
 enabled INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS catalog_snapshots(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 source TEXT,
 payload_json TEXT NOT NULL,
 created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS drive_files(
 logical_name TEXT PRIMARY KEY,
 drive_file_id TEXT NOT NULL,
 mime_type TEXT NOT NULL,
 updated_at TEXT NOT NULL
);