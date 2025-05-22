import { SoilAnalysisResult, CropRecommendations } from "../types/soil";

// This is a mock implementation since we don't have direct access to the Open Epi Soil API
// In a real app, you would replace this with actual API calls
export const fetchSoilData = async (longitude: number, latitude: number, depth: number): Promise<SoilAnalysisResult> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, return different soil types based on coordinates
  const soilTypes = ['Clay', 'Sandy', 'Loam', 'Silt', 'Peat', 'Chalky'];
  
  // Create a more varied algorithm to determine soil type based on all three inputs
  // This will ensure different coordinates and depths give different results
  const latMod = Math.sin(latitude * 0.1) * 100;
  const longMod = Math.cos(longitude * 0.15) * 100;
  const depthMod = Math.tan(depth * 0.05) * 50;
  
  // Combine all factors with some weights to create more variability
  const hash = Math.abs(Math.round(latMod + longMod + depthMod)) % soilTypes.length;
  const soilType = soilTypes[hash];
  
  console.log(`Calculated soil type for coords (${longitude}, ${latitude}, ${depth}): ${soilType}`);
  
  // Generate mock properties based on soil type
  let properties = [];
  let description = "";
  
  switch (soilType) {
    case 'Clay':
      properties = [
        { name: 'pH Level', value: 7.5 + (longitude * 0.01) % 0.5, unit: 'pH', description: 'Slightly alkaline' },
        { name: 'Organic Matter', value: 2.5 + (latitude * 0.01) % 1, unit: '%', description: 'Moderate' },
        { name: 'Nitrogen', value: 0.15 + (depth * 0.001) % 0.1, unit: '%', description: 'Moderate' },
        { name: 'Phosphorus', value: Math.round(12 + (longitude * latitude * 0.001) % 5), unit: 'ppm', description: 'Medium' },
        { name: 'Potassium', value: Math.round(180 + (depth * 0.5) % 20), unit: 'ppm', description: 'High' },
        { name: 'Water Retention', value: 'High', description: 'Holds water well' }
      ];
      description = 'Clay soil is characterized by fine particles that stick together when wet, forming a heavy and dense texture. It retains water and nutrients well but can be difficult to work with.';
      break;
    case 'Sandy':
      properties = [
        { name: 'pH Level', value: 6.0 + (longitude * 0.01) % 0.5, unit: 'pH', description: 'Slightly acidic' },
        { name: 'Organic Matter', value: 1.0 + (latitude * 0.01) % 0.8, unit: '%', description: 'Low' },
        { name: 'Nitrogen', value: 0.08 + (depth * 0.001) % 0.05, unit: '%', description: 'Low' },
        { name: 'Phosphorus', value: Math.round(8 + (longitude * latitude * 0.001) % 4), unit: 'ppm', description: 'Low' },
        { name: 'Potassium', value: Math.round(90 + (depth * 0.4) % 15), unit: 'ppm', description: 'Medium' },
        { name: 'Water Retention', value: 'Low', description: 'Drains quickly' }
      ];
      description = 'Sandy soil consists of larger particles that allow for good drainage but poor nutrient retention. It warms up quickly in spring but can dry out rapidly in hot weather.';
      break;
    case 'Loam':
      properties = [
        { name: 'pH Level', value: 6.8 + (longitude * 0.01) % 0.3, unit: 'pH', description: 'Neutral' },
        { name: 'Organic Matter', value: 4.0 + (latitude * 0.01) % 1.2, unit: '%', description: 'High' },
        { name: 'Nitrogen', value: 0.25 + (depth * 0.001) % 0.08, unit: '%', description: 'High' },
        { name: 'Phosphorus', value: Math.round(20 + (longitude * latitude * 0.001) % 6), unit: 'ppm', description: 'High' },
        { name: 'Potassium', value: Math.round(200 + (depth * 0.6) % 25), unit: 'ppm', description: 'High' },
        { name: 'Water Retention', value: 'Moderate', description: 'Good balance' }
      ];
      description = 'Loam is considered ideal for growing most plants. It has a balanced mixture of sand, silt, and clay particles, providing good drainage while retaining adequate moisture and nutrients.';
      break;
    case 'Silt':
      properties = [
        { name: 'pH Level', value: 6.5 + (longitude * 0.01) % 0.4, unit: 'pH', description: 'Slightly acidic' },
        { name: 'Organic Matter', value: 3.0 + (latitude * 0.01) % 1.1, unit: '%', description: 'Moderate' },
        { name: 'Nitrogen', value: 0.18 + (depth * 0.001) % 0.07, unit: '%', description: 'Moderate' },
        { name: 'Phosphorus', value: Math.round(15 + (longitude * latitude * 0.001) % 5), unit: 'ppm', description: 'Medium' },
        { name: 'Potassium', value: Math.round(150 + (depth * 0.5) % 20), unit: 'ppm', description: 'Medium' },
        { name: 'Water Retention', value: 'Moderate to High', description: 'Holds water well' }
      ];
      description = 'Silt soil has medium-sized particles that hold water well but can become compacted. It is fertile and easy to work with when properly managed.';
      break;
    case 'Peat':
      properties = [
        { name: 'pH Level', value: 4.5 + (longitude * 0.01) % 0.6, unit: 'pH', description: 'Acidic' },
        { name: 'Organic Matter', value: 20.0 + (latitude * 0.02) % 5, unit: '%', description: 'Very High' },
        { name: 'Nitrogen', value: 0.3 + (depth * 0.002) % 0.1, unit: '%', description: 'High' },
        { name: 'Phosphorus', value: Math.round(5 + (longitude * latitude * 0.001) % 3), unit: 'ppm', description: 'Low' },
        { name: 'Potassium', value: Math.round(60 + (depth * 0.3) % 15), unit: 'ppm', description: 'Low' },
        { name: 'Water Retention', value: 'Very High', description: 'Can become waterlogged' }
      ];
      description = 'Peat soil is high in organic matter and tends to be acidic. It holds moisture very well but may require amendments for optimal growing conditions for many plants.';
      break;
    case 'Chalky':
      properties = [
        { name: 'pH Level', value: 8.0 + (longitude * 0.01) % 0.4, unit: 'pH', description: 'Alkaline' },
        { name: 'Organic Matter', value: 1.5 + (latitude * 0.01) % 0.7, unit: '%', description: 'Low' },
        { name: 'Nitrogen', value: 0.1 + (depth * 0.001) % 0.04, unit: '%', description: 'Low' },
        { name: 'Phosphorus', value: Math.round(10 + (longitude * latitude * 0.001) % 4), unit: 'ppm', description: 'Medium' },
        { name: 'Potassium', value: Math.round(120 + (depth * 0.4) % 18), unit: 'ppm', description: 'Medium' },
        { name: 'Water Retention', value: 'Low', description: 'Drains quickly' }
      ];
      description = 'Chalky soil is alkaline and typically contains calcium carbonate or lime. It drains well but can cause nutrient deficiencies in plants that prefer acidic conditions.';
      break;
    default:
      properties = [
        { name: 'pH Level', value: 7.0 + (longitude * 0.01) % 0.3, unit: 'pH', description: 'Neutral' },
        { name: 'Organic Matter', value: 2.0 + (latitude * 0.01) % 0.9, unit: '%', description: 'Moderate' },
        { name: 'Nitrogen', value: 0.15 + (depth * 0.001) % 0.06, unit: '%', description: 'Moderate' },
        { name: 'Phosphorus', value: Math.round(12 + (longitude * latitude * 0.001) % 5), unit: 'ppm', description: 'Medium' },
        { name: 'Potassium', value: Math.round(150 + (depth * 0.5) % 20), unit: 'ppm', description: 'Medium' },
        { name: 'Water Retention', value: 'Moderate', description: 'Average drainage' }
      ];
      description = 'This soil has a balanced composition with moderate fertility and water retention properties.';
  }
  
  return {
    soilType,
    properties,
    description
  };
};

