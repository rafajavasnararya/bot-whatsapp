import makeWASocket,{DisconnectReason,useMultiFileAuthState} from "@whiskeysockets/baileys";
import P from "pino";
import qrcode from "qrcode-terminal";
import {routeMessage} from "../src/services/message-router";
const log=P({level:"info"});
async function start(){
 const {state,saveCreds}=await useMultiFileAuthState("sessions/linked-device");
 const sock=makeWASocket({auth:state,logger:log,printQRInTerminal:false});
 sock.ev.on("creds.update",saveCreds);
 sock.ev.on("connection.update",({connection,lastDisconnect,qr})=>{
  if(qr) qrcode.generate(qr,{small:true});
  if(connection==="open") log.info("Linked Device connected");
  if(connection==="close"){
   const code=(lastDisconnect?.error as any)?.output?.statusCode;
   if(code!==DisconnectReason.loggedOut) void start();
  }
 });
 sock.ev.on("messages.upsert",async({messages})=>{
  for(const m of messages){
   if(m.key.fromMe||!m.message) continue;
   const text=m.message.conversation||m.message.extendedTextMessage?.text||"";
   const result=await routeMessage({chatId:m.key.remoteJid,text,isGroup:m.key.remoteJid?.endsWith("@g.us")});
   if(result.action==="reply"&&m.key.remoteJid) await sock.sendMessage(m.key.remoteJid,{text:result.text});
  }
 });
}
start().catch(e=>{log.error(e);process.exit(1);});