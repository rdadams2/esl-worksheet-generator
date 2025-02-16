"""API models for transcription processing.

This module defines the request and response models for the transcription endpoints.
"""

from pydantic import BaseModel

class TranscriptionCreate(BaseModel):
    """Request model for transcription processing."""
    transcription: str 