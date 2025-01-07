import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mic } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const StudentForm = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState('');

  const startRecording = () => {
    setIsRecording(true);
    setFeedback('Recording started... Speak clearly into the microphone');
    // Placeholder for actual recording logic
  };

  const stopRecording = () => {
    setIsRecording(false);
    setFeedback('Recording stopped. Processing conversation...');
    // Placeholder for sending to OpenAI Whisper
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">New Student Interview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input 
              id="studentName" 
              placeholder="Enter student's name"
              className="text-lg"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <Button 
              size="lg"
              className={`w-48 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              <Mic className="mr-2 h-5 w-5" />
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
          </div>

          {feedback && (
            <Alert>
              <AlertDescription>{feedback}</AlertDescription>
            </Alert>
          )}

          <div className="text-center text-sm text-gray-500">
            <p>Press "Start Recording" and begin the conversation.</p>
            <p>The app will automatically process the conversation and generate a customized worksheet.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentForm; 