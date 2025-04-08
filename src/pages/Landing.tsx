
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import AnalyticsSection from "@/components/landing/AnalyticsSection";
import EnterpriseSection from "@/components/landing/EnterpriseSection";
import CtaSection from "@/components/landing/CtaSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FooterSection from "@/components/landing/FooterSection";
import { useAuth } from "@/components/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

const Landing = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <FeatureSection />
      <WorkflowSection />
      <BenefitsSection />
      
      {/* Expert Chat Section - updated for mobile */}
      <div className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium text-sm mb-2">
              👩‍🌾 LIVE EXPERT CONSULTATIONS
            </span>
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Connect with Agricultural Specialists
            </h2>
            <p className="text-lg text-green-700 max-w-3xl mx-auto">
              Get personalized advice from experienced plant pathologists, botanical researchers, and agricultural scientists.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-3'} gap-8 mb-12`}>
            {/* Expert Cards */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-green-800">Dr. Maria Rodriguez</h3>
                    <p className="text-sm text-green-600">Plant Pathologist</p>
                  </div>
                  <span className="ml-auto w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <p className="text-green-700 mb-4">
                  "I specialize in fungal diseases affecting crops. With over 12 years of experience, I can help identify issues before they spread."
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JT</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-green-800">John Thompson</h3>
                    <p className="text-sm text-green-600">Agricultural Scientist</p>
                  </div>
                  <span className="ml-auto w-3 h-3 bg-yellow-500 rounded-full"></span>
                </div>
                <p className="text-green-700 mb-4">
                  "Expert in integrated pest management with focus on sustainable and organic solutions for all types of crops."
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-green-800">Dr. Sarah Chen</h3>
                    <p className="text-sm text-green-600">Botanical Researcher</p>
                  </div>
                  <span className="ml-auto w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <p className="text-green-700 mb-4">
                  "Research scientist specializing in tropical and subtropical plant diseases with extensive knowledge of plant health."
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              asChild
              className={`bg-green-600 hover:bg-green-700 text-white ${isMobile ? 'px-4 py-4 text-base w-full' : 'px-6 py-6 rounded-lg text-lg'} shadow-lg transition-all duration-300`}
            >
              <Link to={user ? "/specialist-chat" : "/auth"}>
                <MessageSquare className="mr-2" />
                Start Expert Consultation
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <p className="mt-4 text-green-700">
              Get immediate answers to your specific plant health questions
            </p>
          </div>
        </div>
      </div>
      
      <AnalyticsSection />
      <EnterpriseSection />
      <CtaSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
};

export default Landing;
