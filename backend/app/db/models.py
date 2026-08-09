from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Index, Text
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class Camera(Base):
    __tablename__ = "cameras"

    camera_id = Column(String(50), primary_key=True, index=True)
    location = Column(String(100), nullable=False)
    zone = Column(String(50), nullable=False, default="Main Station")
    status = Column(String(20), nullable=False, default="ONLINE")  # ONLINE, OFFLINE, DEGRADED
    stream_url = Column(String(255), nullable=False)
    resolution = Column(String(20), default="1080p")
    fps = Column(Integer, default=30)
    health_score = Column(Float, default=99.8)

    # Relationships
    incidents = relationship("Incident", back_populates="camera")
    crowd_logs = relationship("CrowdLog", back_populates="camera")

class Incident(Base):
    __tablename__ = "incidents"

    incident_id = Column(String(50), primary_key=True, index=True)
    type = Column(String(100), nullable=False)  # Unattended Object, Unauthorized Entry, Crowd Congestion, Safety Violation
    severity = Column(String(20), nullable=False)  # CRITICAL, WARNING, NOTICE, RESOLVED
    confidence = Column(Float, nullable=False)  # e.g., 96.4
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    camera_id = Column(String(50), ForeignKey("cameras.camera_id"), nullable=False)
    location = Column(String(100), nullable=False)
    evidence_frame_url = Column(Text, nullable=True)
    status = Column(String(50), default="ACTIVE")  # ACTIVE, ACKNOWLEDGED, RESOLVED, ESCALATED
    assigned_team = Column(String(100), default="RPF Quick Response Team")
    recommended_action = Column(Text, nullable=True)
    details = Column(Text, nullable=True)

    # Relationships
    camera = relationship("Camera", back_populates="incidents")
    alerts = relationship("Alert", back_populates="incident")

class Alert(Base):
    __tablename__ = "alerts"

    alert_id = Column(String(50), primary_key=True, index=True)
    incident_id = Column(String(50), ForeignKey("incidents.incident_id"), nullable=False)
    status = Column(String(50), default="UNASSIGNED")  # UNASSIGNED, IN_PROGRESS, DISPATCHED, RESOLVED
    assigned_team = Column(String(100), default="RPF Control Room")
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    notification_sent = Column(Boolean, default=True)

    # Relationships
    incident = relationship("Incident", back_populates="alerts")

class Worker(Base):
    __tablename__ = "workers"

    worker_id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    role = Column(String(50), default="Maintenance Staff")
    zone = Column(String(50), nullable=False)
    activity = Column(String(100), nullable=False)  # Track Maintenance, Signal Repair, Routine Inspection, Idle
    compliance_status = Column(String(20), nullable=False)  # COMPLIANT, VIOLATION, BREAK
    helmet_ok = Column(Boolean, default=True)
    vest_ok = Column(Boolean, default=True)
    boots_ok = Column(Boolean, default=True)
    eye_protection_ok = Column(Boolean, default=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

class CrowdLog(Base):
    __tablename__ = "crowd_logs"

    log_id = Column(Integer, primary_key=True, autoincrement=True)
    camera_id = Column(String(50), ForeignKey("cameras.camera_id"), nullable=False)
    density = Column(Float, nullable=False)  # persons per sq meter / density score 0.0 to 1.0
    pax_count = Column(Integer, nullable=False, default=0)
    risk_score = Column(String(20), nullable=False)  # LOW, MEDIUM, HIGH, CRITICAL
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

    # Relationships
    camera = relationship("Camera", back_populates="crowd_logs")

class User(Base):
    __tablename__ = "users"

    user_id = Column(String(50), primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    role = Column(String(50), nullable=False)  # RPF Controller, Station Director, Ops Admin
    permissions = Column(Text, nullable=False)  # JSON string e.g. ["read", "dispatch", "export"]

class AuditLog(Base):
    __tablename__ = "audit_logs"

    log_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String(50), nullable=False)
    action = Column(String(100), nullable=False)
    target_resource = Column(String(100), nullable=False)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    ip_address = Column(String(45), default="127.0.0.1")

# Explicit Indexes for analytical queries
Index("idx_incident_timestamp", Incident.timestamp)
Index("idx_alert_timestamp", Alert.timestamp)
Index("idx_crowd_timestamp", CrowdLog.timestamp)
Index("idx_worker_timestamp", Worker.timestamp)
Index("idx_audit_timestamp", AuditLog.timestamp)
