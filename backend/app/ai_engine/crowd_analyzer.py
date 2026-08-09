import random

class CrowdAnalyzer:
    """
    Crowd Density & Flow Analysis Module (VisionGuard AI Stub)
    Calculates passenger density per m², heatmap spatial matrices, and risk scoring.
    """
    def __init__(self, critical_density_threshold=3.5):
        self.critical_density_threshold = critical_density_threshold

    def analyze_camera_feed(self, camera_id, person_count):
        """
        Computes crowd metrics and spatial heatmap matrix for platform floorplans.
        """
        # Map camera to platform zone area (m²)
        zone_areas = {
            "CAM-101": 1500, # Main Concourse
            "CAM-202": 800,  # Platform 3
            "CAM-301": 600,  # Platform 4
            "CAM-112": 1000, # Food Court
            "CAM-005": 500   # Escalator Bank
        }
        area = zone_areas.get(camera_id, 700)
        density = round(person_count / (area / 100), 2) # approx persons per 100m²

        if density >= 3.5:
            risk_score = "CRITICAL"
        elif density >= 2.5:
            risk_score = "HIGH"
        elif density >= 1.5:
            risk_score = "MEDIUM"
        else:
            risk_score = "LOW"

        # Generate 10x10 normalized spatial heatmap grid points
        heatmap_grid = []
        for r in range(10):
            row = []
            for c in range(10):
                # Add higher concentration points near center / platform edge
                val = round(random.uniform(0.1, 0.4) + (0.5 if (2 <= r <= 6 and 3 <= c <= 7 and risk_score in ['HIGH', 'CRITICAL']) else 0), 2)
                row.append(min(val, 1.0))
            heatmap_grid.append(row)

        return {
            "camera_id": camera_id,
            "person_count": person_count,
            "density_per_sqm": density,
            "risk_score": risk_score,
            "heatmap_matrix": heatmap_grid
        }
