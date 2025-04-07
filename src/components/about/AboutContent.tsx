
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const AboutContent = () => {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-green-800">About Crop Doctor AI</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-green max-w-none">
        <p>Crop Doctor is an AI-powered application designed to help farmers and gardeners identify plant diseases and get treatment recommendations quickly using advanced machine learning technology.</p>
        
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
        
        <div className="bg-green-50 p-4 rounded-md mt-6">
          <h3 className="text-lg font-semibold text-green-700">Need Help?</h3>
          <p className="text-green-600">For support or feedback about our AI technology, please contact us at support@cropdoctor.com</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutContent;
