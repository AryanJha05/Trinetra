# TRINETRA – AI-Powered Intelligent CCTV Surveillance & Safety Management Platform
### *Transforming Existing CCTV Infrastructure into Real-Time Proactive Intelligence*
**Smart India Hackathon 2026 · Problem Statement SIH1349**

---

## 📌 Overview

**TRINETRA** transforms existing passive CCTV infrastructure into an active, real-time AI surveillance & decision-support system without requiring camera hardware replacement. Designed for high-density enterprise Security Operations Centers (SOC), TRINETRA continuously analyzes video streams to detect security anomalies, crowd surges, perimeter breaches, loitering threats, and workforce safety compliance (PPE) while upholding data privacy standards (DPDP Act).

---

## 👥 Smart India Hackathon 2026 — Team Trinetra

| Team Member |
|---|
| **Mahipal** |
| **Aryan Jha** |
| **Sandeep** |
| **Nikita** |
| **Aastha** |
| **Smurtirani** |

---

## 🚀 Enterprise Viewport & Core Modules

TRINETRA features a mission-critical, desktop-class enterprise UI built with a zero-scroll 100vh application shell, fixed header/sidebar navigation, and modular internally scrolling workspaces.

### 1. 🎛️ Command Operations Center Dashboard
- **KPI Telemetry Cards**: Connected Cameras (`1,248`), Active Incidents (`7`), Crowd Surge Level (`Elevated`), Site Safety Index (`88/100`).
- **Interactive Spatial Blueprint**: High-density floorplan & site map with real-time status pins (`ONLINE`, `ALERT`, `OFFLINE`).
- **Incident Triage Queue**: Scrollable priority feed with instant **"View Cam"** and **"Dispatch Guard"** quick actions.
- **24-Hour Threat Trend Analytics**: Temporal chart visualizing anomaly frequency and peak risk windows.

### 2. 📹 Live CCTV Monitoring Matrix
- **Configurable Camera Grid**: Single, 2x2 (4-view), 3x3 (9-view), and 4x4 (16-view) operational layouts.
- **HTML5 Canvas AI Overlays**: Dynamic bounding box visualization, confidence indicators, and multi-object tracking IDs.
- **DPDP Act Privacy Safeguard**: One-click **Gaussian Face Anonymization & Privacy Blur** toggle for privacy compliance.
- **Node Telemetry Sidebar**: Live feed health metrics across concourse nodes, perimeter gates, and maintenance yards.

### 3. 👥 Crowd Intelligence & Flow Density
- **Spatial Heatmap Overlay**: Live congestion density maps highlighting commuter and crowd accumulation zones.
- **Predictive Bottleneck Engine**: Advance notifications for overcrowding before threshold saturation occurs.
- **Queue Wait-Time Analytics**: Real-time passenger queue metering at ticketing halls, baggage scanners, and FOB access points.

### 4. 🚨 Smart Incident Alert Center
- **Prioritized Alert Triage**: Filterable operational queue (`CRITICAL`, `WARNING`, `NOTICE`, `RESOLVED`).
- **AI Snapshot Evidence Drawer**: Detailed incident breakdown, confidence scoring, evidence frame snapshots, and guard response tracking.

### 5. 👷 Workforce Safety & PPE Compliance
- **PPE Detection Suite**: Automated AI monitoring for Hardhats, High-Visibility Vests, Safety Boots, and Eye Protection.
- **Personnel Safety Log**: Real-time compliance tracking and zone activity inspection.

### 6. 🧠 Explainable AI (XAI) Risk Assessment Engine
- **Multi-Factor Threat Indexing**: Dynamic risk scoring combining spatial density, anomaly velocity, and perimeter proximity.
- **Transparent Decision Auditing**: Step-by-step breakdown of AI confidence factors for security operator validation.

### 7. 🔒 Security & RBAC Audit Logs
- **Immutable Security Trail**: Comprehensive logs recording operator actions, privacy toggles, and incident escalations.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend UI** | React 18, Vite, Tailwind CSS, HTML5 Canvas, Lucide Icons |
| **Backend API** | FastAPI (Python 3.11), Pydantic v2, SQLAlchemy ORM |
| **Database** | PostgreSQL / SQLite (with WAL mode & indexed event logs) |
| **Computer Vision** | YOLOv11 (Object Detection), ByteTrack (Multi-Object Tracking), OpenCV, PyTorch |
| **Deployment** | Docker & Docker Compose (Multi-stage Nginx + Python runtime) |

---

## 🔌 REST API Surface

| Endpoint | Method | Description |
|---|---|---|
| `GET /cameras` | GET | Retrieve connected cameras, status, and RTSP stream metadata |
| `GET /live-feed` | GET | Stream real-time camera telemetry and AI bounding box overlays |
| `GET /alerts` | GET | Fetch active and historical security alerts |
| `GET /analytics` | GET | Retrieve aggregated crowd risk, safety scores, and timeline KPIs |
| `POST /incident` | POST | Register manual or automated AI security incidents |
| `POST /notify` | POST | Trigger quick-response guard dispatch protocols |
| `GET /workers` | GET | Fetch workforce safety compliance logs and zone activity |
| `GET /audit-logs` | GET | Retrieve system audit trail and privacy compliance records |

---

## 💻 Quickstart Guide

### 1. Backend Service (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m app.db.seed_data
uvicorn app.main:app --reload --port 8000
```
*Interactive Swagger API documentation available at `http://localhost:8000/docs`*

### 2. Frontend Dashboard (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*Access Security Operations Center interface at `http://localhost:3000`*

---

## 🐳 Docker Deployment & Containerization

TRINETRA is fully containerized for seamless edge deployment in Security Operations Centers.

### Launch Stack via Docker Compose
```bash
# Build and run containers in foreground
docker compose up --build

# Run in background (detached mode)
docker compose up -d --build

# Stop stack
docker compose down
```

---

## 📜 License
Developed for **Smart India Hackathon 2026** (Problem Statement SIH1349).
