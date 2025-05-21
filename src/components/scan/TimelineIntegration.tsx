
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

interface TimelineIntegrationProps {
  diagnosis: string | null;
  image: string | null;
}

const TimelineIntegration: React.FC<TimelineIntegrationProps> = ({
  diagnosis,
  image
}) => {
  const navigate = useNavigate();

  if (!diagnosis) return null;

  const handleTrackTimeline = () => {
    navigate("/plant-timeline", { 
      state: { 
        diagnosis,
        image
      }
    });
  };

  return (
    <div className="mt-4 p-4 bg-green-50 rounded-md border border-green-200">
      <h3 className="text-lg font-medium text-green-800 mb-2">Track Plant Recovery</h3>
      <p className="text-green-700 mb-4">
        Monitor your plant's health over time and track the effectiveness of treatments.
      </p>
      <Button 
        onClick={handleTrackTimeline} 
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        <History className="mr-2 h-4 w-4" />
        Track in Timeline
      </Button>
      <p className="text-xs text-green-600 mt-2 text-center">
        Create a visual history of your plant's recovery journey
      </p>
    </div>
  );
};

export default TimelineIntegration;
