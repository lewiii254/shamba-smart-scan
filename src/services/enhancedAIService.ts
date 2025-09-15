// Enhanced AI scanning service with realistic processing simulation
export interface PlantDiseaseData {
  id: string;
  name: string;
  scientificName?: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatment: string;
  prevention: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedCrops: string[];
  seasonalRisk: {
    spring: number;
    summer: number;
    fall: number;
    winter: number;
  };
  confidenceFactors: {
    imageQuality: number;
    symptomClarity: number;
    plantCondition: number;
  };
}

export interface AIAnalysisResult {
  disease: PlantDiseaseData;
  confidence: number;
  certainty: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  processingTime: number;
  imageQualityScore: number;
  alternativeDiagnoses?: Array<{
    disease: string;
    confidence: number;
  }>;
  recommendations: {
    immediate: string[];
    followUp: string[];
    prevention: string[];
  };
}

// Comprehensive disease database with realistic data
const PLANT_DISEASES: PlantDiseaseData[] = [
  {
    id: 'tomato-late-blight',
    name: 'Tomato Late Blight',
    scientificName: 'Phytophthora infestans',
    description: 'A devastating fungal disease that causes dark, water-soaked lesions on leaves, stems, and fruits. Can destroy entire crops within days under favorable conditions.',
    symptoms: [
      'Dark brown lesions on leaves with pale green borders',
      'White fungal growth on leaf undersides in humid conditions',
      'Dark, greasy-looking lesions on stems and fruits',
      'Rapid yellowing and death of affected leaves'
    ],
    causes: [
      'High humidity (>85%)',
      'Cool temperatures (15-20°C)',
      'Poor air circulation',
      'Overhead watering',
      'Dense plant spacing'
    ],
    treatment: 'Apply copper-based fungicide immediately. Remove and destroy all infected plant parts. Improve air circulation and avoid overhead watering. Consider systemic fungicides for severe infections.',
    prevention: [
      'Choose resistant tomato varieties',
      'Ensure proper plant spacing',
      'Water at soil level',
      'Apply preventive copper sprays',
      'Rotate crops annually'
    ],
    severity: 'critical',
    affectedCrops: ['tomatoes', 'potatoes', 'peppers', 'eggplants'],
    seasonalRisk: { spring: 0.3, summer: 0.7, fall: 0.9, winter: 0.1 },
    confidenceFactors: { imageQuality: 0.9, symptomClarity: 0.95, plantCondition: 0.8 }
  },
  {
    id: 'powdery-mildew',
    name: 'Powdery Mildew',
    scientificName: 'Erysiphe cichoracearum',
    description: 'A common fungal disease creating white, powdery patches on leaf surfaces. Thrives in warm, dry conditions with high humidity.',
    symptoms: [
      'White, powdery coating on leaves and stems',
      'Yellowing and drying of infected leaves',
      'Stunted growth and reduced yield',
      'Distorted leaf shapes in severe cases'
    ],
    causes: [
      'High humidity with dry conditions',
      'Poor air circulation',
      'Overcrowded plants',
      'Moderate temperatures (20-25°C)',
      'Low light conditions'
    ],
    treatment: 'Apply sulfur-based fungicide or neem oil. Remove affected leaves. Improve air circulation around plants. Use baking soda solution (1 tsp per quart water) as organic treatment.',
    prevention: [
      'Plant resistant varieties',
      'Ensure proper spacing',
      'Provide adequate sunlight',
      'Apply preventive neem oil sprays',
      'Maintain good garden hygiene'
    ],
    severity: 'medium',
    affectedCrops: ['cucumbers', 'squash', 'melons', 'beans', 'peas'],
    seasonalRisk: { spring: 0.4, summer: 0.8, fall: 0.6, winter: 0.2 },
    confidenceFactors: { imageQuality: 0.85, symptomClarity: 0.9, plantCondition: 0.75 }
  },
  {
    id: 'aphid-infestation',
    name: 'Aphid Infestation',
    scientificName: 'Aphididae family',
    description: 'Small, soft-bodied insects that feed on plant sap, causing stunted growth and transmitting viral diseases.',
    symptoms: [
      'Clusters of small green, black, or white insects',
      'Curled, yellowed, or distorted leaves',
      'Sticky honeydew secretion on leaves',
      'Presence of sooty mold on honeydew'
    ],
    causes: [
      'Warm weather conditions',
      'Nitrogen-rich fertilizers',
      'Lack of natural predators',
      'Stressed or weakened plants',
      'Indoor growing conditions'
    ],
    treatment: 'Spray with strong water stream to dislodge aphids. Apply insecticidal soap or neem oil. Introduce beneficial insects like ladybugs. Use systemic insecticides for severe infestations.',
    prevention: [
      'Encourage beneficial insects',
      'Avoid over-fertilizing with nitrogen',
      'Use reflective mulches',
      'Plant companion plants like marigolds',
      'Regular plant inspection'
    ],
    severity: 'medium',
    affectedCrops: ['roses', 'vegetables', 'fruit trees', 'ornamental plants'],
    seasonalRisk: { spring: 0.7, summer: 0.9, fall: 0.5, winter: 0.2 },
    confidenceFactors: { imageQuality: 0.8, symptomClarity: 0.95, plantCondition: 0.9 }
  },
  {
    id: 'bacterial-leaf-spot',
    name: 'Bacterial Leaf Spot',
    scientificName: 'Xanthomonas campestris',
    description: 'A bacterial infection causing water-soaked spots that turn brown with yellow halos. Spreads rapidly in warm, wet conditions.',
    symptoms: [
      'Small, dark water-soaked spots on leaves',
      'Spots enlarge and develop yellow halos',
      'Infected leaves eventually dry up and fall',
      'Lesions may appear on stems and fruits'
    ],
    causes: [
      'Warm, wet weather',
      'Overhead watering',
      'Working with wet plants',
      'Poor sanitation',
      'Contaminated tools or seeds'
    ],
    treatment: 'Apply copper-based bactericide at first sign. Remove infected plant parts immediately. Avoid overhead watering. Sanitize tools between plants.',
    prevention: [
      'Use pathogen-free seeds',
      'Drip irrigation instead of sprinklers',
      'Crop rotation',
      'Sanitize garden tools',
      'Avoid working with wet plants'
    ],
    severity: 'high',
    affectedCrops: ['tomatoes', 'peppers', 'beans', 'cucumbers'],
    seasonalRisk: { spring: 0.4, summer: 0.8, fall: 0.6, winter: 0.1 },
    confidenceFactors: { imageQuality: 0.75, symptomClarity: 0.8, plantCondition: 0.85 }
  },
  {
    id: 'nitrogen-deficiency',
    name: 'Nitrogen Deficiency',
    description: 'Nutrient deficiency causing yellowing of older leaves first, stunted growth, and reduced yield.',
    symptoms: [
      'Yellowing of older leaves starting from tips',
      'Stunted growth and thin stems',
      'Smaller leaves and reduced flowering',
      'Overall pale green appearance'
    ],
    causes: [
      'Poor soil fertility',
      'Over-watering leaching nutrients',
      'pH imbalance preventing uptake',
      'Competition from weeds',
      'Sandy soils with poor retention'
    ],
    treatment: 'Apply balanced nitrogen fertilizer (10-10-10). For quick results, use water-soluble fertilizer as foliar spray. Add compost or well-rotted manure to soil.',
    prevention: [
      'Regular soil testing',
      'Compost application',
      'Plant nitrogen-fixing cover crops',
      'Avoid over-watering',
      'Mulching to retain nutrients'
    ],
    severity: 'medium',
    affectedCrops: ['all vegetable crops', 'fruit trees', 'ornamental plants'],
    seasonalRisk: { spring: 0.5, summer: 0.6, fall: 0.4, winter: 0.3 },
    confidenceFactors: { imageQuality: 0.7, symptomClarity: 0.75, plantCondition: 0.8 }
  },
  {
    id: 'spider-mites',
    name: 'Spider Mite Infestation',
    scientificName: 'Tetranychus urticae',
    description: 'Microscopic pests that create fine webbing and cause stippled, yellowing leaves. Thrive in hot, dry conditions.',
    symptoms: [
      'Fine webbing on leaves and stems',
      'Stippled or speckled appearance on leaves',
      'Yellowing and bronzing of foliage',
      'Premature leaf drop in severe cases'
    ],
    causes: [
      'Hot, dry weather conditions',
      'Low humidity',
      'Dusty environments',
      'Stressed plants',
      'Indoor growing conditions'
    ],
    treatment: 'Increase humidity around plants. Spray with miticide or insecticidal soap. Use predatory mites as biological control. Wash leaves regularly with water.',
    prevention: [
      'Maintain adequate humidity',
      'Regular misting of plants',
      'Avoid over-fertilizing',
      'Keep plants well-watered',
      'Encourage beneficial insects'
    ],
    severity: 'high',
    affectedCrops: ['indoor plants', 'vegetables', 'fruit trees', 'ornamentals'],
    seasonalRisk: { spring: 0.4, summer: 0.9, fall: 0.6, winter: 0.3 },
    confidenceFactors: { imageQuality: 0.6, symptomClarity: 0.7, plantCondition: 0.85 }
  }
];

