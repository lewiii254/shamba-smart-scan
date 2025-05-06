
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      initial: "J",
      name: "Ann Njeru. 👨‍🌾",
      role: "Small-scale Farmer",
      text: "Crop Doctor has transformed how I manage my farm. Identifying diseases early has saved me thousands in potential crop losses. Highly recommend! 🌱"
    },
    {
      initial: "S",
      name: "Stephen Ndwiga. 👩‍🌾",
      role: "Urban Gardener",
      text: "As a hobby gardener, I was always struggling with plant diseases. Crop Doctor makes it so easy to identify and treat problems! My garden has never looked better. 🌿"
    },
    {
      initial: "R",
      name: "Wilson Omondi. 🧑‍🌾",
      role: "Commercial Grower",
      text: "This app has become an essential tool for our farm operations. The instant diagnosis helps us take action quickly and protect our yields. Worth every penny! 💯"
    }
  ];

  return (
    <div className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium text-sm mb-2">💬 TESTIMONIALS</span>
          <h2 className="text-3xl font-bold text-green-800 mb-4">What Our Users Say 🌟</h2>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Thousands of farmers and gardeners trust Crop Doctor to protect their plants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              initial={testimonial.initial}
              name={testimonial.name}
              role={testimonial.role}
              text={testimonial.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface TestimonialCardProps {
  initial: string;
  name: string;
  role: string;
  text: string;
}

const TestimonialCard = ({ initial, name, role, text }: TestimonialCardProps) => (
  <Card className="border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-green-300">
    <CardContent className="pt-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
          <span className="text-green-600 font-bold">{initial}</span>
        </div>
        <div>
          <h4 className="font-semibold text-green-800">{name}</h4>
          <p className="text-sm text-green-600">{role}</p>
        </div>
      </div>
      <div className="pl-4 border-l-2 border-green-200">
        <MessageSquare className="text-green-300 mb-2 h-6 w-6" />
        <p className="text-green-700 italic">{text}</p>
      </div>
    </CardContent>
  </Card>
);

export default TestimonialsSection;
