
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Leaf, Shield, BarChart, MessageSquare, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-50 via-green-100 to-green-200">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-repeat bg-center"></div>
        <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-green-100 border border-green-300 text-green-800 font-medium text-sm mb-2">
                AI-Powered Plant Health Assistant
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-green-900 leading-tight">
                Your Crops Deserve <span className="text-green-600">Expert Care</span>
              </h1>
              <p className="text-lg md:text-xl text-green-800">
                Diagnose plant diseases instantly with our AI technology. Get expert advice and treatment recommendations in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-lg text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <Link to="/scan">Get Started <ChevronRight className="ml-2" /></Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 rounded-lg text-lg"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/placeholder.svg" 
                  alt="Crop Doctor in action" 
                  className="w-full h-auto bg-white p-6"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <p className="font-semibold text-lg">Instant Plant Diagnosis</p>
                    <p className="text-sm text-white/90">Upload a photo and get results in seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Why Choose Crop Doctor?</h2>
            <p className="text-lg text-green-700 max-w-3xl mx-auto">
              Our AI-powered platform helps farmers and gardeners identify and treat plant diseases quickly and accurately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-green-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Instant Diagnosis</h3>
                <p className="text-green-700">
                  Upload a photo and get an instant diagnosis of your plant's condition using our advanced AI technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Treatment Plans</h3>
                <p className="text-green-700">
                  Receive detailed treatment recommendations to effectively address plant diseases and deficiencies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <BarChart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Track Progress</h3>
                <p className="text-green-700">
                  Keep a history of your plant scans to monitor health improvements and recurring issues over time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to protect your crops?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start using Crop Doctor today and give your plants the care they deserve.
          </p>
          <Button
            asChild
            className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-6 rounded-lg"
          >
            <Link to="/scan">
              Start Scanning Now
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">What Our Users Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-green-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">Farmer {i}</h4>
                      <p className="text-sm text-green-600">Small-scale Farmer</p>
                    </div>
                  </div>
                  <div className="pl-4 border-l-2 border-green-200">
                    <MessageSquare className="text-green-300 mb-2 h-6 w-6" />
                    <p className="text-green-700 italic">
                      "Crop Doctor has transformed how I manage my farm. Identifying diseases early has saved me thousands in potential crop losses."
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md py-6 border-t border-green-100 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-green-700 mb-4 md:mb-0">
              <span className="font-semibold">© 2025 Crop Doctor</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-green-600 hover:text-green-800 transition-colors">Home</Link>
              <Link to="/scan" className="text-green-600 hover:text-green-800 transition-colors">Scan</Link>
              <Link to="/about" className="text-green-600 hover:text-green-800 transition-colors">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
