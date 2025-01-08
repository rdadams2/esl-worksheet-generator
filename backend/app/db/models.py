from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
import uuid

from app.db.database import Base

class Student(Base):
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
    __tablename__ = "conversations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey('students.id'))
    transcription = Column(Text)
    raw_audio_url = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now()) 