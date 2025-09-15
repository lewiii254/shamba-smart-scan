
import { useContext, createContext, useState, useEffect, ReactNode } from "react";

interface TimelineItem {
  id: string;
  date: string;
  diagnosis: string;
  image?: string;
  treatment?: string;
  confidence?: number;
  plantType?: string;
  location?: string;
}

type TimelineContextType = {
  addToTimeline: (data: Partial<TimelineItem>) => void;
  timelineItems: TimelineItem[];
};

const TimelineContext = createContext<TimelineContextType>({
  addToTimeline: () => {},
  timelineItems: [],
});

export const TimelineProvider = ({ children }: { children: ReactNode }) => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);

  // Load timeline items from localStorage on mount
  useEffect(() => {
    const storedItems = localStorage.getItem("plantTimelineEntries");
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        setTimelineItems(parsedItems);
      } catch (error) {
        console.error("Error parsing timeline items from localStorage:", error);
      }
    }
  }, []);

  const addToTimeline = (data: Partial<TimelineItem>) => {
    const newItem: TimelineItem = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      diagnosis: 'Unknown',
      ...data,
    };
    const updatedItems = [...timelineItems, newItem];
    setTimelineItems(updatedItems);
    localStorage.setItem("plantTimelineEntries", JSON.stringify(updatedItems));
  };

  return (
    <TimelineContext.Provider value={{ addToTimeline, timelineItems }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => useContext(TimelineContext);
