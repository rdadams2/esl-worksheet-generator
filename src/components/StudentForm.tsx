import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mic } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Replace with your actual server endpoint
const HLS_SERVER_URL = 'https://command.otter-hamal.ts.net';

interface TranscriptionResponse {
  type: 'transcription' | 'error' | 'config_ack' | 'status';
  text?: string;
  start?: number;
  end?: number;
  message?: string;
  accumulated_seconds?: number;
}

const StudentForm = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [transcription, setTranscription] = useState<string>('');
  const [processingStatus, setProcessingStatus] = useState('');
  const [hasRecorded, setHasRecorded] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  
  const websocketRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const uidRef = useRef(crypto.randomUUID());
  const noSpeechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFeedback(''); // Clear any initial feedback
    setProcessingStatus(''); // Clear any initial processing status
    return () => {
      stopRecording();
      if (websocketRef.current) {
        websocketRef.current.close();
      }
      if (noSpeechTimeoutRef.current) {
        clearTimeout(noSpeechTimeoutRef.current);
      }
    };
  }, []);

  const initializeWebSocket = () => {
    const ws = new WebSocket(HLS_SERVER_URL.replace('https', 'wss'));

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setTotalSeconds(0); // Reset total seconds when starting new recording
      // Send configuration
      const config = {
        uid: uidRef.current,
        language: "es",
        task: "transcribe",
        model: "large"
      };
      ws.send(JSON.stringify(config));
    };

    ws.onmessage = (event) => {
      const response: TranscriptionResponse = JSON.parse(event.data);
      
      switch (response.type) {
        case 'transcription':
          if (response.text) {
            setTranscription(prev => prev + ' ' + response.text);
          }
          break;
        case 'status':
          if (response.message) {
            // Update total seconds if available
            if (response.accumulated_seconds) {
              setTotalSeconds(response.accumulated_seconds);
            }
            
            // Update status for all messages
            const statusText = response.message === 'Processing audio...' || 
                             response.message === 'Starting transcription...'
              ? `${response.message} (Total: ${totalSeconds.toFixed(1)}s)`
              : response.message;
            setProcessingStatus(statusText);
            
            // Only handle no speech timeout if we're actively recording
            if (response.message === 'No speech detected in segment' && isRecording) {
              // Start/reset 60-second timeout for no speech
              if (noSpeechTimeoutRef.current) {
                clearTimeout(noSpeechTimeoutRef.current);
              }
              noSpeechTimeoutRef.current = setTimeout(() => {
                setFeedback('No speech detected for 60 seconds. Stopping recording.');
                stopRecording();
              }, 60000);
            } else {
              // Clear no speech timeout if we detect speech
              if (noSpeechTimeoutRef.current) {
                clearTimeout(noSpeechTimeoutRef.current);
              }
            }
          }
          break;
        case 'error':
          setFeedback(response.message || 'Unknown error');
          break;
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setFeedback('Error connecting to transcription server');
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
      setProcessingStatus('');
      if (noSpeechTimeoutRef.current) {
        clearTimeout(noSpeechTimeoutRef.current);
      }
    };

    websocketRef.current = ws;
  };

  const startRecording = async () => {
    try {
      // Initialize WebSocket if not already connected
      if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
        initializeWebSocket();
      }

      // Get audio stream with specific constraints for Whisper
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,          // Mono
          sampleRate: 16000,        // 16 kHz
          sampleSize: 32,           // 32-bit float
          autoGainControl: false,   // Disable automatic gain control
          echoCancellation: false,  // Disable echo cancellation
          noiseSuppression: false,  // Disable noise suppression
        }
      });

      streamRef.current = stream;

      // Create audio context
      const audioContext = new AudioContext({
        sampleRate: 16000,
        latencyHint: 'interactive'
      });
      audioContextRef.current = audioContext;

      // Create audio source
      const source = audioContext.createMediaStreamSource(stream);

      // Create script processor for raw audio data
      // At 16kHz, 16384 samples = ~1 second of audio
      const processor = audioContext.createScriptProcessor(16384, 1, 1);
      processorRef.current = processor;

      // Process audio data
      processor.onaudioprocess = (e) => {
        if (websocketRef.current?.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          // Send raw float32 audio data
          websocketRef.current.send(inputData.buffer);
        }
      };

      // Connect the audio nodes
      source.connect(processor);
      processor.connect(audioContext.destination);

      setIsRecording(true);
      setHasRecorded(true);
      setFeedback('Recording started... Speak clearly into the microphone');

    } catch (error) {
      console.error('Error starting recording:', error);
      let errorMessage = 'Error accessing microphone. ';
      
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please ensure microphone permissions are granted.';
      }
      
      setFeedback(errorMessage);
      setIsRecording(false);
      
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
    }
  };

  const stopRecording = () => {
    if (!hasRecorded) return;  // Don't process if we haven't recorded

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setIsRecording(false);
    
    if (hasRecorded) {
      setFeedback('Recording stopped. Processing audio...');
    }

    // Clear any existing no-speech timeout
    if (noSpeechTimeoutRef.current) {
      clearTimeout(noSpeechTimeoutRef.current);
      noSpeechTimeoutRef.current = null;
    }

    // Keep connection open for 60 seconds for final processing
    setTimeout(() => {
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
        if (hasRecorded) {
          setProcessingStatus(`Transcription complete (Total: ${totalSeconds.toFixed(1)}s)`);
          setFeedback('');
        }
      }
    }, 60000);
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

          {hasRecorded && processingStatus && (
            <Alert className="bg-blue-50">
              <AlertDescription>{processingStatus}</AlertDescription>
            </Alert>
          )}

          {transcription && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Transcription:</h3>
              <p>{transcription}</p>
            </div>
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