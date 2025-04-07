
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Cloud, Database, Smartphone } from "lucide-react";

const AnalyticsSection = () => {
  const analyticFeatures = [
    {
      icon: <LineChart className="h-6 w-6 text-green-600" />,
      title: "AI Yield Prediction",
      description: "Machine learning algorithms forecast crop yields by analyzing historical data and current conditions."
    },
    {
      icon: <Cloud className="h-6 w-6 text-green-600" />,
      title: "AI Weather Analysis",
      description: "Predictive models integrate weather data to help plan farming activities and protect crops."
    },
    {
      icon: <Database className="h-6 w-6 text-green-600" />,
      title: "ML Soil Analysis",
      description: "AI technology analyzes soil health metrics and generates optimal fertilization strategies."
    },
    {
      icon: <Smartphone className="h-6 w-6 text-green-600" />,
      title: "Real-time AI Monitoring",
      description: "Computer vision monitors your farm's health from anywhere using our mobile app with alerts."
    }
  ];

  return (
    <div className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium text-sm mb-2">📊 AI INSIGHTS</span>
          <h2 className="text-3xl font-bold text-green-800 mb-4">Machine Learning Agricultural Intelligence</h2>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Our AI platform combines computer vision, predictive analytics, and agricultural science to deliver insights that boost productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticFeatures.map((feature, index) => (
            <AnalyticsCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface AnalyticsCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AnalyticsCard = ({ icon, title, description }: AnalyticsCardProps) => (
  <Card className="border-green-100 hover:shadow-lg transition-all duration-300">
    <CardContent className="pt-6">
      <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-green-800 mb-2">{title}</h3>
      <p className="text-green-700 text-sm">{description}</p>
    </CardContent>
  </Card>
);

export default AnalyticsSection;
