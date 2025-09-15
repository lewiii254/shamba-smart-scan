
import React from "react";

interface ScanHeaderProps {
  title: string;
  description: string;
}

const ScanHeader = ({ title, description }: ScanHeaderProps) => {
  return (
    <div className="text-center mb-6 bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg border border-green-200">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
        <span className="text-2xl">🌿</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">{title}</h1>
      <p className="text-lg text-green-700 max-w-2xl mx-auto">{description}</p>
      <div className="mt-4 inline-flex items-center space-x-4 text-sm text-green-600">
        <span className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          AI-Powered
        </span>
        <span className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          Expert-Verified
        </span>
        <span className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          Fast Results
        </span>
      </div>
    </div>
  );
};

export default ScanHeader;
