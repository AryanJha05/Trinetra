from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import init_db
from app.db.seed_data import seed_database
from app.api.endpoints import cameras, alerts, analytics, incidents, workers, audit

app = FastAPI(
    title="Trinetra — CCTV Intelligence Platform (SIH1349)",
    description="AI-powered CCTV Intelligence Platform — Smart India Hackathon SIH1349",
    version="1.0.0"
)

# Enable CORS for Frontend control room dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup DB seed & initialization
@app.on_event("startup")
def startup_event():
    init_db()
    seed_database()

# Include Routers
app.include_router(cameras.router, tags=["Cameras & CCTV Feeds"])
app.include_router(alerts.router, tags=["Alerts & Notifications"])
app.include_router(analytics.router, tags=["Analytics & Telemetry"])
app.include_router(incidents.router, tags=["Incident Management"])
app.include_router(workers.router, tags=["Workforce Safety"])
app.include_router(audit.router, tags=["Privacy & Audit Security"])

@app.get("/")
def root():
    return {
        "system": "Trinetra — CCTV Intelligence Engine",
        "status": "OPERATIONAL",
        "organization": "Security Operations Center",
        "sih_problem_id": "SIH1349",
        "api_docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
