"""Models for student and conversation data using Pydantic BaseModels.

This module defines the data models used for student profiles and their conversations
in the ESL Worksheet Generator application. It uses Pydantic for data validation and serialization.
"""

from pydantic import BaseModel, UUID4
from typing import List, Optional
from datetime import datetime

class StudentBase(BaseModel):
    """Base model for student information containing all shared attributes.
    
    Attributes:
        name (str): Full name of the student
        gender (Optional[str]): Student's gender identity
        age_range (Optional[str]): Age bracket of the student
        native_language (str): Student's first language
        other_languages (Optional[List[str]]): Other languages the student speaks
        english_level (str): Current English proficiency level
        job_title (Optional[str]): Student's current job position
        job_description (Optional[str]): Description of student's work responsibilities
        industry (Optional[str]): Industry sector of employment
        years_of_experience (Optional[int]): Years of work experience
        work_environment (Optional[str]): Type of workplace setting
        hometown (Optional[str]): City/town of origin
        current_city (Optional[str]): Current city of residence
        years_in_current_country (Optional[float]): Duration of stay in current country
        family_status (Optional[str]): Marital/family situation
        living_situation (Optional[str]): Current living arrangements
        interests (Optional[List[str]]): General interests and preferences
        hobbies (Optional[List[str]]): Recreational activities
        favorite_activities (Optional[List[str]]): Preferred pastimes
        sports (Optional[List[str]]): Sports played or followed
        reason_for_learning (Optional[str]): Motivation for studying English
        english_usage_context (Optional[List[str]]): Situations where English is used
        learning_goals (Optional[List[str]]): Objectives for English study
        preferred_learning_style (Optional[List[str]]): Preferred methods of learning
        favorite_foods (Optional[List[str]]): Preferred cuisines or dishes
        travel_experience (Optional[List[str]]): Places visited or lived
        cultural_interests (Optional[List[str]]): Cultural activities or preferences
        music_preferences (Optional[List[str]]): Preferred music genres
        communication_style (Optional[str]): Preferred way of communicating
        group_work_preference (Optional[bool]): Preference for group activities
        social_interests (Optional[List[str]]): Social activities and preferences
    """
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
    """Model for creating a new student, inheriting all fields from StudentBase.
    
    This model is used when creating new student records, containing all the fields
    from StudentBase but without the system-generated fields like id and timestamps.
    """
    pass

class Student(StudentBase):
    """Complete student model including system fields.
    
    Extends StudentBase to include database-specific fields like ID and timestamps.
    
    Attributes:
        id (UUID4): Unique identifier for the student
        created_at (datetime): Timestamp of when the record was created
        updated_at (datetime): Timestamp of the last update to the record
    """
    id: UUID4
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class ConversationBase(BaseModel):
    """Base model for conversation records.
    
    Attributes:
        transcription (str): Text transcript of the conversation
        raw_audio_url (Optional[str]): URL to the recorded audio file
    """
    transcription: str
    raw_audio_url: Optional[str]

class ConversationCreate(ConversationBase):
    """Model for creating a new conversation record.
    
    Extends ConversationBase to include the student reference.
    
    Attributes:
        student_id (UUID4): Reference to the student who participated in the conversation
    """
    student_id: UUID4

class Conversation(ConversationBase):
    """Complete conversation model including system fields.
    
    Extends ConversationBase to include database-specific fields.
    
    Attributes:
        id (UUID4): Unique identifier for the conversation
        student_id (UUID4): Reference to the associated student
        created_at (datetime): Timestamp of when the conversation was recorded
    """
    id: UUID4
    student_id: UUID4
    created_at: datetime

    class Config:
        orm_mode = True 