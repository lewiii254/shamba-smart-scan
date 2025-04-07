
import React from "react";
import { Check } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Early Detection 🔍",
      description: "Identify problems before they spread to your entire crop"
    },
    {
      title: "Save Money 💰",
      description: "Reduce unnecessary pesticide use and prevent crop loss"
    },
    {
      title: "Expert Knowledge 🧠",
      description: "Access agricultural expertise through AI technology"
    },
    {
      title: "Easy to Use 📱",
      description: "No special equipment or technical knowledge needed"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium text-sm mb-4">🌟 BENEFITS</span>
            <h2 className="text-3xl font-bold text-green-800 mb-6">Grow Healthier Plants & Increase Yields 🌱</h2>
            <p className="text-lg text-green-700 mb-8">
              Join thousands of farmers and gardeners who are using Crop Doctor to protect their plants and maximize productivity.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="ml-3 text-green-800">
                    <span className="font-semibold">{benefit.title}</span> - {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-xl shadow-xl">
            <img 
              src="https://media.istockphoto.com/id/1194671122/photo/farmer-hold-a-smartphone-on-a-background-of-a-field-with-a-pepper-plantations-agricultural.webp?a=1&b=1&s=612x612&w=0&k=20&c=hfY_EczfH89vEM_HEdxAjpDMSmolFe6cEBDe0BQpKoU=" 
              alt="Smart agriculture" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
