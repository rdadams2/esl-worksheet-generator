"""Dependencies for FastAPI application.

This module provides dependency injection for services and database sessions.
"""

from typing import Generator
from fastapi import Depends
from sqlmodel import Session

from app.db.database import get_session
from app.core.config import get_settings, Settings
from app.services.student_extractor import StudentExtractionService
from app.services.worksheet_extractor import WorksheetExtractionService
from app.services.content_generator import ContentGenerationService
from app.services.pdf_generator import PDFGenerationService

def get_student_extraction_service(
    settings: Settings = Depends(get_settings)
) -> StudentExtractionService:
    """Get StudentExtractionService instance.
    
    Args:
        settings: Application settings
        
    Returns:
        StudentExtractionService: Service instance
    """
    return StudentExtractionService(settings.AI_SERVICE_URL, settings.AI_SERVICE_KEY)

def get_worksheet_extraction_service(
    settings: Settings = Depends(get_settings)
) -> WorksheetExtractionService:
    """Get WorksheetExtractionService instance.
    
    Args:
        settings: Application settings
        
    Returns:
        WorksheetExtractionService: Service instance
    """
    return WorksheetExtractionService(settings.STORAGE_PATH)

def get_content_generation_service(
    settings: Settings = Depends(get_settings)
) -> ContentGenerationService:
    """Get ContentGenerationService instance.
    
    Args:
        settings: Application settings
        
    Returns:
        ContentGenerationService: Service instance
    """
    return ContentGenerationService(settings.AI_SERVICE_URL, settings.AI_SERVICE_KEY)

def get_pdf_generation_service(
    settings: Settings = Depends(get_settings)
) -> PDFGenerationService:
    """Get PDFGenerationService instance.
    
    Args:
        settings: Application settings
        
    Returns:
        PDFGenerationService: Service instance
    """
    return PDFGenerationService(settings.PDF_SERVICE_URL, settings.STORAGE_PATH)
