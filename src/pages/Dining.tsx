import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { Clock, Users, Phone, MapPin, Star, Utensils, Coffee, Wine } from 'lucide-react';

function DiningPage() {
  const { t, dir } = useI18n();

  const restaurants = [
    {
      id: 'main-restaurant',
      name: t('restaurant_main_name'),
      cuisine: t('cuisine_international'),
      image: '/api/placeholder/600/400',
      hours: t('hours_breakfast_dinner'),
      capacity: '120 guests',
      specialty: t('turkish_specialties'),
      halal: true,
      features: ['halal_certified', 'live_cooking', 'buffet_ala_carte', 'dietary_options']
    },
    {
      id: 'coffee-lounge',
      name: t('coffee_lounge_name'), 
      cuisine: t('cuisine_cafe'),
      image: '/api/placeholder/600/400',
      hours: t('hours_all_day'),
      capacity: '40 guests',
      specialty: t('arabic_coffee_pastries'),
      halal: true,
      features: ['premium_coffee', 'fresh_pastries', 'business_meetings', 'wifi_zone']
    },
    {
      id: 'room-service',
      name: t('room_service_name'),
      cuisine: t('cuisine_international'),
      image: '/api/placeholder/600/400', 
      hours: t('hours_24_7'),
      capacity: t('all_rooms'),
      specialty: t('in_room_dining'),
      halal: true,
      features: ['24_hour_service', 'extensive_menu', 'quick_delivery', 'dietary_accommodations']
    }
  ];

  const menuHighlights = [
    {
      category: t('menu_turkish'),
      items: [t('kebab_selection'), t('meze_platter'), t('turkish_desserts')]
    },
    {
      category: t('menu_arabic'),
      items: [t('mansaf_lamb'), t('kabsa_rice'), t('baklava_selection')]
    },
    {
      category: t('menu_international'),
      items: [t('grilled_seafood'), t('pasta_selection'), t('continental_breakfast')]
    },
    {
      category: t('menu_healthy'),
      items: [t('fresh_salads'), t('grilled_vegetables'), t('fruit_selection')]
    }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent-glow text-accent-foreground">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Utensils className="h-4 w-4" />
            <span className="font-medium">{t('halal_certified_dining')}</span>
          </div>
          
          <h1 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('dining_title')}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('dining_subtitle')}
          </p>
          
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{t('dining_hours_varied')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{t('seating_capacity')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-12">
            {restaurants.map((restaurant, index) => (
              <Card key={restaurant.id} className="elegant-shadow hover:luxury-shadow transition-luxury overflow-hidden">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-cols-2' : ''}`}>
                  <div className={`aspect-video lg:aspect-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img 
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardContent className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className={`text-3xl font-display font-bold mb-2 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                          {restaurant.name}
                        </h3>
                        <p className="text-lg text-accent font-semibold mb-2">{restaurant.cuisine}</p>
                        {restaurant.halal && (
                          <Badge className="bg-primary text-primary-foreground">{t('halal_certified')}</Badge>
                        )}
                      </div>
                      <div className="text-right text-muted-foreground">
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{restaurant.hours}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{restaurant.capacity}</span>
                        </div>
                      </div>
                    </div>

                    <p className={`text-muted-foreground mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                      {restaurant.specialty}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {restaurant.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2 text-sm">
                          <Star className="h-3 w-3 text-accent" />
                          <span>{t(feature as any)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <Button className="bg-accent hover:bg-accent-glow text-accent-foreground">
                        {t('make_reservation')}
                      </Button>
                      <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        {t('view_menu')}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('menu_highlights')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('menu_highlights_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuHighlights.map((menu) => (
              <Card key={menu.category} className="text-center p-6 elegant-shadow hover:luxury-shadow transition-luxury">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-accent" />
                </div>
                <h4 className={`font-display font-semibold text-lg mb-4 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {menu.category}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {menu.items.map((item) => (
                    <li key={item} className={dir === 'rtl' ? 'font-arabic' : ''}>• {item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Coffee className="h-16 w-16 mx-auto mb-6 text-accent" />
          <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('ready_to_dine')}
          </h2>
          <p className={`text-xl mb-8 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('dining_cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent-glow text-accent-foreground">
              <Phone className="h-4 w-4 mr-2" />
              {t('call_restaurant')}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <MapPin className="h-4 w-4 mr-2" />
              {t('find_us')}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const Dining = () => {
  return (
    <I18nProvider>
      <DiningPage />
    </I18nProvider>
  );
};

export default Dining;