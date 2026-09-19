import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { encryptText } from '../../security/crypto/envelope.js';
const dir=path.resolve('database');
fs.mkdirSync(dir,{recursive:true});
const conn=new Database(path.join(dir,'nexovonarsa.db'));
conn.pragma('journal_mode = WAL');
conn.exec(fs.readFileSync(path.join(dir,'schema.sql'),'utf8'));
const now=()=>new Date().toISOString();
export const db={
  auditMessage(jid,direction,body){this.auditEvent('message',{jid,direction,body});},
  auditEvent(action,meta){conn.prepare('INSERT INTO audit_log(actor,action,entity_type,entity_id,metadata_json,created_at) VALUES(?,?,?,?,?,?)').run('system',action,'runtime','system',JSON.stringify(meta||{}),now());},
  createOrder(o){conn.prepare('INSERT INTO orders(id,whatsapp,customer_name,product,quantity,amount,status,note,created_at) VALUES(?,?,?,?,?,?,?,?,?)').run(o.id,o.jid,o.name,o.product,o.quantity,0,'WAITING_ADMIN',o.note||'',now());return conn.prepare('SELECT * FROM orders WHERE id=?').get(o.id);},
  getOrder(id){return conn.prepare('SELECT * FROM orders WHERE id=?').get(id);},
  openOrders(){return conn.prepare("SELECT * FROM orders WHERE status <> 'CLOSED' ORDER BY created_at DESC LIMIT 100").all();},
  closeOrder(id){conn.prepare("UPDATE orders SET status='CLOSED',closed_at=? WHERE id=?").run(now(),id);},
  setBotPaused(jid,value){conn.prepare("INSERT INTO customers(whatsapp,name,created_at,updated_at,bot_paused) VALUES(?,?,?,?,?) ON CONFLICT(whatsapp) DO UPDATE SET bot_paused=excluded.bot_paused,updated_at=excluded.updated_at").run(jid,null,now(),now(),value?1:0);this.auditEvent('bot_pause',{jid,value});},
  isBotPaused(jid){return !!conn.prepare('SELECT bot_paused FROM customers WHERE whatsapp=?').get(jid)?.bot_paused;},
  saveMemberProfile(data){conn.prepare("INSERT INTO customers(whatsapp,name,gmail,tiktok_handle,instagram_handle,po_virtual,identity_status,consent_at,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(whatsapp) DO UPDATE SET name=excluded.name,gmail=excluded.gmail,tiktok_handle=excluded.tiktok_handle,instagram_handle=excluded.instagram_handle,po_virtual=excluded.po_virtual,identity_status=excluded.identity_status,consent_at=excluded.consent_at,updated_at=excluded.updated_at").run(data.whatsapp,encryptText(data.name),encryptText(data.gmail),encryptText(data.tiktok),encryptText(data.instagram),encryptText(data.poVirtual),'PENDING',now(),now(),now());},
  customerId(jid){return conn.prepare('SELECT id FROM customers WHERE whatsapp=?').get(jid)?.id||null;},
  saveIdentityDocument(customerId,docType,storageUri,sha256){conn.prepare('INSERT INTO identity_documents(customer_id,doc_type,storage_uri,sha256,encrypted,created_at) VALUES(?,?,?,?,1,?)').run(customerId,docType,storageUri,sha256,now());},
  stats(){return {customers:conn.prepare('SELECT COUNT(*) c FROM customers').get().c,orders:conn.prepare('SELECT COUNT(*) c FROM orders').get().c,openOrders:conn.prepare("SELECT COUNT(*) c FROM orders WHERE status <> 'CLOSED'").get().c,audit:conn.prepare('SELECT COUNT(*) c FROM audit_log').get().c};},
  adminNumbers(){return (process.env.ADMIN_NUMBERS||'').split(',').map(v=>v.trim().replace(/\D/g,'')).filter(Boolean);},
  async makeStoredReceipt(order){const {makeReceipt}=await import('../../media/receipts/receipt.js');return makeReceipt(order);}
};
