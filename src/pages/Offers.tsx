import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { Calendar, Clock, Gift, Star, Percent, Heart, Users, Utensils } from 'lucide-react';

function OffersPage() {
  const { t, dir } = useI18n();

  const featuredOffers = [
    {
      id: 'early-bird',
      title: t('early_bird_offer'),
      subtitle: t('book_advance_save'),
      discount: '25%',
      validUntil: t('valid_until_december'),
      image: '/api/placeholder/600/400',
      type: 'accommodation',
      terms: [t('advance_booking_21_days'), t('non_refundable'), t('subject_availability')],
      features: [t('room_upgrade'), t('complimentary_breakfast'), t('late_checkout')],
      ctaText: t('book_early_bird')
    },
    {
      id: 'romantic-package',
      title: t('romantic_getaway'),
      subtitle: t('perfect_couples_escape'),
      discount: '30%',
      validUntil: t('valid_weekends_only'),
      image: '/api/placeholder/600/400',
      type: 'package',
      terms: [t('minimum_2_nights'), t('weekend_stays_only'), t('advance_booking_required')],
      features: [t('couples_spa'), t('romantic_dinner'), t('champagne_welcome'), t('rose_petals')],
      ctaText: t('book_romantic')
    },
    {
      id: 'business-deal',
      title: t('business_traveler_special'),
      subtitle: t('enhanced_business_experience'),
      discount: '20%',
      validUntil: t('valid_weekdays'),
      image: '/api/placeholder/600/400',
      type: 'business',
      terms: [t('weekday_stays_only'), t('corporate_rates'), t('flexible_cancellation')],
      features: [t('executive_room'), t('meeting_room_credit'), t('airport_transfer'), t('business_breakfast')],
      ctaText: t('book_business')
    }
  ];

  const seasonalOffers = [
    {
      id: 'summer-special',
      title: t('summer_escape'),
      description: t('beat_the_heat'),
      discount: '35%',
      icon: Gift,
      period: t('june_august'),
      includes: [t('pool_access'), t('cooling_drinks'), t('summer_menu')]
    },
    {
      id: 'family-fun',
      title: t('family_package'),
      description: t('perfect_family_vacation'),
      discount: '40%',
      icon: Users,
      period: t('school_holidays'),
      includes: [t('kids_stay_free'), t('family_activities'), t('children_menu')]
    },
    {
      id: 'wellness-week',
      title: t('wellness_retreat'),
      description: t('rejuvenate_mind_body'),
      discount: '45%',
      icon: Heart,
      period: t('spa_season'),
      includes: [t('spa_treatments'), t('healthy_cuisine'), t('yoga_classes')]
    },
    {
      id: 'culinary-journey',
      title: t('culinary_experience'),
      description: t('taste_extraordinary'),
      discount: '25%',
      icon: Utensils,
      period: t('chef_specials'),
      includes: [t('tasting_menu'), t('wine_pairing'), t('cooking_class')]
    }
  ];

  const membershipBenefits = [
    { icon: Star, title: t('priority_booking'), description: t('priority_booking_desc') },
    { icon: Gift, title: t('exclusive_discounts'), description: t('exclusive_discounts_desc') },
    { icon: Clock, title: t('flexible_cancellation'), description: t('flexible_cancellation_desc') },
    { icon: Users, title: t('member_events'), description: t('member_events_desc') }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent-glow text-accent-foreground">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Percent className="h-4 w-4" />
            <span className="font-medium">{t('exclusive_deals')}</span>
          </div>
          
          <h1 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('offers_title')}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('offers_subtitle')}
          </p>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('featured_offers')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('featured_offers_subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            {featuredOffers.map((offer, index) => (
              <Card key={offer.id} className="elegant-shadow hover:luxury-shadow transition-luxury overflow-hidden">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-cols-2' : ''}`}>
                  <div className={`aspect-video lg:aspect-auto relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img 
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
                        {t('save')} {offer.discount}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="mb-6">
                      <h3 className={`text-3xl font-display font-bold mb-2 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                        {offer.title}
                      </h3>
                      <p className={`text-lg text-muted-foreground mb-4 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                        {offer.subtitle}
                      </p>
                      <div className="flex items-center text-accent font-semibold">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{offer.validUntil}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">{t('includes')}</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {offer.features.map((feature) => (
                          <div key={feature} className="flex items-center text-sm">
                            <Star className="h-3 w-3 text-accent mr-2" />
                            <span className={dir === 'rtl' ? 'font-arabic' : ''}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">{t('terms_conditions')}</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {offer.terms.map((term) => (
                          <li key={term} className={dir === 'rtl' ? 'font-arabic' : ''}>• {term}</li>
                        ))}
                      </ul>
                    </div>

                    <Button className="bg-accent hover:bg-accent-glow text-accent-foreground">
                      {offer.ctaText}
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('seasonal_offers')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('seasonal_offers_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalOffers.map((offer) => (
              <Card key={offer.id} className="text-center p-6 elegant-shadow hover:luxury-shadow transition-luxury">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <offer.icon className="h-8 w-8 text-accent" />
                </div>
                <Badge className="mb-4 bg-primary text-primary-foreground">
                  {t('save')} {offer.discount}
                </Badge>
                <h4 className={`font-display font-semibold text-lg mb-2 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {offer.title}
                </h4>
                <p className={`text-sm text-muted-foreground mb-4 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {offer.description}
                </p>
                <div className="text-xs text-accent font-semibold mb-4">{offer.period}</div>
                <ul className="text-xs text-muted-foreground space-y-1 mb-6">
                  {offer.includes.map((item) => (
                    <li key={item} className={dir === 'rtl' ? 'font-arabic' : ''}>• {item}</li>
                  ))}
                </ul>
                <Button size="sm" className="w-full bg-primary hover:bg-primary-glow">
                  {t('learn_more')}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Program */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('membership_program')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto mb-8 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('membership_subtitle')}
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent-glow text-accent-foreground">
              {t('join_membership')}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipBenefits.map((benefit) => (
              <Card key={benefit.title} className="text-center p-6 elegant-shadow">
                <benefit.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h4 className={`font-semibold mb-2 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {benefit.title}
                </h4>
                <p className={`text-sm text-muted-foreground ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Gift className="h-16 w-16 mx-auto mb-6 text-accent" />
          <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('never_miss_deal')}
          </h2>
          <p className={`text-xl mb-8 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('newsletter_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder={t('enter_email')}
              className="flex-1 px-4 py-3 rounded-md text-primary"
            />
            <Button className="bg-accent hover:bg-accent-glow text-accent-foreground">
              {t('subscribe')}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const Offers = () => {
  return (
    <I18nProvider>
      <OffersPage />
    </I18nProvider>
  );
};

export default Offers;