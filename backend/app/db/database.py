"""Database configuration and session management for the ESL Worksheet Generator.

This module sets up the SQLAlchemy database connection and session management.
It provides the database engine, session factory, and base model class for the application.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database connection URL
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost/esl_worksheet"

# Create database engine instance
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create sessionmaker instance for database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create declarative base class for database models
Base = declarative_base()

def get_db():
    """Database dependency callable to handle database sessions.
    
    Creates a new database session and ensures it's properly closed after use.
    This function is designed to be used as a FastAPI dependency.
    
    Yields:
        Session: SQLAlchemy database session
        
    Example:
        @app.get("/items/")
        def read_items(db: Session = Depends(get_db)):
            return db.query(Item).all()
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 