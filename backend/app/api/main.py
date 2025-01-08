from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any
import spacy

from app.db.database import get_db
from app.db.models import Student as DBStudent, Conversation as DBConversation
from app.api.models.student import Student, StudentCreate, Conversation, ConversationCreate
from app.services.conversation_analyzer import ConversationAnalyzer

app = FastAPI(title="ESL Worksheet Generator API")

# Initialize the conversation analyzer
analyzer = ConversationAnalyzer()

@app.post("/analyze-text/", response_model=Dict[str, Any])
async def analyze_text(text: str):
    """Analyze text and extract information without creating a conversation"""
    try:
        analysis_result = analyzer.analyze_transcription(text)
        return analysis_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/students/", response_model=Student)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    db_student = DBStudent(**student.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

@app.get("/students/", response_model=List[Student])
def get_students(skip: int = 0, limit: int = 100, search: str = "", db: Session = Depends(get_db)):
    query = db.query(DBStudent)
    if search:
        query = query.filter(DBStudent.name.ilike(f"%{search}%"))
    students = query.offset(skip).limit(limit).all()
    return students

@app.get("/students/{student_id}", response_model=Student)
def get_student(student_id: str, db: Session = Depends(get_db)):
    student = db.query(DBStudent).filter(DBStudent.id == student_id).first()
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@app.put("/students/{student_id}", response_model=Student)
def update_student(student_id: str, student_update: Dict[str, Any], db: Session = Depends(get_db)):
    student = db.query(DBStudent).filter(DBStudent.id == student_id).first()
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    
    for key, value in student_update.items():
        if hasattr(student, key):
            setattr(student, key, value)
    
    db.commit()
    db.refresh(student)
    return student

@app.post("/conversations/", response_model=Conversation)
async def create_conversation(conversation: ConversationCreate, db: Session = Depends(get_db)):
    # First, analyze the conversation
    analysis_result = analyzer.analyze_transcription(conversation.transcription)
    
    # Create the conversation record
    db_conversation = DBConversation(**conversation.dict())
    db.add(db_conversation)
    
    # Update or create student profile with extracted information
    student = db.query(DBStudent).filter(DBStudent.id == conversation.student_id).first()
    if student:
        # Update existing student with new information
        for key, value in analysis_result.items():
            if value is not None:  # Only update if we found a value
                setattr(student, key, value)
    
    db.commit()
    db.refresh(db_conversation)
    return db_conversation

@app.get("/conversations/{student_id}", response_model=List[Conversation])
def get_student_conversations(student_id: str, db: Session = Depends(get_db)):
    conversations = db.query(DBConversation).filter(DBConversation.student_id == student_id).all()
    return conversations 