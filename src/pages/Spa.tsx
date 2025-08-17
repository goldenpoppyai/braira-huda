import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { Clock, Users, Waves, Heart, Zap, Leaf, Dumbbell, User } from 'lucide-react';

function SpaPage() {
  const { t, dir } = useI18n();

  const facilities = [
    {
      id: 'fitness-center',
      name: t('fitness_center'),
      icon: Dumbbell,
      image: '/api/placeholder/600/400',
      hours: t('hours_6am_11pm'),
      features: ['modern_equipment', 'cardio_zone', 'weight_training', 'personal_trainer']
    },
    {
      id: 'swimming-pool',
      name: t('outdoor_pool'),
      icon: Waves,
      image: '/api/placeholder/600/400',
      hours: t('hours_6am_10pm'),
      features: ['heated_pool', 'pool_bar', 'sun_loungers', 'pool_service']
    },
    {
      id: 'steam-room',
      name: t('steam_room'),
      icon: Heart,
      image: '/api/placeholder/600/400',
      hours: t('hours_8am_10pm'),
      features: ['traditional_steam', 'aromatherapy', 'relaxation_area', 'towel_service']
    }
  ];

  const treatments = [
    {
      category: t('massage_therapy'),
      icon: User,
      services: [
        { name: t('swedish_massage'), duration: '60 min', price: t('price_swedish') },
        { name: t('deep_tissue'), duration: '90 min', price: t('price_deep_tissue') },
        { name: t('hot_stone'), duration: '75 min', price: t('price_hot_stone') },
        { name: t('couples_massage'), duration: '60 min', price: t('price_couples') }
      ]
    },
    {
      category: t('body_treatments'),
      icon: Leaf,
      services: [
        { name: t('body_scrub'), duration: '45 min', price: t('price_body_scrub') },
        { name: t('body_wrap'), duration: '60 min', price: t('price_body_wrap') },
        { name: t('aromatherapy'), duration: '75 min', price: t('price_aromatherapy') }
      ]
    },
    {
      category: t('wellness_packages'),
      icon: Zap,
      services: [
        { name: t('half_day_package'), duration: '4 hours', price: t('price_half_day') },
        { name: t('full_day_package'), duration: '8 hours', price: t('price_full_day') },
        { name: t('weekend_retreat'), duration: '2 days', price: t('price_weekend') }
      ]
    }
  ];

  const amenities = [
    { icon: Heart, key: 'relaxation_lounge' },
    { icon: Waves, key: 'hydrotherapy' },
    { icon: Leaf, key: 'organic_products' },
    { icon: User, key: 'expert_therapists' }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-luxury to-primary text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Waves className="h-4 w-4" />
            <span className="font-medium">{t('wellness_sanctuary')}</span>
          </div>
          
          <h1 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('spa_title')}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('spa_subtitle')}
          </p>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('wellness_facilities')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('facilities_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {facilities.map((facility) => (
              <Card key={facility.id} className="elegant-shadow hover:luxury-shadow transition-luxury overflow-hidden">
                <div className="aspect-video bg-secondary relative">
                  <img 
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <facility.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <h3 className={`text-2xl font-display font-semibold mb-3 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                    {facility.name}
                  </h3>
                  
                  <div className="flex items-center text-muted-foreground mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{facility.hours}</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {facility.features.map((feature) => (
                      <div key={feature} className="text-sm text-muted-foreground">
                        • {t(feature)}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-accent hover:bg-accent-glow text-accent-foreground">
                    {t('book_now')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('spa_treatments')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('treatments_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {treatments.map((treatment) => (
              <Card key={treatment.category} className="elegant-shadow hover:luxury-shadow transition-luxury">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <treatment.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className={`text-2xl font-display font-semibold ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                      {treatment.category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {treatment.services.map((service) => (
                      <div key={service.name} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                        <div>
                          <h4 className={`font-semibold ${dir === 'rtl' ? 'font-arabic' : ''}`}>{service.name}</h4>
                          <p className="text-sm text-muted-foreground">{service.duration}</p>
                        </div>
                        <Badge variant="secondary" className="text-accent font-semibold">
                          {service.price}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-6 bg-primary hover:bg-primary-glow">
                    {t('book_treatment')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('spa_amenities')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((amenity) => (
              <Card key={amenity.key} className="text-center p-6 elegant-shadow hover:luxury-shadow transition-luxury">
                <amenity.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h4 className={`font-semibold mb-2 ${dir === 'rtl' ? 'font-arabic' : ''}`}>{t(amenity.key)}</h4>
                <p className={`text-sm text-muted-foreground ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {t(`${amenity.key}_desc`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('ready_to_relax')}
          </h2>
          <p className={`text-xl mb-8 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('spa_cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground">
              {t('book_spa')}
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              {t('spa_packages')}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const Spa = () => {
  return (
    <I18nProvider>
      <SpaPage />
    </I18nProvider>
  );
};

export default Spa;