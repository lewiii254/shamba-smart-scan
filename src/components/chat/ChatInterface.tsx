
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, PhoneCall, Loader2 } from "lucide-react";
import ChatMessage from "./ChatMessage";
import SpecialistsList from "./SpecialistsList";

interface Specialist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  status: "online" | "away";
  bio: string;
}

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

interface ChatInterfaceProps {
  specialists: Specialist[];
  selectedSpecialist: Specialist;
  handleSpecialistSelect: (specialist: Specialist) => void;
}

const ChatInterface = ({ specialists, selectedSpecialist, handleSpecialistSelect }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: selectedSpecialist.name,
      text: `Hello! I'm ${selectedSpecialist.name}, a ${selectedSpecialist.role} specializing in ${selectedSpecialist.specialty}. How can I help with your plant today?`,
      timestamp: new Date(),
      isUser: false
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Reset messages when specialist changes
    setMessages([
      {
        id: "welcome-new",
        sender: selectedSpecialist.name,
        text: `Hello! I'm ${selectedSpecialist.name}, a ${selectedSpecialist.role} specializing in ${selectedSpecialist.specialty}. How can I help with your plant today?`,
        timestamp: new Date(),
        isUser: false
      }
    ]);
  }, [selectedSpecialist]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "You",
      text: newMessage,
      timestamp: new Date(),
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsSending(true);
    
    // Simulate specialist response after a delay
    setTimeout(() => {
      const specialistResponse: Message = {
        id: `specialist-${Date.now()}`,
        sender: selectedSpecialist.name,
        text: getSpecialistResponse(newMessage),
        timestamp: new Date(),
        isUser: false
      };
      
      setMessages(prev => [...prev, specialistResponse]);
      setIsSending(false);
    }, 2000);
  };

  const getSpecialistResponse = (userMessage: string): string => {
    // Simple response logic - in a real app this would be a real chat system
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("disease") || lowerMessage.includes("sick") || lowerMessage.includes("dying")) {
      return "Based on your description, it sounds like your plant might be suffering from a fungal infection. Can you share more details about the symptoms or upload another photo? I'd recommend reducing watering frequency and improving air circulation around the plant as a first step.";
    } else if (lowerMessage.includes("water") || lowerMessage.includes("yellow") || lowerMessage.includes("brown")) {
      return "Yellowing or browning leaves can indicate several issues - overwatering, underwatering, or nutrient deficiency. Check the soil moisture level first. Let the top inch dry out between waterings, and consider a balanced fertilizer diluted to half strength.";
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return `Hello! How can I assist with your plant health concerns today? If you've received a diagnosis from our AI system, I'd be happy to provide more detailed guidance.`;
    } else {
      return "Thank you for sharing that information. To provide the most accurate advice, could you describe the specific symptoms you're seeing? Details about leaf appearance, stems, and any recent changes in care routine would be helpful.";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="hidden md:block">
        <SpecialistsList 
          specialists={specialists}
          selectedSpecialist={selectedSpecialist}
          handleSpecialistSelect={handleSpecialistSelect}
        />
      </div>
      
      <div className="md:col-span-3">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-2 border-b">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={selectedSpecialist.avatar} />
                <AvatarFallback>{selectedSpecialist.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{selectedSpecialist.name}</CardTitle>
                <CardDescription>{selectedSpecialist.role} • {selectedSpecialist.specialty}</CardDescription>
              </div>
              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
                  <PhoneCall className="h-4 w-4" />
                  <span>Call</span>
                </Button>
                <Badge variant="outline" className={`${selectedSpecialist.status === 'online' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                  {selectedSpecialist.status === 'online' ? 'Online' : 'Away'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto py-4">
            <div className="space-y-4">
              {messages.map(message => (
                <ChatMessage 
                  key={message.id}
                  message={message}
                  specialistAvatar={selectedSpecialist.avatar}
                  specialistName={selectedSpecialist.name}
                />
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage src={selectedSpecialist.avatar} />
                    <AvatarFallback>{selectedSpecialist.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-gray-500 text-sm">Typing a response...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-3">
            <div className="w-full flex gap-2">
              <Textarea 
                placeholder="Type your message..." 
                className="min-h-10 flex-grow"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                className="bg-green-600 hover:bg-green-700" 
                onClick={handleSendMessage}
                disabled={isSending || !newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChatInterface;
