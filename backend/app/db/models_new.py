"""SQLModel ORM models for the ESL Worksheet Generator.

This module defines the database models using SQLModel ORM for storing
student profiles, assignments, and related data.
"""

from typing import Optional, Dict, Any, List
from datetime import datetime, date
from sqlmodel import SQLModel, Field, Relationship
from uuid import UUID, uuid4

# Base Tables
class StudentBase(SQLModel):
    profile_image_url: Optional[str] = None
    first_name: str
    last_name: str
    proficiency_level: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Student(StudentBase, table=True):
    student_id: Optional[int] = Field(default=None, primary_key=True)
    
    # Relationships
    basic_info: Optional["BasicInformation"] = Relationship(back_populates="student")
    professional_background: Optional["ProfessionalBackground"] = Relationship(back_populates="student")
    personal_background: Optional["PersonalBackground"] = Relationship(back_populates="student")
    interests_hobbies: List["InterestHobby"] = Relationship(back_populates="student")
    learning_context: Optional["LearningContext"] = Relationship(back_populates="student")
    cultural_elements: Optional["CulturalElements"] = Relationship(back_populates="student")
    social_aspects: Optional["SocialAspects"] = Relationship(back_populates="student")
    interviews: List["Interview"] = Relationship(back_populates="student")
    classes: List["StudentClass"] = Relationship(back_populates="student")
    personalized_homeworks: List["PersonalizedHomework"] = Relationship(back_populates="student")
    personalized_activities: List["PersonalizedActivity"] = Relationship(back_populates="student")
    activity_groups: List["ActivityGroup"] = Relationship(back_populates="student")

# Student-Related Tables
class BasicInformation(SQLModel, table=True):
    basic_info_id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="student.student_id")
    date_of_birth: date
    email: str
    phone: str
    native_language: str
    current_address: str
    
    student: Student = Relationship(back_populates="basic_info")

class ProfessionalBackground(SQLModel, table=True):
    prof_background_id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="student.student_id")
    current_occupation: str
    company: str
    industry: str
    work_responsibilities: str
    years_of_experience: int
    education_level: str
    
    student: Student = Relationship(back_populates="professional_background")

class PersonalBackground(SQLModel, table=True):
    personal_background_id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="student.student_id")
    hometown: str
    country_of_origin: str
    family_background: str
    life_experiences: str
    personal_goals: str
    
    student: Student = Relationship(back_populates="personal_background")

class InterestHobby(SQLModel, table=True):
    interest_id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="student.student_id")
    category: str
    name: str
    description: str
    experience_years: int
    frequency: str
    
    student: Student = Relationship(back_populates="interests_hobbies")

class LearningContext(SQLModel, table=True):
    learning_context_id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="student.student_id")
    learning_goals: str
    preferred_learning_style: str
    previous_language_experience: str
    challenges: str
    strengths: str
    areas_for_improvement: str
    
    student: Student = Relationship(back_populates="learning_context")

class CulturalElements(SQLModel, table=True):
    cultural_elements_id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="student.student_id")
    cultural_background: str
    traditions: str
    value_systems: str
    cultural_practices: str
    dietary_preferences: str
    
    student: Student = Relationship(back_populates="cultural_elements")

class SocialAspects(SQLModel, table=True):
    social_aspects_id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="student.student_id")
    communication_style: str
    group_work_preference: str
    social_interests: str
    community_involvement: str
    interaction_preferences: str
    
    student: Student = Relationship(back_populates="social_aspects")

# Professor and Class-Related Tables
class Professor(SQLModel, table=True):
    professor_id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    email: str
    
    classes: List["Class"] = Relationship(back_populates="professor")

class Class(SQLModel, table=True):
    class_id: Optional[int] = Field(default=None, primary_key=True)
    professor_id: int = Field(foreign_key="professor.professor_id")
    class_name: str
    semester: str
    year: int
    proficiency_level: str
    
    professor: Professor = Relationship(back_populates="classes")
    students: List["StudentClass"] = Relationship(back_populates="class_")
    homework_templates: List["HomeworkTemplate"] = Relationship(back_populates="class_")
    activity_templates: List["ActivityTemplate"] = Relationship(back_populates="class_")
    interview_template: Optional["InterviewTemplate"] = Relationship(back_populates="class_")

