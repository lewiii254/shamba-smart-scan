import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Leaf, Shield, BarChart, MessageSquare, ArrowRight, Zap, Check, Sprout, Cloud, Sun, ThumbsUp, LineChart, Smartphone, Database, Users, Settings, BellRing } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";

const Landing = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
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
                src="https://images.unsplash.com/photo-1581922814484-0b48460b7010?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2832" 
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

      {/* What We Offer Section */}
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
            <Card className="border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-green-300">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">🧠 Deep Learning Model</h3>
                <p className="text-green-700">
                  Our convolutional neural network is trained on thousands of plant disease images to recognize visual patterns with high accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-green-300">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">💊 AI Treatment Plans</h3>
                <p className="text-green-700">
                  After diagnosis, our AI generates tailored treatment recommendations developed with agricultural scientists.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-green-300">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <BarChart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">📊 ML-Powered Analytics</h3>
                <p className="text-green-700">
                  Our machine learning algorithms analyze your scan history to identify patterns and improve future recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
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
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold text-green-600">1</div>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">📸 Image Capture</h3>
              <p className="text-green-700">
                Take a clear photo of the affected plant part using your smartphone camera.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center mt-8 md:mt-0">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold text-green-600">2</div>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">🔄 AI Processing</h3>
              <p className="text-green-700">
                Our deep learning model extracts visual features and compares them against our disease database.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center mt-8 md:mt-0">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold text-green-600">3</div>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">🧪 Disease Analysis</h3>
              <p className="text-green-700">
                The AI identifies the disease with confidence scoring and severity assessment.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center mt-8 md:mt-0">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold text-green-600">4</div>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">✅ Expert Treatment</h3>
              <p className="text-green-700">
                Receive AI-generated treatment plans validated by agricultural scientists.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
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
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="ml-3 text-green-800">
                    <span className="font-semibold">Early Detection 🔍</span> - Identify problems before they spread to your entire crop
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="ml-3 text-green-800">
                    <span className="font-semibold">Save Money 💰</span> - Reduce unnecessary pesticide use and prevent crop loss
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="ml-3 text-green-800">
                    <span className="font-semibold">Expert Knowledge 🧠</span> - Access agricultural expertise through AI technology
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="ml-3 text-green-800">
                    <span className="font-semibold">Easy to Use 📱</span> - No special equipment or technical knowledge needed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2574" 
                alt="Smart agriculture" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Data Analytics Section */}
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
            <Card className="border-green-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">AI Yield Prediction</h3>
                <p className="text-green-700 text-sm">
                  Machine learning algorithms forecast crop yields by analyzing historical data and current conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Cloud className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">AI Weather Analysis</h3>
                <p className="text-green-700 text-sm">
                  Predictive models integrate weather data to help plan farming activities and protect crops.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">ML Soil Analysis</h3>
                <p className="text-green-700 text-sm">
                  AI technology analyzes soil health metrics and generates optimal fertilization strategies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Real-time AI Monitoring</h3>
                <p className="text-green-700 text-sm">
                  Computer vision monitors your farm's health from anywhere using our mobile app with alerts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enterprise Solutions Section */}
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
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Users className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">Team Management</h3>
                  </div>
                  <p className="text-green-700 text-sm">
                    Collaborate with your team by sharing insights and coordinating treatment plans.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Settings className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">API Integration</h3>
                  </div>
                  <p className="text-green-700 text-sm">
                    Connect with your existing farm management software through our robust API.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <BellRing className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">Custom Alerts</h3>
                  </div>
                  <p className="text-green-700 text-sm">
                    Set up tailored alert systems for different crop types and conditions.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <BarChart className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">Advanced Analytics</h3>
                  </div>
                  <p className="text-green-700 text-sm">
                    Gain deeper insights with comprehensive reports and predictive analysis.
                  </p>
                </div>
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

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Experience the power of AI in agriculture today! 🌿</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of farmers already using our AI technology to detect diseases early and protect their crops. Get started in just seconds! ✨
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-6 rounded-lg transition-all duration-300 shadow-lg"
            >
              <Link to={user ? "/scan" : "/auth"}>
                Try Our AI Scanner Now
                <Zap className="ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-lg text-lg"
            >
              <Link to="/about">
                Learn About Our Technology
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
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
            <Card className="border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-green-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">J</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800">John D. 👨‍🌾</h4>
                    <p className="text-sm text-green-600">Small-scale Farmer</p>
                  </div>
                </div>
                <div className="pl-4 border-l-2 border-green-200">
                  <MessageSquare className="text-green-300 mb-2 h-6 w-6" />
                  <p className="text-green-700 italic">
                    "Crop Doctor has transformed how I manage my farm. Identifying diseases early has saved me thousands in potential crop losses. Highly recommend! 🌱"
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-green-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800">Sarah M. 👩‍🌾</h4>
                    <p className="text-sm text-green-600">Urban Gardener</p>
                  </div>
                </div>
                <div className="pl-4 border-l-2 border-green-200">
                  <MessageSquare className="text-green-300 mb-2 h-6 w-6" />
                  <p className="text-green-700 italic">
                    "As a hobby gardener, I was always struggling with plant diseases. Crop Doctor makes it so easy to identify and treat problems! My garden has never looked better. 🌿"
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-green-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">R</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800">Robert K. 🧑‍🌾</h4>
                    <p className="text-sm text-green-600">Commercial Grower</p>
                  </div>
                </div>
                <div className="pl-4 border-l-2 border-green-200">
                  <MessageSquare className="text-green-300 mb-2 h-6 w-6" />
                  <p className="text-green-700 italic">
                    "This app has become an essential tool for our farm operations. The instant diagnosis helps us take action quickly and protect our yields. Worth every penny! 💯"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md py-8 border-t border-green-100 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">Crop Doctor 🌱</h3>
              <p className="text-green-700 mb-4">Helping farmers and gardeners worldwide protect their plants with AI-powered diagnosis.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-green-600 hover:text-green-800 transition-colors">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
                <a href="#" className="text-green-600 hover:text-green-800 transition-colors">
                  <span className="sr-only">Facebook</span>
                  📘
                </a>
                <a href="#" className="text-green-600 hover:text-green-800 transition-colors">
                  <span className="sr-only">Instagram</span>
                  📸
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-green-600 hover:text-green-800 transition-colors">Home</Link></li>
                <li><Link to="/scan" className="text-green-600 hover:text-green-800 transition-colors">Scan Plants</Link></li>
                <li><Link to="/history" className="text-green-600 hover:text-green-800 transition-colors">Scan History</Link></li>
                <li><Link to="/about" className="text-green-600 hover:text-green-800 transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-green-700">
                  <Sprout className="h-5 w-5 text-green-600 mr-2" />
                  support@cropdoctor.com
                </li>
                <li className="flex items-center text-green-700">
                  <Cloud className="h-5 w-5 text-green-600 mr-2" />
                  Download our mobile app
                </li>
                <li className="flex items-center text-green-700">
                  <Sun className="h-5 w-5 text-green-600 mr-2" />
                  Subscribe to plant tips
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-green-100">
            <div className="text-green-700 mb-4 md:mb-0">
              <span className="font-semibold">© 2025 Crop Doctor</span> - Growing a healthier world 🌎
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-green-600 hover:text-green-800 transition-colors">Privacy</Link>
              <Link to="/" className="text-green-600 hover:text-green-800 transition-colors">Terms</Link>
              <Link to="/" className="text-green-600 hover:text-green-800 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
