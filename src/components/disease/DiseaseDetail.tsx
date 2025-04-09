
import React from "react";
import { Disease } from "@/types/disease";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Leaf, AlertTriangle, Check, Activity, Calendar } from "lucide-react";

interface DiseaseDetailProps {
  disease: Disease;
}

const DiseaseDetail = ({ disease }: DiseaseDetailProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h3 className="text-2xl font-bold text-green-800">{disease.name}</h3>
        <div className="flex items-center">
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 mr-2">
            {disease.category}
          </Badge>
          <div className="flex items-center text-xs text-gray-500">
            <span>Severity: </span>
            <SeverityIndicator severity={disease.severity} />
          </div>
        </div>
      </div>
      
      <div className="prose prose-green max-w-none">
        <p className="text-gray-700">{disease.description}</p>
      </div>
      
      <Card>
        <CardHeader className="py-3 px-4 bg-green-50">
          <CardTitle className="text-md flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            Symptoms
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-2">
            {disease.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-green-500 mt-2 mr-2"></span>
                <span className="text-gray-700">{symptom}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-3 px-4 bg-green-50">
          <CardTitle className="text-md flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-green-500" />
            Affected Plants
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {disease.affectedPlants.map((plant, index) => (
              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                {plant}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Alert className="bg-green-50 border-green-200">
        <Activity className="h-4 w-4 text-green-500" />
        <AlertTitle className="text-green-800">Causes</AlertTitle>
        <AlertDescription>
          <ul className="mt-2 space-y-1">
            {disease.causes.map((cause, index) => (
              <li key={index} className="text-green-700">{cause}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader className="py-3 px-4 bg-green-50">
          <CardTitle className="text-md flex items-center">
            <Check className="h-5 w-5 mr-2 text-green-500" />
            Treatment Options
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ol className="space-y-4">
            {disease.treatment.map((step, index) => (
              <li key={index} className="flex">
                <span className="flex-shrink-0 bg-green-100 text-green-800 font-medium rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                  {index + 1}
                </span>
                <div className="text-gray-700">{step}</div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Last updated: {disease.lastUpdated}</span>
        </div>
        {disease.preventionLink && (
          <a 
            href={disease.preventionLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-800 underline"
          >
            Prevention Guide
          </a>
        )}
      </div>
    </div>
  );
};

// Severity Indicator Component
const SeverityIndicator = ({ severity }: { severity: number }) => {
  const getColor = (level: number) => {
    return level <= severity ? 
      'bg-red-500' : 
      'bg-gray-200';
  };
  
  return (
    <div className="flex items-center ml-2">
      {[1, 2, 3, 4, 5].map((level) => (
        <div 
          key={level}
          className={`w-2 h-2 rounded-full mx-0.5 ${getColor(level)}`}
        />
      ))}
    </div>
  );
};

export default DiseaseDetail;
