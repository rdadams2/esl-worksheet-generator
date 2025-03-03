"""Authentication schemas for the ESL Worksheet Generator API.

This module defines the Pydantic models for authentication requests and responses.
"""

from typing import Optional
from pydantic import BaseModel, EmailStr, validator
from datetime import datetime


class Token(BaseModel):
    """Token response schema."""
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    """Token payload schema."""
    sub: Optional[str] = None
    exp: Optional[datetime] = None


class UserBase(BaseModel):
    """Base user schema."""
    email: EmailStr
    username: str
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False


class UserCreate(UserBase):
    """User creation schema."""
    password: str
    
    @validator('password')
    def password_min_length(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v


class UserUpdate(BaseModel):
    """User update schema."""
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None


class UserInDBBase(UserBase):
    """User in DB base schema."""
    user_id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True


class User(UserInDBBase):
    """User response schema."""
    pass


class UserInDB(UserInDBBase):
    """User in DB schema with hashed password."""
    hashed_password: str 