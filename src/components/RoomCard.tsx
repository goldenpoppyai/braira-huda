import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bed, 
  Bath, 
  Wifi, 
  Car, 
  Coffee, 
  Dumbbell, 
  Waves, 
  Utensils,
  Shield,
  Wind,
  Tv,
  MapPin,
  Star,
  Users,
  Calendar,
  CreditCard,
  Phone
} from 'lucide-react';
import { ImageGallery, type GalleryImage } from './ImageGallery';
import { useI18n } from '@/lib/i18n';

interface RoomCardProps {
  room: {
    id: string;
    category: string;
    size: string;
    capacity: string;
    price: string;
    originalPrice?: string;
    discount?: string;
    images: GalleryImage[];
    features: string[];
    amenities: string[];
    description: string;
    availability: 'available' | 'limited' | 'unavailable';
    rating?: number;
    reviewCount?: number;
  };
  onBookNow?: (roomId: string) => void;
  onViewDetails?: (roomId: string) => void;
}

export function RoomCard({ room, onBookNow, onViewDetails }: RoomCardProps) {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);

  const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      wifi: <Wifi className="h-4 w-4" />,
      parking: <Car className="h-4 w-4" />,
      coffee: <Coffee className="h-4 w-4" />,
      bathroom: <Bath className="h-4 w-4" />,
      tv: <Tv className="h-4 w-4" />,
      ac: <Wind className="h-4 w-4" />,
      safe: <Shield className="h-4 w-4" />,
      bedding: <Bed className="h-4 w-4" />
    };
    return iconMap[amenity] || <Star className="h-4 w-4" />;
  };

  const getAvailabilityColor = () => {
    switch (room.availability) {
      case 'available': return 'bg-green-500';
      case 'limited': return 'bg-yellow-500';
      case 'unavailable': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAvailabilityText = () => {
    switch (room.availability) {
      case 'available': return 'Available';
      case 'limited': return 'Limited Availability';
      case 'unavailable': return 'Fully Booked';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="overflow-hidden elegant-shadow hover:luxury-shadow transition-luxury group">
      <div className="relative">
        {/* Image Gallery */}
        <div className="h-64">
          <ImageGallery 
            images={room.images}
            showThumbnails={false}
            autoPlay={true}
            autoPlayInterval={4000}
            className="h-full"
          />
        </div>

        {/* Availability Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${getAvailabilityColor()} text-white border-none`}>
            <div className="w-2 h-2 rounded-full bg-white mr-2" />
            {getAvailabilityText()}
          </Badge>
        </div>

        {/* Discount Badge */}
        {room.discount && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-red-500 text-white border-none">
              {room.discount} OFF
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Room Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{room.category}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {room.size}
              </div>
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {room.capacity}
              </div>
            </div>
            
            {/* Rating */}
            {room.rating && (
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(room.rating!) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{room.rating}</span>
                {room.reviewCount && (
                  <span className="text-xs text-muted-foreground">
                    ({room.reviewCount} reviews)
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="flex items-center space-x-2">
              {room.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {room.originalPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-primary">{room.price}</span>
            </div>
            <div className="text-xs text-muted-foreground">{t('per_night')}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {room.description}
        </p>

        {/* Amenities Grid */}
        <div className="mb-4">
          <h4 className="font-medium mb-2 text-sm">{t('room_amenities')}</h4>
          <div className="grid grid-cols-4 gap-2">
            {room.amenities.slice(0, 8).map((amenity) => (
              <div 
                key={amenity}
                className="flex items-center justify-center p-2 bg-muted rounded-md"
                title={t(amenity as any)}
              >
                {getAmenityIcon(amenity)}
              </div>
            ))}
          </div>
          {room.amenities.length > 8 && (
            <button 
              className="text-xs text-primary mt-2 hover:underline"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : `+${room.amenities.length - 8} more amenities`}
            </button>
          )}
        </div>

        {/* Expanded Amenities */}
        {isExpanded && (
          <div className="mb-4 p-3 bg-muted/30 rounded-md">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {room.amenities.slice(8).map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  {getAmenityIcon(amenity)}
                  <span>{t(amenity as any)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-medium mb-2 text-sm">Key Features</h4>
          <div className="flex flex-wrap gap-1">
            {room.features.map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {t(feature as any)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            className="flex-1 bg-primary hover:bg-primary-glow"
            onClick={() => onBookNow?.(room.id)}
            disabled={room.availability === 'unavailable'}
          >
            <Calendar className="h-4 w-4 mr-2" />
            {room.availability === 'unavailable' ? 'Fully Booked' : t('book_now')}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => onViewDetails?.(room.id)}
            className="flex-1"
          >
            {t('view_details')}
          </Button>
          
          <Button variant="outline" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Info */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>✓ Free WiFi</span>
              <span>✓ Free Cancellation</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="h-3 w-3 mr-1" />
              <span>Pay at hotel</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}