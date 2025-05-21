
import React from "react";
import { TimelineEntryProps } from "./TimelineEntry";
import TimelineEntry from "./TimelineEntry";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface PlantTimelineProps {
  entries: TimelineEntryProps[];
  onAddEntry: () => void;
}

const PlantTimeline: React.FC<PlantTimelineProps> = ({ entries, onAddEntry }) => {
  // Sort entries by date, newest first
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Health Timeline</h2>
        <Button 
          onClick={onAddEntry}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Entry
        </Button>
      </div>
      
      {sortedEntries.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No timeline entries yet. Add your first entry to start tracking plant health.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedEntries.map((entry, index) => (
            <TimelineEntry
              key={index}
              date={entry.date}
              image={entry.image}
              notes={entry.notes}
              status={entry.status}
              treatmentApplied={entry.treatmentApplied}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantTimeline;
