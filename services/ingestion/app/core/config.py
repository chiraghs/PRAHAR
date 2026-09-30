import os
from pydantic_settings import BaseSettings

class IngestionSettings(BaseSettings):
    SERVICE_NAME: str = "prahar-ingestion-service"
    PORT: int = 8001
    POLL_INTERVAL_MINUTES: int = 15
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Earth Engine
    GEE_PROJECT_ID: str = ""
    GEE_SERVICE_ACCOUNT: str = ""
    GEE_PRIVATE_KEY: str = ""

    # External APIs
    IMD_RSS_URL: str = "https://mausam.imd.gov.in/responsive/all_india_cyclone_rss.php"
    OVERPASS_URL: str = "https://overpass-api.de/api/interpreter"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = IngestionSettings()
