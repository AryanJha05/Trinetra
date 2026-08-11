from app.ai_engine.yolo_detector import YoloDetector
from app.ai_engine.crowd_analyzer import CrowdAnalyzer
from app.ai_engine.ppe_detector import PpeDetector
from app.ai_engine.privacy_masker import PrivacyMasker
from app.ai_engine.decision_engine import DecisionEngine

class TrinetraPipeline:
    """
    Master Vision Intelligence Orchestrator (Trinetra AI)
    Combines YOLOv11 detection, ByteTrack tracking, crowd density calculation,
    PPE safety compliance, privacy face masking, and decision intelligence.
    """
    def __init__(self):
        self.yolo = YoloDetector(confidence_threshold=0.75)
        self.crowd = CrowdAnalyzer()
        self.ppe = PpeDetector()
        self.privacy = PrivacyMasker(enabled=True)
        self.decision = DecisionEngine()

    def process_camera_stream(self, camera_id, frame_id=101):
        # 1. Detection & Tracking
        detections = self.yolo.detect_and_track(frame_id, camera_id)
        
        # 2. Crowd Analysis
        person_count = sum(1 for d in detections if d["class_name"] == "person")
        crowd_telemetry = self.crowd.analyze_camera_feed(camera_id, person_count)

        # 3. Privacy Masking
        privacy_telemetry = self.privacy.apply_face_mask(detections)

        # 4. Decision Intelligence on critical objects
        evaluated_incidents = []
        for det in detections:
            if det.get("risk_level") == "CRITICAL":
                decision = self.decision.evaluate_incident(det)
                if decision["raise_alert"]:
                    evaluated_incidents.append({
                        "detection": det,
                        "decision": decision
                    })

        return {
            "camera_id": camera_id,
            "frame_id": frame_id,
            "detections": detections,
            "crowd_telemetry": crowd_telemetry,
            "privacy_telemetry": privacy_telemetry,
            "verified_incidents": evaluated_incidents
        }

vision_pipeline = TrinetraPipeline()
