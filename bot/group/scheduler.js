import { settings } from '../../config/settings.js';
import { isApprovedGroup } from '../middleware/access.js';

function hourWIB() {
  return Number(new Intl.DateTimeFormat('id-ID',{timeZone:settings.timezone,hour:'2-digit',hour12:false}).format(new Date()));
}

async function apply(sock, logger) {
  const hour = hourWIB();
  for (const jid of settings.approvedGroupJids) {
    if (!isApprovedGroup(jid)) continue;
    try {
      if (hour >= settings.closeHour || hour < settings.openHour) await sock.groupSettingUpdate(jid,'announcement');
      else await sock.groupSettingUpdate(jid,'not_announcement');
    } catch (err) { logger.warn({err,jid},'scheduled group update failed'); }
  }
}

export function scheduleGroups(sock, logger) {
  apply(sock, logger);
  setInterval(() => apply(sock, logger), 60_000);
}
