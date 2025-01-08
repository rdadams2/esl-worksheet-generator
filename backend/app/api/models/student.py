from pydantic import BaseModel, UUID4
from typing import List, Optional
from datetime import datetime

class StudentBase(BaseModel):
    name: str
    gender: Optional[str]
    age_range: Optional[str]
    native_language: str
    other_languages: Optional[List[str]] = []
    english_level: str
    job_title: Optional[str]
    job_description: Optional[str]
    industry: Optional[str]
    years_of_experience: Optional[int]
    work_environment: Optional[str]
    hometown: Optional[str]
    current_city: Optional[str]
    years_in_current_country: Optional[float]
    family_status: Optional[str]
    living_situation: Optional[str]
    interests: Optional[List[str]] = []
    hobbies: Optional[List[str]] = []
    favorite_activities: Optional[List[str]] = []
    sports: Optional[List[str]] = []
    reason_for_learning: Optional[str]
    english_usage_context: Optional[List[str]] = []
    learning_goals: Optional[List[str]] = []
    preferred_learning_style: Optional[List[str]] = []
    favorite_foods: Optional[List[str]] = []
    travel_experience: Optional[List[str]] = []
    cultural_interests: Optional[List[str]] = []
    music_preferences: Optional[List[str]] = []
    communication_style: Optional[str]
    group_work_preference: Optional[bool] = True
    social_interests: Optional[List[str]] = []

class StudentCreate(StudentBase):
    pass

class Student(StudentBase):
    id: UUID4
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class ConversationBase(BaseModel):
    transcription: str
    raw_audio_url: Optional[str]

class ConversationCreate(ConversationBase):
    student_id: UUID4

class Conversation(ConversationBase):
    id: UUID4
    student_id: UUID4
    created_at: datetime

    class Config:
        orm_mode = True 