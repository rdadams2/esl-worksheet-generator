# ESL Worksheet Generator

A FastAPI-based application for generating personalized ESL worksheets based on student interviews and profiles.

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

- Python 3.10 or higher
- PostgreSQL 14 or higher
- `uv` package installer (faster alternative to pip)

## Installation

1. Install `uv`:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

2. Clone the repository:
```bash
git clone https://github.com/yourusername/esl-worksheet-generator.git
cd esl-worksheet-generator
```

3. Create and activate a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Unix/macOS
# OR
.venv\Scripts\activate  # On Windows
```

4. Install dependencies using uv:
```bash
cd backend
uv pip install -e .
```

## Database Setup

1. Create a PostgreSQL database:
```bash
createdb esl_worksheet
```

2. Set up environment variables (create a `.env` file in the `backend` directory):
```env
DATABASE_URL=postgresql://postgres:postgres@localhost/esl_worksheet
AI_SERVICE_URL=https://api.openai.com/v1
AI_SERVICE_KEY=your-api-key-here
PDF_SERVICE_URL=http://localhost:8001
STORAGE_PATH=./storage
```

3. Run database migrations:
```bash
cd backend
alembic upgrade head
```

## Running the Application

1. Start the FastAPI server:
```bash
cd backend
PYTHONPATH=$PWD python run.py
```

The server will start at http://127.0.0.1:8001 with auto-reload enabled.

## API Documentation

- Interactive API documentation: http://127.0.0.1:8001/docs
- OpenAPI schema: http://127.0.0.1:8001/openapi.json

## Available Endpoints

### Student Management
- `GET /students/`: List all students
- `GET /students/{student_id}`: Get detailed student information
- `GET /students/{student_id}/interviews`: Get student interviews

### Transcription Processing
- `POST /transcriptions/`: Process interview transcriptions

### Worksheet Management
- `POST /worksheets/upload/`: Upload worksheet templates
- `POST /worksheets/generate/{student_id}`: Generate personalized worksheets

## Testing

1. Create test data:
```bash
cd backend
PYTHONPATH=$PWD python create_test_data.py
```

2. Test the API:
```bash
# Get all students
curl http://127.0.0.1:8001/students/

# Get specific student
curl http://127.0.0.1:8001/students/1

# Get student interviews
curl http://127.0.0.1:8001/students/1/interviews
```

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── main.py            # FastAPI application
│   │   ├── routes/            # Route handlers
│   │   └── models/            # API models
│   ├── services/              # Business logic
│   │   ├── student_extractor.py
│   │   ├── worksheet_extractor.py
│   │   ├── content_generator.py
│   │   └── pdf_generator.py
│   ├── db/                    # Database
│   │   ├── database.py        # Database configuration
│   │   └── models.py          # SQLModel models
│   └── core/                  # Core functionality
│       ├── config.py          # Settings
│       └── dependencies.py     # Dependencies
├── migrations/                # Alembic migrations
├── tests/                     # Test files
└── run.py                     # Application entry point
```

## Development

- The application uses FastAPI for the web framework
- SQLModel for the ORM
- Alembic for database migrations
- Pydantic for data validation
- PostgreSQL for the database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- spaCy for providing excellent NLP capabilities
- FastAPI for the modern Python web framework
- React team for the frontend framework
