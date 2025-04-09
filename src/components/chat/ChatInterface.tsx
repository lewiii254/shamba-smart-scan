import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, PhoneCall, Loader2, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";
import SpecialistsList from "./SpecialistsList";
import { Specialist } from "@/data/specialists";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initialMessage = selectedSpecialist.isAI
      ? `Hello! I'm ${selectedSpecialist.name}, an AI assistant specializing in ${selectedSpecialist.specialty}. I can provide instant information about plant care, disease identification, and agricultural practices. How can I help you today?`
      : `Hello! I'm ${selectedSpecialist.name}, a ${selectedSpecialist.role} specializing in ${selectedSpecialist.specialty}. How can I help with your plant today?`;
    
    setMessages([
      {
        id: `welcome-${selectedSpecialist.id}`,
        sender: selectedSpecialist.name,
        text: initialMessage,
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
    
    setTimeout(() => {
      const specialistResponse: Message = {
        id: `specialist-${Date.now()}`,
        sender: selectedSpecialist.name,
        text: selectedSpecialist.isAI 
          ? getAIResponse(newMessage)
          : getSpecialistResponse(newMessage),
        timestamp: new Date(),
        isUser: false
      };
      
      setMessages(prev => [...prev, specialistResponse]);
      setIsSending(false);
    }, selectedSpecialist.isAI ? 1000 : 2000);
  };

  const getSpecialistResponse = (userMessage: string): string => {
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

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("water") || lowerMessage.includes("watering")) {
      return "Proper watering is essential for plant health! Most plants prefer consistent moisture rather than frequent light watering. Check the top inch of soil - if it's dry, it's usually time to water. Remember that overwatering is just as harmful as underwatering. Signs of overwatering include yellowing leaves and soft, mushy stems, while underwatered plants often have crisp, brown edges on leaves.";
    } 
    else if (lowerMessage.includes("fertilize") || lowerMessage.includes("nutrients") || lowerMessage.includes("feed")) {
      return "Plants need nutrients to thrive! For most plants, fertilizing every 4-6 weeks during the growing season is sufficient. Use a balanced fertilizer (with equal NPK values) for general growth, or specialized formulas for flowering or fruiting plants. Always follow package instructions to avoid nutrient burn, and remember that under-fertilizing is generally safer than over-fertilizing.";
    }
    else if (lowerMessage.includes("pest") || lowerMessage.includes("bug") || lowerMessage.includes("insect")) {
      return "For sustainable pest management, start with the least toxic methods: 1) Remove pests manually when possible, 2) Use water sprays to dislodge insects like aphids, 3) Try insecticidal soaps or neem oil, which are effective yet environmentally friendly. Identify the specific pest before treatment, as different pests require different approaches. Prevention through healthy plants and good air circulation is always the best strategy!";
    }
    else if (lowerMessage.includes("soil") || lowerMessage.includes("potting")) {
      return "Soil quality is foundational to plant health! Good potting mix should be well-draining yet moisture-retentive, with a mix of organic matter, perlite or pumice for drainage, and sometimes sand or coco coir. Different plants have different soil preferences - succulents need very fast-draining soil, while tropical plants often prefer moisture-retentive mixes. Consider adding compost to improve soil structure and provide slow-release nutrients.";
    }
    else if (lowerMessage.includes("light") || lowerMessage.includes("sun")) {
      return "Light is crucial for photosynthesis! Plants are typically categorized as full sun (6+ hours direct light), partial sun (4-6 hours), partial shade (2-4 hours), or full shade (less than 2 hours). Signs of too much light include scorched leaves, while insufficient light causes leggy growth and poor flowering. Most flowering plants need more light than foliage plants. For indoor plants, south-facing windows provide the strongest light, while north-facing provide the least.";
    }
    else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey") || lowerMessage.includes("help")) {
      return "Hello! I'm here to help with any plant-related questions. I can provide advice on watering, fertilizing, pest management, soil choices, identifying common diseases, and general growing tips. What specific plant or gardening topic can I assist you with today?";
    }
    else if (lowerMessage.includes("disease") || lowerMessage.includes("sick") || lowerMessage.includes("spots") || lowerMessage.includes("yellow")) {
      return "Plant disease diagnosis starts with careful observation. Yellow leaves often indicate nutrient deficiencies or overwatering. Brown spots might suggest fungal infection, especially if they appear after rainy periods. Wilting despite moist soil could indicate root rot. For most fungal issues, improve air circulation, avoid wetting the foliage, and remove affected leaves. A copper or sulfur-based fungicide may help for serious infections, but proper cultural practices are your best preventative measure.";
    }
    else {
      return "Thank you for your question about " + userMessage.slice(0, 30) + (userMessage.length > 30 ? "..." : "") + ". To give you the most accurate advice, could you provide a bit more information? Details about your specific plant, its growing conditions, and any symptoms you're observing would help me provide more tailored guidance. Feel free to include information about watering frequency, light exposure, or any recent changes to its environment.";
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
                <AvatarFallback>{selectedSpecialist.isAI ? <Bot className="h-5 w-5" /> : selectedSpecialist.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg flex items-center">
                  {selectedSpecialist.name}
                  {selectedSpecialist.isAI && (
                    <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-200">
                      AI
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>{selectedSpecialist.role} • {selectedSpecialist.specialty}</CardDescription>
              </div>
              <div className="ml-auto flex gap-2">
                {!selectedSpecialist.isAI && (
                  <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
                    <PhoneCall className="h-4 w-4" />
                    <span>Call</span>
                  </Button>
                )}
                <Badge variant="outline" className={`${
                  selectedSpecialist.isAI 
                    ? 'bg-blue-50 text-blue-700 border-blue-200' 
                    : selectedSpecialist.status === 'online' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                }`}>
                  {selectedSpecialist.isAI ? 'Active 24/7' : selectedSpecialist.status === 'online' ? 'Online' : 'Away'}
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
                  isAI={selectedSpecialist.isAI}
                />
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage src={selectedSpecialist.avatar} />
                    <AvatarFallback>{selectedSpecialist.isAI ? <Bot className="h-4 w-4" /> : selectedSpecialist.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-gray-500 text-sm">{selectedSpecialist.isAI ? "Processing your question..." : "Typing a response..."}</span>
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
                className={selectedSpecialist.isAI ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"} 
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