class StudentClass(SQLModel, table=True):
    student_id: int = Field(foreign_key="student.student_id", primary_key=True)
    class_id: int = Field(foreign_key="class.class_id", primary_key=True)
    enrollment_date: date
    
    student: Student = Relationship(back_populates="classes")
    class_: Class = Relationship(back_populates="students")

# Interview-Related Tables
class InterviewTemplate(SQLModel, table=True):
    template_id: Optional[int] = Field(default=None, primary_key=True)
    class_id: int = Field(foreign_key="class.class_id")
    template_name: str
    questions: Dict[str, Any]
    instructions: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class_: Class = Relationship(back_populates="interview_template")
    interviews: List["Interview"] = Relationship(back_populates="template")

class Interview(SQLModel, table=True):
    interview_id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="student.student_id")
    class_id: int = Field(foreign_key="class.class_id")
    template_id: int = Field(foreign_key="interviewtemplate.template_id")
    interview_date: date
    transcript: str
    parsed_data: Dict[str, Any]
    interview_status: str
    parsing_status: str
    
    student: Student = Relationship(back_populates="interviews")
    template: InterviewTemplate = Relationship(back_populates="interviews")

# Homework and Activity-Related Tables
class HomeworkTemplate(SQLModel, table=True):
    template_id: Optional[int] = Field(default=None, primary_key=True)
    class_id: int = Field(foreign_key="class.class_id")
    name: str
    objective: str
    base_questions: Dict[str, Any]
    due_date: date
    
    class_: Class = Relationship(back_populates="homework_templates")
    personalized_homeworks: List["PersonalizedHomework"] = Relationship(back_populates="template")

class PersonalizedHomework(SQLModel, table=True):
    homework_id: Optional[int] = Field(default=None, primary_key=True)
    template_id: int = Field(foreign_key="homeworktemplate.template_id")
    student_id: int = Field(foreign_key="student.student_id")
    personalized_questions: Dict[str, Any]
    generated_at: datetime = Field(default_factory=datetime.utcnow)
    generation_status: str
    
    template: HomeworkTemplate = Relationship(back_populates="personalized_homeworks")
    student: Student = Relationship(back_populates="personalized_homeworks")

class ActivityTemplate(SQLModel, table=True):
    template_id: Optional[int] = Field(default=None, primary_key=True)
    class_id: int = Field(foreign_key="class.class_id")
    name: str
    objective: str
    base_conversation_template: Dict[str, Any]
    
    class_: Class = Relationship(back_populates="activity_templates")
    personalized_activities: List["PersonalizedActivity"] = Relationship(back_populates="template")
    activity_groups: List["ActivityGroup"] = Relationship(back_populates="activity_template")

class PersonalizedActivity(SQLModel, table=True):
    activity_id: Optional[int] = Field(default=None, primary_key=True)
    template_id: int = Field(foreign_key="activitytemplate.template_id")
    student_id: int = Field(foreign_key="student.student_id")
    personalized_conversation: Dict[str, Any]
    generated_at: datetime = Field(default_factory=datetime.utcnow)
    generation_status: str
    
    template: ActivityTemplate = Relationship(back_populates="personalized_activities")
    student: Student = Relationship(back_populates="personalized_activities")

class ActivityGroup(SQLModel, table=True):
    group_id: Optional[int] = Field(default=None, primary_key=True)
    activity_template_id: int = Field(foreign_key="activitytemplate.template_id")
    student_id_1: int = Field(foreign_key="student.student_id")
    student_id_2: int = Field(foreign_key="student.student_id")
    completion_date: date
    
    activity_template: ActivityTemplate = Relationship(back_populates="activity_groups")
    student: Student = Relationship(back_populates="activity_groups") 