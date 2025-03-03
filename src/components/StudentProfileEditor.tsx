import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Student } from "@/types/schema";

// Schema for the form
const formSchema = z.object({
  // Basic Information
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  gender: z.string().min(1, {
    message: "Please select a gender.",
  }),
  age_range: z.string().min(1, {
    message: "Please select an age range.",
  }),
  native_language: z.string().min(2, {
    message: "Native language must be at least 2 characters.",
  }),
  other_languages: z.array(z.string()).min(1, {
    message: "Please select at least one other language.",
  }),
  english_level: z.string().min(1, {
    message: "Please select an English level.",
  }),
  // Professional Information
  job_title: z.string().optional(),
  job_description: z.string().optional(),
  industry: z.string().optional(),
  years_of_experience: z
    .number()
    .min(0, { message: "Years of experience cannot be negative." })
    .optional(),
  work_environment: z.string().optional(),
  // Personal Information
  hometown: z.string().optional(),
  current_city: z.string().optional(),
  years_in_current_country: z
    .number()
    .min(0, { message: "Years in current country cannot be negative." })
    .optional(),
  family_status: z.string().optional(),
  living_situation: z.string().optional(),
  // Interests and Activities
  interests: z.array(z.string()).optional(),
  hobbies: z.array(z.string()).optional(),
  favorite_activities: z.array(z.string()).optional(),
  sports: z.array(z.string()).optional(),
  // Learning Context
  reason_for_learning: z.string().optional(),
  english_usage_context: z.array(z.string()).optional(),
  learning_goals: z.array(z.string()).optional(),
  preferred_learning_style: z.array(z.string()).optional(),
  // Cultural and Social Aspects
  favorite_foods: z.array(z.string()).optional(),
  travel_experience: z.array(z.string()).optional(),
  cultural_interests: z.array(z.string()).optional(),
  music_preferences: z.array(z.string()).optional(),
  communication_style: z.string().optional(),
  group_work_preference: z.boolean().optional(),
  social_interests: z.array(z.string()).optional(),
});

// API base URL - should be configured from environment variables in production
const API_BASE_URL = "http://localhost:8000";

// Function to fetch student data
const fetchStudentData = async (studentId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch student data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
};

const StudentProfileEditor = ({ studentId }: { studentId: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentData, setStudentData] = useState<Student | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: "",
      age_range: "",
      native_language: "",
      other_languages: [],
      english_level: "",
      job_title: "",
      job_description: "",
      industry: "",
      years_of_experience: undefined,
      work_environment: "",
      hometown: "",
      current_city: "",
      years_in_current_country: undefined,
      family_status: "",
      living_situation: "",
      interests: [],
      hobbies: [],
      favorite_activities: [],
      sports: [],
      reason_for_learning: "",
      english_usage_context: [],
      learning_goals: [],
      preferred_learning_style: [],
      favorite_foods: [],
      travel_experience: [],
      cultural_interests: [],
      music_preferences: [],
      communication_style: "",
      group_work_preference: undefined,
      social_interests: [],
    },
  });

  // Fetch student data when component mounts
  useEffect(() => {
    const fetchStudent = async () => {
      const student = await fetchStudentData(studentId);
      setStudentData(student);
      
      // Set form default values from fetched student data
      if (student) {
        form.reset({
          name: student.name,
          gender: student.gender,
          age_range: student.age_range,
          native_language: student.native_language,
          other_languages: student.other_languages,
          english_level: student.english_level,
          job_title: student.job_title || "",
          job_description: student.job_description || "",
          industry: student.industry || "",
          years_of_experience: student.years_of_experience || undefined,
          work_environment: student.work_environment || "",
          hometown: student.hometown || "",
          current_city: student.current_city || "",
          years_in_current_country:
            student.years_in_current_country || undefined,
          family_status: student.family_status || "",
          living_situation: student.living_situation || "",
          interests: student.interests || [],
          hobbies: student.hobbies || [],
          favorite_activities: student.favorite_activities || [],
          sports: student.sports || [],
          reason_for_learning: student.reason_for_learning || "",
          english_usage_context: student.english_usage_context || [],
          learning_goals: student.learning_goals || [],
          preferred_learning_style: student.preferred_learning_style || [],
          favorite_foods: student.favorite_foods || [],
          travel_experience: student.travel_experience || [],
          cultural_interests: student.cultural_interests || [],
          music_preferences: student.music_preferences || [],
          communication_style: student.communication_style || "",
          group_work_preference: student.group_work_preference || false,
          social_interests: student.social_interests || [],
        });
      }
    };
    
    fetchStudent();
  }, [studentId, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Make API call to update student data
      const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        // Optionally, update the local state or show a success message
        console.log("Student data updated successfully");
      } else {
        console.error("Failed to update student data");
      }
    } catch (error) {
      console.error("Error updating student data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Student Profile</CardTitle>
          <CardDescription>
            Update the information for {studentData?.name || "this student"}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="professional">Professional</TabsTrigger>
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                </TabsList>
                
                <ScrollArea className={cn("h-[calc(100vh-400px)] w-full")}>
                  <TabsContent value="basic" className="space-y-4">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter student's name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Non-binary">Non-binary</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="age_range"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age Range</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select age range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Under 18">Under 18</SelectItem>
                                <SelectItem value="18-24">18-24</SelectItem>
                                <SelectItem value="25-30">25-30</SelectItem>
                                <SelectItem value="31-40">31-40</SelectItem>
                                <SelectItem value="41-50">41-50</SelectItem>
                                <SelectItem value="51-60">51-60</SelectItem>
                                <SelectItem value="Over 60">Over 60</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="native_language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Native Language</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter native language"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="english_level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>English Level</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select English level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="elementary">Elementary</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="upper-intermediate">Upper Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                                <SelectItem value="proficient">Proficient</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="professional" className="space-y-4">
                    {/* Professional Information */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="job_title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter job title"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="job_description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe job responsibilities"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter industry"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="work_environment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Work Environment</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select work environment" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="office">Office</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                                <SelectItem value="field">Field Work</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="personal" className="space-y-4">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="hometown"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hometown</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter hometown"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="current_city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current City</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter current city"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="family_status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Family Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select family status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="Married">Married</SelectItem>
                                <SelectItem value="Divorced">Divorced</SelectItem>
                                <SelectItem value="Widowed">Widowed</SelectItem>
                                <SelectItem value="In a relationship">In a relationship</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfileEditor; 