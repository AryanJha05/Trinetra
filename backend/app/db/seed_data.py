from datetime import datetime, timedelta
from app.db.database import SessionLocal, init_db
from app.db.models import Camera, Incident, Alert, Worker, CrowdLog, User, AuditLog

def seed_database():
    init_db()
    db = SessionLocal()

    # Check if already seeded
    if db.query(Camera).first():
        print("Database already contains seed data.")
        db.close()
        return

    print("Seeding VisionGuard AI database with realistic Indian Railways telemetry...")

    # 1. Cameras
    cameras = [
        Camera(camera_id="CAM-101", location="Concourse North - Main Entrance", zone="Main Concourse", status="ONLINE", stream_url="rtsp://10.24.101.1/live", resolution="1080p", health_score=99.8),
        Camera(camera_id="CAM-202", location="Platform 3 - Sector B (Pillar 12)", zone="Platform 3", status="ONLINE", stream_url="rtsp://10.24.102.1/live", resolution="4K", health_score=98.5),
        Camera(camera_id="CAM-301", location="Platform 4 East - FOB Staircase", zone="Platform 4", status="ONLINE", stream_url="rtsp://10.24.103.1/live", resolution="1080p", health_score=96.2),
        Camera(camera_id="CAM-112", location="Food Court & Waiting Area B", zone="Concourse", status="ONLINE", stream_url="rtsp://10.24.112.1/live", resolution="1080p", health_score=99.1),
        Camera(camera_id="CAM-005", location="Escalator Bank A - Main Hall", zone="Concourse", status="ONLINE", stream_url="rtsp://10.24.005.1/live", resolution="1080p", health_score=100.0),
        Camera(camera_id="CAM-404", location="Tunnel Westway 2 - Track Edge", zone="Track Maintenance", status="ONLINE", stream_url="rtsp://10.24.404.1/live", resolution="1080p", health_score=94.0),
        Camera(camera_id="CAM-200", location="Service Hall B - Maintenance Depot", zone="Depot Yard B", status="ONLINE", stream_url="rtsp://10.24.200.1/live", resolution="1080p", health_score=97.5),
        Camera(camera_id="CAM-009", location="Exterior Ramp & Gate 2 Security", zone="Security Gate", status="ONLINE", stream_url="rtsp://10.24.009.1/live", resolution="1080p", health_score=99.4),
        Camera(camera_id="CAM-210", location="Platform 1-2 Link Track South", zone="Platform 1-2", status="DEGRADED", stream_url="rtsp://10.24.210.1/live", resolution="720p", health_score=78.2),
        Camera(camera_id="CAM-042", location="Maintenance Yard Sector 4", zone="Restricted Yard", status="ONLINE", stream_url="rtsp://10.24.042.1/live", resolution="4K", health_score=99.0)
    ]
    for c in cameras:
        db.add(c)

    now = datetime.utcnow()

    # 2. Incidents
    incidents = [
        Incident(
            incident_id="INC-2026-892",
            type="Unattended Object Detected",
            severity="CRITICAL",
            confidence=96.4,
            timestamp=now - timedelta(minutes=8),
            camera_id="CAM-202",
            location="Platform 3, Zone B (Near Pillar 12)",
            evidence_frame_url="/assets/evidence_unattended_bag.jpg",
            status="ACTIVE",
            assigned_team="RPF Patrol Unit 4",
            recommended_action="Dispatch immediate bomb disposal & cordon Platform 3 North.",
            details="Black backpack stationary for > 5 minutes without owner within 10m radius. Dimensions approx 60cm x 30cm x 30cm."
        ),
        Incident(
            incident_id="INC-2026-887",
            type="Unauthorized Entry Attempt",
            severity="CRITICAL",
            confidence=92.1,
            timestamp=now - timedelta(minutes=32),
            camera_id="CAM-042",
            location="Zone 4 (Maintenance Yard B)",
            evidence_frame_url="/assets/evidence_unauthorized_entry.jpg",
            status="ACKNOWLEDGED",
            assigned_team="Yard Security Guard B",
            recommended_action="Verify credentials via intercom & dispatch perimeter guard.",
            details="Unidentified individual in non-uniform jacket breached perimeter gate past 22:00 hours."
        ),
        Incident(
            incident_id="INC-2026-881",
            type="High Crowd Density Warning",
            severity="WARNING",
            confidence=88.5,
            timestamp=now - timedelta(minutes=55),
            camera_id="CAM-301",
            location="Platform 2 North End Staircase",
            evidence_frame_url="/assets/evidence_crowd_surge.jpg",
            status="ACTIVE",
            assigned_team="Platform Control Team",
            recommended_action="Activate crowd diversion gates toward FOB 2.",
            details="Density exceeds 3.8 persons/m². Commuter wave buildup due to delayed Express Train 1204."
        ),
        Incident(
            incident_id="INC-2026-875",
            type="No Helmet Detected (Workforce Safety)",
            severity="NOTICE",
            confidence=94.2,
            timestamp=now - timedelta(hours=2, minutes=15),
            camera_id="CAM-200",
            location="Service Hall B - Depot Yard",
            evidence_frame_url="/assets/evidence_ppe_violation.jpg",
            status="RESOLVED",
            assigned_team="Safety Compliance Officer",
            recommended_action="Issue safety compliance warning to Tech EMP-9102.",
            details="Worker detected in active maintenance track without high-visibility helmet."
        ),
        Incident(
            incident_id="INC-2026-869",
            type="Track Danger Proximity Warning",
            severity="WARNING",
            confidence=91.0,
            timestamp=now - timedelta(hours=4),
            camera_id="CAM-404",
            location="Tunnel Westway 2 Edge",
            evidence_frame_url="/assets/evidence_track_proximity.jpg",
            status="RESOLVED",
            assigned_team="Track Signal Controller",
            recommended_action="Sound platform audio alarm and alert driver of Train #2291.",
            details="Individual standing within 0.5m of live track edge during incoming train signal."
        )
    ]
    for inc in incidents:
        db.add(inc)

    # 3. Alerts
    alerts = [
        Alert(alert_id="ALT-1001", incident_id="INC-2026-892", status="DISPATCHED", assigned_team="RPF Quick Response Unit 4", timestamp=now - timedelta(minutes=7)),
        Alert(alert_id="ALT-1002", incident_id="INC-2026-887", status="IN_PROGRESS", assigned_team="Maintenance Yard B Guard", timestamp=now - timedelta(minutes=30)),
        Alert(alert_id="ALT-1003", incident_id="INC-2026-881", status="UNASSIGNED", assigned_team="Station Ops Manager", timestamp=now - timedelta(minutes=54)),
        Alert(alert_id="ALT-1004", incident_id="INC-2026-875", status="RESOLVED", assigned_team="Safety Officer", timestamp=now - timedelta(hours=2)),
        Alert(alert_id="ALT-1005", incident_id="INC-2026-869", status="RESOLVED", assigned_team="Signal Control Room", timestamp=now - timedelta(hours=3, minutes=58))
    ]
    for a in alerts:
        db.add(a)

    # 4. Workers
    workers = [
        Worker(worker_id="EMP-8472", name="Aryan Jha", role="Team Lead & AI Architect", zone="Track A - Sector 4", activity="Signal Calibration", compliance_status="NORMAL", helmet_ok=True, vest_ok=True, boots_ok=True, eye_protection_ok=True, timestamp=now),
        Worker(worker_id="EMP-9102", name="Mahipal", role="AI Vision Specialist", zone="Platform 3 - North", activity="Track Welding", compliance_status="NORMAL", helmet_ok=True, vest_ok=True, boots_ok=True, eye_protection_ok=True, timestamp=now),
        Worker(worker_id="EMP-3341", name="Sandeep", role="Backend Systems Lead", zone="Depot Yard B", activity="Server Health Check", compliance_status="NORMAL", helmet_ok=True, vest_ok=True, boots_ok=True, eye_protection_ok=True, timestamp=now),
        Worker(worker_id="EMP-5529", name="Nikita", role="Frontend Architect", zone="Track A - Sector 5", activity="UI Telemetry Test", compliance_status="NORMAL", helmet_ok=True, vest_ok=True, boots_ok=True, eye_protection_ok=True, timestamp=now),
        Worker(worker_id="EMP-4902", name="Aastha", role="Safety Compliance Lead", zone="Sector 3 Alpha", activity="PPE Inspection", compliance_status="NORMAL", helmet_ok=True, vest_ok=True, boots_ok=True, eye_protection_ok=True, timestamp=now),
        Worker(worker_id="EMP-6120", name="Smrutirani", role="Database Audit Lead", zone="Control Center Node", activity="Log Integrity Verification", compliance_status="NORMAL", helmet_ok=True, vest_ok=True, boots_ok=True, eye_protection_ok=True, timestamp=now)
    ]
    for w in workers:
        db.add(w)

    # 5. Crowd Logs
    crowd_logs = [
        CrowdLog(camera_id="CAM-101", density=0.45, pax_count=1240, risk_score="LOW", timestamp=now - timedelta(minutes=10)),
        CrowdLog(camera_id="CAM-202", density=0.82, pax_count=3850, risk_score="CRITICAL", timestamp=now - timedelta(minutes=10)),
        CrowdLog(camera_id="CAM-301", density=0.35, pax_count=890, risk_score="LOW", timestamp=now - timedelta(minutes=10)),
        CrowdLog(camera_id="CAM-112", density=0.62, pax_count=1650, risk_score="MEDIUM", timestamp=now - timedelta(minutes=10)),
        CrowdLog(camera_id="CAM-005", density=0.74, pax_count=2100, risk_score="HIGH", timestamp=now - timedelta(minutes=10))
    ]
    for cl in crowd_logs:
        db.add(cl)

    # 6. Users
    users = [
        User(user_id="USR-001", username="rpf_controller", role="RPF Controller", permissions='["view_feed", "dispatch_guard", "acknowledge_alert", "export_logs"]'),
        User(user_id="USR-002", username="station_master", role="Station Director", permissions='["view_feed", "view_analytics", "view_safety"]')
    ]
    for u in users:
        db.add(u)

    # 7. Audit Logs
    audit_logs = [
        AuditLog(user_id="USR-001", action="ALERT_DISPATCH", target_resource="INC-2026-892", details="Dispatched RPF Unit 4 to Platform 3", ip_address="10.1.4.22"),
        AuditLog(user_id="USR-001", action="PRIVACY_MASK_ENABLE", target_resource="CAM-202", details="Activated face blur mode on exported evidence clip", ip_address="10.1.4.22")
    ]
    for al in audit_logs:
        db.add(al)

    db.commit()
    print("Database successfully seeded.")
    db.close()

if __name__ == "__main__":
    seed_database()
