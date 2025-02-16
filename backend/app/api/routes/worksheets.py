"""API routes for handling worksheet operations.

This module provides endpoints for uploading, extracting, and managing worksheet templates.
"""

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlmodel import Session
from typing import Dict, Any

from app.db.database import get_session
from app.db.models import HomeworkTemplate, ActivityTemplate
from app.core.dependencies import get_worksheet_extraction_service
from app.services.worksheet_extractor import WorksheetExtractionService

router = APIRouter()

@router.post("/worksheets/upload/", response_model=Dict[str, Any])
async def upload_worksheet(
    file: UploadFile = File(...),
    class_id: int = None,
    template_type: str = "homework",
    service: WorksheetExtractionService = Depends(get_worksheet_extraction_service),
    session: Session = Depends(get_session)
) -> Dict[str, Any]:
    """Upload and process a worksheet file.
    
    Args:
        file: Worksheet file (PDF or JSON)
        class_id: Optional class ID to associate with
        template_type: Type of template ("homework" or "activity")
        service: Worksheet extraction service
        session: Database session
        
    Returns:
        Dict[str, Any]: Processed worksheet information
        
    Raises:
        HTTPException: If processing fails
    """
    try:
        # Extract content from file
        content = await service.extract_content(file)
        
        # Create template based on type
        if template_type == "homework":
            template = HomeworkTemplate(
                class_id=class_id,
                name=content.get("title", file.filename),
                objective=content.get("objective", ""),
                base_questions=content.get("questions", {})
            )
        elif template_type == "activity":
            template = ActivityTemplate(
                class_id=class_id,
                name=content.get("title", file.filename),
                objective=content.get("objective", ""),
                base_conversation_template=content.get("conversation", {})
            )
        else:
            raise ValueError(f"Invalid template type: {template_type}")
        
        session.add(template)
        session.commit()
        session.refresh(template)
        
        return {
            "status": "success",
            "template_id": template.template_id,
            "content": content
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process worksheet: {str(e)}"
        )
