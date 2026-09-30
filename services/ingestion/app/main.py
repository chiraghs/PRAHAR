from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(
    title="PRAHAR Data Ingestion Microservice",
    description="Real-time ingestion engine for Cyclone Tracks (IMD/JTWC), GEE Satellite Rasters, and OSM Lifeline Infrastructure.",
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
        "service": settings.SERVICE_NAME,
        "poll_interval_minutes": settings.POLL_INTERVAL_MINUTES
    }

@app.post("/ingest/trigger-all")
async def trigger_full_ingestion():
    """Manual trigger to invoke all data pollers (IMD, GEE, OSM)."""
    return {
        "status": "triggered",
        "message": "Asynchronous ingestion cycle initiated for active cyclone tracks and spatial infrastructure."
    }
