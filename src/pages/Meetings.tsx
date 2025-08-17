import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { Users, Wifi, Tv, Coffee, Phone, Car, Calendar, MapPin, Projector } from 'lucide-react';

function MeetingsPage() {
  const { t, dir } = useI18n();

  const eventSpaces = [
    {
      id: 'grand-ballroom',
      name: t('grand_ballroom'),
      capacity: { theater: 300, banquet: 200, classroom: 150, reception: 350 },
      area: '400 m²',
      image: '/api/placeholder/600/400',
      features: ['av_equipment', 'air_conditioning', 'natural_light', 'stage_area', 'dance_floor']
    },
    {
      id: 'conference-room-a',
      name: t('conference_room_a'),
      capacity: { boardroom: 20, theater: 40, classroom: 25, ushape: 18 },
      area: '85 m²',
      image: '/api/placeholder/600/400',
      features: ['smart_tv', 'video_conferencing', 'whiteboard', 'high_speed_wifi', 'climate_control']
    },
    {
      id: 'conference-room-b',
      name: t('conference_room_b'), 
      capacity: { boardroom: 16, theater: 30, classroom: 18, ushape: 14 },
      area: '65 m²',
      image: '/api/placeholder/600/400',
      features: ['lcd_projector', 'sound_system', 'flip_charts', 'teleconference', 'refreshment_station']
    },
    {
      id: 'business-center',
      name: t('business_center'),
      capacity: { workstations: 8, meeting: 6 },
      area: '45 m²',
      image: '/api/placeholder/600/400',
      features: ['24_hour_access', 'printing_services', 'internet_stations', 'secretarial_services', 'courier_services']
    }
  ];

  const services = [
    {
      category: t('av_services'),
      icon: Tv,
      items: [
        t('lcd_projectors'),
        t('sound_systems'), 
        t('microphones'),
        t('video_conferencing'),
        t('live_streaming')
      ]
    },
    {
      category: t('catering_services'),
      icon: Coffee,
      items: [
        t('coffee_breaks'),
        t('business_lunch'),
        t('gala_dinner'),
        t('cocktail_reception'),
        t('dietary_options')
      ]
    },
    {
      category: t('support_services'),
      icon: Users,
      items: [
        t('event_coordination'),
        t('technical_support'),
        t('registration_desk'),
        t('translation_services'),
        t('photography')
      ]
    },
    {
      category: t('business_services'),
      icon: Wifi,
      items: [
        t('high_speed_internet'),
        t('printing_copying'),
        t('secretarial_support'),
        t('courier_services'),
        t('concierge_desk')
      ]
    }
  ];

  const packages = [
    {
      name: t('half_day_package'),
      duration: t('4_hours'),
      includes: [t('room_rental'), t('basic_av'), t('coffee_break'), t('mineral_water')],
      price: t('package_half_day_price')
    },
    {
      name: t('full_day_package'),
      duration: t('8_hours'),
      includes: [t('room_rental'), t('premium_av'), t('two_coffee_breaks'), t('business_lunch')],
      price: t('package_full_day_price')
    },
    {
      name: t('residential_package'),
      duration: t('2_days'),
      includes: [t('room_rental'), t('accommodation'), t('all_meals'), t('premium_av'), t('welcome_reception')],
      price: t('package_residential_price')
    }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Users className="h-4 w-4" />
            <span className="font-medium">{t('business_events_venue')}</span>
          </div>
          
          <h1 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('meetings_title')}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('meetings_subtitle')}
          </p>
          
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{t('central_riyadh_location')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Car className="h-4 w-4" />
              <span>{t('valet_parking_available')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Event Spaces */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('event_spaces')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('spaces_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {eventSpaces.map((space) => (
              <Card key={space.id} className="elegant-shadow hover:luxury-shadow transition-luxury overflow-hidden">
                <div className="aspect-video bg-secondary relative">
                  <img 
                    src={space.image}
                    alt={space.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    {space.area}
                  </Badge>
                </div>
                
                <CardContent className="p-8">
                  <h3 className={`text-2xl font-display font-semibold mb-4 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                    {space.name}
                  </h3>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">{t('capacity_configurations')}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      {Object.entries(space.capacity).map(([config, count]) => (
                        <div key={config} className="flex justify-between">
                          <span>{t(config)}:</span>
                          <span>{count} {typeof count === 'number' ? t('guests') : ''}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">{t('included_features')}</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {space.features.map((feature) => (
                        <div key={feature} className="text-sm text-muted-foreground">
                          • {t(feature)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button className="flex-1 bg-primary hover:bg-primary-glow">
                      {t('request_quote')}
                    </Button>
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      {t('virtual_tour')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('event_services')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('services_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.category} className="text-center p-6 elegant-shadow hover:luxury-shadow transition-luxury">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                <h4 className={`font-display font-semibold text-lg mb-4 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {service.category}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {service.items.map((item) => (
                    <li key={item} className={dir === 'rtl' ? 'font-arabic' : ''}>• {item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('meeting_packages')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('packages_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card key={pkg.name} className="elegant-shadow hover:luxury-shadow transition-luxury">
                <CardContent className="p-8 text-center">
                  <h3 className={`text-2xl font-display font-semibold mb-4 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                    {pkg.name}
                  </h3>
                  <p className="text-accent font-semibold text-lg mb-6">{pkg.duration}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-4">{t('includes')}</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {pkg.includes.map((item) => (
                        <li key={item} className={dir === 'rtl' ? 'font-arabic' : ''}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-2xl font-bold text-accent mb-6">{pkg.price}</div>
                  
                  <Button className="w-full bg-primary hover:bg-primary-glow">
                    {t('select_package')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Calendar className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('ready_to_plan_event')}
          </h2>
          <p className={`text-xl mb-8 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('event_cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground">
              <Phone className="h-4 w-4 mr-2" />
              {t('call_events_team')}
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Projector className="h-4 w-4 mr-2" />
              {t('schedule_site_visit')}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const Meetings = () => {
  return (
    <I18nProvider>
      <MeetingsPage />
    </I18nProvider>
  );
};

export default Meetings;