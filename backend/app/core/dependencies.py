"""Dependencies for FastAPI application.

This module provides dependency injection for services and database sessions.
"""

from typing import Generator
from fastapi import Depends, HTTPException, status
from sqlmodel import Session, select
from jose import jwt, JWTError
from datetime import datetime

from app.db.database import get_session
from app.core.config import get_settings, Settings
from app.services.student_extractor import StudentExtractionService
from app.services.worksheet_extractor import WorksheetExtractionService
from app.services.content_generator import ContentGenerationService
from app.services.pdf_generator import PDFGenerationService
from app.db.models import User
from app.core.security import SECRET_KEY, ALGORITHM, oauth2_scheme
from app.api.models.auth import TokenPayload

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

# Authentication dependencies
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session)
) -> User:
    """Get the current authenticated user.
    
    Args:
        token: JWT token
        session: Database session
        
    Returns:
        User: The current user
        
    Raises:
        HTTPException: If authentication fails
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decode the JWT token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        
        if user_id is None:
            raise credentials_exception
            
        token_data = TokenPayload(**payload)
        
        if token_data.exp and token_data.exp < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise credentials_exception
        
    # Get the user from the database
    statement = select(User).where(User.user_id == int(user_id))
    user = session.exec(statement).first()
    
    if user is None:
        raise credentials_exception
        
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
        
    return user

async def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """Get the current active user.
    
    Args:
        current_user: Current authenticated user
        
    Returns:
        User: The current active user
        
    Raises:
        HTTPException: If the user is inactive
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    return current_user

async def get_current_superuser(
    current_user: User = Depends(get_current_user)
) -> User:
    """Get the current superuser.
    
    Args:
        current_user: Current authenticated user
        
    Returns:
        User: The current superuser
        
    Raises:
        HTTPException: If the user is not a superuser
    """
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user
