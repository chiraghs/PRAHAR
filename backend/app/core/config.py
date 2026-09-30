import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "PRAHAR Core Simulation Engine"
    API_V1_STR: str = "/api/v1"
    PORT: int = 8000
    
    # Database
    DATABASE_URL: str = "sqlite:///./prahar.db"
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Microservice URL
    INGESTION_SERVICE_URL: str = "http://localhost:8001"

    # AI Configuration
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"

    # Simulation thresholds
    SEVERANCE_FLOOD_DEPTH_METERS: float = 0.5
    PARAMETRIC_WIND_THRESHOLD_KMH: float = 120.0
    PARAMETRIC_SURGE_THRESHOLD_METERS: float = 1.5

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
