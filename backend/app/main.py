from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time

app = FastAPI(
    title="PRAHAR Core Simulation Engine",
    description="Track-Based Cyclone Impact & Infrastructure Vulnerability Forecaster",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "PRAHAR Core Simulation Engine",
        "version": "1.0.0",
        "database": "connected (Spatial DB)",
        "ingestion_microservice": "http://localhost:8001"
    }

# --- Cyclone Track & Telemetry Models ---
@app.get("/api/v1/cyclones/active")
def get_active_cyclones():
    return {
        "active_cyclone": {
            "id": "dana-2024",
            "name": "Severe Cyclonic Storm DANA",
            "basin": "Bay of Bengal",
            "category": "Cat 2 / Severe Cyclonic Storm",
            "current_location": {"lat": 19.8, "lng": 88.2},
            "projected_landfall_location": {"lat": 20.85, "lng": 86.95, "name": "Dhamra Port / Bhitarkanika, Odisha"},
            "time_to_landfall_hours": 24,
            "max_sustained_wind_kmh": 125,
            "central_pressure_hpa": 982,
            "forward_speed_kmh": 14,
            "cone_of_uncertainty_km": 65,
            "historical_reference": "Cyclone Amphan (2020) analogue"
        },
        "track_waypoints": [
            {"time": "T-72h", "lat": 16.5, "lng": 90.2, "wind_kmh": 65, "surge_m": 0.4, "status": "Deep Depression"},
            {"time": "T-48h", "lat": 18.1, "lng": 89.4, "wind_kmh": 90, "surge_m": 0.9, "status": "Cyclonic Storm"},
            {"time": "T-24h", "lat": 19.8, "lng": 88.2, "wind_kmh": 115, "surge_m": 1.8, "status": "Severe Cyclonic Storm"},
            {"time": "T-12h", "lat": 20.4, "lng": 87.5, "wind_kmh": 125, "surge_m": 2.6, "status": "Peak Intensity"},
            {"time": "Landfall", "lat": 20.85, "lng": 86.95, "wind_kmh": 120, "surge_m": 3.1, "status": "Landfall (Dhamra)"},
            {"time": "T+12h", "lat": 21.6, "lng": 86.2, "wind_kmh": 70, "surge_m": 1.2, "status": "Inland Dissipation"}
        ]
    }

# --- Storm Surge & Inundation Polygons ---
@app.get("/api/v1/simulation/surge")
def get_surge_simulation(time_step: str = "T-24h"):
    # Returns surge elevation contours (0.5m, 1.5m, 3.0m inundation depth)
    surge_height = 1.8 if time_step == "T-24h" else (2.6 if time_step == "T-12h" else 3.1)
    
    return {
        "time_step": time_step,
        "max_surge_height_meters": surge_height,
        "coastal_slope_bathymetry": "Shallow Shelf (<1:1000 slope factor)",
        "inundated_area_sq_km": 840 if time_step == "T-24h" else 1420,
        "compound_river_backflow_risk": "Critical (Baitarani & Brahmani estuaries backflow blocked)",
        "inundation_zones": [
            {
                "zone_name": "Bhitarkanika - Dhamra Coastal Fringe",
                "depth_range": "2.5m - 3.5m",
                "risk_level": "Catastrophic",
                "coordinates": [
                    [20.70, 86.85], [20.95, 87.05], [20.90, 87.20], [20.65, 87.00]
                ]
            },
            {
                "zone_name": "Kendrapara Lowland Estuary",
                "depth_range": "1.5m - 2.5m",
                "risk_level": "Severe",
                "coordinates": [
                    [20.45, 86.50], [20.75, 86.85], [20.60, 87.05], [20.35, 86.70]
                ]
            },
            {
                "zone_name": "Bhadrak Agricultural Delta",
                "depth_range": "0.5m - 1.5m",
                "risk_level": "Moderate",
                "coordinates": [
                    [20.90, 86.40], [21.15, 86.70], [20.95, 87.05], [20.70, 86.75]
                ]
            }
        ]
    }

