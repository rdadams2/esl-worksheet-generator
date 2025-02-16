"""Service for generating personalized content.

This module handles the generation of personalized content based on student information.
"""

from typing import Dict, Any
import httpx
from sqlmodel import Session

from app.db.models import Student

class ContentGenerationService:
    """Service for generating personalized content."""

    def __init__(self, ai_service_url: str, ai_service_key: str):
        """Initialize the service.
        
        Args:
            ai_service_url: URL for the AI service
            ai_service_key: API key for the AI service
        """
        self.ai_service_url = ai_service_url
        self.ai_service_key = ai_service_key
        self.headers = {"Authorization": f"Bearer {ai_service_key}"}

    async def generate(self, student: Student, template: Dict[str, Any]) -> Dict[str, Any]:
        """Generate personalized content based on student information.
        
        Args:
            student: Student record
            template: Content template
            
        Returns:
            Dict[str, Any]: Generated content
        """
        # Prepare student context
        context = {
            "student": {
                "name": f"{student.first_name} {student.last_name}",
                "proficiency_level": student.proficiency_level,
                "interests": [
                    {"category": h.category, "name": h.name}
                    for h in student.interests_hobbies
                ],
                "learning_context": {
                    "goals": student.learning_context.learning_goals if student.learning_context else None,
                    "style": student.learning_context.preferred_learning_style if student.learning_context else None,
                    "challenges": student.learning_context.challenges if student.learning_context else None
                } if student.learning_context else {}
            },
            "template": template
        }

        # Call AI service to generate content
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.ai_service_url}/chat/completions",
                headers=self.headers,
                json={
                    "model": "gpt-4-turbo-preview",
                    "messages": [
                        {
                            "role": "system",
                            "content": "You are an expert ESL teacher specializing in creating personalized content."
                        },
                        {
                            "role": "user",
                            "content": f"Generate personalized content based on this context: {context}"
                        }
                    ],
                    "response_format": {"type": "json_object"}
                }
            )
            
            if response.status_code != 200:
                raise Exception("Failed to generate content with AI service")
                
            generated_content = response.json()["choices"][0]["message"]["content"]
            
            return generated_content
