import {classifyIntent} from './intent-router';import {replyForIntent} from './reply-service';import {isApprovedChat} from '../admin/approval';
export async function routeMessage(event:any){const chatId=String(event.chatId||''),text=String(event.text||'').trim(),intent=classifyIntent(text);
if(event.isGroup&&!isApprovedChat(chatId))return{action:'approval_required',intent,text:'Grup ini belum diizinkan untuk otomasi. Admin perlu menyetujui chat ini terlebih dahulu.'};
return{action:'reply',intent,text:replyForIntent(intent,event.brand)};}