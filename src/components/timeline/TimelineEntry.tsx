
import React from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, HelpCircle } from "lucide-react";

export type TimelineEntryStatus = "improved" | "unchanged" | "worsened";

export interface TimelineEntryProps {
  date: Date;
  image: string;
  notes: string;
  status: TimelineEntryStatus;
  treatmentApplied?: string;
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({
  date,
  image,
  notes,
  status,
  treatmentApplied,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "improved":
        return <Check className="h-4 w-4 text-green-500" />;
      case "worsened":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "improved":
        return "bg-green-100 text-green-800 border-green-200";
      case "worsened":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <Card className="mb-4 border-l-4 hover:shadow-md transition-shadow duration-200" 
          style={{ borderLeftColor: status === "improved" ? "#34D399" : status === "worsened" ? "#F87171" : "#FBBF24" }}>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-4 md:mb-0 md:mr-4">
            <div className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
              <img src={image} alt="Plant status" className="object-cover w-full h-full" />
              <div className="absolute top-2 right-2">
                <Badge className={getStatusColor()}>
                  <span className="flex items-center">
                    {getStatusIcon()}
                    <span className="ml-1 capitalize">{status}</span>
                  </span>
                </Badge>
              </div>
            </div>
          </div>
          <div className="md:w-3/4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">
                {format(date, "MMMM d, yyyy")}
              </h3>
              <span className="text-sm text-gray-500">
                {format(date, "h:mm a")}
              </span>
            </div>
            
            {treatmentApplied && (
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">Treatment Applied:</span>
                <p className="text-sm text-gray-600 ml-2">{treatmentApplied}</p>
              </div>
            )}
            
            <div>
              <span className="text-sm font-medium text-gray-700">Notes:</span>
              <p className="text-sm text-gray-600 ml-2">{notes}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineEntry;
