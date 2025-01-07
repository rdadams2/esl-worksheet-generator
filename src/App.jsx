import React from 'react';
import ConversationGuide from './components/ConversationGuide';
import StudentForm from './components/StudentForm';
import { StudentProfile } from './components/StudentProfile';

// Demo student data
const demoStudent = {
  name: "Maria González",
  gender: "Female",
  age_range: "25-30",
  native_language: "Spanish",
  other_languages: ["Portuguese"],
  english_level: "intermediate",
  job_title: "Software Developer",
  job_description: "Full-stack developer at a tech startup",
  industry: "Technology",
  years_of_experience: 3,
  work_environment: "hybrid",
  hometown: "Mexico City, Mexico",
  current_city: "San Francisco, USA",
  years_in_current_country: 2,
  family_status: "Single",
  living_situation: "Shared apartment",
  interests: ["Technology", "Photography", "Travel"],
  hobbies: ["Hiking", "Cooking", "Reading"],
  favorite_activities: ["Beach trips", "City exploration", "Coffee shop hopping"],
  sports: ["Yoga", "Swimming"],
  reason_for_learning: "Career advancement and daily life in the US",
  english_usage_context: ["Work meetings", "Daily life", "Social situations"],
  learning_goals: ["Improve professional communication", "Reduce accent", "Build confidence"],
  preferred_learning_style: ["Visual", "Interactive"],
  favorite_foods: ["Tacos", "Sushi", "Pizza"],
  travel_experience: ["Mexico", "USA", "Brazil", "Spain"],
  cultural_interests: ["International movies", "World music", "Different cuisines"],
  music_preferences: ["Latin pop", "Rock", "Jazz"],
  communication_style: "Enthusiastic and engaging",
  group_work_preference: true,
  social_interests: ["Meeting new people", "Cultural exchange", "Language meetups"]
};

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <h1 className="text-2xl font-semibold">ESL Worksheet Generator Demo</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid gap-8 md:gap-12">
          {/* Student Interview Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">New Student Interview</h2>
            </div>
            <div className="w-full">
              <StudentForm />
            </div>
          </section>

          {/* Conversation Guide Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">Teacher's Conversation Guide</h2>
            </div>
            <div className="w-full">
              <ConversationGuide />
            </div>
          </section>

          {/* Student Profile Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">Student Profile Preview</h2>
            </div>
            <div className="w-full">
              <StudentProfile 
                student={demoStudent}
                profileImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
              />
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t bg-background">
        <div className="container mx-auto py-4 text-center text-sm text-muted-foreground">
          <p>ESL Worksheet Generator Demo - Built with React and ShadcnUI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
