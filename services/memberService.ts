import type {IncomingMessage} from "./whatsapp.js";
import {appendAuditEvent} from "./storage.js";
export interface MemberRecord{
 whatsapp:string;gmail?:string;
 instagram?:{handle?:string;mediaRef?:string;text?:string};
 tiktok?:{handle?:string;mediaRef?:string;text?:string};
 virtualPo?:{platform:"BUSSID"|"ETS2";name?:string;role?:string};
 consentVersion:string;createdAt:string;
}
export async function recordMessage(m:IncomingMessage){await appendAuditEvent({type:"message_received",messageId:m.id,chatId:m.chatId,sender:m.from});}
export function validateConsent(ok:boolean){if(!ok)throw new Error("Explicit consent required.");}
export function sanitizeMember(x:MemberRecord):MemberRecord{return {...x,whatsapp:x.whatsapp.replace(/[^0-9+]/g,""),gmail:x.gmail?.trim().toLowerCase(),consentVersion:x.consentVersion.trim()};}
