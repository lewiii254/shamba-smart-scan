
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Shield, BarChart } from "lucide-react";

const FeatureSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium text-sm mb-2">🤖 AI TECHNOLOGY</span>
          <h2 className="text-3xl font-bold text-green-800 mb-4">How Our AI Protects Your Crops 🌿</h2>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Crop Doctor uses advanced machine learning algorithms trained on over 50,000 images to diagnose plant diseases with up to 95% accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Leaf className="h-8 w-8 text-green-600" />}
            title="🧠 Deep Learning Model"
            description="Our convolutional neural network is trained on thousands of plant disease images to recognize visual patterns with high accuracy."
          />
          
          <FeatureCard 
            icon={<Shield className="h-8 w-8 text-green-600" />}
            title="💊 AI Treatment Plans"
            description="After diagnosis, our AI generates tailored treatment recommendations developed with agricultural scientists."
          />
          
          <FeatureCard 
            icon={<BarChart className="h-8 w-8 text-green-600" />}
            title="📊 ML-Powered Analytics"
            description="Our machine learning algorithms analyze your scan history to identify patterns and improve future recommendations."
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Card className="border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-green-300">
    <CardContent className="pt-6">
      <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
      <p className="text-green-700">{description}</p>
    </CardContent>
  </Card>
);

export default FeatureSection;
