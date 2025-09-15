// Real image URLs extracted from Braira Al Olaya website
export const brairaMockImages = {
  // Hotel Exterior & Lobby
  exterior: [
    {
      id: 'ext-1',
      src: 'https://brairaalolayariyadh.sa-hotels.com/data/Photos/OriginalPhoto/7574/757483/757483264.JPEG',
      alt: 'Braira Al Olaya Hotel Exterior',
      title: 'Hotel Exterior',
      description: 'Modern 4-star hotel in the heart of Al Olaya district',
      category: 'Exterior',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'lobby-1',
      src: 'https://brairaalolayariyadh.sa-hotels.com/data/Photos/OriginalPhoto/15846/1584663/1584663322.JPEG',
      alt: 'Braira Al Olaya Hotel Lobby',
      title: 'Elegant Lobby',
      description: 'Spacious and luxurious hotel lobby with modern Arabian design',
      category: 'Lobby',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'reception-1',
      src: 'https://brairaalolayariyadh.sa-hotels.com/data/Photos/OriginalPhoto/15846/1584663/1584663328.JPEG',
      alt: 'Hotel Reception Area',
      title: 'Reception Desk',
      description: '24/7 reception with multilingual staff',
      category: 'Reception',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    }
  ],

  // Rooms & Suites
  rooms: [
    {
      id: 'room-deluxe-1',
      src: 'https://brairaalolayariyadh.sa-hotels.com/data/Photos/OriginalPhoto/15882/1588251/1588251145.JPEG',
      alt: 'Deluxe Room with City View',
      title: 'Deluxe Room',
      description: 'Spacious deluxe room with modern amenities and city views',
      category: 'Deluxe Room',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'room-standard-1',
      src: 'https://brairaalolayariyadh.sa-hotels.com/data/Photos/OriginalPhoto/15846/1584663/1584663324.JPEG',
      alt: 'Standard Room Interior',
      title: 'Standard Room',
      description: 'Comfortable standard room with essential amenities',
      category: 'Standard Room',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'suite-1',
      src: 'https://brairaalolayariyadh.sa-hotels.com/data/Photos/OriginalPhoto/7574/757484/757484809.JPEG',
      alt: 'Executive Suite Living Area',
      title: 'Executive Suite',
      description: 'Luxurious suite with separate living area and premium amenities',
      category: 'Suite',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'bathroom-1',
      src: 'https://brairaalolayariyadh.sa-hotels.com/data/Photos/OriginalPhoto/7574/757485/757485526.JPEG',
      alt: 'Marble Bathroom',
      title: 'Premium Bathroom',
      description: 'Elegant marble bathroom with premium fixtures',
      category: 'Bathroom',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    }
  ],

  // Dining
  dining: [
    {
      id: 'restaurant-1',
      src: 'https://brairaalolayariyadh.sa-hotels.com/data/Photos/OriginalPhoto/7574/757485/757485535.JPEG',
      alt: 'Al Diwan Restaurant',
      title: 'Al Diwan Restaurant',
      description: 'Main restaurant serving Turkish and international cuisine',
      category: 'Dining',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'coffee-lounge-1',
      src: '/api/placeholder/800/600',
      alt: 'Majlis Coffee Lounge',
      title: 'Majlis Coffee Lounge',
      description: 'Traditional Arabic coffee and modern beverages',
      category: 'Coffee Lounge',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    }
  ],

  // Facilities
  facilities: [
    {
      id: 'fitness-1',
      src: '/api/placeholder/800/600',
      alt: 'Fitness Center',
      title: 'Modern Fitness Center',
      description: 'State-of-the-art fitness equipment available 24/7',
      category: 'Fitness',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'pool-1',
      src: '/api/placeholder/800/600',
      alt: 'Outdoor Swimming Pool',
      title: 'Outdoor Pool',
      description: 'Heated outdoor swimming pool with city views',
      category: 'Pool',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'business-1',
      src: '/api/placeholder/800/600',
      alt: 'Business Center',
      title: '24-Hour Business Center',
      description: 'Fully equipped business center with meeting facilities',
      category: 'Business',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    }
  ],

  // Meeting & Events
  meetings: [
    {
      id: 'ballroom-1',
      src: '/api/placeholder/800/600',
      alt: 'Grand Ballroom',
      title: 'Grand Ballroom',
      description: 'Elegant ballroom for weddings and large events',
      category: 'Events',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'conference-1',
      src: '/api/placeholder/800/600',
      alt: 'Conference Room',
      title: 'Executive Conference Room',
      description: 'Professional meeting space with modern AV equipment',
      category: 'Meetings',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    }
  ],

  // Spa & Wellness
  spa: [
    {
      id: 'spa-treatment-1',
      src: '/api/placeholder/800/600',
      alt: 'Spa Treatment Room',
      title: 'Relaxation Treatment Room',
      description: 'Tranquil spa environment for rejuvenating treatments',
      category: 'Spa',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'steam-room-1',
      src: '/api/placeholder/800/600',
      alt: 'Steam Room',
      title: 'Traditional Steam Room',
      description: 'Authentic steam room experience for relaxation',
      category: 'Wellness',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    }
  ]
};

