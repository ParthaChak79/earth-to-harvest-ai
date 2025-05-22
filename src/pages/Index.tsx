
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import SoilForm from '@/components/SoilForm';
import SoilAnalysis from '@/components/SoilAnalysis';
import CropRecommendations from '@/components/CropRecommendations';
import { fetchSoilData, getCropRecommendations } from '@/services/soilApi';
import { SoilFormData, SoilAnalysisResult, CropRecommendations as CropRecsType } from '@/types/soil';
import { Earth, Leaf } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [soilAnalysis, setSoilAnalysis] = useState<SoilAnalysisResult | null>(null);
  const [cropRecommendations, setCropRecommendations] = useState<CropRecsType | null>(null);

  const handleFormSubmit = async (data: SoilFormData) => {
    setIsLoading(true);
    try {
      // Clear previous results
      setSoilAnalysis(null);
      setCropRecommendations(null);
      
      // Fetch soil analysis data
      const analysisResult = await fetchSoilData(data.longitude, data.latitude, data.depth);
      setSoilAnalysis(analysisResult);
      
      // Fetch crop recommendations based on soil type
      const recommendations = await getCropRecommendations(analysisResult.soilType);
      setCropRecommendations(recommendations);
      
      toast({
        title: "Analysis Complete",
        description: `Identified ${analysisResult.soilType} soil at your specified location.`,
      });
    } catch (error) {
      console.error("Error analyzing soil:", error);
      toast({
        title: "Error",
        description: "Failed to analyze soil data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-soil-clay/20">
      <div className="container px-4 py-8 mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-deep-green rounded-full p-3">
              <Earth className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-soil-dark-brown mb-2">Soil Analysis & Crop Advisor</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter location coordinates and sampling depth to analyze soil composition 
            and receive personalized crop recommendations
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <SoilForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
            
            <div className="lg:col-span-7 space-y-8">
              {isLoading ? (
                <div className="flex items-center justify-center h-64 border border-dashed rounded-lg border-soil-light-brown/50">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soil-dark-brown mx-auto"></div>
                    <p className="mt-4 text-soil-dark-brown">Analyzing soil data...</p>
                  </div>
                </div>
              ) : (
                <>
                  {soilAnalysis && <SoilAnalysis result={soilAnalysis} />}
                  {cropRecommendations && <CropRecommendations recommendations={cropRecommendations} />}
                  
                  {!soilAnalysis && !isLoading && (
                    <div className="flex items-center justify-center h-64 border border-dashed rounded-lg border-soil-light-brown/50">
                      <div className="text-center px-6">
                        <Leaf className="h-12 w-12 text-soil-medium-brown/50 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-soil-dark-brown mb-2">No Analysis Results Yet</h3>
                        <p className="text-muted-foreground">
                          Enter your location coordinates and soil depth, then click 
                          "Analyze Soil" to see results.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Soil Analysis & Crop Advisor © 2025</p>
          <p className="mt-1">Using simulated soil data for demonstration purposes</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
