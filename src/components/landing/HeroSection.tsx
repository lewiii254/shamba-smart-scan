
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const HeroSection = () => {
  const { user } = useAuth();
  
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-repeat bg-center"></div>
      <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-green-100 border border-green-300 text-green-800 font-medium text-sm mb-2">
              🧠 Advanced AI Plant Health Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-green-900 leading-tight">
              AI-Powered <span className="text-green-600">Disease Detection</span> For Your Crops 🌿
            </h1>
            <p className="text-lg md:text-xl text-green-800">
              Our machine learning technology diagnoses plant diseases with up to 95% accuracy. Upload a photo and get expert treatment recommendations in seconds!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-lg text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <Link to={user ? "/scan" : "/auth"}>Try AI Diagnosis <ChevronRight className="ml-2" /></Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 rounded-lg text-lg transition-all duration-300"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://www.google.com/imgres?q=Picture%20for%20a%20AI-Powered%20Disease%20Detection%20For%20Your%20Crops%20%F0%9F%8C%BF%20Our%20machine%20learning%20technology%20diagnoses%20plant%20diseases%20with%20up%20to%2095%25%20accuracy.%20Upload%20a%20photo%20and%20get%20expert%20treatment%20recommendations%20in%20seconds!&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2F90SY5wAZdbc%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D90SY5wAZdbc&docid=RvIv1ueq9dJ6XM&tbnid=PQB5LQ5pVXAeNM&vet=12ahUKEwiZhLC83MaMAxXKAtsEHWEsFXoQM3oECHAQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwiZhLC83MaMAxXKAtsEHWEsFXoQM3oECHAQAA" 
              alt="AI analyzing plants" 
              className="w-full h-auto object-cover"
            />
            <div className="bg-green-900/80 p-4 text-white">
              <p className="font-semibold text-lg">🧠 AI-Powered Analysis</p>
              <p className="text-sm text-white/90">Our deep learning model identifies 40+ plant diseases with high accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
