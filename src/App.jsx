import { StudentProfile } from './components/StudentProfile'

const sampleStudent = {
  // Basic Information
  name: "Sarah Chen",
  gender: "Female",
  age_range: "25-30",
  native_language: "Mandarin Chinese",
  other_languages: ["Cantonese"],
  english_level: "intermediate",
  
  // Professional Background
  job_title: "Software Developer",
  job_description: "Full-stack developer working on web applications",
  industry: "Technology",
  years_of_experience: 3,
  work_environment: "hybrid",
  
  // Personal Background
  hometown: "Shanghai",
  current_city: "San Francisco",
  years_in_current_country: 2,
  family_status: "Single",
  living_situation: "Shared apartment",
  
  // Interests & Hobbies
  interests: ["Technology", "Photography", "Travel"],
  hobbies: ["Hiking", "Cooking", "Reading"],
  favorite_activities: ["Weekend photography trips", "Trying new restaurants", "Tech meetups"],
  sports: ["Yoga", "Swimming"],
  
  // Learning Context
  reason_for_learning: "Career advancement and daily communication",
  english_usage_context: ["Work meetings", "Technical documentation", "Social settings"],
  learning_goals: ["Improve presentation skills", "Technical writing", "Business communication"],
  preferred_learning_style: ["Visual", "Interactive", "Practice-based"],
  
  // Cultural Elements
  favorite_foods: ["Dim Sum", "Sushi", "Italian pasta"],
  travel_experience: ["Japan", "Thailand", "Australia"],
  cultural_interests: ["International cinema", "World music", "Different cuisines"],
  music_preferences: ["Pop", "Classical", "Jazz"],
  
  // Social Aspects
  communication_style: "Reserved but friendly",
  group_work_preference: true,
  social_interests: ["International meetups", "Language exchange", "Cultural events"]
}

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <StudentProfile 
        student={sampleStudent}
        profileImage="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
      />
    </div>
  )
}

export default App
