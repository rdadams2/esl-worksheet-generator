"""Configuration settings for the ESL Worksheet Generator.

This module defines the application settings using Pydantic's BaseSettings.
"""

from pydantic import BaseModel
from functools import lru_cache
import secrets

class Settings(BaseModel):
    """Application settings.
    
    Attributes:
        DATABASE_URL: PostgreSQL database connection URL
        AI_SERVICE_URL: URL for the AI service (OpenAI, etc.)
        AI_SERVICE_KEY: API key for the AI service
        PDF_SERVICE_URL: URL for the PDF generation service
        STORAGE_PATH: Path for storing uploaded files
        SECRET_KEY: Secret key for JWT token generation
        ALGORITHM: Algorithm for JWT token generation
        ACCESS_TOKEN_EXPIRE_MINUTES: Expiration time for access tokens in minutes
    """
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost/esl_worksheet"
    AI_SERVICE_URL: str = "https://api.openai.com/v1"
    AI_SERVICE_KEY: str = ""
    PDF_SERVICE_URL: str = "http://localhost:8001"
    STORAGE_PATH: str = "./storage"
    
    # Security settings
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance.
    
    Returns:
        Settings: Application settings instance
    """
    return Settings()
