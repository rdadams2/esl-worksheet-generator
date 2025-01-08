# ESL Worksheet Generator

A modern web application for ESL teachers to track student conversations and automatically generate personalized worksheets based on natural language processing of conversation transcripts.

## Features

- 👤 Student Profile Management
  - Comprehensive student information tracking
  - Personal and professional background storage
  - Learning preferences and goals tracking

- 🎙️ Conversation Analysis
  - Automatic information extraction from conversations
  - Natural language processing using spaCy
  - Intelligent pattern matching for student details

- 🔍 Smart Search & Filtering
  - Search through student profiles
  - Filter conversations by various criteria
  - Easy access to historical data

## Tech Stack

### Backend
- FastAPI (Python web framework)
- SQLAlchemy (ORM)
- PostgreSQL (Database)
- spaCy (Natural Language Processing)

### Frontend
- React with TypeScript
- Modern UI components
- Responsive design

## Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- pnpm (for package management)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/esl-worksheet-generator.git
cd esl-worksheet-generator
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_lg
```

3. Set up the database:
```bash
# Create PostgreSQL database
createdb esl_worksheet
```

4. Set up the frontend:
```bash
cd ../
pnpm install
```

## Configuration

1. Database configuration (backend/app/db/database.py):
```python
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost/esl_worksheet"
```

## Running the Application

1. Start the backend server:
```bash
cd backend
uvicorn app.api.main:app --reload
```

2. Start the frontend development server:
```bash
pnpm dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## API Endpoints

### Students
- `POST /students/` - Create a new student profile
- `GET /students/` - List all students
- `GET /students/{student_id}` - Get specific student details
- `PUT /students/{student_id}` - Update student information

### Conversations
- `POST /conversations/` - Create a new conversation record
- `GET /conversations/{student_id}` - Get student's conversation history
- `POST /analyze-text/` - Analyze conversation text without saving

## Development

### Project Structure
```
.
├── backend/
│   ├── app/
│   │   ├── api/           # API endpoints and routing
│   │   ├── db/            # Database models and configuration
│   │   └── services/      # Business logic and services
│   └── requirements.txt
├── src/
│   ├── components/        # React components
│   └── App.jsx           # Main application component
└── README.md
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- spaCy for providing excellent NLP capabilities
- FastAPI for the modern Python web framework
- React team for the frontend framework
