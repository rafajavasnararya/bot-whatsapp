import crypto from 'node:crypto';
function key() {
  const raw=process.env.PII_ENCRYPTION_KEY_BASE64;
  if(!raw) throw new Error('PII_ENCRYPTION_KEY_BASE64 is required');
  const k=Buffer.from(raw,'base64');
  if(k.length!==32) throw new Error('Encryption key must decode to 32 bytes');
  return k;
}
export function encryptText(plain){const iv=crypto.randomBytes(12);const c=crypto.createCipheriv('aes-256-gcm',key(),iv);const data=Buffer.concat([c.update(String(plain),'utf8'),c.final()]);const tag=c.getAuthTag();return [iv,tag,data].map(b=>b.toString('base64')).join('.');}
export function decryptText(token){const [a,b,c]=token.split('.');const d=crypto.createDecipheriv('aes-256-gcm',key(),Buffer.from(a,'base64'));d.setAuthTag(Buffer.from(b,'base64'));return Buffer.concat([d.update(Buffer.from(c,'base64')),d.final()]).toString('utf8');}
