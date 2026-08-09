import time
import random

class YoloDetector:
    """
    YOLOv11 Object Detection & ByteTrack Multi-Object Tracking Engine (VisionGuard AI Stub)
    In production: Loads PyTorch weights `yolov11n.pt` / `yolov11x.pt` and ByteTrack tracker.
    """
    def __init__(self, confidence_threshold=0.75):
        self.confidence_threshold = confidence_threshold
        self.classes = {
            0: "person",
            24: "backpack",
            26: "handbag",
            28: "suitcase",
            1: "bicycle",
            2: "car"
        }

    def detect_and_track(self, frame_id, camera_id):
        """
        Simulates frame sampling, object detection, and multi-object tracking.
        Returns detected objects with bounding boxes, confidence, class_name, and track_id.
        """
        detections = []
        
        # Base crowd tracking per camera
        if camera_id == "CAM-202": # Platform 3 (Congested area with unattended bag)
            detections.append({
                "track_id": 104,
                "class_name": "backpack",
                "label": "Unattended Object",
                "confidence": 0.964,
                "bbox": [0.42, 0.55, 0.12, 0.15], # normalized x_center, y_center, w, h
                "stationary_seconds": 320,
                "risk_level": "CRITICAL"
            })
            for i in range(1, 14):
                detections.append({
                    "track_id": i + 200,
                    "class_name": "person",
                    "label": f"Commuter #{i+200}",
                    "confidence": round(random.uniform(0.88, 0.98), 3),
                    "bbox": [round(random.uniform(0.1, 0.9), 2), round(random.uniform(0.2, 0.8), 2), 0.05, 0.12],
                    "stationary_seconds": random.randint(5, 60),
                    "risk_level": "LOW"
                })
        elif camera_id == "CAM-042": # Maintenance Yard
            detections.append({
                "track_id": 501,
                "class_name": "person",
                "label": "Unauthorized Perimeter Entry",
                "confidence": 0.921,
                "bbox": [0.72, 0.40, 0.08, 0.22],
                "stationary_seconds": 15,
                "risk_level": "CRITICAL"
            })
        else:
            # Default normal monitoring
            for i in range(1, 6):
                detections.append({
                    "track_id": i + 100,
                    "class_name": "person",
                    "label": f"Person #{i+100}",
                    "confidence": round(random.uniform(0.85, 0.97), 3),
                    "bbox": [round(random.uniform(0.1, 0.8), 2), round(random.uniform(0.2, 0.7), 2), 0.06, 0.14],
                    "stationary_seconds": 0,
                    "risk_level": "LOW"
                })

        # Apply confidence filtering
        valid_detections = [d for d in detections if d["confidence"] >= self.confidence_threshold]
        return valid_detections
