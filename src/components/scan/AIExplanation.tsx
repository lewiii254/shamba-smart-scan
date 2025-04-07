
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const AIExplanation = () => {
  return (
    <Card className="mt-8 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-green-700">How Our AI Works</CardTitle>
        <CardDescription>
          Advanced machine learning technology trained on thousands of plant disease images
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 rounded-full p-2">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium">Deep Learning Model</h3>
            </div>
            <p className="text-sm text-gray-600">
              Our AI uses a convolutional neural network trained on 50,000+ labeled images of plant diseases
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 rounded-full p-2">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium">Disease Recognition</h3>
            </div>
            <p className="text-sm text-gray-600">
              The AI can identify 40+ common plant diseases across 20+ crop types with high accuracy
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 rounded-full p-2">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium">Expert-Verified Treatments</h3>
            </div>
            <p className="text-sm text-gray-600">
              Treatment recommendations developed with agricultural scientists and plant pathologists
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIExplanation;
