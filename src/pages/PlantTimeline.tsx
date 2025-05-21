
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useTimeline } from "@/hooks/use-timeline";
import { useToast } from "@/hooks/use-toast";

// Components
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PlantTimeline from "@/components/timeline/PlantTimeline";
import AddTimelineEntryModal from "@/components/timeline/AddTimelineEntryModal";
import WeatherWidget from "@/components/weather/WeatherWidget";

// Types
import { TimelineEntryProps } from "@/components/timeline/TimelineEntry";

const TimelinePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToTimeline, timelineItems } = useTimeline();
  const { toast } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diagnosisFromScan, setDiagnosisFromScan] = useState<string | null>(null);
  const [imageFromScan, setImageFromScan] = useState<string | null>(null);
  
  // Check if we have diagnosis data from scan
  useEffect(() => {
    if (location.state?.diagnosis && location.state?.image) {
      setDiagnosisFromScan(location.state.diagnosis);
      setImageFromScan(location.state.image);
      // Open modal automatically if coming from scan
      setIsModalOpen(true);
    }
  }, [location.state]);
  
  const handleAddEntry = (entry: TimelineEntryProps) => {
    addToTimeline(entry);
    setIsModalOpen(false);
    
    toast({
      title: "Timeline Updated",
      description: "New entry has been added to the timeline",
    });
    
    // Clear navigation state after adding
    if (location.state) {
      window.history.replaceState({}, document.title);
      setDiagnosisFromScan(null);
      setImageFromScan(null);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navigation activeTab="" setActiveTab={() => {}} />
      
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Plant Timeline</h1>
            <p className="text-gray-600">Track your plant's health journey and recovery progress over time</p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => navigate("/scan")}
          >
            New Scan
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <PlantTimeline
              entries={timelineItems}
              onAddEntry={() => setIsModalOpen(true)}
            />
          </div>
          <div className="space-y-6">
            <WeatherWidget />
            
            <div className="bg-white/90 rounded-lg border border-green-100 p-4">
              <h2 className="text-lg font-medium text-green-800 mb-3">Plant Health Tips</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">1</span>
                  <p>Monitor soil moisture levels regularly, especially during hot weather</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">2</span>
                  <p>Look for early signs of diseases like discoloration or spots on leaves</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">3</span>
                  <p>Adjust watering based on current weather conditions</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">4</span>
                  <p>Apply treatments early in the morning or late evening for best results</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <AddTimelineEntryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddEntry}
        initialDiagnosis={diagnosisFromScan}
        initialImage={imageFromScan}
      />
      
      <Footer />
    </div>
  );
};

export default TimelinePage;
