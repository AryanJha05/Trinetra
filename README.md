# TRINETRA – AI-Powered Intelligent CCTV Surveillance & Safety Management Platform
### *Transforming Existing CCTV Infrastructure into Real-Time Proactive Intelligence*
**Smart India Hackathon 2026 · Problem Statement SIH1349**

---

## 📌 Overview

**TRINETRA** is an operational-grade, AI-driven CCTV surveillance and safety command platform designed for high-density environments like railway stations, transit hubs, airports, public gathering grounds, and industrial facilities. 

Rather than requiring costly hardware replacements, TRINETRA seamlessly transforms existing passive RTSP/CCTV camera streams into a real-time proactive intelligence network. It provides automated anomaly detection, crowd density heatmaps, perimeter breach triage, workforce safety compliance (PPE), and explainable risk scoring—all framed within a sleek, modern, enterprise-grade Security Operations Center (SOC) visual system compliant with the **Digital Personal Data Protection (DPDP) Act 2023**.

---

## 🎨 Operational Security UI Design System

TRINETRA features a mission-critical desktop-class dashboard designed for clarity, visual comfort, and rapid incident response:

- **Refined Color System**: Enterprise Slate & Navy palette (`#0F172A` primary text/dark pills, `#F8FAFC` slate canvas, `#E2E8F0` crisp borders) paired with semantic status indicators (`#047857` active emerald, `#B91C1C` alert red, `#B45309` warning amber).
- **Rounded Modern Containers**: Standardized `14px` (`rounded-2xl`) card surfaces with `shadow-2xs` subtle depth elevation.
- **Pill Controls & Navigation**: `rounded-full` active navigation indicators, category filter tabs, and camera layout selectors.
- **Responsive Command Layout**: Flexible 12-column layout grid featuring fixed telemetry bars, interactive floorplan maps, multi-grid CCTV streams, and real-time incident queues.

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

## 🚀 Core Platform Modules

### 1. 🎛️ Command Operations Center Dashboard
- **KPI Telemetry Cards**: Real-time connected camera nodes (`1,248`), active threat alerts (`7`), crowd surge metrics (`Elevated`), and site safety score (`88/100`).
- **Interactive Site Blueprint**: High-density architectural floorplan with real-time zone node markers (`ACTIVE`, `ALERT`).
- **Incident Triage Queue**: Priority operational feed featuring single-click **"View Cam"** and **"Dispatch Guard"** quick actions.
- **Operational Timeline**: Chronological event log with status indicators and precise time stamps.
- **Telemetry Trends**: Integrated hourly threat volume and resolution bar chart visualizations.

### 2. 📹 Live CCTV Surveillance Matrix
- **Configurable Camera Grids**: Switch between 2x2 (4-view), 3x3 (9-view), and 4x4 (16-view) live monitoring layouts.
- **HTML5 Canvas AI Overlays**: Real-time dynamic bounding boxes, confidence tags, and multi-object tracking identifiers.
- **DPDP Act Privacy Safeguard**: Instant one-click **Gaussian Face Anonymization Blur** toggle for privacy compliance.
- **Node Telemetry Sidebar**: Live stream resolution (1080p @ 30 FPS), processing latency (12ms), and uptime status per sector.

### 3. 👥 Crowd Intelligence & Flow Density
- **Spatial Congestion Heatmap**: Congestion density visualizations mapping commuter flow across station concourses and platform gates.
- **Predictive Bottleneck Engine**: Early-warning alerts for overcrowding before physical capacity thresholds are breached.
- **Passenger Queue Metering**: Real-time wait-time analytics at ticket halls, security checkpoints, and escalator link corridors.

### 4. 🚨 Smart Incident Management Center
- **Triage Filter Queue**: Filter operational alerts by severity (`CRITICAL`, `WARNING`, `NOTICE`, `RESOLVED`).
- **Evidence Drawer**: Incident details, confidence metrics, evidence snapshots, and response guard tracking.

### 5. 👷 Workforce Safety & PPE Compliance
- **Automated PPE Suite**: Computer vision detection for Hardhats, High-Visibility Vests, Safety Boots, and Protective Eyewear.
- **Personnel Inspection Log**: Sector-by-sector worker safety compliance tracking and audit history.

### 6. 🧠 Risk Assessment Engine (XAI)
- **Multi-Factor Threat Indexing**: Dynamic risk scoring combining crowd velocity, spatial anomaly density, and perimeter proximity.
- **Transparent Decision Auditing**: Explainable AI breakdowns validating confidence scores for SOC operators.

### 7. 🔒 Governance & Security Audit Trail
- **Immutable Security Logs**: Comprehensive log records tracking operator dispatch actions, privacy mask toggles, and system verification events.

---

## 🛠️ Technology Architecture

| Layer | Technology Stack |
|---|---|
| **Frontend Framework** | React 18, Vite, Vanilla CSS, Tailwind CSS, Lucide React, Recharts |
| **Backend REST API** | FastAPI (Python 3.11), Pydantic v2, Uvicorn |
| **Database & Storage** | PostgreSQL / SQLite (WAL mode, indexed spatial & incident event logs) |
| **Computer Vision Engine** | YOLOv11 (Object Detection), ByteTrack (Multi-Object Tracking), OpenCV, PyTorch |
| **Containerization** | Docker, Docker Compose, Nginx Reverse Proxy |

---

## 🔌 REST API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `GET /cameras` | GET | Retrieve connected camera list, health status, and stream metadata |
| `GET /live-feed` | GET | Stream camera telemetry and real-time AI bounding box overlays |
| `GET /alerts` | GET | Fetch active and historical security incident alerts |
| `GET /analytics` | GET | Retrieve aggregated crowd flow, response latency, and safety KPIs |
| `POST /incident` | POST | Log manual or automated AI security incidents |
| `POST /notify` | POST | Trigger automated response guard dispatch notifications |
| `GET /workers` | GET | Fetch workforce safety compliance logs and zone inspection data |
| `GET /audit-logs` | GET | Access system audit trail and privacy compliance records |

---

## 💻 Quickstart & Local Setup

### Prerequisites
- Node.js (v18+) & npm
- Python (3.11+) & pip
- Docker & Docker Compose *(Optional for containerized run)*

### 1. Run Backend Service (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m app.db.seed_data
uvicorn app.main:app --reload --port 8000
```
> *Interactive Swagger documentation available at `http://localhost:8000/docs`*

### 2. Run Frontend Service (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
> *Security Operations Center available at `http://localhost:3000`*

---

## 🐳 Docker Deployment

To launch the complete platform stack locally using Docker Compose:

```bash
# Build and run stack
docker compose up --build

# Run in background (detached mode)
docker compose up -d --build

# Stop stack
docker compose down
```

---

## 📜 License & Accreditation
Developed for **Smart India Hackathon 2026** (Problem Statement SIH1349).  
*Building safer public infrastructure through proactive AI intelligence and privacy-first engineering.*

