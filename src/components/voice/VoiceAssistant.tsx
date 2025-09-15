import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

// Define interfaces for speech recognition
interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionError {
  error: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionError) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: new() => SpeechRecognitionInstance;
    webkitSpeechRecognition: new() => SpeechRecognitionInstance;
  }
}

interface VoiceAssistantProps {
  onVoiceCommand?: (command: string) => void;
  textToSpeak?: string;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onVoiceCommand, textToSpeak }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognitionInstance | null>(null);
  const { currentLanguage, t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = currentLanguage.code === 'sw' ? 'sw-KE' : 
                                 currentLanguage.code === 'yo' ? 'yo-NG' : 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onVoiceCommand) {
          onVoiceCommand(transcript);
        }
        setIsListening(false);
        
        toast({
          title: t('voice.listening'),
          description: `"${transcript}"`,
        });
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: 'Voice Error',
          description: 'Could not understand speech. Please try again.',
          variant: 'destructive',
        });
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [currentLanguage.code, onVoiceCommand, t, toast]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    } else {
      toast({
        title: 'Voice Not Supported',
        description: 'Speech recognition is not supported in this browser.',
        variant: 'destructive',
      });
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage.code === 'sw' ? 'sw-KE' : 
                       currentLanguage.code === 'yo' ? 'yo-NG' : 'en-US';
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: 'Speech Not Supported',
        description: 'Text-to-speech is not supported in this browser.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={isListening ? "destructive" : "outline"}
        size="sm"
        onClick={isListening ? stopListening : startListening}
        className="gap-2"
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        {isListening ? t('voice.stopListening') : t('voice.startListening')}
      </Button>
      
      {textToSpeak && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => speakText(textToSpeak)}
          className="gap-2"
        >
          <Volume2 className="h-4 w-4" />
          {t('voice.speak')}
        </Button>
      )}
    </div>
  );
};

export default VoiceAssistant;