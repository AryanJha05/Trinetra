# Trinetra – Intelligent CCTV Surveillance & Safety Management Platform
### *Transforming Existing Railway CCTV Networks into Real-Time Decision Support*
**Smart India Hackathon 2026 · Problem Statement SIH1349 · Ministry of Railways**

---

## Overview

**Trinetra** turns existing passive CCTV infrastructure across Indian Railways into an active, intelligent decision-support system without replacing camera hardware. Developed specifically to meet the security and operational demands of Indian Railways control rooms (such as RPF Command Centers), Trinetra continuously processes RTSP video streams to detect crowd surges, security incidents, perimeter breaches, and workforce safety compliance (PPE).

---

## 👥 Smart India Hackathon 2026 — Team Trinetra

| Member Name | Role & System Responsibility |
|---|---|
| **Mahipal** | **Team Lead** · AI Computer Vision Specialist (YOLOv11 & ByteTrack Pipeline) |
| **Aryan Jha** | AI Architecture, Full-Stack & System Integration |
| **Sandeep** | Backend Systems & REST API Infrastructure Engineer |
| **Nikita** | Frontend UI/UX Architect & Control Room Interface Lead |
| **Aastha** | Safety Compliance & Design Tokens Specialist |
| **Smurtirani** | Database Architecture & Security Audit Engineer |


---

## Key Features & Control Room Screens

### 1. 🚉 Railway Command Center Dashboard
- **KPI Summary Cards**: Total Connected Cameras (`1,248`), Active Incidents (`4`), Crowd Risk Level (`Medium`), Station Safety Score (`88/100`).
- **Live Station Architectural Blueprint**: Interactive map of New Delhi Central station with color-coded live camera status pins (`Active`, `Alert`, `Offline`).
- **Live Alerts Feed**: Compact, scrollable feeds with one-click **"View Cam"** and **"Dispatch Guard"** actions.
- **Activity & Incident Timeline**: 12-hour historical trend graph of station anomaly occurrences.

### 2. 📹 Live CCTV Monitoring
- **Multi-Camera Grid**: Interactive 2x2 (4-view) and 3x3 (9-view) layout grid.
- **Dynamic HTML5 Canvas Video Simulation**: Visualizes live camera streams with AI detection bounding boxes, confidence tags (`Unattended Bag 96.4%`), object tracking IDs, and detection statuses.
- **DPDP Act Privacy Safeguard**: Real-time **Face Anonymization & Blur** toggle for Indian data privacy compliance.
- **Camera Cluster Health Sidebar**: Monitoring system health across Concourse Nodes, Platform 1-3, Exterior Perimeter, and Maintenance Yards.

### 3. 👥 Crowd Intelligence & Density Analysis
- **Platform Density Heatmap**: Floorplan overlay with spatial color gradient heatmaps.
- **Occupancy & Flow Telemetry**: Per-platform commuter readouts (`Platform 1: 1,240 pax`, `Platform 2: 3,850 pax Surging`).
- **AI Congestion Prediction Engine**: Predictive bottleneck alerts (e.g. 15-minute advance surge warnings due to delayed train arrivals).
- **Queue Wait-Time Monitoring**: Real-time passenger queue metrics for Ticketing Halls, Baggage Security Scanners, and Foot Overbridges.

### 4. 🚨 Smart Incident Alert Center
- **Triage & Filterable Alert Feed**: Incident cards categorized by priority (`CRITICAL`, `WARNING`, `NOTICE`, `RESOLVED`).
- **Detailed AI Snapshot Evidence Drawer**: High-res evidence thumbnail, event timeline, AI confidence metrics, and quick action protocol (`Dispatch RPF Quick Response Guard`).

### 5. 👷 Workforce Safety & PPE Compliance
- **PPE Compliance Metrics**: Circular progress gauges tracking Overall Compliance (`94%`), Hardhats (`98%`), Safety Vests (`91%`), Boots (`96%`), and Eye Protection (`82%`).
- **Worker Activity & PPE Log**: Searchable table tracking maintenance staff roles, assigned zones, and safety compliance status.
- **Active Track-Side Maintenance Monitor**: Video feeds showing live track welding and signal maintenance teams with AI status overlays.

### 6. 🔒 Privacy & RBAC Audit Logs
- **Immutable Security Log**: Audit trail recording all access actions, privacy mask toggles, and guard dispatch events.

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js (v18), Vite, Tailwind CSS, Lucide Icons, HTML5 Canvas |
| **Backend** | FastAPI (Python 3.11), Pydantic v2, SQLAlchemy ORM |
| **Database** | PostgreSQL / SQLite (with WAL mode & timestamp indexes) |
| **AI / ML Layer** | YOLOv11 (Object Detection), ByteTrack (Multi-Object Tracking), OpenCV, PyTorch, VideoMAE |
| **Deployment** | Docker & Docker Compose |

---

## REST API Surface

| Endpoint | Method | Description |
|---|---|---|
| `GET /cameras` | GET | List all cameras, live status, and stream metadata |
| `GET /live-feed` | GET | Stream active camera feed telemetry and AI bounding boxes |
| `GET /alerts` | GET | List active and historical alerts (filterable by priority/status) |
| `GET /analytics` | GET | Retrieve aggregated crowd risk, safety score, and timeline KPIs |
| `POST /incident` | POST | Register new AI or manual incident |
| `POST /notify` | POST | Route alert dispatch notification to assigned RPF team |
| `GET /workers` | GET | Fetch worker safety compliance records and zone activities |
| `GET /audit-logs` | GET | Retrieve privacy anonymization and security audit trail |

---

## Quickstart Instructions

### 1. Run Backend Service (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m app.db.seed_data
uvicorn app.main:app --reload --port 8000
```
*API Swagger Documentation available at `http://localhost:8000/docs`*

### 2. Run Frontend Dashboard (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*Access control room interface at `http://localhost:3000`*

### 3. Docker Compose Deployment
```bash
docker-compose up --build
```
