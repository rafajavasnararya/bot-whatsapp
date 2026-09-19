from fastapi import FastAPI,UploadFile,File
from classifier import triage_image,sha256_bytes
app=FastAPI(title='Nararya Image Triage')
@app.get('/health')
def health():return {'ok':True}
@app.post('/image-triage')
async def image_triage(file:UploadFile=File(...)):
    data=await file.read();r=triage_image(data)
    return {'sha256':sha256_bytes(data),'label':r.label,'confidence':r.confidence,'reason':r.reason}