// Mock room data with real images
export const mockRooms = [
  {
    id: 'deluxe-room',
    category: 'Deluxe Room',
    size: '32 m²',
    capacity: '2 adults',
    price: 'SAR 450',
    originalPrice: 'SAR 500',
    discount: '10%',
    images: [brairaMockImages.rooms[0], brairaMockImages.rooms[3]],
    features: ['king_bed', 'city_view', 'work_desk', 'minibar'],
    amenities: ['wifi', 'parking', 'coffee', 'bathroom', 'tv', 'ac', 'safe', 'bedding'],
    description: 'Spacious deluxe room featuring a comfortable king-size bed, modern amenities, and stunning city views. Perfect for business and leisure travelers.',
    availability: 'available' as const,
    rating: 4.5,
    reviewCount: 127
  },
  {
    id: 'executive-room',
    category: 'Executive Room',
    size: '38 m²',
    capacity: '2-3 adults',
    price: 'SAR 650',
    images: [brairaMockImages.rooms[1], brairaMockImages.rooms[3]],
    features: ['king_bed', 'executive_lounge', 'city_view', 'work_desk'],
    amenities: ['wifi', 'parking', 'coffee', 'bathroom', 'tv', 'ac', 'safe', 'bedding'],
    description: 'Enhanced room with executive lounge access, premium amenities, and expanded workspace for the discerning business traveler.',
    availability: 'limited' as const,
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: 'junior-suite',
    category: 'Junior Suite',
    size: '45 m²',
    capacity: '2-4 adults',
    price: 'SAR 850',
    images: [brairaMockImages.rooms[2], brairaMockImages.rooms[3]],
    features: ['separate_living', 'king_bed', 'panoramic_view', 'work_area'],
    amenities: ['wifi', 'parking', 'coffee', 'bathroom', 'tv', 'ac', 'safe', 'bedding'],
    description: 'Spacious suite with separate living area, ideal for extended stays or families seeking extra comfort and space.',
    availability: 'available' as const,
    rating: 4.8,
    reviewCount: 56
  },
  {
    id: 'executive-suite',
    category: 'Executive Suite',
    size: '65 m²',
    capacity: '2-4 adults',
    price: 'SAR 1,200',
    images: [brairaMockImages.rooms[2], brairaMockImages.rooms[0], brairaMockImages.rooms[3]],
    features: ['separate_living', 'king_bed', 'dining_area', 'panoramic_view', 'premium_amenities', 'butler_service'],
    amenities: ['wifi', 'parking', 'coffee', 'bathroom', 'tv', 'ac', 'safe', 'bedding'],
    description: 'Luxurious suite featuring panoramic city views, butler service, and premium amenities for an exceptional stay experience.',
    availability: 'available' as const,
    rating: 4.9,
    reviewCount: 34
  }
];

// Mock facility data
export const mockFacilities = [
  {
    id: 'al-diwan-restaurant',
    name: 'Al Diwan Restaurant',
    type: 'dining' as const,
    images: [brairaMockImages.dining[0]],
    description: 'Authentic Turkish cuisine with Halal certification in an elegant dining atmosphere',
    features: ['halal_certified', 'live_cooking', 'buffet_ala_carte', 'dietary_options'],
    hours: '6:30 AM - 11:00 PM',
    capacity: '120 guests',
    location: 'Ground Floor',
    rating: 4.6,
    reviewCount: 203,
    pricing: { from: 'SAR 85', currency: 'SAR', per: 'per person' },
    availability: 'open' as const,
    specialOffers: ['20% off for hotel guests', 'Complimentary Arabic coffee'],
    certifications: ['Halal Certified', 'Food Safety Certified']
  },
  {
    id: 'majlis-coffee-lounge',
    name: 'Majlis Coffee Lounge',
    type: 'dining' as const,
    images: [brairaMockImages.dining[1]],
    description: 'Traditional Arabic coffee and modern beverages in a comfortable lounge setting',
    features: ['premium_coffee', 'fresh_pastries', 'business_meetings', 'wifi_zone'],
    hours: '24 Hours',
    capacity: '40 guests',
    location: 'Lobby Level',
    rating: 4.4,
    reviewCount: 156,
    availability: 'open' as const
  },
  {
    id: 'spa-wellness',
    name: 'Spa & Wellness Center',
    type: 'spa' as const,
    images: [brairaMockImages.spa[0], brairaMockImages.spa[1]],
    description: 'Complete wellness experience with traditional and modern treatments',
    features: ['swedish_massage', 'deep_tissue', 'hot_stone', 'couples_massage', 'aromatherapy'],
    hours: '8:00 AM - 10:00 PM',
    location: 'Second Floor',
    rating: 4.7,
    reviewCount: 98,
    pricing: { from: 'SAR 280', currency: 'SAR', per: 'per treatment' },
    availability: 'open' as const,
    specialOffers: ['30% off weekend packages']
  },
  {
    id: 'fitness-center',
    name: 'Fitness Center',
    type: 'fitness' as const,
    images: [brairaMockImages.facilities[0]],
    description: 'Modern fitness equipment and cardio zone available 24/7',
    features: ['modern_equipment', 'cardio_zone', 'weight_training', 'personal_trainer'],
    hours: '24 Hours',
    location: 'Ground Floor',
    rating: 4.3,
    reviewCount: 67,
    availability: 'open' as const
  },
  {
    id: 'business-center',
    name: '24-Hour Business Center',
    type: 'business' as const,
    images: [brairaMockImages.facilities[2], brairaMockImages.meetings[1]],
    description: 'Fully equipped business center with meeting facilities and secretarial support',
    features: ['24_hour_access', 'printing_services', 'internet_stations', 'secretarial_services'],
    hours: '24 Hours',
    capacity: '8 workstations',
    location: 'Mezzanine Level',
    rating: 4.5,
    reviewCount: 43,
    availability: 'open' as const
  }
];