import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Heart,
  Share2,
  Calendar,
  Phone
} from 'lucide-react';
import { ImageGallery, type GalleryImage } from './ImageGallery';
import { useI18n } from '@/lib/i18n';

interface FacilityCardProps {
  facility: {
    id: string;
    name: string;
    type: 'dining' | 'spa' | 'fitness' | 'business' | 'recreation';
    images: GalleryImage[];
    description: string;
    features: string[];
    hours: string;
    capacity?: string;
    location: string;
    rating?: number;
    reviewCount?: number;
    pricing?: {
      from: string;
      currency: string;
      per?: string;
    };
    availability: 'open' | 'busy' | 'closed' | 'by_appointment';
    specialOffers?: string[];
    certifications?: string[];
  };
  onBookNow?: (facilityId: string) => void;
  onViewMenu?: (facilityId: string) => void;
  onGetDirections?: (facilityId: string) => void;
}

export function FacilityCard({ facility, onBookNow, onViewMenu, onGetDirections }: FacilityCardProps) {
  const { t } = useI18n();

  const getTypeColor = () => {
    const colors = {
      dining: 'bg-orange-500',
      spa: 'bg-green-500', 
      fitness: 'bg-blue-500',
      business: 'bg-purple-500',
      recreation: 'bg-pink-500'
    };
    return colors[facility.type] || 'bg-gray-500';
  };

  const getAvailabilityStatus = () => {
    const status = {
      open: { color: 'bg-green-500', text: 'Open Now' },
      busy: { color: 'bg-yellow-500', text: 'Busy' },
      closed: { color: 'bg-red-500', text: 'Closed' },
      by_appointment: { color: 'bg-blue-500', text: 'By Appointment' }
    };
    return status[facility.availability] || { color: 'bg-gray-500', text: 'Unknown' };
  };

  const availabilityStatus = getAvailabilityStatus();

  return (
    <Card className="overflow-hidden elegant-shadow hover:luxury-shadow transition-luxury group">
      <div className="relative">
        {/* Image Gallery */}
        <div className="h-48">
          <ImageGallery 
            images={facility.images}
            showThumbnails={false}
            autoPlay={true}
            autoPlayInterval={5000}
            className="h-full"
          />
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${getTypeColor()} text-white border-none capitalize`}>
            {facility.type}
          </Badge>
        </div>

        {/* Availability Status */}
        <div className="absolute top-4 right-4">
          <Badge className={`${availabilityStatus.color} text-white border-none`}>
            <div className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
            {availabilityStatus.text}
          </Badge>
        </div>

        {/* Special Offers */}
        {facility.specialOffers && facility.specialOffers.length > 0 && (
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-red-500 text-white border-none">
              Special Offer
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Facility Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{facility.name}</h3>
            
            {/* Location & Hours */}
            <div className="space-y-1 text-sm text-muted-foreground mb-3">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {facility.location}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {facility.hours}
              </div>
              {facility.capacity && (
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {facility.capacity}
                </div>
              )}
            </div>

            {/* Rating */}
            {facility.rating && (
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(facility.rating!) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{facility.rating}</span>
                {facility.reviewCount && (
                  <span className="text-xs text-muted-foreground">
                    ({facility.reviewCount} reviews)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Pricing */}
          {facility.pricing && (
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                {facility.pricing.from} {facility.pricing.currency}
              </div>
              {facility.pricing.per && (
                <div className="text-xs text-muted-foreground">
                  {facility.pricing.per}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {facility.description}
        </p>

        {/* Features */}
        <div className="mb-4">
          <h4 className="font-medium mb-2 text-sm">Features & Amenities</h4>
          <div className="flex flex-wrap gap-1">
            {facility.features.map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {t(feature as any)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {facility.certifications && facility.certifications.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-sm">Certifications</h4>
            <div className="flex flex-wrap gap-1">
              {facility.certifications.map((cert) => (
                <Badge key={cert} className="bg-green-500/10 text-green-700 border-green-500/20 text-xs">
                  ✓ {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Special Offers */}
        {facility.specialOffers && facility.specialOffers.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <h4 className="font-medium mb-1 text-sm text-red-800">Special Offers</h4>
            <ul className="text-xs text-red-700 space-y-1">
              {facility.specialOffers.map((offer, index) => (
                <li key={index}>• {offer}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 mb-4">
          {facility.type === 'dining' && (
            <>
              <Button 
                className="flex-1 bg-primary hover:bg-primary-glow"
                onClick={() => onBookNow?.(facility.id)}
                disabled={facility.availability === 'closed'}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {facility.availability === 'closed' ? 'Closed' : 'Reserve Table'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onViewMenu?.(facility.id)}
                className="flex-1"
              >
                {t('view_menu')}
              </Button>
            </>
          )}

          {facility.type === 'spa' && (
            <>
              <Button 
                className="flex-1 bg-primary hover:bg-primary-glow"
                onClick={() => onBookNow?.(facility.id)}
                disabled={facility.availability === 'closed'}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {facility.availability === 'closed' ? 'Closed' : 'Book Treatment'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onViewMenu?.(facility.id)}
                className="flex-1"
              >
                View Services
              </Button>
            </>
          )}

          {(facility.type === 'fitness' || facility.type === 'recreation') && (
            <>
              <Button 
                className="flex-1 bg-primary hover:bg-primary-glow"
                onClick={() => onBookNow?.(facility.id)}
                disabled={facility.availability === 'closed'}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {facility.availability === 'closed' ? 'Closed' : 'Book Session'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onGetDirections?.(facility.id)}
                className="flex-1"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Directions
              </Button>
            </>
          )}

          {facility.type === 'business' && (
            <>
              <Button 
                className="flex-1 bg-primary hover:bg-primary-glow"
                onClick={() => onBookNow?.(facility.id)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Reserve Space
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onViewMenu?.(facility.id)}
                className="flex-1"
              >
                View Packages
              </Button>
            </>
          )}

          <Button variant="outline" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Heart className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {facility.availability === 'open' && 'Open now'}
            {facility.availability === 'busy' && 'Currently busy'}
            {facility.availability === 'closed' && 'Currently closed'}
            {facility.availability === 'by_appointment' && 'Call to book'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}