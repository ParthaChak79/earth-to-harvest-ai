
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Earth, Cloud } from "lucide-react";
import { SoilFormData } from "@/types/soil";

interface SoilFormProps {
  onSubmit: (data: SoilFormData) => void;
  isLoading: boolean;
}

const SoilForm: React.FC<SoilFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<SoilFormData>({
    longitude: 0,
    latitude: 0,
    depth: 30, // Default depth in cm
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SoilFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SoilFormData, string>> = {};
    
    if (formData.longitude < -180 || formData.longitude > 180) {
      newErrors.longitude = "Longitude must be between -180 and 180";
    }
    
    if (formData.latitude < -90 || formData.latitude > 90) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }
    
    if (formData.depth <= 0 || formData.depth > 200) {
      newErrors.depth = "Depth must be between 1 and 200 cm";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            longitude: parseFloat(position.coords.longitude.toFixed(6)),
            latitude: parseFloat(position.coords.latitude.toFixed(6))
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please enter coordinates manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-soil-medium-brown/20">
      <CardHeader className="bg-soil-light-brown/10 border-b border-soil-light-brown/20">
        <CardTitle className="text-soil-dark-brown flex items-center">
          <Earth className="mr-2 h-5 w-5" /> 
          Soil Analysis
        </CardTitle>
        <CardDescription>
          Enter location coordinates and depth to analyze soil composition
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-soil-medium-brown" />
                <Label htmlFor="longitude" className="text-soil-dark-brown">Longitude</Label>
              </div>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                step="0.000001"
                value={formData.longitude}
                onChange={handleChange}
                className={errors.longitude ? "border-destructive" : ""}
                placeholder="e.g., -74.006"
              />
              {errors.longitude && (
                <p className="text-destructive text-sm">{errors.longitude}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-soil-medium-brown" />
                <Label htmlFor="latitude" className="text-soil-dark-brown">Latitude</Label>
              </div>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                step="0.000001"
                value={formData.latitude}
                onChange={handleChange}
                className={errors.latitude ? "border-destructive" : ""}
                placeholder="e.g., 40.713"
              />
              {errors.latitude && (
                <p className="text-destructive text-sm">{errors.latitude}</p>
              )}
            </div>
          </div>
          
          <div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleUseCurrentLocation}
              className="w-full text-soil-dark-brown border-soil-medium-brown/30 hover:bg-soil-light-brown/10 hover:text-soil-dark-brown"
            >
              <MapPin className="mr-2 h-4 w-4" /> Use My Current Location
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Cloud className="mr-2 h-4 w-4 text-soil-medium-brown" />
              <Label htmlFor="depth" className="text-soil-dark-brown">Depth (cm)</Label>
            </div>
            <Input
              id="depth"
              name="depth"
              type="number"
              value={formData.depth}
              onChange={handleChange}
              className={errors.depth ? "border-destructive" : ""}
              placeholder="e.g., 30"
            />
            {errors.depth && (
              <p className="text-destructive text-sm">{errors.depth}</p>
            )}
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="bg-soil-light-brown/5 border-t border-soil-light-brown/20">
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading}
          className="w-full bg-deep-green hover:bg-deep-green/90"
        >
          {isLoading ? "Analyzing..." : "Analyze Soil"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SoilForm;
