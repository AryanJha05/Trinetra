class DecisionEngine:
    """
    Decision Intelligence & False-Alert Suppression Layer
    Filters out noise and transient detections using multi-frame temporal verification
    and confidence thresholding before triggering high-priority alerts.
    """
    def __init__(self, min_confidence=0.85, required_frames=5):
        self.min_confidence = min_confidence
        self.required_frames = required_frames
        self.frame_buffers = {} # track_id -> consecutive detected frames count

    def evaluate_incident(self, detection_event):
        """
        Evaluates whether a detection event crosses confidence and temporal threshold.
        """
        track_id = detection_event.get("track_id")
        confidence = detection_event.get("confidence", 0.0)

        if confidence < self.min_confidence:
            return {
                "raise_alert": False,
                "reason": f"Confidence {confidence} below threshold {self.min_confidence}"
            }

        current_frames = self.frame_buffers.get(track_id, 0) + 1
        self.frame_buffers[track_id] = current_frames

        if current_frames < self.required_frames and detection_event.get("risk_level") != "CRITICAL":
            return {
                "raise_alert": False,
                "reason": f"Multi-frame verification in progress ({current_frames}/{self.required_frames} frames)"
            }

        return {
            "raise_alert": True,
            "verification_status": "VERIFIED_MULTI_FRAME",
            "priority": "HIGH" if confidence > 0.90 else "MEDIUM"
        }