// Simulate image quality analysis
function analyzeImageQuality(): { score: number; factors: string[] } {
  const factors = [];
  const scores = [];

  // Simulate various quality factors
  const lighting = Math.random() * 0.4 + 0.6; // 0.6-1.0
  const focus = Math.random() * 0.3 + 0.7; // 0.7-1.0
  const resolution = Math.random() * 0.2 + 0.8; // 0.8-1.0
  const angle = Math.random() * 0.3 + 0.7; // 0.7-1.0

  scores.push(lighting, focus, resolution, angle);

  if (lighting < 0.7) factors.push('Lighting could be improved');
  if (focus < 0.8) factors.push('Image appears slightly blurred');
  if (resolution < 0.9) factors.push('Higher resolution would help analysis');
  if (angle < 0.8) factors.push('Try capturing from multiple angles');

  if (factors.length === 0) factors.push('Excellent image quality for analysis');

  return {
    score: scores.reduce((a, b) => a + b) / scores.length,
    factors
  };
}

// Enhanced AI processing with realistic stages
export class EnhancedAIService {
  static async analyzeImage(
    imageData: string, 
    onProgress?: (stage: number, message: string) => void
  ): Promise<AIAnalysisResult> {
    const startTime = Date.now();

    // Stage 1: Image preprocessing
    if (onProgress) onProgress(1, 'Preprocessing image and checking quality...');
    await new Promise(resolve => setTimeout(resolve, 800));

    const imageQuality = analyzeImageQuality();

    // Stage 2: Feature extraction
    if (onProgress) onProgress(2, 'Extracting visual features using CNN model...');
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Stage 3: Disease pattern matching
    if (onProgress) onProgress(3, 'Analyzing disease patterns and symptoms...');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Stage 4: Confidence calculation
    if (onProgress) onProgress(4, 'Calculating confidence scores and alternatives...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Stage 5: Generating recommendations
    if (onProgress) onProgress(5, 'Generating treatment recommendations...');
    await new Promise(resolve => setTimeout(resolve, 800));

    const processingTime = Date.now() - startTime;

    // Select disease based on weighted probability (more realistic than pure random)
    const currentSeason = this.getCurrentSeason();
    const weightedDiseases = PLANT_DISEASES.map(disease => ({
      disease,
      weight: disease.seasonalRisk[currentSeason] * Math.random()
    }));

    weightedDiseases.sort((a, b) => b.weight - a.weight);
    const primaryDisease = weightedDiseases[0].disease;

    // Calculate confidence based on image quality and disease factors
    const baseConfidence = primaryDisease.confidenceFactors.imageQuality * imageQuality.score;
    const randomVariation = (Math.random() - 0.5) * 0.3; // ±15% variation
    const finalConfidence = Math.max(0.4, Math.min(0.99, baseConfidence + randomVariation));

    // Generate alternative diagnoses
    const alternatives = weightedDiseases.slice(1, 3).map(item => ({
      disease: item.disease.name,
      confidence: Math.max(0.1, finalConfidence * (0.3 + Math.random() * 0.4))
    }));

    // Determine certainty level
    let certainty: AIAnalysisResult['certainty'] = 'medium';
    if (finalConfidence >= 0.9) certainty = 'very_high';
    else if (finalConfidence >= 0.8) certainty = 'high';
    else if (finalConfidence >= 0.6) certainty = 'medium';
    else if (finalConfidence >= 0.4) certainty = 'low';
    else certainty = 'very_low';

    return {
      disease: primaryDisease,
      confidence: Math.round(finalConfidence * 100) / 100,
      certainty,
      processingTime,
      imageQualityScore: Math.round(imageQuality.score * 100),
      alternativeDiagnoses: alternatives,
      recommendations: {
        immediate: [
          primaryDisease.treatment,
          'Monitor plant daily for changes',
          'Isolate affected plants if possible'
        ],
        followUp: [
          'Reapply treatment in 7-10 days if symptoms persist',
          'Take photos to track progress',
          'Consider soil testing if problem recurring'
        ],
        prevention: primaryDisease.prevention.slice(0, 3)
      }
    };
  }

  private static getCurrentSeason(): keyof PlantDiseaseData['seasonalRisk'] {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  }

  static getCertaintyDescription(certainty: AIAnalysisResult['certainty']): string {
    switch (certainty) {
      case 'very_high': return 'Very confident - Clear diagnosis with strong symptom match';
      case 'high': return 'High confidence - Good symptom match, recommended treatment';
      case 'medium': return 'Moderate confidence - Consider alternative diagnoses';
      case 'low': return 'Low confidence - Multiple possibilities, expert consultation recommended';
      case 'very_low': return 'Very uncertain - Image quality or symptoms unclear, retake photo recommended';
      default: return 'Analysis complete';
    }
  }

  static getSeverityColor(severity: string): string {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  }
}