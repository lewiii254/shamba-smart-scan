import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  BookOpen, 
  MessageSquare, 
  History, 
  Users, 
  Plane,
  Bug,
  ArrowRight,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Quick Scan",
      description: "Upload and analyze plant images instantly",
      icon: <Camera className="h-5 w-5" />,
      color: "bg-green-500",
      action: () => navigate("/scan"),
      shortcut: "S"
    },
    {
      title: "Disease Library",
      description: "Browse comprehensive disease database",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-blue-500",
      action: () => navigate("/disease-library"),
      shortcut: "D"
    },
    {
      title: "Expert Chat",
      description: "Get help from agricultural specialists",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "bg-purple-500",
      action: () => navigate("/specialist-chat"),
      shortcut: "E"
    },
    {
      title: "Scan History",
      description: "Review previous diagnoses",
      icon: <History className="h-5 w-5" />,
      color: "bg-orange-500",
      action: () => navigate("/history"),
      shortcut: "H"
    },
    {
      title: "Community",
      description: "Connect with other farmers",
      icon: <Users className="h-5 w-5" />,
      color: "bg-cyan-500",
      action: () => navigate("/community-forum"),
      shortcut: "C"
    },
    {
      title: "Drone Analysis",
      description: "Analyze field imagery with AI",
      icon: <Plane className="h-5 w-5" />,
      color: "bg-indigo-500",
      action: () => navigate("/drone-analysis"),
      shortcut: "A"
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Quick Actions
        </CardTitle>
        <CardDescription>
          Access frequently used features with keyboard shortcuts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:shadow-md transition-all"
              onClick={action.action}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  {action.icon}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">
                    Ctrl+{action.shortcut}
                  </kbd>
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 self-end" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;