# --- Critical Infrastructure Exposure & Road Severance ---
@app.get("/api/v1/infrastructure/vulnerability")
def get_infrastructure_vulnerability():
    return {
        "summary": {
            "total_hospitals_monitored": 18,
            "at_risk_hospitals": 5,
            "total_substations_monitored": 24,
            "flooded_substations": 7,
            "arterial_roads_km": 340,
            "severed_roads_km": 68,
            "isolated_cyclone_shelters": 4
        },
        "facilities": [
            {
                "id": "hosp-1",
                "name": "Dhamra Port Community Health Centre",
                "type": "Hospital",
                "lat": 20.82,
                "lng": 86.91,
                "elevation_m": 2.1,
                "surge_water_depth_m": 1.4,
                "status": "Power Cutoff Imminent",
                "generator_elevation_safe": False,
                "bed_capacity": 60,
                "oxygen_stock_hours": 18
            },
            {
                "id": "hosp-2",
                "name": "Bhadrak District Hospital",
                "type": "District Hospital",
                "lat": 21.05,
                "lng": 86.51,
                "elevation_m": 8.4,
                "surge_water_depth_m": 0.0,
                "status": "Operational (Major Relief Hub)",
                "generator_elevation_safe": True,
                "bed_capacity": 320,
                "oxygen_stock_hours": 72
            },
            {
                "id": "sub-1",
                "name": "OPTCL 132/33kV Chandbali Grid Substation",
                "type": "Power Substation",
                "lat": 20.78,
                "lng": 86.74,
                "elevation_m": 1.9,
                "surge_water_depth_m": 1.1,
                "status": "Submerged - Tripped",
                "affected_consumers": 45000
            },
            {
                "id": "shelter-1",
                "name": "Rajkanika Multi-Purpose Cyclone Shelter",
                "type": "Cyclone Shelter",
                "lat": 20.68,
                "lng": 86.77,
                "elevation_m": 4.5,
                "surge_water_depth_m": 0.2,
                "status": "Safe & Accessible",
                "capacity": 1200,
                "current_occupancy": 850
            },
            {
                "id": "shelter-2",
                "name": "Talchua Fishing Hamlet Shelter",
                "type": "Cyclone Shelter",
                "lat": 20.73,
                "lng": 87.03,
                "elevation_m": 1.8,
                "surge_water_depth_m": 1.6,
                "status": "Severed - Inaccessible by Road",
                "capacity": 600,
                "current_occupancy": 520
            }
        ],
        "severed_road_segments": [
            {
                "road_name": "SH-9A Chandbali-Dhamra Expressway",
                "severance_km": 14.2,
                "flood_depth_m": 1.3,
                "impact": "Direct ambulance link between Dhamra Port and Bhadrak District Hospital severed"
            },
            {
                "road_name": "Rajkanika Coastal Loop Road",
                "severance_km": 8.5,
                "flood_depth_m": 0.9,
                "impact": "Cuts off 3 evacuation shelters; requires NDRF inflatable assault craft"
            }
        ]
    }

# --- Gemini Multimodal SOP & Action Directives ---
class AdvisoryRequest(BaseModel):
    role: str = "NDRF"
    storm_id: str = "dana-2024"

