from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Worker

router = APIRouter()

@router.get("/workers")
def get_workers(db: Session = Depends(get_db)):
    """
    Get list of workers, assigned zone, activity, and PPE compliance status.
    """
    workers = db.query(Worker).all()
    return {
        "status": "success",
        "total_workers": len(workers),
        "workers": [
            {
                "worker_id": w.worker_id,
                "name": w.name,
                "role": w.role,
                "zone": w.zone,
                "activity": w.activity,
                "compliance_status": w.compliance_status,
                "helmet_ok": w.helmet_ok,
                "vest_ok": w.vest_ok,
                "boots_ok": w.boots_ok,
                "eye_protection_ok": w.eye_protection_ok,
                "timestamp": w.timestamp.isoformat()
            } for w in workers
        ]
    }
