
import { Disease } from "@/types/disease";

export const diseaseData: Disease[] = [
  {
    id: "d1",
    name: "Late Blight",
    category: "Fungal",
    description: "Late blight is a serious disease affecting potatoes and tomatoes that spreads rapidly in cool, wet conditions. It's caused by the oomycete pathogen Phytophthora infestans and is the same disease that caused the Irish potato famine in the 1840s.",
    symptoms: [
      "Dark, water-soaked spots on leaves, often beginning at leaf tips or edges",
      "White fuzzy growth on the underside of leaves during humid conditions",
      "Dark brown to black lesions on stems",
      "Firm, dark, greasy-looking lesions on fruits/tubers",
      "Rapid collapse and death of foliage in severe cases"
    ],
    affectedPlants: [
      "Potato",
      "Tomato",
      "Eggplant",
      "Petunia"
    ],
    causes: [
      "Phytophthora infestans (oomycete pathogen)",
      "Cool temperatures (60-70°F)",
      "High humidity or wet conditions",
      "Poor air circulation"
    ],
    treatment: [
      "Remove and destroy infected plant parts immediately",
      "Apply copper-based fungicides preventatively before disease appears",
      "Apply fungicides containing chlorothalonil, mancozeb, or fixed copper according to label directions",
      "Improve air circulation through proper plant spacing and pruning",
      "Avoid overhead watering; water at plant base in morning",
      "Practice crop rotation (3-4 years)"
    ],
    severity: 5,
    lastUpdated: "March 15, 2024",
    preventionLink: "https://www.apsnet.org/edcenter/disandpath/oomycete/pdlessons/Pages/LateBlight.aspx"
  },
  {
    id: "d2",
    name: "Powdery Mildew",
    category: "Fungal",
    description: "Powdery mildew is one of the most common and easily recognizable plant diseases. It appears as a white to gray powdery growth on leaf surfaces, shoots, and sometimes fruits. While rarely fatal, it can significantly reduce plant vigor, yield, and aesthetic quality.",
    symptoms: [
      "White to gray powdery spots on leaves and stems",
      "Upward curling of leaves",
      "Yellowing and premature leaf drop",
      "Stunted growth",
      "Distorted buds and young growth"
    ],
    affectedPlants: [
      "Cucurbits (cucumber, squash, melons)",
      "Roses",
      "Apples",
      "Grapes",
      "Zinnias",
      "Many ornamentals"
    ],
    causes: [
      "Various fungi in the order Erysiphales",
      "High humidity with dry leaf surfaces",
      "Moderate temperatures (68-86°F)",
      "Overcrowded plantings",
      "Excessive nitrogen fertilization"
    ],
    treatment: [
      "Apply sulfur-based fungicides at first sign of disease",
      "Use potassium bicarbonate, neem oil, or horticultural oils for organic control",
      "Prune affected areas to increase air circulation",
      "Apply milk spray (1:10 milk to water ratio) as a home remedy",
      "Remove and destroy severely infected plants",
      "Balance fertilization to avoid excessive nitrogen"
    ],
    severity: 3,
    lastUpdated: "February 2, 2024"
  },
  {
    id: "d3",
    name: "Bacterial Leaf Spot",
    category: "Bacterial",
    description: "Bacterial leaf spot is a common disease affecting many vegetables and ornamental plants. It creates water-soaked spots that may have yellow halos and can lead to significant defoliation and yield loss in severe cases.",
    symptoms: [
      "Small, dark, water-soaked spots on leaves",
      "Spots often have yellow halos",
      "Spots may merge to form larger lesions",
      "Leaves may become ragged as dead tissue falls out",
      "Defoliation in severe cases"
    ],
    affectedPlants: [
      "Peppers",
      "Tomatoes",
      "Lettuce",
      "Spinach",
      "Many ornamentals"
    ],
    causes: [
      "Various Xanthomonas and Pseudomonas bacteria",
      "Warm, wet conditions",
      "Overhead irrigation or prolonged leaf wetness",
      "Introduction via contaminated seeds",
      "Spread by water splash, tools, or handling"
    ],
    treatment: [
      "Remove and destroy infected plant parts",
      "Apply copper-based bactericides (limited effectiveness)",
      "Avoid overhead watering; water at the base of plants",
      "Ensure proper spacing for good air circulation",
      "Sanitize garden tools between plants",
      "Rotate crops for at least 2-3 years"
    ],
    severity: 4,
    lastUpdated: "January 25, 2024"
  },
  {
    id: "d4",
    name: "Downy Mildew",
    category: "Fungal",
    description: "Downy mildew is a destructive disease caused by fungus-like organisms that can rapidly destroy plant foliage in cool, wet conditions. It's particularly damaging to cucurbits, grapes, and many ornamentals.",
    symptoms: [
      "Yellow to brown angular spots defined by leaf veins",
      "Fluffy gray-purple growth on the undersides of leaves",
      "Stunted plant growth",
      "Curling and distortion of leaves",
      "Eventual browning and death of affected tissue"
    ],
    affectedPlants: [
      "Cucumbers",
      "Melons",
      "Grapes",
      "Basil",
      "Impatiens",
      "Roses"
    ],
    causes: [
      "Various oomycete pathogens (Peronosporaceae family)",
      "Cool temperatures (50-70°F)",
      "High humidity or wet conditions",
      "Poor air circulation",
      "Crowded plantings"
    ],
    treatment: [
      "Apply protective fungicides containing chlorothalonil or mancozeb",
      "Use phosphorous acid or metalaxyl-based fungicides for systemic control",
      "Improve air circulation through proper spacing and pruning",
      "Remove and destroy infected plant material",
      "Avoid overhead watering; water at plant base in morning",
      "Practice crop rotation"
    ],
    severity: 4,
    lastUpdated: "March 10, 2024"
  },
  {
    id: "d5",
    name: "Anthracnose",
    category: "Fungal",
    description: "Anthracnose is a group of fungal diseases that cause dark, sunken lesions on leaves, stems, flowers, and fruits. It affects a wide range of plants and can cause significant damage, especially in warm, wet conditions.",
    symptoms: [
      "Dark, sunken lesions with concentric rings",
      "Tan to brown or black spots, often along leaf veins",
      "Curling and distortion of leaves",
      "Stem cankers",
      "Sunken, water-soaked lesions on fruits"
    ],
    affectedPlants: [
      "Beans",
      "Cucurbits",
      "Tomatoes",
      "Peppers",
      "Trees (maple, ash, oak)",
      "Ornamentals"
    ],
    causes: [
      "Various Colletotrichum fungi",
      "Warm, wet weather",
      "Overcrowded plantings",
      "Poor air circulation",
      "Overhead irrigation"
    ],
    treatment: [
      "Remove and destroy infected plant parts",
      "Apply fungicides containing chlorothalonil, mancozeb, or copper",
      "Ensure proper spacing for good air circulation",
      "Use drip irrigation rather than overhead watering",
      "Practice crop rotation for 2-3 years",
      "Plant resistant varieties when available"
    ],
    severity: 3,
    lastUpdated: "December 7, 2023"
  },
  {
    id: "d6",
    name: "Black Spot",
    category: "Fungal",
    description: "Black spot is a common fungal disease primarily affecting roses, causing characteristic black spots on leaves and significant defoliation if left untreated. It thrives in warm, humid conditions and overwinters on fallen leaves and canes.",
    symptoms: [
      "Circular black spots with feathery margins on leaves",
      "Yellowing around the black spots",
      "Premature leaf drop",
      "Weakened plants with reduced flowering",
      "Repeated infections can significantly weaken plants"
    ],
    affectedPlants: [
      "Roses (primary host)",
      "Some other rosaceous plants"
    ],
    causes: [
      "Diplocarpon rosae fungus",
      "Warm temperatures (75-85°F)",
      "High humidity or prolonged leaf wetness",
      "Poor air circulation",
      "Overcrowded plantings"
    ],
    treatment: [
      "Remove and destroy infected leaves, including fallen debris",
      "Apply fungicides containing chlorothalonil, myclobutanil, or tebuconazole",
      "Neem oil or copper fungicides for organic control",
      "Prune to improve air circulation",
      "Avoid overhead watering; water at plant base in morning",
      "Plant resistant rose varieties"
    ],
    severity: 3,
    lastUpdated: "January 12, 2024",
    preventionLink: "https://www.ars.usda.gov/midwest-area/ames/plant-introduction-research/docs/rose-diseases/"
  },
  {
    id: "d7",
    name: "Fusarium Wilt",
    category: "Fungal",
    description: "Fusarium wilt is a destructive vascular disease caused by soil-borne fungi that invade plants through the roots and block water-conducting tissues. It causes yellowing, wilting, and often death of affected plants.",
    symptoms: [
      "Yellowing and wilting of leaves, often starting on one side of the plant",
      "Stunted growth",
      "Downward curling of leaves",
      "Brown discoloration of vascular tissue when stem is cut",
      "Plant death in severe cases"
    ],
    affectedPlants: [
      "Tomatoes",
      "Bananas",
      "Watermelons",
      "Cotton",
      "Many ornamentals",
      "Various trees"
    ],
    causes: [
      "Fusarium oxysporum fungi",
      "Warm soil temperatures (75-90°F)",
      "Acidic soil conditions",
      "Poor drainage",
      "Spread through contaminated soil, tools, and water"
    ],
    treatment: [
      "Plant resistant varieties (most effective control)",
      "Solarize soil to reduce pathogen levels",
      "Practice crop rotation with non-susceptible plants",
      "Adjust soil pH to 6.5-7.0",
      "Improve soil drainage",
      "Sanitize tools and equipment",
      "There are no effective chemical controls once plants are infected"
    ],
    severity: 5,
    lastUpdated: "February 28, 2024"
  },
  {
    id: "d8",
    name: "Root Rot",
    category: "Fungal",
    description: "Root rot refers to a group of diseases affecting plant roots, caused by various soil-borne fungi and oomycetes. It thrives in poorly drained soils and causes decay of roots, leading to reduced water and nutrient uptake.",
    symptoms: [
      "Wilting despite adequate soil moisture",
      "Yellowing or browning of leaves",
      "Stunted growth",
      "Brown, soft, or mushy roots",
      "Poor overall plant vigor"
    ],
    affectedPlants: [
      "Most plants can be affected",
      "Particularly common in houseplants",
      "Vegetables",
      "Ornamentals",
      "Trees and shrubs"
    ],
    causes: [
      "Various fungi including Pythium, Phytophthora, Rhizoctonia",
      "Overwatering",
      "Poor soil drainage",
      "Compacted soil",
      "Planting too deeply"
    ],
    treatment: [
      "Improve soil drainage",
      "Reduce watering frequency",
      "Remove and destroy severely infected plants",
      "Apply fungicides containing metalaxyl, mefenoxam, or fosetyl-aluminum",
      "Add organic matter to improve soil structure",
      "Ensure proper planting depth"
    ],
    severity: 4,
    lastUpdated: "November 18, 2023"
  },
  {
    id: "d9",
    name: "Aphid Infestation",
    category: "Pest",
    description: "Aphids are small, soft-bodied insects that feed on plant sap and can quickly multiply. They cause damage through feeding and by transmitting plant viruses. They also excrete honeydew, which promotes sooty mold growth.",
    symptoms: [
      "Clusters of small insects on new growth, stems, and undersides of leaves",
      "Curled, stunted, or yellowed leaves",
      "Sticky honeydew on leaves and surfaces below",
      "Sooty mold growing on honeydew",
      "Distorted flowers and fruit"
    ],
    affectedPlants: [
      "Nearly all plants can be affected",
      "Particularly common on roses",
      "Vegetable crops",
      "Fruit trees",
      "Ornamentals"
    ],
    causes: [
      "Various aphid species",
      "Warm weather",
      "High nitrogen levels promoting lush growth",
      "Absence of natural predators",
      "Overcrowded conditions"
    ],
    treatment: [
      "Spray plants with strong water jet to dislodge aphids",
      "Apply insecticidal soap or neem oil",
      "Introduce natural predators (ladybugs, lacewings)",
      "Use systemic insecticides for severe infestations",
      "Prune heavily infested parts",
      "Avoid excessive nitrogen fertilization"
    ],
    severity: 2,
    lastUpdated: "March 5, 2024"
  },
  {
    id: "d10",
    name: "Tobacco Mosaic Virus (TMV)",
    category: "Viral",
    description: "Tobacco Mosaic Virus is a highly stable and contagious plant virus that causes mottled discoloration on leaves and stunted growth. It can survive for years in dried plant material and is primarily spread through mechanical transmission.",
    symptoms: [
      "Mottled light and dark green or yellow patches on leaves",
      "Distorted, wrinkled leaves",
      "Stunted plant growth",
      "Reduced yield",
      "Yellowing and necrosis in severe cases"
    ],
    affectedPlants: [
      "Tobacco",
      "Tomatoes",
      "Peppers",
      "Eggplants",
      "Many ornamentals",
      "Over 350 plant species can be infected"
    ],
    causes: [
      "Tobacco Mosaic Virus",
      "Mechanical transmission through handling, pruning, or other physical contact",
      "Contaminated tools and equipment",
      "Infected seeds (less common)",
      "Tobacco products (cigarettes can be a source of infection)"
    ],
    treatment: [
      "No cure once plants are infected",
      "Remove and destroy infected plants",
      "Wash hands thoroughly before handling plants",
      "Disinfect tools with 10% bleach solution or 70% alcohol",
      "Control weeds that may harbor the virus",
      "Plant resistant varieties"
    ],
    severity: 4,
    lastUpdated: "December 19, 2023",
    preventionLink: "https://extension.umn.edu/plant-diseases/tobacco-mosaic-virus"
  }
];
