"""Script to initialize the database.

This script creates all the tables in the database.
"""

import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db.database import engine
from sqlmodel import SQLModel
# Import all models to ensure they are registered with SQLModel
from app.db.models import (
    Student, BasicInformation, ProfessionalBackground, PersonalBackground,
    InterestHobby, LearningContext, CulturalElements, SocialAspects,
    Interview, InterviewTemplate, User, Professor, Class, StudentClass,
    HomeworkTemplate, PersonalizedHomework, ActivityTemplate, PersonalizedActivity,
    ActivityGroup
)

def init_db():
    """Initialize the database by creating all tables."""
    print("Creating database tables...")
    SQLModel.metadata.create_all(engine)
    print("Database tables created successfully.")

if __name__ == "__main__":
    init_db() 