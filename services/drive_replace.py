def sync(local_path,remote_id,client):
    if remote_id:
        client.update_file(remote_id,local_path)
        return {"mode":"replace","id":remote_id}
    new_id=client.create_file(local_path)
    return {"mode":"create_once","id":new_id}
def sync_pack(files,ids,client):
    return {key:sync(path,ids.get(key),client) for key,path in files.items()}