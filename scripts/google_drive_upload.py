"""Google Drive adapter hook.
Credentials must remain outside source control.
Existing managed Drive file IDs are updated instead of creating duplicates.
"""
def upsert_drive_file(existing_file_id,local_path,drive_client):
    if existing_file_id:return drive_client.update(existing_file_id,local_path)
    return drive_client.create(local_path)