
import React, { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatInterface from "@/components/chat/ChatInterface";
import SpecialistProfile from "@/components/chat/SpecialistProfile";
import { specialists, Specialist } from "@/data/specialists";

const SpecialistChat = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist>(specialists[0]);

  const handleSpecialistSelect = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
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
            <ChatInterface
              specialists={specialists}
              selectedSpecialist={selectedSpecialist}
              handleSpecialistSelect={handleSpecialistSelect}
            />
          </TabsContent>
          
          <TabsContent value="specialists">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialists.map(specialist => (
                <SpecialistProfile 
                  key={specialist.id}
                  specialist={specialist}
                  setActiveTab={setActiveTab}
                  setSelectedSpecialist={setSelectedSpecialist}
                />
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
