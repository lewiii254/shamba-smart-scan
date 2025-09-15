import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, HelpCircle, Loader2 } from "lucide-react";
import { AIAnalysisResult } from "@/services/enhancedAIService";

interface DiagnosisResultProps {
  isLoading: boolean;
  processingStage: number;
  processingMessage?: string;
  diagnosis: string | null;
  description: string | null;
  symptoms: string[] | null;
  advice: string | null;
  confidence: number | null;
  analysisResult?: AIAnalysisResult | null;
  handleReset: () => void;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  isLoading,
  processingStage,
  processingMessage,
  diagnosis,
  description,
  symptoms,
  advice,
  confidence,
  analysisResult,
  handleReset,
}) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500";
    if (confidence >= 0.8) return "bg-green-400";
    if (confidence >= 0.7) return "bg-yellow-400";
    if (confidence >= 0.6) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-green-700">Diagnosis Result</CardTitle>
        <CardDescription>AI analysis of the uploaded plant image</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
            <div className="text-center">
              <p className="font-medium text-gray-700">Processing your image...</p>
              {processingMessage && <p className="text-sm text-gray-500 mt-1">{processingMessage}</p>}
              <p className="text-xs text-gray-400 mt-2">Stage {processingStage}/5</p>
            </div>
          </div>
        ) : diagnosis ? (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-green-800">{diagnosis}</h3>
              {confidence !== null && (
                <Badge className={getConfidenceColor(confidence) + " text-white"}>
                  Confidence: {(confidence * 100).toFixed(0)}%
                </Badge>
              )}
            </div>
            
            {description && (
              <p className="text-gray-600">{description}</p>
            )}
            
            {symptoms && symptoms.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-green-700">Symptoms:</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {advice && (
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-green-700">Recommended Treatment:</h4>
                <p className="text-gray-600 whitespace-pre-line">{advice}</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                className="bg-green-100 text-green-700 rounded-md px-4 py-2 hover:bg-green-200 transition-colors"
                onClick={handleReset}
              >
                <HelpCircle className="mr-2 inline-block h-4 w-4" />
                New Diagnosis
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            Upload an image to receive a diagnosis
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiagnosisResult;
