import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface VoiceInterfaceProps {
  onTranscript: (text: string) => void;
  onSpeak: (text: string) => void;
  isListening: boolean;
  isSpeaking: boolean;
}

export function VoiceInterface({ onTranscript, onSpeak, isListening, isSpeaking }: VoiceInterfaceProps) {
  const { t, language } = useI18n();
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if Speech Recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      
      // Configure recognition
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = getLanguageCode(language);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        if (event.results[event.resultIndex].isFinal) {
          onTranscript(transcript);
        }
      };
      
      recognition.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`);
      };
      
      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
      setError('Speech recognition not supported in this browser');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, onTranscript]);

  const getLanguageCode = (lang: string): string => {
    const langCodes: Record<string, string> = {
      'en': 'en-US',
      'ar': 'ar-SA',
      'ms': 'ms-MY',
      'fr': 'fr-FR',
      'id': 'id-ID',
      'hi': 'hi-IN'
    };
    return langCodes[lang] || 'en-US';
  };

  const handleVoiceToggle = () => {
    if (!isSupported || !recognitionRef.current) return;
    
    try {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.lang = getLanguageCode(language);
        recognitionRef.current.start();
        setError(null);
      }
    } catch (err) {
      setError('Failed to start speech recognition');
    }
  };

  const handleTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode(language);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      // Set voice based on language
      const voices = speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith(getLanguageCode(language))) || voices[0];
      if (voice) utterance.voice = voice;
      
      speechSynthesis.speak(utterance);
      onSpeak(text);
    }
  };

  if (!isSupported) {
    return (
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <MicOff className="h-4 w-4" />
        <span>Voice not supported</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={isListening ? "default" : "outline"}
        size="sm"
        onClick={handleVoiceToggle}
        disabled={isSpeaking}
        className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
      >
        {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        {isListening ? "Stop" : "Speak"}
      </Button>
      
      <div className="flex items-center text-xs text-muted-foreground">
        {isSpeaking ? (
          <><Volume2 className="h-3 w-3 mr-1" />Speaking...</>
        ) : (
          <><VolumeX className="h-3 w-3 mr-1" />Ready</>
        )}
      </div>
      
      {error && (
        <div className="text-xs text-red-500 max-w-xs truncate">
          {error}
        </div>
      )}
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
  
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
  }
  
  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
  }
}