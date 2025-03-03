/**
 * Student type definition
 * 
 * This type represents a student profile in the ESL Worksheet Generator application.
 */
export interface Student {
  // Basic Information
  name: string;
  gender: string;
  age_range: string;
  native_language: string;
  other_languages: string[];
  english_level: string;
  
  // Professional Information
  job_title?: string;
  job_description?: string;
  industry?: string;
  years_of_experience?: number;
  work_environment?: string;
  
  // Personal Information
  hometown?: string;
  current_city?: string;
  years_in_current_country?: number;
  family_status?: string;
  living_situation?: string;
  
  // Interests and Activities
  interests?: string[];
  hobbies?: string[];
  favorite_activities?: string[];
  sports?: string[];
  
  // Learning Context
  reason_for_learning?: string;
  english_usage_context?: string[];
  learning_goals?: string[];
  preferred_learning_style?: string[];
  
  // Cultural and Social Aspects
  favorite_foods?: string[];
  travel_experience?: string[];
  cultural_interests?: string[];
  music_preferences?: string[];
  communication_style?: string;
  group_work_preference?: boolean;
  social_interests?: string[];
} 