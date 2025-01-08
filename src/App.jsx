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
    <div className="min-h-screen bg-[#f0f4f8]">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <h1 className="text-2xl font-semibold text-[#1a365d]">ESL Worksheet Generator</h1>
        </div>
      </header>

      <main className="container mx-auto py-12 px-6">
        <div className="grid gap-12">
          {/* Two Column Layout with Emphasized Guide */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Conversation Guide Section - Wider Column */}
            <section className="md:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#1a365d]">Teacher's Conversation Guide</h2>
              </div>
              <div className="w-full bg-white p-6 rounded-lg border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow duration-300">
                <ConversationGuide />
              </div>
            </section>

            {/* Student Interview Section - Narrower Column with Sticky Positioning */}
            <section className="md:col-span-2 space-y-4">
              <div className="sticky top-20 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-[#1a365d]">New Student Interview</h2>
                </div>
                <div className="w-full bg-white p-6 rounded-lg border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow duration-300">
                  <StudentForm />
                </div>
              </div>
            </section>
          </div>

          {/* Student Profile Section - Full Width */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#1a365d]">Student Profile Preview</h2>
            </div>
            <div className="w-full bg-white p-6 rounded-lg border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow duration-300">
              <StudentProfile 
                student={demoStudent}
                profileImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
              />
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="container mx-auto py-6 text-center text-sm text-[#4a5568]">
          <p>ESL Worksheet Generator - A Professional Tool for Language Educators</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
