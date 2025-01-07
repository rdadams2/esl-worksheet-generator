import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type SubGuide = {
  title: string;
  questions: string[];
};

type Guide = {
  title: string;
  description: string;
  questions?: string[];
  subGuides?: {
    [key: string]: SubGuide;
  };
};

type Guides = {
  latinAmerica: Guide & {
    subGuides: {
      [key: string]: SubGuide;
    };
  };
  casual: Guide & { questions: string[] };
  professional: Guide & { questions: string[] };
  cultural: Guide & { questions: string[] };
};

const ConversationGuide = () => {
  const [selectedGuide, setSelectedGuide] = useState<keyof Guides>('casual');
  const [selectedSubGuide, setSelectedSubGuide] = useState<string>('general');

  const guides: Guides = {
    latinAmerica: {
      title: "Latin American Cultural Connection",
      description: "Culturally attuned conversation starters for Latin American students",
      subGuides: {
        general: {
          title: "General Latin American",
          questions: [
            "¡Bienvenido/a! What part of Latin America are you from?",
            "What's your favorite local celebration or festival from your hometown?",
            "Do you find any similarities between your hometown and this city?",
            "What foods from home do you miss the most?",
            "Do you have family members who have studied English before?",
            "What kind of music do you enjoy? Do you like regional music?",
            "Have you found any good Latin American restaurants or markets here?",
            "What's the biggest difference in daily life here compared to home?",
            "Do you stay in touch with family through video calls?",
            "What work or study experience do you have from back home?"
          ]
        },
        mexico: {
          title: "Mexican Cultural Connection",
          questions: [
            "¡Bienvenido/a! Which state in Mexico are you from?",
            "Is your hometown more of a ciudad or pueblo? What's it known for?",
            "What's your favorite regional dish from your state?",
            "Did you grow up speaking any indigenous languages?",
            "What kind of work did you do in Mexico?",
            "What's your favorite time of year back home? Any special celebrations?",
            "Have you found places here that remind you of Mexico?",
            "Do you follow soccer? Which team do you support?",
            "What do you usually do on Sundays? Is it different here?",
            "Have you found any good Mexican markets or restaurants here?"
          ]
        },
        professional: {
          title: "Latin American Professional",
          questions: [
            "What type of work did you do back home?",
            "How different is your industry here compared to back home?",
            "Did you study at a university? What was your field?",
            "What kind of English skills would help most in your work?",
            "Do you work with other Spanish speakers here?",
            "What's the biggest difference in workplace culture?",
            "Are you planning to continue in the same field here?",
            "What professional goals do you have for the next few years?",
            "Do you need specific technical vocabulary for your work?",
            "How do business meetings here compare to back home?"
          ]
        }
      }
    },
    casual: {
      title: "Friendly Casual Conversation",
      description: "A relaxed, informal approach focusing on building rapport",
      questions: [
        "Hi! I'm [teacher's name]. What should I call you?",
        "How are you finding the weather here compared to your hometown?",
        "What brings you to our English class?",
        "What kind of work do you do? Do you enjoy it?",
        "What do you like to do when you're not working?",
        "Have you traveled much? Where have you been?",
        "What's your favorite thing about living here?",
        "What kind of food do you like?",
        "Do you have any hobbies or interests you'd like to share?",
        "What do you hope to learn in this class?"
      ]
    },
    professional: {
      title: "Professional Focus",
      description: "Emphasis on work-related English needs",
      questions: [
        "Welcome to our class. Could you introduce yourself?",
        "What industry do you work in?",
        "Could you tell me about your role and responsibilities?",
        "How often do you use English in your work?",
        "What types of English communication do you need most?",
        "Do you have specific work-related English goals?",
        "Have you taken English classes before?",
        "What challenges do you face with English at work?",
        "Do you work with international teams?",
        "What skills would help you most in your career?"
      ]
    },
    cultural: {
      title: "Cultural Exchange",
      description: "Focus on cultural background and adaptation",
      questions: [
        "Welcome! I'd love to learn about where you're from.",
        "How long have you been living here?",
        "What's the biggest difference between here and your hometown?",
        "What languages do you speak?",
        "What's your favorite traditional food from your country?",
        "Do you keep in touch with family back home?",
        "What cultural activities do you enjoy?",
        "Have you traveled to many countries?",
        "What's something unique about your culture?",
        "What aspects of local culture interest you?"
      ]
    }
  };

  const currentGuide = guides[selectedGuide];
  const questions = selectedGuide === 'latinAmerica' 
    ? guides.latinAmerica.subGuides[selectedSubGuide].questions
    : currentGuide.questions;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conversation Guide Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <RadioGroup
              value={selectedGuide}
              onValueChange={(value) => setSelectedGuide(value as keyof Guides)}
              className="space-y-4"
            >
              {Object.entries(guides).map(([key, guide]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={key} id={key} />
                  <Label htmlFor={key} className="font-medium">
                    {guide.title}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {selectedGuide === 'latinAmerica' && (
              <div className="mt-4 border-t pt-4">
                <label className="text-sm font-medium mb-2 block">Choose Specific Guide:</label>
                <RadioGroup
                  value={selectedSubGuide}
                  onValueChange={setSelectedSubGuide}
                  className="space-y-2"
                >
                  {Object.entries(guides.latinAmerica.subGuides).map(([key, guide]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <RadioGroupItem value={key} id={`sub-${key}`} />
                      <Label htmlFor={`sub-${key}`} className="font-medium">
                        {guide.title}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>
            {selectedGuide === 'latinAmerica'
              ? guides.latinAmerica.subGuides[selectedSubGuide].title 
              : currentGuide.title}
          </CardTitle>
          <p className="text-sm text-gray-600">
            {currentGuide.description}
          </p>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <ol className="space-y-4">
              {questions.map((question, index) => (
                <li key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg">{question}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {getPromptTip(question)}
                  </p>
                </li>
              ))}
            </ol>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to provide tips for the teacher
const getPromptTip = (question: string): string => {
  if (question.includes("work")) {
    return "Listen for job title, industry, and work environment";
  }
  if (question.includes("hobby") || question.includes("interests")) {
    return "Note specific activities and enthusiasm levels";
  }
  if (question.includes("traveled")) {
    return "Record countries visited and travel experiences";
  }
  if (question.includes("food")) {
    return "Note cultural preferences and dietary considerations";
  }
  return "Listen for details that could help personalize future lessons";
};

export default ConversationGuide; 