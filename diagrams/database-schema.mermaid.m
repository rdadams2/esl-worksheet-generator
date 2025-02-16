---
config:
  theme: dark
---
erDiagram


    STUDENT ||--o{ STUDENT_CLASS : enrolled_in
    STUDENT ||--|| INTERVIEW : has
    STUDENT ||--|| BASIC_INFORMATION : has
    STUDENT ||--|| PROFESSIONAL_BACKGROUND : has
    STUDENT ||--|| PERSONAL_BACKGROUND : has
    STUDENT ||--o{ INTEREST_HOBBY : has
    STUDENT ||--|| LEARNING_CONTEXT : has
    STUDENT ||--|| CULTURAL_ELEMENTS : has
    STUDENT ||--|| SOCIAL_ASPECTS : has
    PROFESSOR ||--o{ CLASS : teaches
    CLASS ||--o{ STUDENT_CLASS : contains
    CLASS ||--o{ HOMEWORK_TEMPLATE : has
    CLASS ||--o{ ACTIVITY_TEMPLATE : has
    CLASS ||--|| INTERVIEW_TEMPLATE : has
    INTERVIEW_TEMPLATE ||--o{ INTERVIEW : based_on
    STUDENT ||--o{ PERSONALIZED_HOMEWORK : receives
    STUDENT ||--o{ PERSONALIZED_ACTIVITY : receives
    HOMEWORK_TEMPLATE ||--o{ PERSONALIZED_HOMEWORK : generates
    ACTIVITY_TEMPLATE ||--o{ PERSONALIZED_ACTIVITY : generates
    ACTIVITY_TEMPLATE ||--o{ ACTIVITY_GROUP : has
    STUDENT ||--o{ ACTIVITY_GROUP : participates_in

    INTERVIEW_TEMPLATE {
        int template_id PK
        int class_id FK
        string template_name
        json questions
        text instructions
        datetime created_at
        datetime updated_at
    }

    INTERVIEW {
        int interview_id PK
        int student_id FK
        int class_id FK
        int template_id FK
        date interview_date
        text transcript
        json parsed_data
        string interview_status
        string parsing_status
    }
    
    STUDENT {
        int student_id PK
        string profile_image_url
        string first_name
        string last_name
        string proficiency_level
        datetime created_at
        datetime updated_at
    }

    BASIC_INFORMATION {
        int basic_info_id PK
        int student_id FK
        date date_of_birth
        string email
        string phone
        string native_language
        string current_address
    }

    PROFESSIONAL_BACKGROUND {
        int prof_background_id PK
        int student_id FK
        string current_occupation
        string company
        string industry
        text work_responsibilities
        int years_of_experience
        string education_level
    }

    PERSONAL_BACKGROUND {
        int personal_background_id PK
        int student_id FK
        string hometown
        string country_of_origin
        text family_background
        text life_experiences
        text personal_goals
    }

    INTEREST_HOBBY {
        int interest_id PK
        int student_id FK
        string category
        string name
        text description
        int experience_years
        string frequency
    }

    LEARNING_CONTEXT {
        int learning_context_id PK
        int student_id FK
        text learning_goals
        text preferred_learning_style
        text previous_language_experience
        text challenges
        text strengths
        text areas_for_improvement
    }

    CULTURAL_ELEMENTS {
        int cultural_elements_id PK
        int student_id FK
        text cultural_background
        text traditions
        text value_systems
        text cultural_practices
        text dietary_preferences
    }

    SOCIAL_ASPECTS {
        int social_aspects_id PK
        int student_id FK
        text communication_style
        text group_work_preference
        text social_interests
        text community_involvement
        text interaction_preferences
    }
    PROFESSOR {
        int professor_id PK
        string first_name
        string last_name
        string email
    }
    CLASS {
        int class_id PK
        int professor_id FK
        string class_name
        string semester
        int year
        string proficiency_level
    }
    STUDENT_CLASS {
        int student_id FK
        int class_id FK
        date enrollment_date
    }
    HOMEWORK_TEMPLATE {
        int template_id PK
        int class_id FK
        string name
        string objective
        json base_questions
        date due_date
    }
    PERSONALIZED_HOMEWORK {
        int homework_id PK
        int template_id FK
        int student_id FK
        json personalized_questions
        datetime generated_at
        string generation_status
    }
    ACTIVITY_TEMPLATE {
        int template_id PK
        int class_id FK
        string name
        string objective
        json base_conversation_template
    }
    PERSONALIZED_ACTIVITY {
        int activity_id PK
        int template_id FK
        int student_id FK
        json personalized_conversation
        datetime generated_at
        string generation_status
    }
    ACTIVITY_GROUP {
        int group_id PK
        int activity_template_id FK
        int student_id_1 FK
        int student_id_2 FK
        date completion_date
    }
