
import React from "react";

const WorkflowSection = () => {
  const steps = [
    {
      number: 1,
      title: "📸 Image Capture",
      description: "Take a clear photo of the affected plant part using your smartphone camera."
    },
    {
      number: 2,
      title: "🔄 AI Processing",
      description: "Our deep learning model extracts visual features and compares them against our disease database."
    },
    {
      number: 3,
      title: "🧪 Disease Analysis",
      description: "The AI identifies the disease with confidence scoring and severity assessment."
    },
    {
      number: 4,
      title: "✅ Expert Treatment",
      description: "Receive AI-generated treatment plans validated by agricultural scientists."
    }
  ];

  return (
    <div className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium text-sm mb-2">🔍 AI WORKFLOW</span>
          <h2 className="text-3xl font-bold text-green-800 mb-4">How Our AI Technology Works 🧠</h2>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            From image upload to diagnosis, our advanced AI processes your plant images using state-of-the-art computer vision techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <WorkflowStep 
              key={index}
              number={step.number} 
              title={step.title} 
              description={step.description} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
}

const WorkflowStep = ({ number, title, description }: WorkflowStepProps) => (
  <div className="flex flex-col items-center text-center">
    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg">
      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold text-green-600">{number}</div>
    </div>
    <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
    <p className="text-green-700">{description}</p>
  </div>
);

export default WorkflowSection;
