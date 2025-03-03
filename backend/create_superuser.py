"""Script to create a superuser for testing.

This script creates a superuser with the specified credentials.
"""

import sys
import os
from sqlmodel import Session, select

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db.database import engine, get_session
from app.db.models import User
from app.core.security import get_password_hash

def create_superuser(email: str, username: str, password: str) -> None:
    """Create a superuser with the specified credentials.
    
    Args:
        email: Email address
        username: Username
        password: Password
    """
    with Session(engine) as session:
        # Check if user with the same email exists
        user = session.exec(select(User).where(User.email == email)).first()
        if user:
            print(f"User with email {email} already exists")
            return
            
        # Check if user with the same username exists
        user = session.exec(select(User).where(User.username == username)).first()
        if user:
            print(f"User with username {username} already exists")
            return
            
        # Create new superuser
        db_user = User(
            email=email,
            username=username,
            hashed_password=get_password_hash(password),
            is_active=True,
            is_superuser=True
        )
        
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        
        print(f"Superuser {username} created successfully")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python create_superuser.py <email> <username> <password>")
        sys.exit(1)
        
    email = sys.argv[1]
    username = sys.argv[2]
    password = sys.argv[3]
    
    create_superuser(email, username, password) 