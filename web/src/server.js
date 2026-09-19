import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from '../../database/repositories/db.js';
export function createApp(){
  const app=express();
  const dir=path.dirname(fileURLToPath(import.meta.url));
  app.use(express.json({limit:'1mb'}));
  app.use(express.static(path.resolve(dir,'../public')));
  app.get('/api/health',(req,res)=>res.json({ok:true,service:'nexovonarsa-cs'}));
  app.get('/api/stats',(req,res)=>res.json(db.stats()));
  app.get('/api/orders',(req,res)=>res.json(db.openOrders()));
  return app;
}
