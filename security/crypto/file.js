import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
function key(){const raw=process.env.PII_ENCRYPTION_KEY_BASE64;if(!raw)throw new Error('PII_ENCRYPTION_KEY_BASE64 is required');const k=Buffer.from(raw,'base64');if(k.length!==32)throw new Error('Encryption key must decode to 32 bytes');return k;}
export async function encryptFile(buffer,logicalName){const k=key();const iv=crypto.randomBytes(12);const c=crypto.createCipheriv('aes-256-gcm',k,iv);const ciphertext=Buffer.concat([c.update(buffer),c.final()]);const tag=c.getAuthTag();const dir=path.resolve('private_uploads');await fs.mkdir(dir,{recursive:true});const safe=crypto.createHash('sha256').update(logicalName+Date.now()).digest('hex');const out=path.join(dir,`${safe}.enc`);await fs.writeFile(out,Buffer.concat([iv,tag,ciphertext]));return{path:out,sha256:crypto.createHash('sha256').update(buffer).digest('hex')};}
