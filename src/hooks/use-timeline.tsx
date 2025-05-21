
import { useContext, createContext, useState, useEffect, ReactNode } from "react";

type TimelineContextType = {
  addToTimeline: (data: any) => void;
  timelineItems: any[];
};

const TimelineContext = createContext<TimelineContextType>({
  addToTimeline: () => {},
  timelineItems: [],
});

export const TimelineProvider = ({ children }: { children: ReactNode }) => {
  const [timelineItems, setTimelineItems] = useState<any[]>([]);

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

  const addToTimeline = (data: any) => {
    const updatedItems = [...timelineItems, data];
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
