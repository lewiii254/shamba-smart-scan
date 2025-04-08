
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Users, Calendar, Award, Target, Leaf, Database } from "lucide-react";

const AboutContent = () => {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-green-800">About Crop Doctor AI</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-green max-w-none">
        <p>Crop Doctor is an AI-powered application designed to help farmers and gardeners identify plant diseases and get treatment recommendations quickly using advanced machine learning technology.</p>
        
        <h3 className="text-xl font-semibold text-green-700 mt-6">Our Story</h3>
        <p>Founded in 2025 by a team of agricultural scientists and AI engineers, Crop Doctor emerged from a simple idea: make advanced plant disease diagnosis accessible to everyone. What started as a research project at the University of Agricultural Sciences quickly grew into a mission to revolutionize how farmers worldwide protect their crops.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">Our Team</h4>
            <p className="text-sm">15+ experts in agronomy, machine learning, and rural development working across 3 continents</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
            <Calendar className="h-8 w-8 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">Launch Date</h4>
            <p className="text-sm">Platform launched in March 2025 after several months of development and field testing</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
            <Award className="h-8 w-8 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">Recognition</h4>
            <p className="text-sm">Winner of the 2025 AgTech Innovation Award and backed by prominent agricultural investors</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
            <Target className="h-8 w-8 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-800">Our Vision</h4>
            <p className="text-sm">To reduce global crop losses by 20% by 2030 through accessible AI technology</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-green-700 mt-6">Our AI Technology</h3>
        <p>Our artificial intelligence system uses deep learning models trained on a database of over 50,000 images of plant diseases. The AI can identify common diseases across a wide range of crops with high accuracy.</p>
        
        <div className="bg-green-50 p-4 rounded-md my-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-green-800 font-medium">AI Diagnosis Disclaimer</p>
            <p className="text-xs text-green-700 mt-1">While our AI system is highly accurate, it should be used as a diagnostic aid. For critical agricultural decisions, we recommend consulting with a professional agronomist or plant pathologist.</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-green-700 mt-6">How Our AI Works</h3>
        <ol className="space-y-2 list-decimal list-inside">
          <li><strong>Image Preprocessing:</strong> The AI optimizes your uploaded image for analysis.</li>
          <li><strong>Feature Extraction:</strong> Using convolutional neural networks, the AI identifies key visual features.</li>
          <li><strong>Disease Classification:</strong> The AI compares features against its trained disease database.</li>
          <li><strong>Treatment Generation:</strong> Based on the diagnosis, the AI provides expert-verified treatment recommendations.</li>
        </ol>
        
        <h3 className="text-xl font-semibold text-green-700 mt-6">Benefits of AI-Powered Diagnosis</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Speed:</strong> Get results in seconds rather than waiting days for lab tests</li>
          <li><strong>Accessibility:</strong> Diagnose plant problems from anywhere using just your smartphone</li>
          <li><strong>Early Detection:</strong> Identify diseases before they spread throughout your crop</li>
          <li><strong>Cost-Effective:</strong> Save money on unnecessary pesticides by targeting specific problems</li>
          <li><strong>Learning Tool:</strong> Build your knowledge of plant diseases over time</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-green-700 mt-6">Our Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="p-4 border border-green-200 rounded-lg text-center">
            <Leaf className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-700">75,000+</p>
            <p className="text-sm text-green-600">Plants scanned</p>
          </div>
          <div className="p-4 border border-green-200 rounded-lg text-center">
            <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-700">12,000+</p>
            <p className="text-sm text-green-600">Farmers helped</p>
          </div>
          <div className="p-4 border border-green-200 rounded-lg text-center">
            <Database className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-700">40+</p>
            <p className="text-sm text-green-600">Crop varieties</p>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-md mt-6">
          <h3 className="text-lg font-semibold text-green-700">Need Help?</h3>
          <p className="text-green-600">For support or feedback about our AI technology, please contact us at support@cropdoctor.com</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutContent;