@app.post("/api/v1/advisory/generate")
def generate_advisory(req: AdvisoryRequest):
    time.sleep(0.3)  # simulates low-latency Gemini Flash generation
    if req.role.upper() == "NDRF":
        return {
            "role": "NDRF & Armed Forces Command",
            "model": "Gemini 1.5 Flash (Multimodal Spatial Reasoning)",
            "priority": "FLASH-CRITICAL (T-24h to Landfall)",
            "directives": [
                "Deploy 6 Gemini-assisted motorized inflatable boats to Dhamra-Chandbali cutoff sector (Lat 20.78, Lng 86.82).",
                "Stage mobile high-capacity dewatering pumps (500 GPM) at Dhamra Port CHC to safeguard oxygen manifold room.",
                "Establish aerial staging drop-zone at Bhadrak Autonomous College Grounds (Elevation 9.2m, completely above surge contour).",
                "Initiate pre-landfall evacuation of 18,400 residents in Gram Panchayats: Dosinga, Kaitha, and Talchua before 18:00 IST."
            ],
            "indic_broadcast_odia": "ଧାମରା ଏବଂ ଚାନ୍ଦବାଲି ଉପକୂଳବର୍ତ୍ତୀ ଅଞ୍ଚଳରେ ୨.୫ ମିଟର ପର୍ଯ୍ୟନ୍ତ ଜଳପ୍ଲାବନ ହେବାର ସମ୍ଭାବନା ଅଛି। ଦୟାକରି ତୁରନ୍ତ ନିକଟସ୍ଥ ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳୀକୁ ଯାଆନ୍ତୁ।",
            "status": "APPROVED FOR BROADCAST"
        }
    elif req.role.upper() == "COLLECTOR":
        return {
            "role": "District Collector / Municipal Magistrate",
            "model": "Gemini 1.5 Flash (Multimodal Spatial Reasoning)",
            "priority": "URGENT ACTION MANDATE",
            "directives": [
                "Issue mandatory evacuation orders for all kutcha houses within 5km of Bhitarkanika mangrove line.",
                "Enforce shutdown of 132kV Chandbali grid substation 4 hours before landfall to prevent explosive transformer fires.",
                "Re-route all emergency medical patient transfers directly to Bhadrak District Hospital via inland NH-16 bypass.",
                "Stock 4 days of baby formula, dry rations, and chlorine water purification tablets in 12 identified shelters."
            ],
            "indic_broadcast_odia": "ପ୍ରଶାସନ ପକ୍ଷରୁ ସମସ୍ତ ତଳିଆ ଅଞ୍ଚଳ ଲୋକଙ୍କୁ ଆଶ୍ରୟସ୍ଥଳକୁ ସ୍ଥାନାନ୍ତରିତ କରାଯାଉଛି। ସରକାରୀ ନିର୍ଦ୍ଦେଶ ପାଳନ କରନ୍ତୁ।",
            "status": "APPROVED FOR BROADCAST"
        }
    else:
        return {
            "role": "Public & Village Panchayats",
            "model": "Gemini 1.5 Flash (Multimodal Spatial Reasoning)",
            "priority": "COMMUNITY SAFETY ADVISORY",
            "directives": [
                "Move livestock to elevated pucca platform shelters immediately.",
                "Store potable drinking water in sealed containers; boil water before drinking.",
                "Do not venture into floodwaters — risk of venomous snakes displaced from mangroves.",
                "Keep mobile phones fully charged and tune into local disaster radio frequency 101.4 MHz."
            ],
            "indic_broadcast_odia": "ମତ୍ସ୍ୟଜୀବୀମାନେ ସମୁଦ୍ରକୁ ଯାଆନ୍ତୁ ନାହିଁ। ବର୍ଷା ଓ ପବନରେ ଘରୁ ବାହାରନ୍ତୁ ନାହିଁ।",
            "status": "APPROVED FOR BROADCAST"
        }

# --- Parametric Insurance Liquidity Smart Escrow ---
@app.get("/api/v1/parametric/status")
def get_parametric_escrow():
    return {
        "policy_id": "ODISHA-COASTAL-PARAMETRIC-2024-09",
        "underwriter": "Global Anticipatory Climate Resilience Fund",
        "escrow_fund_pool_usd": 2500000,
        "currency": "USD / INR (₹21.0 Crores)",
        "trigger_conditions": {
            "wind_speed_threshold_kmh": 120,
            "forecast_surge_threshold_m": 1.5,
            "time_window": "24-48 Hours Pre-Landfall"
        },
        "live_telemetry": {
            "current_max_wind_kmh": 125,
            "forecast_surge_depth_m": 1.8,
            "hours_to_landfall": 24
        },
        "trigger_status": "TRIGGER ACTIVATED",
        "pre_landfall_disbursement_status": "UNLOCKED & DISBURSED (48h Pre-Landfall)",
        "disbursed_amount_usd": 1250000,
        "beneficiary_allocations": [
            {"agency": "Bhadrak District Emergency Fund", "amount_inr": "₹5.25 Cr", "purpose": "Evacuation transit buses, fuel & relief food packs"},
            {"agency": "Kendrapara Coastal Command", "amount_inr": "₹3.50 Cr", "purpose": "Sub-station flood barriers & emergency generator diesel"},
            {"agency": "NDRF 03 Battalion Mundali", "amount_inr": "₹1.75 Cr", "purpose": "Assault craft deployment & life-support equipment"}
        ]
    }
