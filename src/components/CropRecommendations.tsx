
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CropRecommendations as CropRecsType, Crop } from "@/types/soil";
import { Badge } from "@/components/ui/badge";
import { Leaf, TreeDeciduous } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CropRecommendationsProps {
  recommendations: CropRecsType | null;
}

const getSuitabilityColor = (suitability: 'high' | 'medium' | 'low'): string => {
  switch (suitability) {
    case 'high': return 'bg-leaf-green text-white hover:bg-leaf-green/90';
    case 'medium': return 'bg-light-green text-white hover:bg-light-green/90';
    case 'low': return 'bg-soil-light-brown text-soil-dark-brown hover:bg-soil-light-brown/90';
    default: return 'bg-muted hover:bg-muted/90';
  }
};

const CropItem: React.FC<{ crop: Crop }> = ({ crop }) => {
  const badgeClass = getSuitabilityColor(crop.suitability);
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 border-b border-soil-light-brown/20 last:border-0 gap-2">
      <div className="flex items-center">
        <TreeDeciduous className="mr-2 h-5 w-5 text-deep-green" />
        <h4 className="font-medium text-soil-dark-brown">{crop.name}</h4>
      </div>
      <div className="flex items-center gap-2 ml-7 md:ml-0">
        <Badge className={badgeClass} variant="secondary">
          {crop.suitability.charAt(0).toUpperCase() + crop.suitability.slice(1)} Suitability
        </Badge>
        <span className="hidden md:inline text-sm text-muted-foreground">{crop.description}</span>
      </div>
      <div className="md:hidden text-sm text-muted-foreground ml-7">{crop.description}</div>
    </div>
  );
};

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ recommendations }) => {
  if (!recommendations) {
    return null;
  }

  return (
    <Card className="w-full shadow-lg border-soil-medium-brown/20 animate-fade-in">
      <CardHeader className="bg-soil-light-brown/10 border-b border-soil-light-brown/20">
        <CardTitle className="text-soil-dark-brown flex items-center">
          <Leaf className="mr-2 h-5 w-5" /> 
          Crop Recommendations
        </CardTitle>
        <CardDescription>
          Suggested crops based on your soil analysis
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-6">
          {recommendations.recommendedCrops.length > 0 ? (
            <>
              <div>
                <h3 className="font-semibold text-soil-dark-brown mb-2 text-lg">Recommended Crops</h3>
                <Separator className="my-2 bg-soil-light-brown/30" />
                <div className="space-y-1">
                  {recommendations.recommendedCrops.map((crop, index) => (
                    <CropItem key={index} crop={crop} />
                  ))}
                </div>
              </div>
              
              {recommendations.notes && (
                <div className="bg-soil-light-brown/5 p-4 rounded-lg border border-soil-light-brown/20">
                  <h3 className="font-medium text-soil-dark-brown mb-2">Growing Notes</h3>
                  <p className="text-soil-dark-brown/90">{recommendations.notes}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <p>No crop recommendations available for this soil type.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CropRecommendations;
