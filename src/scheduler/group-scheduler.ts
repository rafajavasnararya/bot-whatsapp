import {DateTime} from "luxon";
const APPROVED=new Set<string>();
export function approve(jid:string){APPROVED.add(jid);}
export function revoke(jid:string){APPROVED.delete(jid);}
export function approved(jid:string){return APPROVED.has(jid);}
export async function tick(sock:any){
 const now=DateTime.now().setZone("Asia/Jakarta");
 const minute=now.hour*60+now.minute;
 if(minute!==1380&&minute!==300)return;
 for(const jid of APPROVED){
  try{await sock.groupSettingUpdate(jid,minute===1380?"announcement":"not_announcement");}
  catch(error){console.error("group schedule",jid,error);}
 }
}