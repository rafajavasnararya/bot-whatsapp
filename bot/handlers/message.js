import { routeIntent } from '../../ai/router.js';
import { isAdmin } from '../middleware/access.js';
import { orderFlow, handleOrderText } from '../flows/order.js';
import { customerMenu, customerCopy } from '../flows/menu.js';
import { callFlow } from '../flows/call.js';
import { memberStart, handleMember } from '../flows/member.js';
import { adminCommand } from '../commands/admin.js';
import { footerMessage } from '../../shared/footer.js';
import { db } from '../../database/repositories/db.js';

const states = new Map();

export async function handleMessage(sock, msg, logger) {
  if (!msg.message || msg.key.fromMe) return;
  const jid = msg.key.remoteJid;
  if (!jid || (!jid.endsWith('@s.whatsapp.net') && !jid.endsWith('@g.us'))) return;
  const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
  if (!text.trim()) return;
  const displayName = msg.pushName || 'Kak';
  db.auditMessage(jid, 'in', text);
  if (isAdmin(jid) && text.startsWith('!')) { await adminCommand(sock, jid, text, states, logger); return; }
  const state = states.get(jid);
  if (db.isBotPaused?.(jid)) return;
  if (state?.flow === 'order') { await handleOrderText(sock, jid, text, state, states, logger); return; }
  if (state?.flow === 'member') { await handleMember(sock, jid, text, state, states, msg, logger); return; }
  const intent = await routeIntent(text);
  switch (intent.name) {
    case 'greeting': await sock.sendMessage(jid, { text: footerMessage(customerMenu(displayName)) }); break;
    case 'order': states.set(jid, orderFlow()); await sock.sendMessage(jid, { text: footerMessage(customerCopy.orderPrompt) }); break;
    case 'price': await sock.sendMessage(jid, { text: footerMessage(customerCopy.price) }); break;
    case 'product': await sock.sendMessage(jid, { text: footerMessage(customerCopy.product) }); break;
    case 'faq': await sock.sendMessage(jid, { text: footerMessage(customerCopy.faq) }); break;
    case 'call': await callFlow(sock, jid); break;
    case 'admin': await sock.sendMessage(jid, { text: footerMessage(customerCopy.admin) }); break;
    case 'member': states.set(jid, memberStart()); await handleMember(sock, jid, text, states.get(jid), states, msg, logger); break;
    default: await sock.sendMessage(jid, { text: footerMessage(customerCopy.fallback) });
  }
}
