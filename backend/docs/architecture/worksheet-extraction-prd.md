# Worksheet Information Extraction Service
## Product Requirements Document (PRD)
Version 1.0 | February 15, 2025

## 1. Overview
### 1.1 Product Description
The Worksheet Information Extraction Service is designed to process PDF worksheets and assignments uploaded by professors, extracting structured content that can be used as templates for AI-generated personalized assignments.

### 1.2 Problem Statement
Professors need a way to convert their existing worksheet PDFs into a format that can be used as templates for generating personalized assignments. Manual conversion is time-consuming and prone to errors.

### 1.3 Business Goals
- Streamline the process of digitizing existing teaching materials
- Create a standardized template database for AI-driven personalization
- Reduce manual effort in preparing materials for personalization
- Enable consistent formatting across all worksheets

## 2. Target Users
### 2.1 Primary Users
- Professors who want to convert existing worksheets
- Teaching assistants who help prepare materials
- Administrative staff who manage course content

### 2.2 User Pain Points
- Time-consuming manual digitization of worksheets
- Inconsistent formatting when converting materials
- Difficulty in organizing and managing worksheet templates
- Need to maintain original formatting while enabling personalization

## 3. Functional Requirements

### 3.1 Core Features

#### PDF Processing
- Accept PDF uploads up to 20MB
- Extract text content while preserving structure
- Identify and extract:
  - Questions
  - Instructions
  - Exercise sections
  - Answer spaces
  - Supporting text
- Maintain relationship between related content (e.g., questions and their subparts)

#### Content Analysis
- Identify question types:
  - Multiple choice
  - Fill in the blank
  - Short answer
  - Essay
  - Matching
  - True/False
- Extract metadata:
  - Difficulty level indicators
  - Topic tags
  - Time estimates
  - Point values

#### Template Generation
- Convert extracted content into structured templates
- Store templates in HomeworkTemplate or ActivityTemplate tables
- Preserve formatting instructions for PDF generation
- Support template versioning

### 3.2 Technical Requirements

#### PDF Processing Components
- PDF text extraction engine
- Layout analysis system
- Content classification module
- Template formatter

#### Integration Requirements
- Store extracted templates in database using SQLModel schema
- Connect with existing Class and Professor tables
- Support bulk template creation
- Enable template updates and versioning

## 4. Technical Architecture

### 4.1 System Components
```
[PDF Upload] → [Text Extraction] → [Layout Analysis] → [Content Classification] → [Template Generator]
                                          ↓
                                  [Database Storage]
```

### 4.2 Data Flow
1. Professor uploads PDF worksheet
2. System extracts text and structural elements
3. Content is analyzed and classified
4. Template is generated and validated
5. Template is stored in database
6. Return template ID and status

### 4.3 Database Integration
Utilizes the following tables:
- HomeworkTemplate
- ActivityTemplate
- Class
- Professor

## 5. User Interface

### 5.1 API Endpoints

#### Upload Worksheet
```
POST /api/v1/worksheets/upload
Content-Type: multipart/form-data

{
  "pdf_file": "binary",
  "class_id": "integer",
  "template_type": "homework|activity",
  "name": "string",
  "objective": "string"
}
```

#### Get Template Status
```
GET /api/v1/worksheets/template/{template_id}
```

#### Update Template
```
PUT /api/v1/worksheets/template/{template_id}
Content-Type: application/json

{
  "name": "string",
  "objective": "string",
  "content": {}
}
```

### 5.2 Response Formats
```json
{
  "status": "success|processing|failed",
  "template_id": "string",
  "template_type": "homework|activity",
  "extracted_content": {
    "questions": [],
    "instructions": "",
    "metadata": {},
    "formatting": {}
  },
  "errors": []
}
```

## 6. Error Handling

### 6.1 Error Categories
- PDF Processing Errors
- Content Extraction Errors
- Template Generation Errors
- Database Errors

### 6.2 Error Responses
- Clear error messages
- Specific error codes
- Suggested resolutions
- Processing status updates

## 7. Timeline and Milestones

### 7.1 Development Phases
1. Phase 1 (Weeks 1-2):
   - PDF processing implementation
   - Basic text extraction
   - Database integration

2. Phase 2 (Weeks 3-4):
   - Content classification
   - Template generation
   - API development

3. Phase 3 (Weeks 5-6):
   - UI integration
   - Error handling
   - Documentation

### 7.2 Dependencies
- PDF processing library selection
- Database schema implementation
- Template format specification
- Content classification rules

## 8. Success Metrics

### 8.1 Technical Metrics
- Successful extraction rate > 90%
- Template generation accuracy > 95%
- Content classification accuracy > 85%

### 8.2 Business Metrics
- Reduction in template creation time
- Increased number of digitized worksheets
- Positive feedback from professors
- Template reuse rate

## 9. Appendix

### 9.1 Glossary
- Template: Structured format of a worksheet used for personalization
- Content Classification: Process of identifying different types of questions and content
- Layout Analysis: Process of understanding the structure and organization of a worksheet

### 9.2 Template Format Example
```json
{
  "template_type": "homework",
  "sections": [
    {
      "type": "instructions",
      "content": "Complete the following exercises...",
      "formatting": {}
    },
    {
      "type": "question",
      "question_type": "multiple_choice",
      "content": "What is the capital of France?",
      "options": ["Paris", "London", "Berlin", "Madrid"],
      "metadata": {
        "points": 5,
        "difficulty": "easy"
      }
    }
  ]
}
```
