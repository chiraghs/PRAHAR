---
name: prahar-cyclone-resilience
description: >-
  Architectural patterns, Google Earth Engine (GEE) satellite pipelines, Gemini Multimodal reasoning,
  track-based cyclone storm surge simulation, infrastructure exposure graph modeling,
  and anticipatory disaster action workflows for the Bay of Bengal and coastal APAC.
---

# PRAHAR: Cyclone Impact & Infrastructure Vulnerability Skill

This skill guides the design, engineering, and deployment of **PRAHAR (Predictive Risk & Anticipatory Hazard Action Resource)** — an AI-powered predictive risk and vulnerability modeling platform that shifts disaster response from post-landfall recovery to pre-landfall anticipatory evacuation, infrastructure hardening, and parametric insurance liquidity.

---

## 1. Domain & Problem Context

### The Challenge in the Bay of Bengal & Coastal APAC
- **Deadliest Cyclone Basin**: The Bay of Bengal accounts for less than 5% of global tropical cyclones but has historically caused over 75% of worldwide cyclone-related fatalities due to shallow bathymetry, funnel-shaped coastlines, and dense deltaic populations (Sundarbans, Odisha, Andhra Pradesh, Bangladesh, Myanmar).
- **The Compound Flooding Threat**: Coastal damage is rarely just wind. High storm surges meet swollen river deltas and torrential inland precipitation, creating compound backwater inundation that traps populations and drowns emergency escape corridors.
- **Critical Infrastructure Cascades**: Sub-stations drown, disabling hospital backup generators; arterial bridges overtop, cutting off ambulance transit; telecommunication towers collapse, creating information blackouts.
- **The Recovery vs. Anticipation Gap**: Traditional aid and state compensation take weeks or months. Anticipatory action (triggered 48–72 hours *before* landfall) and pre-landfall parametric insurance payouts save lives, safeguard livestock, and secure livelihoods before disaster strikes.

---

## 2. Technical Stack Reference Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION TIER (React 18 + TS + Vite)                      │
│  - National / State Disaster Command Deck         - District Magistrate Action Board    │
│  - 3D Storm Surge & Track Inundation GIS Map      - Infrastructure Isolation Graph     │
│  - Timeline Scrubbing Slider (T-72h to Landfall)   - Parametric Liquidity Trigger Desk  │
│  - Automated NDRF SOP & Multilingual Alert Drawer                                      │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ REST / SSE / WebSockets
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                              API GATEWAY & CORE ENGINE (FastAPI)                       │
│  - /api/v1/cyclones (Active storm tracks, JTWC/IMD cones, intensity forecasts)         │
│  - /api/v1/simulation (SLOSH-based surge elevation, compound flood backwater model)   │
│  - /api/v1/vulnerability (OSM critical infrastructure intersection & isolation graph) │
│  - /api/v1/gemini-advisory (Gemini Multimodal reasoning, SOP briefs, local audio alerts)│
│  - /api/v1/parametric (Smart trigger validation, index-based liquidity authorization)  │
└──────────────────┬─────────────────┬───────────────────┬───────────────────────────────┘
                   │                 │                   │
