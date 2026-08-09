from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.db.models import Camera
from app.ai_engine.pipeline import vision_pipeline

router = APIRouter()

@router.get("/cameras")
def get_cameras(
    zone: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    List all cameras, location, stream URL, zone, resolution, and live status.
    """
    query = db.query(Camera)
    if zone:
        query = query.filter(Camera.zone == zone)
    if status:
        query = query.filter(Camera.status == status)
    
    cameras = query.all()
    return {
        "status": "success",
        "total_count": len(cameras),
        "online_count": sum(1 for c in cameras if c.status == "ONLINE"),
        "cameras": [
            {
                "camera_id": c.camera_id,
                "location": c.location,
                "zone": c.zone,
                "status": c.status,
                "stream_url": c.stream_url,
                "resolution": c.resolution,
                "fps": c.fps,
                "health_score": c.health_score
            } for c in cameras
        ]
    }

@router.get("/live-feed")
def get_live_feed(
    camera_id: str = Query("CAM-202", description="Camera ID to fetch live feed metadata for"),
    db: Session = Depends(get_db)
):
    """
    Stream/reference active camera feed metadata, bounding box telemetry, and privacy masks.
    """
    camera = db.query(Camera).filter(Camera.camera_id == camera_id).first()
    if not camera:
        return {"error": "Camera not found", "camera_id": camera_id}

    pipeline_result = vision_pipeline.process_camera_stream(camera_id)

    return {
        "camera_id": camera.camera_id,
        "location": camera.location,
        "zone": camera.zone,
        "status": camera.status,
        "stream_url": camera.stream_url,
        "resolution": camera.resolution,
        "fps": camera.fps,
        "ai_overlays": pipeline_result["detections"],
        "crowd_telemetry": pipeline_result["crowd_telemetry"],
        "privacy_telemetry": pipeline_result["privacy_telemetry"],
        "verified_incidents": pipeline_result["verified_incidents"]
    }
