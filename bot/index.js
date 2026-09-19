import 'dotenv/config';
import pino from 'pino';
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys';
import qrcode from 'qrcode-terminal';
import { handleMessage } from './handlers/message.js';
import { scheduleGroups } from './group/scheduler.js';
import { createApp } from '../web/src/server.js';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const sock = makeWASocket({ auth: state, logger, markOnlineOnConnect: false, browser: ['NEXOVONARSA CS', 'Chrome', '2.0.0'] });
  sock.ev.on('creds.update', saveCreds);
  if (process.env.PAIRING_NUMBER && typeof sock.requestPairingCode === 'function' && !state.creds.registered) {
    sock.requestPairingCode(process.env.PAIRING_NUMBER.replace(/\D/g,'' )).then(code => console.log('Pairing code:', code)).catch(err => logger.warn({err}, 'pairing code unavailable'));
  }
  sock.ev.on('connection.update', update => {
    if (update.qr) { console.log('\nScan QR dari WhatsApp > Perangkat tertaut:\n'); qrcode.generate(update.qr, { small: true }); }
    if (update.connection === 'open') { console.log('NEXOVONARSA CUSTOMER SERVICE: connected'); scheduleGroups(sock, logger); }
    if (update.connection === 'close') {
      const code = update.lastDisconnect?.error?.output?.statusCode;
      if (code !== DisconnectReason.loggedOut) setTimeout(start, 3000);
      else console.log('Sesi logout. Hapus folder session/ dan tautkan ulang.');
    }
  });
  sock.ev.on('messages.upsert', async ({ messages }) => {
    for (const msg of messages) {
      try { await handleMessage(sock, msg, logger); }
      catch (err) { logger.error({ err }, 'message handler failed'); }
    }
  });
  createApp({ logger }).listen(Number(process.env.DASHBOARD_PORT || 3000), () => console.log('Dashboard: http://localhost:' + (process.env.DASHBOARD_PORT || 3000)));
}
start().catch(err => { logger.error(err); process.exitCode = 1; });
