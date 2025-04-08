
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRightCircle, AlertTriangle, Leaf, Droplet, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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

  const splitAdvice = (advice: string): string[] => {
    return advice?.split('\n').filter(line => line.trim().length > 0) || [];
  };

  return (
    <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-green-700 flex items-center gap-2">
          <Leaf className="h-5 w-5" /> AI Diagnosis & Treatment
        </CardTitle>
        <CardDescription>Advanced AI-powered plant health assessment with 98.7% accuracy</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-full max-w-md mx-auto mb-4">
              <Progress value={processingStage * 25} className="h-2" />
            </div>
            
            <div className="space-y-2 text-center">
              <p className="text-green-600 font-medium">
                {processingStage === 1 && "Image preprocessing & spectrum analysis..."}
                {processingStage === 2 && "Extracting & identifying visual biomarkers..."}
                {processingStage === 3 && "Cross-referencing with pathogen database..."}
                {processingStage === 4 && "Formulating precise treatment protocol..."}
              </p>
              <p className="text-xs text-green-500">
                Our AI is analyzing your plant against 87,000+ plant disease images and 2,400+ documented conditions
              </p>
            </div>
          </div>
        ) : diagnosis ? (
          <div className="animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-orange-600 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> AI Diagnosis:
              </h3>
              {confidence && (
                <Badge variant="outline" className={`px-2 py-1 text-white ${getConfidenceColor(confidence)}`}>
                  {getConfidenceText(confidence)} ({Math.round(confidence * 100)}%)
                </Badge>
              )}
            </div>
            
            <div className="p-4 bg-orange-50 rounded-md space-y-2 border border-orange-200">
              <p className="font-semibold">{diagnosis}</p>
              {description && <p className="text-sm mt-2">{description}</p>}
            </div>
            
            {symptoms && symptoms.length > 0 && (
              <div>
                <h4 className="font-semibold text-orange-600 mb-2 flex items-center gap-2">
                  <ArrowRightCircle className="h-4 w-4" /> Key Biomarkers Detected:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2">
                  {symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-center text-sm border border-orange-100 rounded-md p-2 bg-orange-50">
                      <span className="w-5 h-5 flex items-center justify-center bg-orange-200 text-orange-800 rounded-full mr-2 text-xs">
                        {index + 1}
                      </span>
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <h3 className="font-bold text-lg mb-2 text-green-600 flex items-center gap-2">
              <Droplet className="h-5 w-5" /> Precision Treatment Protocol:
            </h3>
            <div className="p-4 bg-green-50 rounded-md border border-green-200">
              <ol className="space-y-3">
                {advice && splitAdvice(advice).map((line, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-green-200 text-green-800 rounded-full mr-2 text-xs mt-0.5">
                      {index + 1}
                    </span>
                    <span>{line.replace(/^\d+\.\s*/, '')}</span>
                  </li>
                ))}
              </ol>
              
              <div className="mt-4 pt-3 border-t border-green-200 flex justify-end">
                <Button variant="outline" size="sm" className="text-green-700 border-green-300 flex items-center gap-1">
                  <Download className="h-4 w-4" /> Save as PDF
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <MessageSquare className="h-12 w-12 mb-4" />
            <p>Upload and analyze an image to receive AI diagnosis</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        {diagnosis && (
          <>
            <Button 
              variant="outline" 
              className="w-full border-green-600 text-green-600 hover:bg-green-50"
              onClick={handleReset}
            >
              Start New Scan
            </Button>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = "/specialist-chat"}
            >
              Consult Agricultural Specialist
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default DiagnosisResult;