export const getCropRecommendations = async (soilType: string): Promise<CropRecommendations> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return different crop recommendations based on soil type
  let recommendedCrops = [];
  let notes = "";
  
  switch (soilType) {
    case 'Clay':
      recommendedCrops = [
        { name: 'Broccoli', suitability: 'high', description: 'Thrives in moisture-retentive clay soils' },
        { name: 'Cabbage', suitability: 'high', description: 'Does well in heavy, nutrient-rich soils' },
        { name: 'Brussels Sprouts', suitability: 'high', description: 'Prefers clay soils with good moisture retention' },
        { name: 'Summer Squash', suitability: 'medium', description: 'Can grow well with proper drainage improvements' },
        { name: 'Beans', suitability: 'medium', description: 'Can help improve clay soil structure over time' }
      ];
      notes = 'Clay soils benefit from regular addition of organic matter to improve structure and drainage. Consider raised beds for better results.';
      break;
    case 'Sandy':
      recommendedCrops = [
        { name: 'Carrots', suitability: 'high', description: 'Grow straight and clean in loose sandy soil' },
        { name: 'Potatoes', suitability: 'high', description: 'Easy to harvest in sandy soils' },
        { name: 'Radishes', suitability: 'high', description: 'Quick-growing root vegetables ideal for sandy soil' },
        { name: 'Lettuce', suitability: 'medium', description: 'Requires consistent watering due to quick drainage' },
        { name: 'Strawberries', suitability: 'medium', description: 'Enjoy the good drainage of sandy soils' }
      ];
      notes = 'Sandy soils will benefit from regular additions of compost to improve water and nutrient retention. More frequent watering is typically required.';
      break;
    case 'Loam':
      recommendedCrops = [
        { name: 'Tomatoes', suitability: 'high', description: 'Ideal conditions for tomato growth' },
        { name: 'Corn', suitability: 'high', description: 'Thrives in nutrient-rich, well-draining loam' },
        { name: 'Squash', suitability: 'high', description: 'Excellent for all types of squash' },
        { name: 'Peppers', suitability: 'high', description: 'Perfect balance of drainage and moisture retention' },
        { name: 'Most Vegetables', suitability: 'high', description: 'Loam is optimal for most garden vegetables' }
      ];
      notes = 'Loam soil is considered ideal for most crops. Maintain its quality with regular additions of organic matter.';
      break;
    case 'Silt':
      recommendedCrops = [
        { name: 'Leafy Greens', suitability: 'high', description: 'Thrive in moisture-retentive silt soil' },
        { name: 'Vine Crops', suitability: 'high', description: 'Do well in the fertile conditions of silt' },
        { name: 'Root Vegetables', suitability: 'medium', description: 'Good growth with proper management' },
        { name: 'Onions', suitability: 'medium', description: 'Grow well with adequate drainage' },
        { name: 'Perennial Herbs', suitability: 'medium', description: 'Can establish well in silt soils' }
      ];
      notes = 'Silt soils are naturally fertile but can benefit from additions that improve structure and prevent compaction.';
      break;
    case 'Peat':
      recommendedCrops = [
        { name: 'Blueberries', suitability: 'high', description: 'Thrive in acidic, moisture-rich peat soil' },
        { name: 'Cranberries', suitability: 'high', description: 'Ideal acidic and wet conditions' },
        { name: 'Lingonberries', suitability: 'high', description: 'Perfect for these acid-loving plants' },
        { name: 'Rhododendrons', suitability: 'high', description: 'Ornamental shrubs that prefer acidic soil' },
        { name: 'Azaleas', suitability: 'high', description: 'Flourish in acidic peat conditions' }
      ];
      notes = 'Peat soils are excellent for acid-loving plants but may need drainage improvements for some crops. Consider sustainability concerns with peat usage.';
      break;
    case 'Chalky':
      recommendedCrops = [
        { name: 'Lavender', suitability: 'high', description: 'Thrives in alkaline, free-draining soil' },
        { name: 'Spinach', suitability: 'high', description: 'Tolerates alkaline conditions well' },
        { name: 'Beets', suitability: 'high', description: 'Prefer slightly alkaline soil conditions' },
        { name: 'Cabbage Family', suitability: 'medium', description: 'Can adapt to chalky soils with amendments' },
        { name: 'Sweet Corn', suitability: 'medium', description: 'Can perform adequately with proper nutrients' }
      ];
      notes = 'Chalky soils may need addition of organic matter to improve water retention. Consider using acidifying fertilizers for plants that prefer lower pH.';
      break;
    default:
      recommendedCrops = [
        { name: 'Mixed Vegetables', suitability: 'medium', description: 'Various vegetables can be grown with appropriate amendments' },
        { name: 'Cover Crops', suitability: 'high', description: 'Consider cover crops to improve soil quality' },
        { name: 'Native Plants', suitability: 'high', description: 'Local native plants often adapt well to regional soil conditions' }
      ];
      notes = 'Consider testing your soil further to determine the best crops for your specific conditions.';
  }
  
  return {
    recommendedCrops,
    notes
  };
};
