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
// Function to fetch student data
const fetchStudentData = async (studentId: string) => {
  try {
    const response = await fetch(`<span class="math-inline">\{API\_BASE\_URL\}/students/</span>{studentId}`);
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
const API_BASE_URL = "http://localhost:8000";
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
      other_languages:,
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
      interests:,
      hobbies:,
      favorite_activities:,
      sports:,
      reason_for_learning: "",
      english_usage_context:,
      learning_goals:,
      preferred_learning_style:,
      favorite_foods:,
      travel_experience:,
      cultural_interests:,
      music_preferences:,
      communication_style: "",
      group_work_preference: undefined,
      social_interests:,
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
          interests: student.interests ||,
          hobbies: student.hobbies ||,
          favorite_activities: student.favorite_activities ||,
          sports: student.sports ||,
          reason_for_learning: student.reason_for_learning || "",
          english_usage_context: student.english_usage_context ||,
          learning_goals: student.learning_goals ||,
          preferred_learning_style: student.preferred_learning_style ||,
          favorite_foods: student.favorite_foods ||,
          travel_experience: student.travel_experience ||,
          cultural_interests: student.cultural_interests ||,
          music_preferences: student.music_preferences ||,
          communication_style: student.communication_style || "",
          group_work_preference: student.group_work_preference || undefined,
          social_interests: student.social_interests ||,
        });
      }
    };
    fetchStudent();
  }, [studentId, form]);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      // Make API call to update student data
      const response = await fetch(`<span class="math-inline">\{API\_BASE\_URL\}/students/</span>{studentId}`, {
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
              {/* Basic Information */}
              <ScrollArea className={cn("h-[calc(100vh-400px)] w-full")}>
                <div className="space-y-6">
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
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* ... other form fields for basic information ... */}
                </div>
                <Separator className="my-6" />
                {/* Professional Information */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="job_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter student's job title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* ... other form fields for professional information ... */}
                </div>
                <Separator className="my-6" />
                {/* Personal Information */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="hometown"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hometown</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter student's hometown"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* ... other form fields for personal information ... */}
                </div>
                <Separator className="my-6" />
                {/* Interests and Activities */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interests</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                          multiple
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select interests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {/* ... options for interests ... */}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* ... other form fields for interests and activities ... */}
                </div>
                <Separator className="my-6" />
                {/* Learning Context */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="reason_for_learning"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Learning</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter student's reason for learning"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* ... other form fields for learning context ... */}
                </div>
                <Separator className="my-6" />
                {/* Cultural and Social Aspects */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="favorite_foods"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Favorite Foods</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                          multiple
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select favorite foods" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {/* ... options for favorite foods ... */}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* ... other form fields for cultural and social aspects ... */}
                </div>
              </ScrollArea>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default StudentProfileEditor;