┌──────────────────▼──────┐ ┌────────▼─────────┐ ┌──────▼───────────────────────────────┐
│ DATA INGESTION SERVICE  │ │     GOOGLE AI    │ │             STORAGE & CACHE           │
│ (Independent Microsvc)  │ │ - Gemini Flash   │ │ - PostgreSQL / PostGIS (Spatial DB)   │
│ - IMD / JTWC Track Feed │ │   Multimodal     │ │ - SQLite / GeoJSON (Dev / Fallback)   │
│ - Google Earth Engine   │ │ - Audio TTS /    │ │ - Redis (Pub/Sub & Geo-cache)         │
│   (DEM 30m, SAR, GPM)   │ │   Translation    │ │ - S3 / Local TIF Raster Store         │
│ - OSM Overpass Ingest   │ │ - Structured     │ │                                       │
│ - INCOIS Tide Gauges    │ │   JSON Schemas   │ │                                       │
└─────────────────────────┘ └──────────────────┘ └───────────────────────────────────────┘
```

---

## 3. Core AI & Technical Capabilities

### A. Data Ingestion Microservice (`services/ingestion`)
- **Decoupled Architecture**: Meteorological and satellite feeds operate on asynchronous polling loops and webhooks, independent of the core REST API.
- **Key Ingest Feeds**:
  1. **Cyclone Tracks & Cones**: IMD (India Meteorological Department) RSS/GeoJSON, JTWC (Joint Typhoon Warning Center) Automated Tropical Cyclone Forecast (ATCF) files, and IBTrACS archive.
  2. **Google Earth Engine (GEE)**:
     - Copernicus GLO-30 DEM & NASADEM (30m elevation contours).
     - GPM / CHIRPS daily accumulated precipitation.
     - Sentinel-1 SAR (Synthetic Aperture Radar) backscatter for historical flood calibration.
  3. **Critical Infrastructure (OSM Overpass API)**:
     - Hospitals, Community Health Centers, Cyclone Shelters.
     - Electric sub-stations, transmission pylons, power generation units.
     - Primary highways (NH/SH), railway tracks, and coastal bridges.
  4. **Oceanographic Gauges**: INCOIS (Indian National Centre for Ocean Information Services) tide tables and sea surface temperature anomalies.

### B. Compound Surge & Hydrodynamic Elevation Simulation
- **Surge Formulation**:
  Combines inverted barometer effect ($\Delta P$), wind setup ($\tau_w$), and coastal bathymetry slope:
  $$\Delta \eta = \frac{1}{\rho_w g} (P_{\infty} - P_c) + \frac{C_d \rho_a U_{10}^2 L}{g h}$$
- **DEM Clipping**: Inundation boundaries intersected with coastal elevation to produce realistic flood depth raster layers (0–1m, 1–2m, 2–4m, >4m).
- **Compound Inundation**: Identifies choke points where surging ocean levels block seaward drainage of swollen rivers (e.g., Mahanadi, Hooghly, Krishna deltas).

### C. Infrastructure Exposure & Isolation Graph Analyzer
- **Graph Construction**: Roads and bridges modeled as directed network graphs using NetworkX / OSMnx.
- **Dynamic Severance**: Edges intersecting $>0.5\text{m}$ predicted flood depths are marked **severed**.
- **Isolation Index**: Identifies villages and cyclone shelters whose shortest path to a functioning District Hospital or relief hub exceeds critical time thresholds or is completely cut off.

### D. Gemini Multimodal Reasoning Engine
- **Multimodal Prompting**:
  Feeds composite GeoTIFF / satellite screenshots, contour overlays, and tabular exposure metrics to Gemini Flash:
  > *"Analyze this 48-hour landfall cone for Cyclone Mocha over Sittwe/Cox's Bazar. Identify vulnerable earthen embankments, assess the risk of power cutoffs to the district hospital, and generate priority evacuation directives."*
- **Role-Differentiated SOP Generation**:
  - **NDRF & Coast Guard**: Operational deployment briefs with precise GIS coordinates and boat staging zones.
  - **District Magistrate / Municipal Commissioner**: Gram Panchayat evacuation target quotas and relief shelter inventory checklists.
  - **Frontline ASHA / Panchayati Raj Workers**: Simple, direct WhatsApp/SMS bulletins and localized Indic voice alerts (Bengali, Odia, Telugu, Hindi).

### E. Parametric Disaster Insurance & Smart Liquidity Escrow
- **Pre-Landfall Trigger Mechanism**:
  Eliminates tedious manual post-disaster damage surveys. Triggers payouts 24–48 hours *before* landfall when verified parameters are satisfied:
  $$\text{Trigger} = (\text{Wind} \ge V_{\text{thresh}}) \land (\text{Forecast Surge} \ge S_{\text{thresh}}) \land (\text{Distance to Coast} \le D_{\text{thresh}})$$
- **Instant Relief Liquidity**: Unlocks digital emergency vouchers and municipal relief funds directly to affected coastal administrative blocks.

---

## 4. UI/UX Design Standards

- **Theme & Aesthetics**:
  - Dark Theme Default (Disaster Operations Center aesthetic).
  - Background: Deep Maritime Navy (`hsl(220, 40%, 8%)`).
  - Panels: Glassmorphism (`background: hsla(220, 30%, 14%, 0.7)`, `backdrop-filter: blur(16px)`).
  - Accents:
    - Cyclone Track & Cone: Radiant Amber (`#f59e0b`) to Neon Coral (`#f43f5e`).
    - Surge Inundation: Translucent Cyan (`#06b6d4`) to Deep Ocean Blue (`#1d4ed8`).
    - Catastrophic Risk: Crimson (`#ef4444`).
    - Safe Shelters & Routes: Emerald (`#10b981`).
- **Core Views**:
  1. **War Room Command Deck**: Live track visualization, cone of uncertainty, wind speed gauge, countdown to landfall.
  2. **3D Inundation & Infrastructure Inspector**: Interactive GIS layer toggles (Surge Depth, Power Grid, Medical Facilities, Severed Arteries).
  3. **Timeline Scrubber**: Interactive $T-72\text{h} \rightarrow \text{Landfall} \rightarrow T+24\text{h}$ simulation playback.
  4. **Gemini Advisory Briefing**: One-click AI disaster brief generator with downloadable PDF/Markdown SOPs.
  5. **Parametric Liquidity Dashboard**: Live escrow trigger status, active policies, and automated payout disbursement tracker.

---

## 5. Development Principles & Fallbacks

- **Zero-Failure Local Execution**:
  - Fully offline-capable mock fallback data (including historical tracks of Cyclone Amphan 2020, Fani 2019, Biparjoy 2023, and Dana 2024).
  - Built-in synthetic GEE elevation grids and OSM infrastructure seeds so the application runs completely out-of-the-box even without active cloud API keys.
- **Code Organization**:
  - `services/ingestion/`: Standalone microservice for data collectors and cron pollers.
  - `backend/`: FastAPI application containing simulation algorithms, graph analytics, and Gemini integrations.
  - `frontend/`: Modern Vite + React 18 + TailwindCSS + Leaflet/MapLibre dashboard.
- **Production Readiness**:
  - Structured logging, health check endpoints (`/health`), and Prometheus instrumentation (`/metrics`).
