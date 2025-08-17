import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { Award, Users, MapPin, Calendar, Star, Heart, Shield, Trophy } from 'lucide-react';

function AboutPage() {
  const { t, dir } = useI18n();

  const milestones = [
    { year: '2018', title: t('hotel_opening'), description: t('hotel_opening_desc') },
    { year: '2020', title: t('4_star_certification'), description: t('4_star_desc') },
    { year: '2022', title: t('guest_excellence_award'), description: t('excellence_award_desc') },
    { year: '2024', title: t('sustainability_certification'), description: t('sustainability_desc') }
  ];

  const awards = [
    { name: t('tripadvisor_excellence'), year: '2023', icon: Trophy },
    { name: t('booking_guest_award'), year: '2023', icon: Star },
    { name: t('green_key_certification'), year: '2024', icon: Shield },
    { name: t('halal_tourism_award'), year: '2024', icon: Award }
  ];

  const values = [
    {
      icon: Heart,
      title: t('arabian_hospitality'),
      description: t('hospitality_desc')
    },
    {
      icon: Star,
      title: t('excellence_service'),
      description: t('excellence_desc')
    },
    {
      icon: Shield,
      title: t('cultural_respect'),
      description: t('cultural_respect_desc')
    },
    {
      icon: Users,
      title: t('guest_satisfaction'),
      description: t('satisfaction_desc')
    }
  ];

  const team = [
    {
      name: t('general_manager_name'),
      title: t('general_manager'),
      experience: t('25_years_experience'),
      image: '/api/placeholder/300/300'
    },
    {
      name: t('chef_name'),
      title: t('executive_chef'),
      experience: t('15_years_experience'),
      image: '/api/placeholder/300/300'
    },
    {
      name: t('concierge_manager_name'),
      title: t('concierge_manager'),
      experience: t('12_years_experience'),
      image: '/api/placeholder/300/300'
    }
  ];

  const stats = [
    { number: '179', label: t('rooms_suites'), icon: MapPin },
    { number: '2747', label: t('happy_guests'), icon: Users },
    { number: '4.8', label: t('guest_rating'), icon: Star },
    { number: '5', label: t('years_excellence'), icon: Calendar }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-luxury to-primary text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Award className="h-4 w-4" />
            <span className="font-medium">{t('est_2018')}</span>
          </div>
          
          <h1 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('about_title')}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('about_subtitle')}
          </p>
        </div>
      </section>

      {/* Hotel Story */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-4xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                {t('our_story')}
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p className={dir === 'rtl' ? 'font-arabic' : ''}>
                  {t('story_paragraph_1')}
                </p>
                <p className={dir === 'rtl' ? 'font-arabic' : ''}>
                  {t('story_paragraph_2')}
                </p>
                <p className={dir === 'rtl' ? 'font-arabic' : ''}>
                  {t('story_paragraph_3')}
                </p>
              </div>
              <Button className="mt-8 bg-accent hover:bg-accent-glow text-accent-foreground">
                {t('experience_braira')}
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src="/api/placeholder/600/500"
                alt={t('hotel_exterior')}
                className="w-full h-auto rounded-2xl elegant-shadow"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl elegant-shadow">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">8.9</div>
                  <div className="text-sm text-muted-foreground">{t('guest_rating')}</div>
                  <div className="flex text-accent mt-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center p-6 elegant-shadow">
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className={`text-sm text-muted-foreground ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('our_values')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('values_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center p-8 elegant-shadow hover:luxury-shadow transition-luxury">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className={`text-xl font-display font-semibold mb-4 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {value.title}
                </h3>
                <p className={`text-muted-foreground ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('our_journey')}
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('journey_subtitle')}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent opacity-30"></div>
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="flex-1">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                      <CardContent className="p-8">
                        <div className="text-accent font-bold text-2xl mb-2">{milestone.year}</div>
                        <h3 className={`text-xl font-display font-semibold mb-3 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                          {milestone.title}
                        </h3>
                        <p className={dir === 'rtl' ? 'font-arabic' : ''}>
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mx-8 w-4 h-4 bg-accent rounded-full border-4 border-white relative z-10"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('awards_recognition')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('awards_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award) => (
              <Card key={award.name} className="text-center p-6 elegant-shadow hover:luxury-shadow transition-luxury">
                <award.icon className="h-16 w-16 mx-auto mb-4 text-accent" />
                <Badge className="mb-4 bg-accent text-accent-foreground">{award.year}</Badge>
                <h4 className={`font-semibold ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {award.name}
                </h4>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('meet_our_team')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('team_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="text-center elegant-shadow hover:luxury-shadow transition-luxury overflow-hidden">
                <div className="aspect-square bg-secondary">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className={`text-xl font-display font-semibold mb-2 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                    {member.name}
                  </h3>
                  <p className={`text-accent font-semibold mb-2 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                    {member.title}
                  </p>
                  <p className={`text-sm text-muted-foreground ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                    {member.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Users className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('join_our_story')}
          </h2>
          <p className={`text-xl mb-8 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('join_story_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground">
              {t('book_now')}
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              {t('contact_us')}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const About = () => {
  return (
    <I18nProvider>
      <AboutPage />
    </I18nProvider>
  );
};

export default About;