import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, MapPin, Clock, Wifi, Car, Utensils, Dumbbell } from 'lucide-react';
import { Layout } from '@/components/Layout';
import AdvancedConcierge from '@/components/AdvancedConcierge';
import { I18nProvider, useI18n } from '@/lib/i18n';
import heroImage from '@/assets/braira-hero.jpg';
import { BOOKING_URL } from '@/lib/config';

function HomePage() {
  const { t, dir, hotelName } = useI18n();

  const features = [
    { icon: Wifi, key: 'wifi' },
    { icon: Car, key: 'parking' }, 
    { icon: Utensils, key: 'dining' },
    { icon: Dumbbell, key: 'fitness' },
  ];

  const stats = [
    { icon: Star, value: '5.0', label: 'Rating' },
    { icon: Users, value: '1,200+', label: 'Guests' },
    { icon: MapPin, value: 'Olaya', label: 'Area' },
    { icon: Clock, value: '24/7', label: 'Service' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.7)'
          }}
        />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <Star className="h-4 w-4 text-accent fill-current" />
              <span className="text-sm font-medium">Luxury 5-Star Experience</span>
            </div>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-display font-bold mb-6 leading-tight ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('hero_title')}
          </h1>
          
          <p className={`text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('hero_subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gold-gradient hover:bg-primary-glow ...e font-semibold px-8 py-4 text-lg gold-shadow transition-luxury"
              onClick={() => window.open(BOOKING_URL, '_blank', 'noopener')}
            >
              {t('hero_cta_primary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg transition-luxury"
            >
              {t('hero_cta_secondary')}
            </Button>
          </div>

          <div className="mt-8">
            <p className="text-sm text-white/80 max-w-xl mx-auto">
              {t('concierge_prompt')} — "{t('concierge_example')}"
            </p>
            <div className="mt-4">
              <Button className="bg-accent hover:bg-accent-glow text-accent-foreground" onClick={() => window.dispatchEvent(new Event('open-huda-concierge'))}>
                Start Conversation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Stats */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-4 text-center">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-white/80">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Other sections (Welcome, Rooms, Facilities etc.) would follow here -- unchanged */}

      {/* AI Concierge Widget */}
      <AdvancedConcierge />
    </Layout>
  );
}

const Index = () => {
  return (
    <I18nProvider>
      <HomePage />
    </I18nProvider>
  );
};

export default Index;
