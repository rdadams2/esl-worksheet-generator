"""Configuration settings for the ESL Worksheet Generator.

This module defines the application settings using Pydantic's BaseSettings.
"""

from pydantic import BaseModel
from functools import lru_cache

class Settings(BaseModel):
    """Application settings.
    
    Attributes:
        DATABASE_URL: PostgreSQL database connection URL
        AI_SERVICE_URL: URL for the AI service (OpenAI, etc.)
        AI_SERVICE_KEY: API key for the AI service
        PDF_SERVICE_URL: URL for the PDF generation service
        STORAGE_PATH: Path for storing uploaded files
    """
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost/esl_worksheet"
    AI_SERVICE_URL: str = "https://api.openai.com/v1"
    AI_SERVICE_KEY: str = ""
    PDF_SERVICE_URL: str = "http://localhost:8001"
    STORAGE_PATH: str = "./storage"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance.
    
    Returns:
        Settings: Application settings instance
    """
    return Settings()
