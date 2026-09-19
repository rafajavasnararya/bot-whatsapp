import 'dotenv/config';
export const settings={
 timezone:process.env.TIMEZONE||'Asia/Jakarta',
 openHour:Number(process.env.OPEN_HOUR||5),
 closeHour:Number(process.env.CLOSE_HOUR||23),
 adminNumbers:(process.env.ADMIN_NUMBERS||'').split(',').map(v=>v.trim().replace(/\D/g,'')).filter(Boolean),
 channelJids:(process.env.CHANNEL_JIDS||'').split(',').map(v=>v.trim()).filter(Boolean),
 approvedGroupJids:(process.env.APPROVED_GROUP_JIDS||'').split(',').map(v=>v.trim()).filter(Boolean),
 dashboardPort:Number(process.env.DASHBOARD_PORT||3000),
 consentRequired:String(process.env.CONSENT_REQUIRED||'true')!=='false',
 piiRetentionDays:Number(process.env.PII_RETENTION_DAYS||180)
};
