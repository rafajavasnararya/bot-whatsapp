import type {WhatsAppTransport} from "./whatsapp.js";
import {settings} from "../config/settings.js";
const hour=()=>Number(new Intl.DateTimeFormat("en-US",{timeZone:settings.TIMEZONE,hour:"2-digit",hour12:false}).format(new Date()));
let previous="";
export function startGroupScheduler(wa:WhatsAppTransport){
 const tick=async()=>{
  const action=hour()>=23||hour()<5?"close":"open";
  if(action===previous)return;
  previous=action;
  for(const id of settings.approvedGroups){try{if(action==="close")await wa.restrictGroup(id);else await wa.openGroup(id);}catch(e){console.error("group schedule",id,e);}}
 };
 void tick();setInterval(()=>void tick(),60000);
}
