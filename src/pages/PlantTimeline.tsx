
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PlantTimeline from "@/components/timeline/PlantTimeline";
import AddTimelineEntryModal from "@/components/timeline/AddTimelineEntryModal";
import { TimelineEntryProps } from "@/components/timeline/TimelineEntry";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PlantTimelinePage = () => {
  const [activeTab, setActiveTab] = useState("timeline");
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntryProps[]>([]);
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we have an initial plant image from a diagnosis
  const initialImage = location.state?.image || null;

  useEffect(() => {
    if (user) {
      fetchTimelineEntries();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchTimelineEntries = async () => {
    try {
      setIsLoading(true);

      // In a full implementation, this would fetch timeline entries from Supabase
      // For now, we'll use mock data or localStorage

      // Example of how to fetch from Supabase if you had a timeline_entries table:
      // const { data, error } = await supabase
      //   .from('timeline_entries')
      //   .select('*')
      //   .eq('user_id', user.id)
      //   .order('created_at', { ascending: false });

      // For demo, let's use localStorage
      const storedEntries = localStorage.getItem('plantTimelineEntries');
      if (storedEntries) {
        // Convert date strings back to Date objects
        const entries = JSON.parse(storedEntries).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        setTimelineEntries(entries);
      }
      
    } catch (error: any) {
      console.error('Error fetching timeline entries:', error);
      toast({
        title: 'Error',
        description: 'Failed to load timeline entries',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEntry = (entry: TimelineEntryProps) => {
    // Add new entry to state
    const updatedEntries = [...timelineEntries, entry];
    setTimelineEntries(updatedEntries);
    
    // Save to localStorage for demo purposes
    // In a full implementation, you would save to Supabase
    localStorage.setItem('plantTimelineEntries', JSON.stringify(
      updatedEntries.map(entry => ({
        ...entry,
        date: entry.date.toISOString() // Convert Date to string for storage
      }))
    ));
    
    toast({
      title: 'Entry Added',
      description: 'Your timeline entry has been saved successfully.'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navigation activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab)} />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-green-800 mb-6">Plant Health Timeline</h1>
          <p className="text-gray-600 mb-8">
            Track the progress of your plant's health over time. Document treatments and observe how your plant responds.
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline" className="pt-4">
              <PlantTimeline 
                entries={timelineEntries} 
                onAddEntry={() => setIsAddEntryModalOpen(true)} 
              />
            </TabsContent>
            
            <TabsContent value="insights" className="pt-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Health Insights</h2>
                
                {timelineEntries.length > 0 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <h3 className="font-semibold text-green-800 mb-2">Health Trend</h3>
                        <p className="text-green-700">
                          {timelineEntries.filter(e => e.status === 'improved').length > 
                           timelineEntries.filter(e => e.status === 'worsened').length 
                            ? 'Improving' : 'Needs Attention'}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="font-semibold text-blue-800 mb-2">Timeline Entries</h3>
                        <p className="text-blue-700">{timelineEntries.length} records</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h3 className="font-semibold text-purple-800 mb-2">Tracking Since</h3>
                        <p className="text-purple-700">
                          {new Date(Math.min(...timelineEntries.map(e => e.date.getTime())))
                            .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Effective Treatments</h3>
                      <ul className="list-disc pl-5 text-gray-700">
                        {timelineEntries
                          .filter(e => e.status === 'improved' && e.treatmentApplied)
                          .map((entry, index) => (
                            <li key={index}>{entry.treatmentApplied}</li>
                          ))}
                        {timelineEntries.filter(e => e.status === 'improved' && e.treatmentApplied).length === 0 && (
                          <li className="text-gray-500">No effective treatments recorded yet.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">No timeline entries yet. Add entries to see insights.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <AddTimelineEntryModal 
        isOpen={isAddEntryModalOpen}
        onClose={() => setIsAddEntryModalOpen(false)}
        onSave={handleAddEntry}
        currentImage={initialImage}
      />
      
      <Footer />
    </div>
  );
};

export default PlantTimelinePage;
