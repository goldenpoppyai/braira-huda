import { CLOUDINARY_GALLERY } from '@/lib/config';

// Real image URLs extracted from Braira Al Olaya website
export const brairaMockImages = {
  // Hotel Exterior & Lobby
  exterior: [
    {
      id: 'ext-1',
      src: CLOUDINARY_GALLERY[0],
      alt: 'Braira Al Olaya Hotel Exterior',
      title: 'Hotel Exterior',
      description: 'Modern 4-star hotel in the heart of Al Olaya district',
      category: 'Exterior',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'lobby-1',
      src: CLOUDINARY_GALLERY[1],
      alt: 'Braira Al Olaya Hotel Lobby',
      title: 'Elegant Lobby',
      description: 'Spacious and luxurious hotel lobby with modern Arabian design',
      category: 'Lobby',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    }
  ],

  // Rooms & Suites
  rooms: [
    {
      id: 'room-deluxe-1',
      src: CLOUDINARY_GALLERY[2],
      alt: 'Deluxe Room with City View',
      title: 'Deluxe Room',
      description: 'Spacious deluxe room with modern amenities and city views',
      category: 'Deluxe Room',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'room-standard-1',
      src: CLOUDINARY_GALLERY[3],
      alt: 'Standard Room Interior',
      title: 'Standard Room',
      description: 'Comfortable standard room with essential amenities',
      category: 'Standard Room',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'bathroom-1',
      src: CLOUDINARY_GALLERY[4],
      alt: 'Bathroom with modern fixtures',
      title: 'Bathroom',
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
      src: CLOUDINARY_GALLERY[5],
      alt: 'Al Diwan Restaurant',
      title: 'Al Diwan Restaurant',
      description: 'Main restaurant serving Turkish and international cuisine',
      category: 'Dining',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    },
    {
      id: 'coffee-lounge-1',
      src: CLOUDINARY_GALLERY[6],
      alt: 'Majlis Coffee Lounge',
      title: 'Majlis Coffee Lounge',
      description: 'Traditional Arabic coffee and modern beverages',
      category: 'Coffee Lounge',
      photographer: 'Braira Hotels',
      license: 'Hotel Marketing'
    }
  ],

  // Facilities (sample)
  facilities: [
    {
      id: 'pool-1',
      src: CLOUDINARY_GALLERY[7],
      alt: 'Outdoor pool',
      title: 'Outdoor Pool',
      category: 'Recreation',
      photographer: 'Braira Hotels'
    },
    {
      id: 'gym-1',
      src: CLOUDINARY_GALLERY[8],
      alt: 'Fitness Center',
      title: 'Fitness Center',
      category: 'Fitness',
      photographer: 'Braira Hotels'
    },
    {
      id: 'business-1',
      src: CLOUDINARY_GALLERY[9],
      alt: 'Business Center',
      title: 'Business Center',
      category: 'Business',
      photographer: 'Braira Hotels'
    }
  ],

  // Meetings & Events
  meetings: [
    {
      id: 'meeting-1',
      src: CLOUDINARY_GALLERY[10],
      alt: 'Meeting room layout',
      title: 'Meeting Room',
      category: 'Meetings'
    },
    {
      id: 'meeting-2',
      src: CLOUDINARY_GALLERY[11],
      alt: 'Boardroom style',
      title: 'Boardroom',
      category: 'Meetings'
    }
  ],

  // Gallery (general)
  gallery: [
    {
      id: 'g-1',
      src: CLOUDINARY_GALLERY[12],
      alt: 'Gallery image 1',
      title: 'Gallery 1',
      category: 'Gallery'
    },
    {
      id: 'g-2',
      src: CLOUDINARY_GALLERY[13],
      alt: 'Gallery image 2',
      title: 'Gallery 2',
      category: 'Gallery'
    },
    {
      id: 'g-3',
      src: CLOUDINARY_GALLERY[14],
      alt: 'Gallery image 3',
      title: 'Gallery 3',
      category: 'Gallery'
    },
    {
      id: 'g-4',
      src: CLOUDINARY_GALLERY[15],
      alt: 'Gallery image 4',
      title: 'Gallery 4',
      category: 'Gallery'
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
    images: [brairaMockImages.rooms[0], brairaMockImages.rooms[2]],
    features: ['king_bed', 'city_view', 'work_desk', 'minibar'],
    amenities: ['wifi', 'parking', 'coffee', 'bathroom', 'tv', 'ac', 'safe', 'bedding'],
    description: 'Spacious deluxe room featuring a comfortable king bed and stunning city views. Perfect for business and leisure travelers.',
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
    images: [brairaMockImages.rooms[1], brairaMockImages.rooms[2]],
    features: ['king_bed', 'executive_lounge', 'city_view', 'work_desk'],
    amenities: ['wifi', 'parking', 'coffee', 'bathroom', 'tv', 'ac', 'safe', 'bedding'],
    description: 'Enhanced room with executive lounge access and expanded workspace for the discerning business traveler.',
    availability: 'available' as const,
    rating: 4.6,
    reviewCount: 89
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
