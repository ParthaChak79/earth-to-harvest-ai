
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SoilAnalysisResult, SoilProperty } from "@/types/soil";
import { Separator } from "@/components/ui/separator";
import { Earth, MapPin } from "lucide-react";

interface SoilAnalysisProps {
  result: SoilAnalysisResult | null;
}

const getSoilColorClass = (soilType: string): string => {
  switch (soilType) {
    case 'Clay': return 'bg-soil-clay';
    case 'Sandy': return 'bg-soil-sand';
    case 'Loam': return 'bg-soil-loam';
    case 'Silt': return 'bg-soil-light-brown';
    case 'Peat': return 'bg-soil-dark-brown';
    case 'Chalky': return 'bg-soil-clay/70';
    default: return 'bg-soil-medium-brown';
  }
};

const SoilPropertyItem: React.FC<{ property: SoilProperty }> = ({ property }) => {
  return (
    <div className="flex justify-between items-start py-2 border-b border-soil-light-brown/20 last:border-0">
      <div>
        <h4 className="font-medium text-soil-dark-brown">{property.name}</h4>
        <p className="text-sm text-muted-foreground">{property.description}</p>
      </div>
      <div className="text-right">
        <span className="font-semibold">
          {property.value} {property.unit && <span className="text-sm font-normal">{property.unit}</span>}
        </span>
      </div>
    </div>
  );
};

const SoilAnalysis: React.FC<SoilAnalysisProps> = ({ result }) => {
  if (!result) {
    return null;
  }

  const soilColorClass = getSoilColorClass(result.soilType);

  return (
    <Card className="w-full shadow-lg border-soil-medium-brown/20 animate-fade-in">
      <CardHeader className="bg-soil-light-brown/10 border-b border-soil-light-brown/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-soil-dark-brown flex items-center">
            <Earth className="mr-2 h-5 w-5" /> 
            Soil Analysis Results
          </CardTitle>
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full mr-2 ${soilColorClass}`}></div>
            <span className="font-semibold text-soil-dark-brown">{result.soilType} Soil</span>
          </div>
        </div>
        <CardDescription>
          Details and properties of your soil sample
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        {result.location && (
          <div className="bg-soil-light-brown/5 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-2 text-soil-medium-brown" />
              <h3 className="font-semibold text-soil-dark-brown">Sample Location</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Longitude:</span>
                <span className="ml-2 font-medium text-soil-dark-brown">{result.location.longitude.toFixed(6)}°</span>
              </div>
              <div>
                <span className="text-muted-foreground">Latitude:</span>
                <span className="ml-2 font-medium text-soil-dark-brown">{result.location.latitude.toFixed(6)}°</span>
              </div>
              <div>
                <span className="text-muted-foreground">Sample Depth:</span>
                <span className="ml-2 font-medium text-soil-dark-brown">{result.location.depth} cm</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-soil-light-brown/5 p-4 rounded-lg">
          <p className="text-soil-dark-brown">{result.description}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-soil-dark-brown mb-3 text-lg">Soil Properties</h3>
          <Separator className="my-2 bg-soil-light-brown/30" />
          <div className="space-y-1">
            {result.properties.map((property, index) => (
              <SoilPropertyItem key={index} property={property} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilAnalysis;
