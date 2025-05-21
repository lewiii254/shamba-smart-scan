
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { History, RotateCcw } from "lucide-react";

interface DiagnosisActionsProps {
  diagnosis: string | null;
  image: string | null;
  handleReset: () => void;
}

const DiagnosisActions: React.FC<DiagnosisActionsProps> = ({
  diagnosis,
  image,
  handleReset
}) => {
  const navigate = useNavigate();

  const handleTrackTimeline = () => {
    navigate("/plant-timeline", { 
      state: { 
        diagnosis,
        image
      }
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <Button 
        variant="outline" 
        onClick={handleReset}
        className="flex-1"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        New Scan
      </Button>
      
      {diagnosis && (
        <Button 
          onClick={handleTrackTimeline} 
          className="bg-green-600 hover:bg-green-700 text-white flex-1"
        >
          <History className="mr-2 h-4 w-4" />
          Track Timeline
        </Button>
      )}
    </div>
  );
};

export default DiagnosisActions;
