
export interface Disease {
  id: string;
  name: string;
  category: string;
  description: string;
  symptoms: string[];
  affectedPlants: string[];
  causes: string[];
  treatment: string[];
  severity: number; // 1-5 scale
  lastUpdated: string;
  preventionLink?: string;
  image?: string;
}
