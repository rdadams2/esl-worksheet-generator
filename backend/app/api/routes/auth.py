"""Authentication routes for the ESL Worksheet Generator API.

This module defines the routes for user authentication, including registration,
login, and user management.
"""

from datetime import timedelta
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from app.core.dependencies import (
    get_current_user,
    get_current_active_user,
    get_current_superuser
)
from app.db.database import get_session
from app.db.models import User
from app.api.models.auth import (
    User as UserSchema,
    UserCreate,
    UserUpdate,
    Token
)

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=UserSchema)
def register_user(
    user_in: UserCreate,
    session: Session = Depends(get_session)
) -> Any:
    """Register a new user.
    
    Args:
        user_in: User creation data
        session: Database session
        
    Returns:
        User: The created user
        
    Raises:
        HTTPException: If a user with the same email or username already exists
    """
    # Check if user with the same email exists
    user = session.exec(select(User).where(User.email == user_in.email)).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists"
        )
        
    # Check if user with the same username exists
    user = session.exec(select(User).where(User.username == user_in.username)).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this username already exists"
        )
        
    # Create new user
    db_user = User(
        email=user_in.email,
        username=user_in.username,
        hashed_password=get_password_hash(user_in.password),
        is_active=user_in.is_active,
        is_superuser=user_in.is_superuser
    )
    
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    
    return db_user


@router.post("/token", response_model=Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
) -> Any:
    """Login to get an access token.
    
    Args:
        form_data: OAuth2 password request form
        session: Database session
        
    Returns:
        Token: Access token
        
    Raises:
        HTTPException: If authentication fails
    """
    # Try to authenticate with username
    user = session.exec(select(User).where(User.username == form_data.username)).first()
    
    # If not found, try with email
    if not user:
        user = session.exec(select(User).where(User.email == form_data.username)).first()
        
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
        
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.user_id,
        expires_delta=access_token_expires,
        additional_data={"username": user.username}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me", response_model=UserSchema)
def read_users_me(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """Get current user.
    
    Args:
        current_user: Current authenticated user
        
    Returns:
        User: Current user information
    """
    return current_user


@router.put("/users/me", response_model=UserSchema)
def update_user_me(
    user_in: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
) -> Any:
    """Update current user.
    
    Args:
        user_in: User update data
        current_user: Current authenticated user
        session: Database session
        
    Returns:
        User: Updated user information
    """
    if user_in.email is not None:
        # Check if email is already taken
        user = session.exec(
            select(User)
            .where(User.email == user_in.email)
            .where(User.user_id != current_user.user_id)
        ).first()
        
        if user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
            
        current_user.email = user_in.email
        
    if user_in.username is not None:
        # Check if username is already taken
        user = session.exec(
            select(User)
            .where(User.username == user_in.username)
            .where(User.user_id != current_user.user_id)
        ).first()
        
        if user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
            
        current_user.username = user_in.username
        
    if user_in.password is not None:
        current_user.hashed_password = get_password_hash(user_in.password)
        
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    
    return current_user


@router.get("/users", response_model=List[UserSchema])
def read_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_superuser),
    session: Session = Depends(get_session)
) -> Any:
    """Get all users (superuser only).
    
    Args:
        skip: Number of users to skip
        limit: Maximum number of users to return
        current_user: Current authenticated superuser
        session: Database session
        
    Returns:
        List[User]: List of users
    """
    users = session.exec(select(User).offset(skip).limit(limit)).all()
    return users


@router.get("/users/{user_id}", response_model=UserSchema)
def read_user(
    user_id: int,
    current_user: User = Depends(get_current_superuser),
    session: Session = Depends(get_session)
) -> Any:
    """Get a specific user by ID (superuser only).
    
    Args:
        user_id: User ID
        current_user: Current authenticated superuser
        session: Database session
        
    Returns:
        User: User information
        
    Raises:
        HTTPException: If user not found
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


@router.put("/users/{user_id}", response_model=UserSchema)
def update_user(
    user_id: int,
    user_in: UserUpdate,
    current_user: User = Depends(get_current_superuser),
    session: Session = Depends(get_session)
) -> Any:
    """Update a specific user (superuser only).
    
    Args:
        user_id: User ID
        user_in: User update data
        current_user: Current authenticated superuser
        session: Database session
        
    Returns:
        User: Updated user information
        
    Raises:
        HTTPException: If user not found
    """
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
        
    # Update user fields
    if user_in.email is not None:
        user.email = user_in.email
    if user_in.username is not None:
        user.username = user_in.username
    if user_in.password is not None:
        user.hashed_password = get_password_hash(user_in.password)
    if user_in.is_active is not None:
        user.is_active = user_in.is_active
    if user_in.is_superuser is not None:
        user.is_superuser = user_in.is_superuser
        
    session.add(user)
    session.commit()
    session.refresh(user)
    
    return user 