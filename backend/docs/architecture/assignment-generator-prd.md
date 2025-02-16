# Activity/Homework Assignment Generator Service
## Product Requirements Document (PRD)
Version 1.0 | February 15, 2025

## 1. Overview
### 1.1 Product Description
The Assignment Generator Service creates personalized homework assignments and activities by combining extracted student information with worksheet templates. The service maintains the original structure and format of assignments while customizing content based on student interests, proficiency, and background.

### 1.2 Problem Statement
Professors need to create personalized assignments that maintain consistent formatting with their original materials while incorporating student-specific elements. Manual personalization is time-consuming and doesn't scale.

### 1.3 Business Goals
- Automate assignment personalization while maintaining formatting
- Leverage student information for meaningful customization
- Ensure consistent quality across generated assignments
- Reduce time spent on assignment creation
- Scale personalized learning effectively

## 2. Target Users
### 2.1 Primary Users
- Professors creating assignments
- Teaching assistants managing coursework
- Students receiving personalized assignments

### 2.2 User Pain Points
- Time-consuming manual personalization
- Inconsistent assignment quality
- Difficulty maintaining original assignment structure
- Challenge of incorporating student interests effectively
- Need to ensure appropriate difficulty levels

## 3. Functional Requirements

### 3.1 Core Features

#### Template Processing
- Load assignment templates from HomeworkTemplate/ActivityTemplate tables
- Parse template structure and requirements
- Identify customization points within templates
- Maintain original formatting and layout
- Support different question types:
  - Multiple choice
  - Fill in the blank
  - Short answer
  - Essay
  - Matching
  - True/False

#### Student Data Integration
- Access student information from database:
  - Interests and hobbies
  - Professional background
  - Cultural elements
  - Learning context
  - Proficiency level
- Map student attributes to relevant template sections
- Consider language proficiency in content generation

#### AI Integration
- Connect with AI service (OpenAI, Grok, etc.)
- Generate personalized content while preserving structure
- Maintain consistent difficulty level
- Ensure generated content fits template format
- Support content regeneration if needed

#### Assignment Storage
- Store generated assignments in database
- Track generation status and history
- Enable assignment updates
- Maintain version control

### 3.2 Technical Requirements

#### Integration Points
- Database connections for:
  - Template retrieval
  - Student data access
  - Assignment storage
- AI service integration
- Error handling and retry logic

#### Content Generation Rules
- Maintain original question structure
- Preserve formatting instructions
- Follow difficulty guidelines
- Respect cultural sensitivities
- Ensure language level appropriateness

## 4. Technical Architecture

### 4.1 System Components
```
[Template Loader] → [Student Data Loader] → [Content Generator] → [Assignment Builder]
         ↓                    ↓                      ↓                     ↓
    [Templates DB]      [Student Info DB]      [AI Service]         [Assignments DB]
```

### 4.2 Data Flow
1. Load assignment template
2. Retrieve relevant student information
3. Identify personalization opportunities
4. Generate customized content via AI
5. Build complete assignment
6. Store in database
7. Return assignment ID and status

### 4.3 Database Integration
Utilizes the following tables:
- HomeworkTemplate
- ActivityTemplate
- PersonalizedHomework
- PersonalizedActivity
- Student (and related tables)

## 5. User Interface

### 5.1 API Endpoints

#### Generate Assignment
```
POST /api/v1/assignments/generate
Content-Type: application/json

{
  "template_id": "integer",
  "student_id": "integer",
  "type": "homework|activity",
  "due_date": "date"
}
```

#### Check Generation Status
```
GET /api/v1/assignments/{assignment_id}/status
```

#### Regenerate Assignment
```
POST /api/v1/assignments/{assignment_id}/regenerate
```

### 5.2 Response Formats
```json
{
  "status": "success|processing|failed",
  "assignment_id": "string",
  "assignment_type": "homework|activity",
  "content": {
    "questions": [],
    "instructions": "",
    "metadata": {}
  },
  "personalization_details": {
    "student_interests_used": [],
    "proficiency_adaptations": [],
    "cultural_elements": []
  },
  "errors": []
}
```

## 6. Error Handling

### 6.1 Error Categories
- Template Processing Errors
- Student Data Access Errors
- AI Generation Errors
- Storage Errors

### 6.2 Error Responses
- Specific error codes and messages
- Detailed error context
- Suggested remediation steps
- Generation status updates

## 7. Timeline and Milestones

### 7.1 Development Phases
1. Phase 1 (Weeks 1-2):
   - Template and student data integration
   - Basic AI service connection
   - Storage implementation

2. Phase 2 (Weeks 3-4):
   - Content generation rules
   - Format preservation
   - API development

3. Phase 3 (Weeks 5-6):
   - Personalization enhancement
   - Error handling
   - Documentation

### 7.2 Dependencies
- Completed template database
- Student information service
- AI service selection and setup
- PDF generation service readiness

## 8. Success Metrics

### 8.1 Technical Metrics
- Assignment generation success rate
- Format preservation accuracy
- Personalization relevance score
- Generation time performance

### 8.2 Business Metrics
- Reduction in assignment creation time
- Student engagement with personalized content
- Professor satisfaction ratings
- Assignment completion rates

## 9. Appendix

### 9.1 Example Personalization
```json
{
  "original_question": {
    "type": "short_answer",
    "content": "Describe your morning routine.",
    "format": "paragraph"
  },
  "personalization_context": {
    "student_occupation": "Software Engineer",
    "interests": ["hiking", "photography"],
    "cultural_background": "Japanese"
  },
  "personalized_question": {
    "type": "short_answer",
    "content": "As a software engineer who enjoys outdoor photography, describe how you would organize your morning routine to capture sunrise photos during your hiking trips.",
    "format": "paragraph"
  }
}
```

### 9.2 Format Preservation Example
```json
{
  "template_structure": {
    "sections": [
      {
        "type": "instructions",
        "style": "bold",
        "indent": "none"
      },
      {
        "type": "questions",
        "numbering": "1.2.3",
        "indent": "standard"
      }
    ]
  },
  "generated_content": {
    "sections": [
      {
        "type": "instructions",
        "content": "Personalized instructions...",
        "style": "bold",
        "indent": "none"
      },
      {
        "type": "questions",
        "content": ["Personalized question 1...", "Personalized question 2..."],
        "numbering": "1.2.3",
        "indent": "standard"
      }
    ]
  }
}
```
