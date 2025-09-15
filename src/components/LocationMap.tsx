import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Navigation, Phone, Clock, Car, Plane } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface LocationMapProps {
  center?: [number, number]; // [longitude, latitude]
  zoom?: number;
  height?: string;
  showDirections?: boolean;
  className?: string;
}

export function LocationMap({ 
  center = [46.6901, 24.7100], // Riyadh coordinates (lng, lat)
  zoom = 15,
  height = '400px',
  showDirections = true,
  className = ''
}: LocationMapProps) {
  const { t } = useI18n();
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Hotel location - Braira Al Olaya, Riyadh
  const hotelLocation = {
    name: 'Braira Al Olaya Riyadh',
    address: 'Al Olaya District, King Fahd Road, Riyadh 12333, Saudi Arabia',
    coordinates: [46.6901, 24.7100], // [lng, lat]
    phone: '+966 11 XXX XXXX',
    businessHours: '24/7 Reception'
  };

  const nearbyAttractions = [
    { name: 'Kingdom Centre', distance: '0.8 km', coordinates: [46.6721, 24.7114] },
    { name: 'Al Faisaliah Tower', distance: '1.2 km', coordinates: [46.6830, 24.6914] },
    { name: 'King Fahd National Library', distance: '1.5 km', coordinates: [46.6782, 24.7231] },
    { name: 'Riyadh Gallery Mall', distance: '2.1 km', coordinates: [46.6952, 24.7456] },
    { name: 'Ministry of Defense', distance: '0.5 km', coordinates: [46.6845, 24.7089] }
  ];

  const transportOptions = [
    {
      type: 'Airport',
      name: 'King Khalid International Airport',
      distance: '35 km',
      time: '35 minutes',
      icon: <Plane className="h-4 w-4" />
    },
    {
      type: 'Taxi',
      name: 'Uber/Careem Available',
      distance: 'On demand',
      time: '5-10 min arrival',
      icon: <Car className="h-4 w-4" />
    }
  ];

  const handleGetDirections = () => {
    const coords = hotelLocation.coordinates;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords[1]},${coords[0]}&destination_place_id=Braira+Al+Olaya+Riyadh`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleCallHotel = () => {
    window.open(`tel:${hotelLocation.phone}`, '_self');
  };

  // Static map implementation (fallback when no Mapbox token)
  const StaticMapView = () => (
    <div className="relative w-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center"
         style={{ height }}>
      <div className="text-center p-8">
        <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
        <p className="text-muted-foreground mb-4 max-w-md">
          View our exact location and get directions to Braira Al Olaya Riyadh
        </p>
        <div className="space-y-2">
          <Button onClick={handleGetDirections} className="w-full max-w-xs">
            <Navigation className="h-4 w-4 mr-2" />
            Get Directions
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowTokenInput(!showTokenInput)}
            className="w-full max-w-xs"
          >
            Enable Interactive Map
          </Button>
        </div>
        
        {showTokenInput && (
          <div className="mt-4 max-w-md mx-auto">
            <Alert className="mb-3">
              <AlertDescription className="text-xs">
                To enable the interactive map, please provide your Mapbox public token. 
                Get one free at mapbox.com
              </AlertDescription>
            </Alert>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter Mapbox public token..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="text-xs"
              />
              <Button size="sm" disabled={!mapboxToken}>
                Enable
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Hotel Location Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            Hotel Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">{hotelLocation.name}</h3>
            <p className="text-muted-foreground text-sm">{hotelLocation.address}</p>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Phone className="h-3 w-3 mr-1" />
              {hotelLocation.phone}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {hotelLocation.businessHours}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleGetDirections} className="flex-1">
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
            <Button variant="outline" onClick={handleCallHotel} className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call Hotel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map Display */}
      <Card>
        <CardContent className="p-0">
          <StaticMapView />
        </CardContent>
      </Card>

      {/* Nearby Attractions */}
      <Card>
        <CardHeader>
          <CardTitle>Nearby Attractions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nearbyAttractions.map((attraction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-medium">{attraction.name}</h4>
                  <p className="text-sm text-muted-foreground">{attraction.distance} away</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    const coords = attraction.coordinates;
                    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${hotelLocation.coordinates[1]},${hotelLocation.coordinates[0]}&destination=${coords[1]},${coords[0]}`;
                    window.open(googleMapsUrl, '_blank');
                  }}
                >
                  <Navigation className="h-3 w-3 mr-1" />
                  Directions
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transportation */}
      <Card>
        <CardHeader>
          <CardTitle>Transportation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transportOptions.map((transport, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  {transport.icon}
                  <div>
                    <h4 className="font-medium">{transport.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {transport.distance} • {transport.time}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  More Info
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Location Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Business District</h4>
              <p className="text-xs text-muted-foreground">
                Located in the heart of Riyadh's financial and business center
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Shopping & Dining</h4>
              <p className="text-xs text-muted-foreground">
                Walking distance to premium malls and restaurants
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Transportation Hub</h4>
              <p className="text-xs text-muted-foreground">
                Easy access to major roads and public transportation
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Cultural Sites</h4>
              <p className="text-xs text-muted-foreground">
                Close to museums, libraries, and cultural attractions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}