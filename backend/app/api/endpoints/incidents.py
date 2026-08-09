from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
import uuid
from app.db.database import get_db
from app.db.models import Incident, Alert, AuditLog

router = APIRouter()

class IncidentCreateRequest(BaseModel):
    type: str
    severity: str  # CRITICAL, WARNING, NOTICE
    confidence: float
    camera_id: str
    location: str
    details: str
    recommended_action: str

class NotifyRequest(BaseModel):
    alert_id: str
    assigned_team: str
    notes: str = ""

@router.post("/incident")
def create_incident(req: IncidentCreateRequest, db: Session = Depends(get_db)):
    """
    Register a newly detected incident (from AI engine or manual controller input).
    """
    inc_id = f"INC-2026-{uuid.uuid4().hex[:4].upper()}"
    new_incident = Incident(
        incident_id=inc_id,
        type=req.type,
        severity=req.severity,
        confidence=req.confidence,
        timestamp=datetime.utcnow(),
        camera_id=req.camera_id,
        location=req.location,
        evidence_frame_url="/assets/evidence_snapshot.jpg",
        status="ACTIVE",
        assigned_team="RPF Quick Response Unit",
        recommended_action=req.recommended_action,
        details=req.details
    )
    db.add(new_incident)

    # Automatically create associated Alert
    alt_id = f"ALT-{uuid.uuid4().hex[:4].upper()}"
    new_alert = Alert(
        alert_id=alt_id,
        incident_id=inc_id,
        status="UNASSIGNED",
        assigned_team="RPF Quick Response Unit",
        timestamp=datetime.utcnow(),
        notification_sent=True
    )
    db.add(new_alert)

    # Audit log
    audit = AuditLog(
        user_id="USR-SYSTEM",
        action="INCIDENT_REGISTERED",
        target_resource=inc_id,
        details=f"Created incident {req.type} at {req.location} with confidence {req.confidence}%",
        ip_address="127.0.0.1"
    )
    db.add(audit)
    db.commit()

    return {
        "status": "success",
        "message": "Incident successfully registered",
        "incident_id": inc_id,
        "alert_id": alt_id
    }

@router.post("/notify")
def trigger_notification(req: NotifyRequest, db: Session = Depends(get_db)):
    """
    Trigger notification / alert routing to assigned response team (RPF Guard, Station Control, Safety Officer).
    """
    alert = db.query(Alert).filter(Alert.alert_id == req.alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert ID not found")

    alert.assigned_team = req.assigned_team
    alert.status = "DISPATCHED"

    incident = alert.incident
    if incident:
        incident.status = "IN_PROGRESS"
        incident.assigned_team = req.assigned_team

    # Audit record
    audit = AuditLog(
        user_id="USR-001",
        action="ALERT_DISPATCHED",
        target_resource=req.alert_id,
        details=f"Dispatched team {req.assigned_team}. Notes: {req.notes}",
        ip_address="10.1.4.22"
    )
    db.add(audit)
    db.commit()

    return {
        "status": "success",
        "message": f"Notification sent to team: {req.assigned_team}",
        "alert_id": req.alert_id,
        "dispatch_timestamp": datetime.utcnow().isoformat()
    }
