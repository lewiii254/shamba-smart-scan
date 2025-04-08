
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Send, User, PhoneCall, Clock, Loader2 } from "lucide-react";

const specialists = [
  {
    id: "s1",
    name: "Dr. Maria Rodriguez",
    role: "Plant Pathologist",
    specialty: "Fungal Diseases",
    avatar: "/placeholder.svg",
    status: "online",
    bio: "Ph.D in Plant Pathology with 12 years of experience in diagnosing and treating crop diseases. Specializes in fungal pathogens affecting vegetables and fruits."
  },
  {
    id: "s2",
    name: "John Thompson",
    role: "Agricultural Scientist",
    specialty: "Pest Management",
    avatar: "/placeholder.svg",
    status: "away",
    bio: "Expert in integrated pest management with focus on sustainable and organic solutions. Former consultant for the Department of Agriculture."
  },
  {
    id: "s3",
    name: "Dr. Sarah Chen",
    role: "Botanical Researcher",
    specialty: "Tropical Plants",
    avatar: "/placeholder.svg",
    status: "online",
    bio: "Research scientist specializing in tropical and subtropical plant diseases. Published author of 15+ scientific papers on plant health management."
  }
];

type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
};

const SpecialistChat = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedSpecialist, setSelectedSpecialist] = useState(specialists[0]);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: user?.email || "You",
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

  const handleSpecialistSelect = (specialist: typeof specialists[0]) => {
    setSelectedSpecialist(specialist);
    setMessages([
      {
        id: "welcome-new",
        sender: specialist.name,
        text: `Hello! I'm ${specialist.name}, a ${specialist.role} specializing in ${specialist.specialty}. How can I help with your plant today?`,
        timestamp: new Date(),
        isUser: false
      }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navigation activeTab="chat" setActiveTab={() => {}} />
      
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Agricultural Specialist Chat</h1>
          <p className="text-lg text-green-700">Get real-time advice from our expert plant scientists and pathologists</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="chat" className="text-lg">Live Chat</TabsTrigger>
            <TabsTrigger value="specialists" className="text-lg">Our Specialists</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="hidden md:block">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-medium text-green-700 mb-3">Available Specialists</h3>
                  <div className="space-y-3">
                    {specialists.map(specialist => (
                      <div 
                        key={specialist.id} 
                        className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${selectedSpecialist.id === specialist.id ? 'bg-green-100' : 'hover:bg-gray-100'}`}
                        onClick={() => handleSpecialistSelect(specialist)}
                      >
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={specialist.avatar} />
                          <AvatarFallback>{specialist.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium truncate">{specialist.name}</p>
                          <p className="text-xs text-gray-500 truncate">{specialist.specialty}</p>
                        </div>
                        <span className={`ml-auto w-2 h-2 rounded-full ${specialist.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                      </div>
                    ))}
                  </div>
                </div>
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
                        <div 
                          key={message.id} 
                          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          {!message.isUser && (
                            <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                              <AvatarImage src={selectedSpecialist.avatar} />
                              <AvatarFallback>{selectedSpecialist.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div 
                              className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}
                            >
                              {message.text}
                            </div>
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                          {message.isUser && (
                            <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                              <AvatarImage src="" />
                              <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                            </Avatar>
                          )}
                        </div>
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
          </TabsContent>
          
          <TabsContent value="specialists">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialists.map(specialist => (
                <Card key={specialist.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={specialist.avatar} />
                        <AvatarFallback className="text-lg">{specialist.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Badge variant="outline" className={`${specialist.status === 'online' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                        {specialist.status === 'online' ? 'Online' : 'Away'}
                      </Badge>
                    </div>
                    <CardTitle className="mt-3">{specialist.name}</CardTitle>
                    <CardDescription className="flex flex-col">
                      <span>{specialist.role}</span>
                      <span className="font-medium text-green-600">Specialty: {specialist.specialty}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{specialist.bio}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        setSelectedSpecialist(specialist);
                        setActiveTab("chat");
                      }}
                    >
                      Chat Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default SpecialistChat;
