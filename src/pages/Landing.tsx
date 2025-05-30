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
import { MessageSquare, ArrowRight, BookOpen, Video, Play, Film } from "lucide-react";
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
      
      {/* Disease Library Section */}
      <div className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium text-sm mb-2">
              📚 PLANT DISEASE ENCYCLOPEDIA
            </span>
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              Comprehensive Disease Library
            </h2>
            <p className="text-lg text-blue-700 max-w-3xl mx-auto">
              Access our extensive database of plant diseases, complete with detailed symptoms, causes, and treatment options.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-8 mb-12 items-center`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Disease Encyclopedia Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3 text-blue-600 font-bold">1</span>
                    <span className="text-blue-700">Searchable database of 100+ common plant diseases</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3 text-blue-600 font-bold">2</span>
                    <span className="text-blue-700">Detailed symptoms and identification guides</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3 text-blue-600 font-bold">3</span>
                    <span className="text-blue-700">Evidence-based treatment recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3 text-blue-600 font-bold">4</span>
                    <span className="text-blue-700">Categorized by plant type and disease category</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3 text-blue-600 font-bold">5</span>
                    <span className="text-blue-700">Prevention guides and best practices</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Browse by Category</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Fungal Diseases</h4>
                    <p className="text-sm text-blue-700">Powdery mildew, black spot, rust, late blight and more</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Bacterial Diseases</h4>
                    <p className="text-sm text-green-700">Bacterial leaf spot, fire blight, crown gall and more</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Viral Diseases</h4>
                    <p className="text-sm text-yellow-700">Mosaic virus, ringspot, curly top virus and more</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Pest Damage</h4>
                    <p className="text-sm text-red-700">Aphids, spider mites, thrips, scale insects and more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              asChild
              className={`bg-blue-600 hover:bg-blue-700 text-white ${isMobile ? 'px-4 py-4 text-base w-full' : 'px-6 py-6 rounded-lg text-lg'} shadow-lg transition-all duration-300`}
            >
              <Link to="/disease-library">
                <BookOpen className="mr-2" />
                Explore Disease Library
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <p className="mt-4 text-blue-700">
              Free access to our comprehensive plant disease reference
            </p>
          </div>
        </div>
      </div>
      
      {/* Expert Chat Section */}
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
      
      {/* Video Tutorials Section */}
      <div className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-medium text-sm mb-2">
              🎬 EDUCATIONAL CONTENT
            </span>
            <h2 className="text-3xl font-bold text-amber-800 mb-4">
              Video Tutorials
            </h2>
            <p className="text-lg text-amber-700 max-w-3xl mx-auto">
              Learn best practices for farming, disease management, and crop cultivation through our comprehensive video library.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-3'} gap-8 mb-12`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" 
                  alt="Disease Identification Tutorial" 
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-amber-500 rounded-full p-3 cursor-pointer hover:bg-amber-600 transition-colors">
                    <Play className="h-8 w-8 text-white" fill="white" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                  14:35
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-amber-800 text-lg">Identifying Common Plant Diseases</h3>
                <p className="text-amber-700 mt-2 text-sm">
                  Learn how to identify the most common plant diseases affecting crops in East Africa.
                </p>
                <div className="flex items-center mt-3">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AE</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600">Dr. Alex Edwards • 15k views</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src="https://img.youtube.com/vi/XVOlXXnX1yk/hqdefault.jpg" 
                  alt="Organic Farming Tutorial" 
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-amber-500 rounded-full p-3 cursor-pointer hover:bg-amber-600 transition-colors">
                    <Play className="h-8 w-8 text-white" fill="white" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                  23:12
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-amber-800 text-lg">Organic Farming Techniques</h3>
                <p className="text-amber-700 mt-2 text-sm">
                  Sustainable farming methods that improve soil health and increase crop yields.
                </p>
                <div className="flex items-center mt-3">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600">Mary Kimani • 8.7k views</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src="https://img.youtube.com/vi/LZhnCxG0-qc/hqdefault.jpg" 
                  alt="Pest Management Tutorial" 
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-amber-500 rounded-full p-3 cursor-pointer hover:bg-amber-600 transition-colors">
                    <Play className="h-8 w-8 text-white" fill="white" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                  17:45
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-amber-800 text-lg">Integrated Pest Management</h3>
                <p className="text-amber-700 mt-2 text-sm">
                  Effective strategies to manage pests while minimizing the use of chemical pesticides.
                </p>
                <div className="flex items-center mt-3">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JN</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600">John Ndegwa • 12.3k views</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              asChild
              className={`bg-amber-600 hover:bg-amber-700 text-white ${isMobile ? 'px-4 py-4 text-base w-full' : 'px-6 py-6 rounded-lg text-lg'} shadow-lg transition-all duration-300`}
            >
              <Link to="/video-library">
                <Film className="mr-2" />
                Explore Video Library
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <p className="mt-4 text-amber-700">
              Free access to our comprehensive educational video content
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
