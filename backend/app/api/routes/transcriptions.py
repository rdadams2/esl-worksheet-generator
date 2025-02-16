"""API routes for handling transcription processing.

This module provides endpoints for processing interview transcriptions
and extracting student information.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import Dict, Any

from app.core.dependencies import get_student_extraction_service
from app.services.student_extractor import StudentExtractionService
from app.db.database import get_session

router = APIRouter()

class TranscriptionCreate:
    """Request model for transcription processing."""
    transcription: str

@router.post("/transcriptions/")
async def process_transcription(
    transcription: TranscriptionCreate,
    service: StudentExtractionService = Depends(get_student_extraction_service),
    session: Session = Depends(get_session)
) -> Dict[str, Any]:
    """Process a transcription to extract student information.
    
    Args:
        transcription: Transcription data
        service: Student extraction service
        session: Database session
        
    Returns:
        Dict[str, Any]: Processed student information
        
    Raises:
        HTTPException: If processing fails
    """
    try:
        # Extract information from transcription
        extracted_data = await service.process_transcription(transcription.transcription)
        
        # Save to database
        student = await service.save_student_info(session, extracted_data)
        
        return {
            "status": "success",
            "student_id": student.student_id,
            "extracted_info": extracted_data
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process transcription: {str(e)}"
        )
