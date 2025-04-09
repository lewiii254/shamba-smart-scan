
// Define the possible specialist status values
export type SpecialistStatus = "online" | "away";

// Define the Specialist interface
export interface Specialist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  status: SpecialistStatus;
  bio: string;
  isAI?: boolean;
}

// Export the specialists array
export const specialists: Specialist[] = [
  {
    id: "s1",
    name: "Dr. Sarah Chen",
    role: "Plant Pathologist",
    specialty: "Fungal Diseases",
    avatar: "/placeholder.svg",
    status: "online",
    bio: "Ph.D in Plant Pathology with 8+ years experience diagnosing and treating fungal infections across various crop species. Specializes in early detection and organic treatment methods."
  },
  {
    id: "s2",
    name: "Michael Rodriguez",
    role: "Agronomist",
    specialty: "Soil Health & Nutrition",
    avatar: "/placeholder.svg",
    status: "away",
    bio: "Certified Agronomist focusing on soil chemistry and plant nutrition. Helps farmers optimize growing conditions and diagnose nutrient deficiencies through soil analysis."
  },
  {
    id: "s3",
    name: "Dr. Priya Patel",
    role: "Entomologist",
    specialty: "Pest Management",
    avatar: "/placeholder.svg",
    status: "online",
    bio: "Research scientist specializing in integrated pest management strategies. Expertise in identifying insect damage patterns and recommending targeted biological control methods."
  },
  {
    id: "ai-assistant",
    name: "CropGPT",
    role: "AI Assistant",
    specialty: "General Plant Care",
    avatar: "/placeholder.svg",
    status: "online",
    bio: "An AI-powered assistant that can provide instant responses to common plant care questions, disease identification, and general agricultural advice.",
    isAI: true
  }
];
