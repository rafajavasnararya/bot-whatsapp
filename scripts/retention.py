from datetime import datetime,timezone
def should_delete(retention_until):
    if not retention_until:return False
    return datetime.fromisoformat(retention_until.replace('Z','+00:00'))<=datetime.now(timezone.utc)
def retention_action(kind):
    return 'delete_private_object_and_keep_audit_hash' if kind in {'ktp','kk','sim','student_card','face'} else 'clear_optional_metadata'