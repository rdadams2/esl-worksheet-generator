"""Database configuration and session management for the ESL Worksheet Generator.

This module sets up the SQLModel database connection and session management.
It provides the database engine, session factory, and base model class for the application.
"""

from sqlmodel import create_engine, Session, SQLModel
from typing import Generator

# Database connection URL
DATABASE_URL = "postgresql://postgres:postgres@localhost/esl_worksheet"

# Create database engine instance
engine = create_engine(DATABASE_URL, echo=True)

def init_db() -> None:
    """Initialize the database by creating all tables."""
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    """Database dependency callable to handle database sessions.
    
    Creates a new database session and ensures it's properly closed after use.
    This function is designed to be used as a FastAPI dependency.
    
    Yields:
        Session: SQLModel database session
        
    Example:
        @app.get("/items/")
        def read_items(session: Session = Depends(get_session)):
            return session.query(Item).all()
    """
    with Session(engine) as session:
        try:
            yield session
        finally:
            session.close() 