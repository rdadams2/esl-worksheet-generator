"""Student information extraction service.

This module handles the extraction of student information from interview transcriptions.
"""

from typing import Dict, Any
import httpx
from sqlmodel import Session

from app.db.models import (
    Student, BasicInformation, ProfessionalBackground, PersonalBackground,
    InterestHobby, LearningContext, CulturalElements, SocialAspects
)

class StudentExtractionService:
    """Service for extracting student information from transcriptions."""

    def __init__(self, ai_service_url: str, ai_service_key: str):
        """Initialize the service.
        
        Args:
            ai_service_url: URL for the AI service
            ai_service_key: API key for the AI service
        """
        self.ai_service_url = ai_service_url
        self.ai_service_key = ai_service_key
        self.headers = {"Authorization": f"Bearer {ai_service_key}"}

    async def process_transcription(self, transcription: str) -> Dict[str, Any]:
        """Process a transcription to extract student information.
        
        Args:
            transcription: Interview transcription text
            
        Returns:
            Dict[str, Any]: Extracted student information
        """
        # Call AI service to extract information
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.ai_service_url}/chat/completions",
                headers=self.headers,
                json={
                    "model": "gpt-4-turbo-preview",
                    "messages": [
                        {
                            "role": "system",
                            "content": "You are an expert at extracting structured student information from interview transcripts."
                        },
                        {
                            "role": "user",
                            "content": f"Extract student information from this interview transcript: {transcription}"
                        }
                    ],
                    "response_format": {"type": "json_object"}
                }
            )
            
            if response.status_code != 200:
                raise Exception("Failed to process transcription with AI service")
                
            extracted_data = response.json()["choices"][0]["message"]["content"]
            
            return extracted_data

    async def save_student_info(self, session: Session, extracted_data: Dict[str, Any]) -> Student:
        """Save extracted student information to the database.
        
        Args:
            session: Database session
            extracted_data: Extracted student information
            
        Returns:
            Student: Created student record
        """
        # Create student record
        student = Student(
            first_name=extracted_data["first_name"],
            last_name=extracted_data["last_name"],
            proficiency_level=extracted_data["proficiency_level"]
        )
        session.add(student)
        session.flush()  # Get student_id

        # Create related records
        if "basic_info" in extracted_data:
            basic_info = BasicInformation(
                student_id=student.student_id,
                **extracted_data["basic_info"]
            )
            session.add(basic_info)

        if "professional_background" in extracted_data:
            prof_background = ProfessionalBackground(
                student_id=student.student_id,
                **extracted_data["professional_background"]
            )
            session.add(prof_background)

        if "personal_background" in extracted_data:
            personal_background = PersonalBackground(
                student_id=student.student_id,
                **extracted_data["personal_background"]
            )
            session.add(personal_background)

        # Add interests and hobbies
        for interest in extracted_data.get("interests_hobbies", []):
            interest_hobby = InterestHobby(
                student_id=student.student_id,
                **interest
            )
            session.add(interest_hobby)

        if "learning_context" in extracted_data:
            learning_context = LearningContext(
                student_id=student.student_id,
                **extracted_data["learning_context"]
            )
            session.add(learning_context)

        if "cultural_elements" in extracted_data:
            cultural_elements = CulturalElements(
                student_id=student.student_id,
                **extracted_data["cultural_elements"]
            )
            session.add(cultural_elements)

        if "social_aspects" in extracted_data:
            social_aspects = SocialAspects(
                student_id=student.student_id,
                **extracted_data["social_aspects"]
            )
            session.add(social_aspects)

        session.commit()
        return student
