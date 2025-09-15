import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Camera, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  User
} from "lucide-react";

interface RecentActivityItem {
  id: string;
  type: "scan" | "diagnosis" | "expert_chat" | "community";
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "warning" | "info";
  confidence?: number;
}

const RecentActivity = () => {
  // Mock data - in a real app this would come from an API
  const activities: RecentActivityItem[] = [
    {
      id: "1",
      type: "scan",
      title: "Tomato Leaf Scanned",
      description: "Late blight detected with 94% confidence",
      timestamp: "2 minutes ago",
      status: "success",
      confidence: 94
    },
    {
      id: "2",
      type: "diagnosis",
      title: "Treatment Recommended",
      description: "Copper-based fungicide treatment suggested",
      timestamp: "5 minutes ago",
      status: "info"
    },
    {
      id: "3",
      type: "expert_chat",
      title: "Expert Consultation",
      description: "Started chat with Dr. Maria Rodriguez",
      timestamp: "1 hour ago",
      status: "info"
    },
    {
      id: "4",
      type: "scan",
      title: "Maize Leaf Scanned",
      description: "Unable to detect disease clearly",
      timestamp: "2 hours ago",
      status: "warning",
      confidence: 67
    },
    {
      id: "5",
      type: "community",
      title: "Community Post",
      description: "Asked question about organic pest control",
      timestamp: "1 day ago",
      status: "info"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "scan":
        return <Camera className="h-4 w-4" />;
      case "diagnosis":
        return <CheckCircle className="h-4 w-4" />;
      case "expert_chat":
        return <User className="h-4 w-4" />;
      case "community":
        return <User className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50";
      case "warning":
        return "text-yellow-600 bg-yellow-50";
      case "info":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "success":
        return "default" as const;
      case "warning":
        return "secondary" as const;
      case "info":
        return "outline" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-500" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Your latest interactions and scan results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 truncate">
                    {activity.title}
                  </h4>
                  <div className="flex items-center gap-2 ml-2">
                    {activity.confidence && (
                      <Badge variant={getStatusBadgeVariant(activity.status)} className="text-xs">
                        {activity.confidence}%
                      </Badge>
                    )}
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.timestamp}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <button className="text-sm text-green-600 hover:text-green-700 font-medium">
            View all activity →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;