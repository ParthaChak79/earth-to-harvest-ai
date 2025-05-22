
import { SoilAnalysisResult, CropRecommendations } from "../types/soil";

// This is a mock implementation since we don't have direct access to the Open Epi Soil API
// In a real app, you would replace this with actual API calls
export const fetchSoilData = async (longitude: number, latitude: number, depth: number): Promise<SoilAnalysisResult> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, return different soil types based on coordinates
  const soilTypes = ['Clay', 'Sandy', 'Loam', 'Silt', 'Peat', 'Chalky'];
  // Simple hash of coordinates to get a consistent but seemingly random result
  const hash = Math.abs((longitude * 10) + (latitude * 100) + depth) % soilTypes.length;
  const soilType = soilTypes[hash];
  
  // Generate mock properties based on soil type
  let properties = [];
  let description = "";
  
  switch (soilType) {
    case 'Clay':
      properties = [
        { name: 'pH Level', value: 7.5, unit: 'pH', description: 'Slightly alkaline' },
        { name: 'Organic Matter', value: 2.5, unit: '%', description: 'Moderate' },
        { name: 'Nitrogen', value: 0.15, unit: '%', description: 'Moderate' },
        { name: 'Phosphorus', value: 12, unit: 'ppm', description: 'Medium' },
        { name: 'Potassium', value: 180, unit: 'ppm', description: 'High' },
        { name: 'Water Retention', value: 'High', description: 'Holds water well' }
      ];
      description = 'Clay soil is characterized by fine particles that stick together when wet, forming a heavy and dense texture. It retains water and nutrients well but can be difficult to work with.';
      break;
    case 'Sandy':
      properties = [
        { name: 'pH Level', value: 6.0, unit: 'pH', description: 'Slightly acidic' },
        { name: 'Organic Matter', value: 1.0, unit: '%', description: 'Low' },
        { name: 'Nitrogen', value: 0.08, unit: '%', description: 'Low' },
        { name: 'Phosphorus', value: 8, unit: 'ppm', description: 'Low' },
        { name: 'Potassium', value: 90, unit: 'ppm', description: 'Medium' },
        { name: 'Water Retention', value: 'Low', description: 'Drains quickly' }
      ];
      description = 'Sandy soil consists of larger particles that allow for good drainage but poor nutrient retention. It warms up quickly in spring but can dry out rapidly in hot weather.';
      break;
    case 'Loam':
      properties = [
        { name: 'pH Level', value: 6.8, unit: 'pH', description: 'Neutral' },
        { name: 'Organic Matter', value: 4.0, unit: '%', description: 'High' },
        { name: 'Nitrogen', value: 0.25, unit: '%', description: 'High' },
        { name: 'Phosphorus', value: 20, unit: 'ppm', description: 'High' },
        { name: 'Potassium', value: 200, unit: 'ppm', description: 'High' },
        { name: 'Water Retention', value: 'Moderate', description: 'Good balance' }
      ];
      description = 'Loam is considered ideal for growing most plants. It has a balanced mixture of sand, silt, and clay particles, providing good drainage while retaining adequate moisture and nutrients.';
      break;
    case 'Silt':
      properties = [
        { name: 'pH Level', value: 6.5, unit: 'pH', description: 'Slightly acidic' },
        { name: 'Organic Matter', value: 3.0, unit: '%', description: 'Moderate' },
        { name: 'Nitrogen', value: 0.18, unit: '%', description: 'Moderate' },
        { name: 'Phosphorus', value: 15, unit: 'ppm', description: 'Medium' },
        { name: 'Potassium', value: 150, unit: 'ppm', description: 'Medium' },
        { name: 'Water Retention', value: 'Moderate to High', description: 'Holds water well' }
      ];
      description = 'Silt soil has medium-sized particles that hold water well but can become compacted. It's fertile and easy to work with when properly managed.';
      break;
    case 'Peat':
      properties = [
        { name: 'pH Level', value: 4.5, unit: 'pH', description: 'Acidic' },
        { name: 'Organic Matter', value: 20.0, unit: '%', description: 'Very High' },
        { name: 'Nitrogen', value: 0.3, unit: '%', description: 'High' },
        { name: 'Phosphorus', value: 5, unit: 'ppm', description: 'Low' },
        { name: 'Potassium', value: 60, unit: 'ppm', description: 'Low' },
        { name: 'Water Retention', value: 'Very High', description: 'Can become waterlogged' }
      ];
      description = 'Peat soil is high in organic matter and tends to be acidic. It holds moisture very well but may require amendments for optimal growing conditions for many plants.';
      break;
    case 'Chalky':
      properties = [
        { name: 'pH Level', value: 8.0, unit: 'pH', description: 'Alkaline' },
        { name: 'Organic Matter', value: 1.5, unit: '%', description: 'Low' },
        { name: 'Nitrogen', value: 0.1, unit: '%', description: 'Low' },
        { name: 'Phosphorus', value: 10, unit: 'ppm', description: 'Medium' },
        { name: 'Potassium', value: 120, unit: 'ppm', description: 'Medium' },
        { name: 'Water Retention', value: 'Low', description: 'Drains quickly' }
      ];
      description = 'Chalky soil is alkaline and typically contains calcium carbonate or lime. It drains well but can cause nutrient deficiencies in plants that prefer acidic conditions.';
      break;
    default:
      properties = [
        { name: 'pH Level', value: 7.0, unit: 'pH', description: 'Neutral' },
        { name: 'Organic Matter', value: 2.0, unit: '%', description: 'Moderate' },
        { name: 'Nitrogen', value: 0.15, unit: '%', description: 'Moderate' },
        { name: 'Phosphorus', value: 12, unit: 'ppm', description: 'Medium' },
        { name: 'Potassium', value: 150, unit: 'ppm', description: 'Medium' },
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
  let recommendedCrops: Crop[] = [];
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
