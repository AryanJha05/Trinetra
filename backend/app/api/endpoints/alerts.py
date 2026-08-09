from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.db.database import get_db
from app.db.models import Alert, Incident

router = APIRouter()

@router.get("/alerts")
def get_alerts(
    severity: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    List active and historical alerts with foreign-key incident details.
    """
    query = db.query(Alert).join(Incident)
    
    if severity:
        query = query.filter(Incident.severity == severity)
    if status:
        query = query.filter(Alert.status == status)

    alerts = query.order_by(Alert.timestamp.desc()).all()

    result = []
    for a in alerts:
        inc = a.incident
        result.append({
            "alert_id": a.alert_id,
            "incident_id": a.incident_id,
            "title": inc.type,
            "severity": inc.severity,
            "confidence": inc.confidence,
            "camera_id": inc.camera_id,
            "location": inc.location,
            "timestamp": a.timestamp.isoformat(),
            "status": a.status,
            "assigned_team": a.assigned_team,
            "evidence_frame_url": inc.evidence_frame_url,
            "recommended_action": inc.recommended_action,
            "details": inc.details
        })

    return {
        "status": "success",
        "total_alerts": len(result),
        "active_critical": sum(1 for r in result if r["severity"] == "CRITICAL" and r["status"] != "RESOLVED"),
        "alerts": result
    }
