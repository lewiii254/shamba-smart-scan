
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DiagnosisResultProps {
  isLoading: boolean;
  processingStage: number;
  diagnosis: string | null;
  description: string | null;
  symptoms: string[] | null;
  advice: string | null;
  confidence: number | null;
  handleReset: () => void;
}

const DiagnosisResult = ({ 
  isLoading, 
  processingStage, 
  diagnosis, 
  description, 
  symptoms, 
  advice, 
  confidence, 
  handleReset 
}: DiagnosisResultProps) => {
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500";
    if (confidence >= 0.8) return "bg-green-400";
    if (confidence >= 0.7) return "bg-yellow-400";
    if (confidence >= 0.6) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.9) return "Very High";
    if (confidence >= 0.8) return "High";
    if (confidence >= 0.7) return "Moderate";
    if (confidence >= 0.6) return "Fair";
    return "Low";
  };

  return (
    <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-green-700">AI Diagnosis & Treatment</CardTitle>
        <CardDescription>Advanced AI-powered plant health assessment</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-full max-w-md mx-auto mb-4">
              <Progress value={processingStage * 25} className="h-2" />
            </div>
            
            <div className="space-y-2 text-center">
              <p className="text-green-600 font-medium">
                {processingStage === 1 && "Image preprocessing..."}
                {processingStage === 2 && "Extracting visual features..."}
                {processingStage === 3 && "Matching against disease database..."}
                {processingStage === 4 && "Generating treatment recommendations..."}
              </p>
              <p className="text-xs text-green-500">
                Our AI is analyzing your plant using our database of 50,000+ plant disease images
              </p>
            </div>
          </div>
        ) : diagnosis ? (
          <div className="animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-orange-600">AI Diagnosis:</h3>
              {confidence && (
                <div className="flex items-center space-x-1 text-sm">
                  <span>Confidence:</span>
                  <span className={`px-2 py-1 rounded-full text-white ${getConfidenceColor(confidence)}`}>
                    {getConfidenceText(confidence)} ({Math.round(confidence * 100)}%)
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-3 bg-orange-50 rounded-md space-y-2">
              <p className="font-semibold">{diagnosis}</p>
              {description && <p className="text-sm">{description}</p>}
            </div>
            
            {symptoms && symptoms.length > 0 && (
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Key Symptoms Detected:</h4>
                <ul className="list-disc list-inside text-sm pl-2 space-y-1">
                  {symptoms.map((symptom, index) => (
                    <li key={index} className="text-gray-700">{symptom}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <h3 className="font-bold text-lg mb-2 text-green-600">AI Treatment Recommendation:</h3>
            <div className="p-3 bg-green-50 rounded-md whitespace-pre-line">
              {advice}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <MessageSquare className="h-12 w-12 mb-4" />
            <p>Upload and analyze an image to receive AI diagnosis</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {diagnosis && (
          <Button 
            variant="outline" 
            className="w-full border-green-600 text-green-600 hover:bg-green-50"
            onClick={handleReset}
          >
            Start New Scan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DiagnosisResult;
