import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Specialist } from "@/data/specialists";

interface SpecialistProfileProps {
  specialist: Specialist;
  setActiveTab: (tab: string) => void;
  setSelectedSpecialist: (specialist: Specialist) => void;
}

const SpecialistProfile = ({ specialist, setActiveTab, setSelectedSpecialist }: SpecialistProfileProps) => {
  return (
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
  );
};

export default SpecialistProfile;
