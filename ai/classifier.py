from dataclasses import dataclass
from PIL import Image
import hashlib,io
@dataclass
class Triage: label:str; confidence:float; reason:str
def sha256_bytes(data:bytes)->str:return hashlib.sha256(data).hexdigest()
def triage_image(data:bytes)->Triage:
    image=Image.open(io.BytesIO(data));exif=image.getexif();software=str(exif.get(305,'')).lower()
    if any(x in software for x in ('generative','stable diffusion','midjourney','photoshop ai')):return Triage('LIKELY_AI_EDITED',.85,'metadata signal')
    if software or exif:return Triage('LIKELY_MANUAL_EDITED',.55,'editing metadata signal')
    return Triage('UNDETERMINED',.35,'pixel data cannot prove authorship')