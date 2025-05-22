
export interface SoilFormData {
  longitude: number;
  latitude: number;
  depth: number;
}

export interface SoilProperty {
  name: string;
  value: number | string;
  unit?: string;
  description?: string;
}

export interface SoilAnalysisResult {
  soilType: string;
  properties: SoilProperty[];
  description: string;
}

export interface Crop {
  name: string;
  suitability: 'high' | 'medium' | 'low';
  description: string;
}

export interface CropRecommendations {
  recommendedCrops: Crop[];
  notes?: string;
}
