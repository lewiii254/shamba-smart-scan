import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Specialist } from "@/data/specialists";

interface SpecialistsListProps {
  specialists: Specialist[];
  selectedSpecialist: Specialist;
  handleSpecialistSelect: (specialist: Specialist) => void;
}

const SpecialistsList = ({ specialists, selectedSpecialist, handleSpecialistSelect }: SpecialistsListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-medium text-green-700 mb-3">Available Specialists</h3>
      <div className="space-y-3">
        {specialists.map((specialist) => (
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
  );
};

export default SpecialistsList;
