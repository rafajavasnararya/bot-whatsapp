import "dotenv/config";
import {z} from "zod";
const schema=z.object({
 NODE_ENV:z.string().default("development"),PORT:z.coerce.number().default(3000),
 TIMEZONE:z.string().default("Asia/Jakarta"),BOT_NAME:z.string().default("NEXOVONARSA CSBOT"),
 ADMIN_NUMBERS:z.string().default(""),APPROVED_GROUPS:z.string().default(""),
 APPROVED_CHANNELS:z.string().default(""),PAYMENT_CHANNEL_ID:z.string().default(""),
 DRIVE_FOLDER_ID:z.string().default(""),ENCRYPTION_KEY:z.string().default(""),
 RETENTION_DAYS:z.coerce.number().default(30)
});
const e=schema.parse(process.env);
const split=(s:string)=>s.split(",").map(x=>x.trim()).filter(Boolean);
export const settings={...e,admins:split(e.ADMIN_NUMBERS),approvedGroups:split(e.APPROVED_GROUPS),approvedChannels:split(e.APPROVED_CHANNELS)};
export const isAdmin=(n:string)=>settings.admins.includes(n);
export const isApprovedGroup=(id:string)=>settings.approvedGroups.includes(id);
