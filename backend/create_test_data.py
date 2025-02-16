from app.db.models import Student, BasicInformation
from sqlmodel import Session
from app.db.database import engine
from datetime import date

def create_test_data():
    with Session(engine) as session:
        # Create a test student
        student = Student(
            first_name="John",
            last_name="Doe",
            proficiency_level="Intermediate"
        )
        session.add(student)
        session.commit()
        session.refresh(student)
        
        # Add basic information
        basic_info = BasicInformation(
            student_id=student.student_id,
            date_of_birth=date(1990, 1, 1),
            email="john.doe@example.com",
            phone="+1-555-555-5555",
            native_language="Spanish",
            current_address="123 Main St, Anytown, USA"
        )
        session.add(basic_info)
        session.commit()
        print(f"Created student with ID: {student.student_id}")

if __name__ == "__main__":
    create_test_data() 