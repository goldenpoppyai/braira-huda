import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, MapPin, Clock, Wifi, Car, Utensils, Dumbbell } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { HudaConcierge } from '@/components/HudaConcierge';
import { I18nProvider, useI18n } from '@/lib/i18n';
import heroImage from '@/assets/braira-hero.jpg';

function HomePage() {
  const { t, dir, hotelName } = useI18n();

  const features = [
    { icon: Wifi, key: 'wifi' },
    { icon: Car, key: 'parking' }, 
    { icon: Utensils, key: 'dining' },
    { icon: Dumbbell, key: 'fitness' },
  ];

  const stats = [
    { icon: Star, value: '4.8', label: 'Guest Rating' },
    { icon: Users, value: '500+', label: 'Rooms & Suites' },
    { icon: MapPin, value: 'Al Olaya', label: 'Prime Location' },
    { icon: Clock, value: '24/7', label: 'Concierge Service' },
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
        <div className="absolute inset-0 hero-gradient opacity-60" />
        
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
          
          <p className={`text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('hero_subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-gold-gradient hover:bg-primary-glow text-white font-semibold px-8 py-4 text-lg gold-shadow transition-luxury"
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
        </div>

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
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mb-6">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 text-foreground ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {hotelName}
            </h2>
            <div className="w-24 h-1 bg-gold-gradient mx-auto mb-6" />
            <p className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('seo_description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Experience Card */}
            <Card className="elegant-shadow hover:luxury-shadow transition-luxury">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4">Premium Experience</h3>
                <p className="text-muted-foreground">World-class amenities and personalized service for an unforgettable stay.</p>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="elegant-shadow hover:luxury-shadow transition-luxury">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4">Prime Location</h3>
                <p className="text-muted-foreground">Located in the heart of Al Olaya, minutes from major business and shopping districts.</p>
              </CardContent>
            </Card>

            {/* Service Card */}
            <Card className="elegant-shadow hover:luxury-shadow transition-luxury">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-luxury/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-luxury" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4">24/7 Concierge</h3>
                <p className="text-muted-foreground">Our AI concierge Huda is available round the clock in your preferred language.</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary-glow text-primary-foreground font-semibold px-8 py-4 mr-4"
            >
              {t('book_now')}
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4"
            >
              {t('learn_more')}
            </Button>
          </div>
        </div>
      </section>

      {/* Concierge Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 text-foreground ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('concierge_title')}
          </h2>
          <p className={`text-xl text-muted-foreground mb-12 max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('concierge_subtitle')}
          </p>
          
          <div className="bg-card rounded-2xl p-8 luxury-shadow max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">هـ</span>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-display font-semibold">Huda</h3>
                <p className="text-muted-foreground">Your AI Concierge</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Try asking: "Book a table for 2 at 7pm" or "I need extra towels" or "What's the weather like?"
            </p>
            <Button className="bg-accent hover:bg-accent-glow text-accent-foreground">
              Start Conversation
            </Button>
          </div>
        </div>
      </section>

      {/* AI Concierge Widget */}
      <HudaConcierge />
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
