import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { Users, Wifi, Car, Coffee, Bath, Tv, Wind, Shield, Bed } from 'lucide-react';

function RoomsPage() {
  const { t, dir, hotelName } = useI18n();

  const roomTypes = [
    {
      id: 'deluxe-room',
      category: t('room_deluxe'),
      size: '32 m²',
      capacity: '2 adults',
      price: t('room_price_deluxe'),
      image: '/api/placeholder/600/400',
      features: ['king_bed', 'city_view', 'work_desk', 'minibar', 'safe', 'wifi']
    },
    {
      id: 'executive-room', 
      category: t('room_executive'),
      size: '38 m²',
      capacity: '2-3 adults',
      price: t('room_price_executive'),
      image: '/api/placeholder/600/400',
      features: ['king_bed', 'executive_lounge', 'city_view', 'work_desk', 'minibar', 'safe']
    },
    {
      id: 'junior-suite',
      category: t('room_junior_suite'),
      size: '45 m²', 
      capacity: '2-4 adults',
      price: t('room_price_junior'),
      image: '/api/placeholder/600/400',
      features: ['separate_living', 'king_bed', 'panoramic_view', 'work_area', 'minibar', 'safe']
    },
    {
      id: 'executive-suite',
      category: t('room_executive_suite'),
      size: '65 m²',
      capacity: '2-4 adults', 
      price: t('room_price_suite'),
      image: '/api/placeholder/600/400',
      features: ['separate_living', 'king_bed', 'dining_area', 'panoramic_view', 'premium_amenities', 'butler_service']
    }
  ];

  const amenities = [
    { icon: Wifi, key: 'wifi' },
    { icon: Car, key: 'parking' },
    { icon: Coffee, key: 'coffee' },
    { icon: Bath, key: 'bathroom' },
    { icon: Tv, key: 'tv' },
    { icon: Wind, key: 'ac' },
    { icon: Shield, key: 'safe' },
    { icon: Bed, key: 'bedding' }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('rooms_title')}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('rooms_subtitle')}
          </p>
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
            <Users className="h-4 w-4" />
            <span>{t('rooms_count')}</span>
          </div>
        </div>
      </section>

      {/* Room Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {roomTypes.map((room) => (
              <Card key={room.id} className="elegant-shadow hover:luxury-shadow transition-luxury overflow-hidden">
                <div className="aspect-video bg-secondary relative">
                  <img 
                    src={room.image}
                    alt={room.category}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    {room.category}
                  </Badge>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-2xl font-display font-semibold mb-2 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                        {room.category}
                      </h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>{room.size} • {room.capacity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">{room.price}</p>
                      <p className="text-sm text-muted-foreground">{t('per_night')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {room.features.slice(0, 6).map((feature) => (
                      <div key={feature} className="text-sm text-muted-foreground">
                        • {t(feature as any)}
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Button className="flex-1 bg-primary hover:bg-primary-glow">
                      {t('book_room')}
                    </Button>
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      {t('view_details')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('room_amenities')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('amenities_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((amenity) => (
              <Card key={amenity.key} className="text-center p-6 elegant-shadow hover:luxury-shadow transition-luxury">
                <amenity.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h4 className="font-semibold mb-2">{t(amenity.key as any)}</h4>
                <p className="text-sm text-muted-foreground">{t(`${amenity.key}_desc` as any)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('ready_to_book')}
          </h2>
          <p className={`text-xl mb-8 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('booking_cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent-glow text-accent-foreground">
              {t('book_now')}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              {t('call_reservations')}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const Rooms = () => {
  return (
    <I18nProvider>
      <RoomsPage />
    </I18nProvider>
  );
};

export default Rooms;