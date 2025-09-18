import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BOOKING_URL } from '@/lib/config';
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
  MapPin,
  Users,
  Star,
  Calendar,
  Phone,
  CreditCard
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface RoomCardProps {
  room: {
    id: string;
    category: string;
    size: string;
    capacity: string;
    description: string;
    amenities: string[];
    rating?: number;
    reviewCount?: number;
    price: {
      from: string;
      currency: string;
      discount?: string;
    };
    availability?: 'available' | 'unavailable';
    discount?: string;
  };
  onBookNow?: (roomId: string) => void;
  onViewDetails?: (roomId: string) => void;
}

export function RoomCard({ room, onBookNow, onViewDetails }: RoomCardProps) {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);

  // Fallback booking handler: calls provided handler if available, otherwise opens BOOKING_URL
  const handleBookNow = (id?: string) => {
    try {
      if (onBookNow) {
        onBookNow(id || room.id);
        return;
      }
    } catch (err) {
      // ignore and fallback
    }
    if (typeof window !== 'undefined' && BOOKING_URL) {
      window.open(BOOKING_URL, '_blank', 'noopener');
    }
  };

  function getAmenityIcon(amenity: string) {
    switch (amenity) {
      case 'bed': return <Bed className="h-4 w-4" />;
      case 'bath': return <Bath className="h-4 w-4" />;
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      case 'coffee': return <Coffee className="h-4 w-4" />;
      case 'gym': return <Dumbbell className="h-4 w-4" />;
      case 'sea_view': return <Waves className="h-4 w-4" />;
      case 'dining': return <Utensils className="h-4 w-4" />;
      case 'safety': return <Shield className="h-4 w-4" />;
      case 'breeze': return <Wind className="h-4 w-4" />;
      default: return <Bed className="h-4 w-4" />;
    }
  }

  return (
    <Card className="overflow-hidden elegant-shadow transition-luxury group">
      <div className="relative">
        <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200">
          {/* placeholder hero image per room */}
        </div>

        {/* Discount Badge */}
        {room.discount && (
          <div className="absolute top-4 left-4">
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

          {/* Pricing */}
          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              {room.price.from} {room.price.currency}
            </div>
            {room.price.discount && (
              <div className="text-xs text-muted-foreground">
                {room.price.discount} off
              </div>
            )}
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
        </div>

        {/* Expand */}
        <div className="mb-4">
          <Button size="sm" variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? t('show_less') : t('show_more')}
          </Button>
          {isExpanded && (
            <div className="mt-3 text-sm text-muted-foreground">
              {/* extended info */}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            className="flex-1 bg-primary hover:bg-primary-glow"
            onClick={() => handleBookNow(room.id)}
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
