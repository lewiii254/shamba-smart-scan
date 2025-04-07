
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

type ScanResult = {
  id: string;
  image: string;
  diagnosis: string;
  advice: string;
  date: Date;
  confidence: number;
};

interface ScanHistoryListProps {
  scanHistory: ScanResult[];
  handleViewHistoryScan: (scan: ScanResult) => void;
  handleClearHistory: () => void;
  setActiveTab: (tab: string) => void;
  getConfidenceColor: (confidence: number) => string;
}

const ScanHistoryList = ({ 
  scanHistory, 
  handleViewHistoryScan, 
  handleClearHistory, 
  setActiveTab,
  getConfidenceColor
}: ScanHistoryListProps) => {
  return (
    <>
      {scanHistory.length > 0 ? (
        <div className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={handleClearHistory}
            >
              Clear History
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scanHistory.map((scan) => (
              <Card key={scan.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-green-700">{scan.diagnosis}</CardTitle>
                    {scan.confidence > 0 && (
                      <span className={`text-xs px-2 py-1 rounded-full text-white ${getConfidenceColor(scan.confidence)}`}>
                        {Math.round(scan.confidence * 100)}%
                      </span>
                    )}
                  </div>
                  <CardDescription>
                    {new Date(scan.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="h-40 overflow-hidden rounded-md">
                    <img 
                      src={scan.image} 
                      alt={scan.diagnosis} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full" onClick={() => handleViewHistoryScan(scan)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card className="text-center p-8">
          <CardContent>
            <History className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No Scan History</h3>
            <p className="text-gray-500 mt-2">Your previous AI diagnoses will appear here</p>
            <Button 
              className="mt-6 bg-green-600 hover:bg-green-700"
              onClick={() => setActiveTab("scan")}
            >
              Start a new scan
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ScanHistoryList;
