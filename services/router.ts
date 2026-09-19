import type {IncomingMessage,WhatsAppTransport} from "./whatsapp.js";
import {classifyIntent} from "../ai/classifier.js";
import {autoReply} from "./autoReply.js";
import {recordMessage} from "./memberService.js";
import {paymentProofEvent} from "./paymentProof.js";
export async function routeIncomingMessage(wa:WhatsAppTransport,m:IncomingMessage){
 await recordMessage(m);
 if(m.image){
  const proof=await paymentProofEvent(m);
  if(proof.isLikelyPaymentProof){await wa.sendText(m.chatId,"Terima kasih, bukti pembayaran sudah diterima. Tim akan melakukan verifikasi terlebih dahulu.");return {intent:"payment_proof",queued:true};}
 }
 const intent=classifyIntent(m.text??"");
 await wa.sendText(m.chatId,autoReply(intent,m.from));
 return {intent};
}
