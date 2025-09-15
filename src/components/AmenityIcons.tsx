import React from 'react';
import { 
  Wifi, 
  Car, 
  Coffee, 
  Utensils, 
  Dumbbell, 
  Waves, 
  Shield, 
  Bath,
  Bed,
  Wind,
  Tv,
  Heart,
  Sparkles,
  Users,
  Clock,
  Calendar,
  Phone,
  MapPin,
  Star,
  Award,
  CheckCircle,
  Zap,
  Headphones,
  Camera
} from 'lucide-react';

interface AmenityIconProps {
  name: string;
  className?: string;
}

export function AmenityIcon({ name, className = "h-5 w-5" }: AmenityIconProps) {
  const iconMap: Record<string, React.ReactNode> = {
    // Room Amenities
    wifi: <Wifi className={className} />,
    parking: <Car className={className} />,
    coffee: <Coffee className={className} />,
    bathroom: <Bath className={className} />,
    tv: <Tv className={className} />,
    ac: <Wind className={className} />,
    safe: <Shield className={className} />,
    bedding: <Bed className={className} />,
    
    // Hotel Features
    dining: <Utensils className={className} />,
    fitness: <Dumbbell className={className} />,
    pool: <Waves className={className} />,
    spa: <Heart className={className} />,
    luxury: <Sparkles className={className} />,
    concierge: <Headphones className={className} />,
    
    // Services
    "24_hour": <Clock className={className} />,
    room_service: <Users className={className} />,
    valet: <Star className={className} />,
    business: <Calendar className={className} />,
    phone: <Phone className={className} />,
    location: <MapPin className={className} />,
    
    // Certifications
    halal: <CheckCircle className={className} />,
    award: <Award className={className} />,
    certified: <Award className={className} />,
    premium: <Zap className={className} />,
    photo: <Camera className={className} />
  };

  return iconMap[name] || <Star className={className} />;
}

interface AmenityListProps {
  amenities: string[];
  showLabels?: boolean;
  maxItems?: number;
  gridCols?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'grid' | 'list' | 'inline';
}

export function AmenityList({ 
  amenities, 
  showLabels = true, 
  maxItems,
  gridCols = 4,
  size = 'md',
  variant = 'grid'
}: AmenityListProps) {
  const displayItems = maxItems ? amenities.slice(0, maxItems) : amenities;
  const remainingCount = maxItems && amenities.length > maxItems ? amenities.length - maxItems : 0;
  
  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5', 
    lg: 'h-6 w-6'
  }[size];

  const containerClass = {
    grid: `grid grid-cols-${gridCols} gap-3`,
    list: 'space-y-2',
    inline: 'flex flex-wrap gap-2'
  }[variant];

  const itemClass = {
    grid: 'flex flex-col items-center text-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors',
    list: 'flex items-center space-x-3 p-2 hover:bg-muted/30 rounded-md transition-colors',
    inline: 'flex items-center space-x-2 px-3 py-1 bg-muted/30 rounded-full text-sm'
  }[variant];

  return (
    <div className="space-y-3">
      <div className={containerClass}>
        {displayItems.map((amenity) => (
          <div key={amenity} className={itemClass} title={amenity}>
            <AmenityIcon name={amenity} className={iconSize} />
            {showLabels && (
              <span className={`${variant === 'grid' ? 'mt-2 text-xs' : 'text-sm'} capitalize`}>
                {amenity.replace(/_/g, ' ')}
              </span>
            )}
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div className={`${itemClass} opacity-60`}>
            <span className="text-xs">+{remainingCount} more</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Pre-defined amenity categories for easy use
export const hotelAmenities = {
  essential: ['wifi', 'parking', 'ac', 'phone', '24_hour'],
  comfort: ['coffee', 'tv', 'safe', 'bedding', 'bathroom'],
  wellness: ['fitness', 'pool', 'spa', 'dining'],
  luxury: ['concierge', 'valet', 'room_service', 'business', 'premium'],
  certifications: ['halal', 'certified', 'award']
};

export const roomFeatures = {
  standard: ['king_bed', 'city_view', 'work_desk', 'minibar', 'safe', 'wifi'],
  deluxe: ['king_bed', 'city_view', 'work_desk', 'minibar', 'safe', 'wifi', 'premium_amenities'],
  executive: ['king_bed', 'executive_lounge', 'city_view', 'work_desk', 'minibar', 'safe', 'premium_amenities'],
  suite: ['separate_living', 'king_bed', 'panoramic_view', 'work_area', 'dining_area', 'premium_amenities', 'butler_service']
};

export const facilityFeatures = {
  dining: ['halal_certified', 'live_cooking', 'buffet_ala_carte', 'dietary_options'],
  spa: ['swedish_massage', 'deep_tissue', 'hot_stone', 'couples_massage', 'aromatherapy'],
  fitness: ['modern_equipment', 'cardio_zone', 'weight_training', 'personal_trainer'],
  business: ['24_hour_access', 'printing_services', 'internet_stations', 'secretarial_services']
};