
import React from "react";

interface ScanHeaderProps {
  title: string;
  description: string;
}

const ScanHeader = ({ title, description }: ScanHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-green-800 mb-2">{title}</h1>
      <p className="text-lg text-green-700">{description}</p>
    </div>
  );
};

export default ScanHeader;
