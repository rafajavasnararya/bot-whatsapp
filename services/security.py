import os
from pathlib import Path
from cryptography.fernet import Fernet
def cipher():
    key=os.environ.get("NARARYA_DATA_KEY")
    if not key: raise RuntimeError("NARARYA_DATA_KEY is required")
    return Fernet(key.encode())
def encrypt_to_file(data:bytes,path:str)->str:
    p=Path(path);p.parent.mkdir(parents=True,exist_ok=True)
    p.write_bytes(cipher().encrypt(data));os.chmod(p,0o600);return str(p)
def decrypt_from_file(path:str)->bytes:
    return cipher().decrypt(Path(path).read_bytes())
