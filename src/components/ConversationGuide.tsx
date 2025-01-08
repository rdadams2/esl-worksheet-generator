import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Types for the conversation guide structure
type SubGuide = {
  title: string;
  titleEs: string;
  questions: string[];
  questionsEs: string[];
};

type Guide = {
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  questions?: string[];
  questionsEs?: string[];
  subGuides?: {
    [key: string]: SubGuide;
  };
};

// Main guide structure containing all conversation templates
type Guides = {
  latinAmerica: Guide & {
    subGuides: {
      [key: string]: SubGuide;
    };
  };
  casual: Guide & { questions: string[]; questionsEs: string[] };
  professional: Guide & { questions: string[]; questionsEs: string[] };
  cultural: Guide & { questions: string[]; questionsEs: string[] };
};

/**
 * ConversationGuide Component
 * 
 * A bilingual (English/Spanish) conversation guide component that provides structured
 * interview questions for ESL teachers. It includes different categories of questions
 * and supports specialized guides for Latin American students.
 * 
 * Features:
 * - Multiple conversation categories (casual, professional, cultural, Latin American)
 * - Bilingual support (English/Spanish)
 * - Dynamic sub-guide selection for Latin American conversations
 * - Scrollable question list with teaching tips
 */
const ConversationGuide = () => {
  // State management for guide selection and language preference
  const [selectedGuide, setSelectedGuide] = useState<keyof Guides>('casual');
  const [selectedSubGuide, setSelectedSubGuide] = useState<string>('general');
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  // Comprehensive guide data structure containing all conversation templates
  const guides: Guides = {
    latinAmerica: {
      title: "Latin American Cultural Connection",
      titleEs: "Conexión Cultural Latinoamericana",
      description: "Culturally attuned conversation starters for Latin American students",
      descriptionEs: "Iniciadores de conversación culturalmente adaptados para estudiantes latinoamericanos",
      subGuides: {
        general: {
          title: "General Latin American",
          titleEs: "Latinoamérica General",
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
          ],
          questionsEs: [
            "¡Bienvenido/a! ¿De qué parte de Latinoamérica eres?",
            "¿Cuál es tu celebración o festival local favorito de tu ciudad natal?",
            "¿Encuentras similitudes entre tu ciudad natal y esta ciudad?",
            "¿Qué comidas de casa extrañas más?",
            "¿Tienes familiares que hayan estudiado inglés antes?",
            "¿Qué tipo de música te gusta? ¿Te gusta la música regional?",
            "¿Has encontrado buenos restaurantes o mercados latinoamericanos aquí?",
            "¿Cuál es la mayor diferencia en la vida diaria aquí comparada con tu hogar?",
            "¿Mantienes contacto con tu familia a través de videollamadas?",
            "¿Qué experiencia de trabajo o estudio tienes de tu país?"
          ]
        },
        mexico: {
          title: "Mexican Cultural Connection",
          titleEs: "Conexión Cultural Mexicana",
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
          ],
          questionsEs: [
            "¡Bienvenido/a! ¿De qué estado de México eres?",
            "¿Tu ciudad natal es más una ciudad o un pueblo? ¿Por qué es conocida?",
            "¿Cuál es tu platillo regional favorito de tu estado?",
            "¿Creciste hablando alguna lengua indígena?",
            "¿Qué tipo de trabajo hacías en México?",
            "¿Cuál es tu época favorita del año en tu hogar? ¿Hay celebraciones especiales?",
            "¿Has encontrado lugares aquí que te recuerden a México?",
            "¿Sigues el fútbol? ¿A qué equipo apoyas?",
            "¿Qué sueles hacer los domingos? ¿Es diferente aquí?",
            "¿Has encontrado buenos mercados o restaurantes mexicanos aquí?"
          ]
        },
        professional: {
          title: "Latin American Professional",
          titleEs: "Profesional Latinoamericano",
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
          ],
          questionsEs: [
            "¿Qué tipo de trabajo hacías en tu país?",
            "¿Qué tan diferente es tu industria aquí comparada con tu país?",
            "¿Estudiaste en la universidad? ¿Cuál fue tu campo de estudio?",
            "¿Qué habilidades de inglés te ayudarían más en tu trabajo?",
            "¿Trabajas con otros hispanohablantes aquí?",
            "¿Cuál es la mayor diferencia en la cultura laboral?",
            "¿Planeas continuar en el mismo campo aquí?",
            "¿Qué metas profesionales tienes para los próximos años?",
            "¿Necesitas vocabulario técnico específico para tu trabajo?",
            "¿Cómo se comparan las reuniones de trabajo aquí con las de tu país?"
          ]
        }
      }
    },
    casual: {
      title: "Friendly Casual Conversation",
      titleEs: "Conversación Casual Amistosa",
      description: "A relaxed, informal approach focusing on building rapport",
      descriptionEs: "Un enfoque relajado e informal centrado en construir relaciones",
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
      ],
      questionsEs: [
        "¡Hola! Soy [nombre del profesor]. ¿Cómo te gustaría que te llame?",
        "¿Qué te parece el clima aquí comparado con tu ciudad natal?",
        "¿Qué te trae a nuestra clase de inglés?",
        "¿Qué tipo de trabajo haces? ¿Te gusta?",
        "¿Qué te gusta hacer cuando no estás trabajando?",
        "¿Has viajado mucho? ¿A dónde has ido?",
        "¿Qué es lo que más te gusta de vivir aquí?",
        "¿Qué tipo de comida te gusta?",
        "¿Tienes algún pasatiempo o interés que te gustaría compartir?",
        "¿Qué esperas aprender en esta clase?"
      ]
    },
    professional: {
      title: "Professional Focus",
      titleEs: "Enfoque Profesional",
      description: "Emphasis on work-related English needs",
      descriptionEs: "Énfasis en las necesidades de inglés relacionadas con el trabajo",
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
      ],
      questionsEs: [
        "Bienvenido/a a nuestra clase. ¿Podrías presentarte?",
        "¿En qué industria trabajas?",
        "¿Podrías contarme sobre tu rol y responsabilidades?",
        "¿Con qué frecuencia usas inglés en tu trabajo?",
        "¿Qué tipos de comunicación en inglés necesitas más?",
        "¿Tienes metas específicas de inglés relacionadas con el trabajo?",
        "¿Has tomado clases de inglés antes?",
        "¿Qué desafíos enfrentas con el inglés en el trabajo?",
        "¿Trabajas con equipos internacionales?",
        "¿Qué habilidades te ayudarían más en tu carrera?"
      ]
    },
    cultural: {
      title: "Cultural Exchange",
      titleEs: "Intercambio Cultural",
      description: "Focus on cultural background and adaptation",
      descriptionEs: "Enfoque en el contexto cultural y la adaptación",
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
      ],
      questionsEs: [
        "¡Bienvenido/a! Me encantaría saber de dónde eres.",
        "¿Cuánto tiempo llevas viviendo aquí?",
        "¿Cuál es la mayor diferencia entre aquí y tu ciudad natal?",
        "¿Qué idiomas hablas?",
        "¿Cuál es tu comida tradicional favorita de tu país?",
        "¿Mantienes contacto con tu familia en tu país?",
        "¿Qué actividades culturales disfrutas?",
        "¿Has viajado a muchos países?",
        "¿Qué es algo único de tu cultura?",
        "¿Qué aspectos de la cultura local te interesan?"
      ]
    }
  };

  // Determine which questions to display based on selected guide and language
  const currentGuide = guides[selectedGuide];
  const questions = selectedGuide === 'latinAmerica' 
    ? guides.latinAmerica.subGuides[selectedSubGuide].questions
    : currentGuide.questions;
  const questionsEs = selectedGuide === 'latinAmerica'
    ? guides.latinAmerica.subGuides[selectedSubGuide].questionsEs
    : currentGuide.questionsEs;

  // Select questions based on chosen language
  const displayQuestions = language === 'en' ? questions : questionsEs;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Guide Selection Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{language === 'en' ? 'Conversation Guide Selection' : 'Selección de Guía de Conversación'}</CardTitle>
          {/* Language Toggle Button */}
          <Button
            onClick={() => setLanguage(lang => lang === 'en' ? 'es' : 'en')}
            variant="outline"
            className="ml-4"
          >
            {language === 'en' ? 'Ver en Español' : 'View in English'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Main Guide Category Selection */}
            <RadioGroup
              value={selectedGuide}
              onValueChange={(value) => setSelectedGuide(value as keyof Guides)}
              className="space-y-4"
            >
              {Object.entries(guides).map(([key, guide]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={key} id={key} />
                  <Label htmlFor={key} className="font-medium">
                    {language === 'en' ? guide.title : guide.titleEs}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Latin America Specific Sub-guide Selection */}
            {selectedGuide === 'latinAmerica' && (
              <div className="mt-4 border-t pt-4">
                <label className="text-sm font-medium mb-2 block">
                  {language === 'en' ? 'Choose Specific Guide:' : 'Elige una Guía Específica:'}
                </label>
                <RadioGroup
                  value={selectedSubGuide}
                  onValueChange={setSelectedSubGuide}
                  className="space-y-2"
                >
                  {Object.entries(guides.latinAmerica.subGuides).map(([key, guide]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <RadioGroupItem value={key} id={`sub-${key}`} />
                      <Label htmlFor={`sub-${key}`} className="font-medium">
                        {language === 'en' ? guide.title : guide.titleEs}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Questions Display Card */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>
            {language === 'en' 
              ? (selectedGuide === 'latinAmerica'
                ? guides.latinAmerica.subGuides[selectedSubGuide].title 
                : currentGuide.title)
              : (selectedGuide === 'latinAmerica'
                ? guides.latinAmerica.subGuides[selectedSubGuide].titleEs
                : currentGuide.titleEs)}
          </CardTitle>
          <p className="text-sm text-gray-600">
            {language === 'en' ? currentGuide.description : currentGuide.descriptionEs}
          </p>
        </CardHeader>
        <CardContent>
          {/* Scrollable Questions List */}
          <ScrollArea className="h-[400px] pr-4">
            <ol className="space-y-4">
              {displayQuestions?.map((question, index) => (
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

/**
 * Helper function that provides contextual tips for teachers based on the question type.
 * These tips help teachers focus on relevant information during the conversation.
 * 
 * @param question - The conversation question to analyze
 * @returns A relevant teaching tip based on the question content
 */
const getPromptTip = (question: string): string => {
  if (question.includes("work") || question.includes("trabajo")) {
    return "Listen for job title, industry, and work environment";
  }
  if (question.includes("hobby") || question.includes("interests") || question.includes("pasatiempo") || question.includes("interés")) {
    return "Note specific activities and enthusiasm levels";
  }
  if (question.includes("traveled") || question.includes("viajado")) {
    return "Record countries visited and travel experiences";
  }
  if (question.includes("food") || question.includes("comida")) {
    return "Note cultural preferences and dietary considerations";
  }
  return "Listen for details that could help personalize future lessons";
};

export default ConversationGuide; 