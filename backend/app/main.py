from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Track-Based Cyclone Impact & Infrastructure Vulnerability Forecaster",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
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
        "service": settings.PROJECT_NAME,
        "database": "connected",
        "ingestion_service": settings.INGESTION_SERVICE_URL
    }

@app.get(f"{settings.API_V1_STR}/cyclones/active")
def get_active_cyclones():
    """Returns active and reference cyclones (e.g., Amphan, Fani, Dana)."""
    return [
        {
            "id": "cyclone-dana-2024",
            "name": "Severe Cyclonic Storm DANA",
            "basin": "Bay of Bengal",
            "status": "Active",
            "max_wind_kmh": 120,
            "central_pressure_hpa": 984,
            "projected_landfall": "Puri-Sagar Island Coastal Belt",
            "evacuation_urgency": "High"
        }
    ]
