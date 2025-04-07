
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Settings, BellRing, BarChart } from "lucide-react";

const EnterpriseSection = () => {
  const enterpriseFeatures = [
    {
      icon: <Users className="h-5 w-5 text-green-600 mr-2" />,
      title: "Team Management",
      description: "Collaborate with your team by sharing insights and coordinating treatment plans."
    },
    {
      icon: <Settings className="h-5 w-5 text-green-600 mr-2" />,
      title: "API Integration",
      description: "Connect with your existing farm management software through our robust API."
    },
    {
      icon: <BellRing className="h-5 w-5 text-green-600 mr-2" />,
      title: "Custom Alerts",
      description: "Set up tailored alert systems for different crop types and conditions."
    },
    {
      icon: <BarChart className="h-5 w-5 text-green-600 mr-2" />,
      title: "Advanced Analytics",
      description: "Gain deeper insights with comprehensive reports and predictive analysis."
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium text-sm mb-4">🏢 ENTERPRISE SOLUTIONS</span>
            <h2 className="text-3xl font-bold text-green-800 mb-6">Powerful Tools for Commercial Farms</h2>
            <p className="text-lg text-green-700 mb-8">
              Our enterprise platform offers advanced features for large-scale agricultural operations, integrating seamlessly with your existing farm management systems.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {enterpriseFeatures.map((feature, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    {feature.icon}
                    <h3 className="font-semibold text-green-800">{feature.title}</h3>
                  </div>
                  <p className="text-green-700 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-md transition-all duration-300"
            >
              <Link to="/about">Learn About Enterprise Solutions <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          
          <div className="lg:col-span-2">
            <img 
              src="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2574" 
              alt="Enterprise farm solutions" 
              className="rounded-xl shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseSection;
