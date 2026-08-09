from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import AuditLog

router = APIRouter()

@router.get("/audit-logs")
def get_audit_logs(db: Session = Depends(get_db)):
    """
    Retrieve access and privacy compliance audit trail for RBAC and DPDP governance.
    """
    logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).all()
    return {
        "status": "success",
        "total_logs": len(logs),
        "logs": [
            {
                "log_id": l.log_id,
                "user_id": l.user_id,
                "action": l.action,
                "target_resource": l.target_resource,
                "details": l.details,
                "timestamp": l.timestamp.isoformat(),
                "ip_address": l.ip_address
            } for l in logs
        ]
    }
