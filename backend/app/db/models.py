"""SQLAlchemy ORM models for the ESL Worksheet Generator.

This module defines the database models using SQLAlchemy ORM for storing
student profiles and their conversation records. It uses PostgreSQL-specific
column types like UUID and JSONB for efficient data storage and retrieval.
"""

from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
import uuid

from app.db.database import Base

class Student(Base):
    """SQLAlchemy model for storing student information.
    
    This model represents a student's profile in the database, containing personal information,
    educational background, and preferences. It uses PostgreSQL-specific column types like
    JSONB for storing array-like data efficiently.
    
    Attributes:
        id (UUID): Primary key, automatically generated UUID
        name (str): Student's full name, max length 255 chars
        gender (str): Student's gender identity, max length 50 chars
        age_range (str): Age bracket of student, max length 50 chars
        native_language (str): Primary language, max length 100 chars
        other_languages (JSONB): Array of other spoken languages
        english_level (str): Current English proficiency, max length 50 chars
        job_title (str): Current job position, max length 255 chars
        job_description (Text): Detailed work responsibilities
        industry (str): Industry sector, max length 100 chars
        years_of_experience (int): Years of work experience
        work_environment (str): Type of workplace, max length 50 chars
        hometown (str): City/town of origin, max length 255 chars
        current_city (str): Current residence, max length 255 chars
        years_in_current_country (float): Duration of stay in current country
        family_status (str): Marital/family situation, max length 100 chars
        living_situation (str): Current living arrangements, max length 255 chars
        interests (JSONB): Array of general interests
        hobbies (JSONB): Array of recreational activities
        favorite_activities (JSONB): Array of preferred pastimes
        sports (JSONB): Array of sports played/followed
        reason_for_learning (Text): Motivation for studying English
        english_usage_context (JSONB): Array of situations where English is used
        learning_goals (JSONB): Array of study objectives
        preferred_learning_style (JSONB): Array of preferred learning methods
        favorite_foods (JSONB): Array of preferred cuisines/dishes
        travel_experience (JSONB): Array of places visited/lived
        cultural_interests (JSONB): Array of cultural activities/preferences
        music_preferences (JSONB): Array of preferred music genres
        communication_style (str): Preferred communication method, max length 255 chars
        group_work_preference (bool): Preference for group activities
        social_interests (JSONB): Array of social activities/preferences
        created_at (DateTime): Timestamp of record creation
        updated_at (DateTime): Timestamp of last update
    """
    __tablename__ = "students"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255))
    gender = Column(String(50))
    age_range = Column(String(50))
    native_language = Column(String(100))
    other_languages = Column(JSONB)
    english_level = Column(String(50))
    job_title = Column(String(255))
    job_description = Column(Text)
    industry = Column(String(100))
    years_of_experience = Column(Integer)
    work_environment = Column(String(50))
    hometown = Column(String(255))
    current_city = Column(String(255))
    years_in_current_country = Column(Float)
    family_status = Column(String(100))
    living_situation = Column(String(255))
    interests = Column(JSONB)
    hobbies = Column(JSONB)
    favorite_activities = Column(JSONB)
    sports = Column(JSONB)
    reason_for_learning = Column(Text)
    english_usage_context = Column(JSONB)
    learning_goals = Column(JSONB)
    preferred_learning_style = Column(JSONB)
    favorite_foods = Column(JSONB)
    travel_experience = Column(JSONB)
    cultural_interests = Column(JSONB)
    music_preferences = Column(JSONB)
    communication_style = Column(String(255))
    group_work_preference = Column(Boolean)
    social_interests = Column(JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Conversation(Base):
    """SQLAlchemy model for storing student conversations.
    
    This model represents recorded conversations with students, storing both
    the text transcription and a reference to the audio recording.
    
    Attributes:
        id (UUID): Primary key, automatically generated UUID
        student_id (UUID): Foreign key reference to the student table
        transcription (Text): Full text transcription of the conversation
        raw_audio_url (str): URL to the stored audio file, max length 255 chars
        created_at (DateTime): Timestamp of when the conversation was recorded
    """
    __tablename__ = "conversations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey('students.id'))
    transcription = Column(Text)
    raw_audio_url = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now()) 