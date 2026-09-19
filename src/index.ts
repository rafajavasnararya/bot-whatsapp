import express from 'express';import {config} from './config';import {routeMessage} from './services/message-router';import {buildCallNotice} from './services/call-handler';
const app=express();app.use(express.json({limit:'4mb'}));app.get('/health',(_,res)=>res.json({ok:true,service:'nararya-unified-wa-cs'}));
app.post('/webhook/message',async(req,res)=>res.json(await routeMessage(req.body)));
app.post('/webhook/call',async(_,res)=>res.json({text:buildCallNotice()}));
app.listen(config.port,()=>console.log('CS server listening on '+config.port));