const approved=new Set<string>(),pending=new Set<string>();
export function requestChatApproval(chatId:string){pending.add(chatId);return{chatId,status:'pending_admin_confirmation'};}
export function approveChat(chatId:string){pending.delete(chatId);approved.add(chatId);return{chatId,status:'approved'};}
export function rejectChat(chatId:string){pending.delete(chatId);return{chatId,status:'rejected'};}
export function isApprovedChat(chatId:string){return approved.has(chatId);}
export function listApprovedChats(){return[...approved];}
export function queueSensitiveAction(chatId:string,action:string){if(!approved.has(chatId))throw new Error('chat_not_approved');return{chatId,action,status:'awaiting_admin_confirmation'};}