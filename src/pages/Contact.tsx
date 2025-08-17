import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Layout } from '@/components/Layout';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { Phone, Mail, MapPin, Clock, Globe, Car, Plane, MessageSquare } from 'lucide-react';

function ContactPage() {
  const { t, dir } = useI18n();

  const contactInfo = [
    {
      icon: Phone,
      title: t('phone_reservations'),
      details: ['+966 11 4567890', '+966 11 4567891'],
      description: t('phone_hours')
    },
    {
      icon: Mail,
      title: t('email_contact'),
      details: ['reservations@braira-alolaya.com', 'info@braira-alolaya.com'],
      description: t('email_response_time')
    },
    {
      icon: MapPin,
      title: t('hotel_address'),
      details: [t('full_address')],
      description: t('central_location_desc')
    },
    {
      icon: Clock,
      title: t('front_desk_hours'),
      details: [t('24_hours_available')],
      description: t('always_here_for_you')
    }
  ];

  const departments = [
    {
      name: t('reservations_dept'),
      phone: '+966 11 4567890',
      email: 'reservations@braira-alolaya.com',
      hours: t('24_7_service')
    },
    {
      name: t('guest_services'),
      phone: '+966 11 4567892',
      email: 'guestservices@braira-alolaya.com',
      hours: t('6am_midnight')
    },
    {
      name: t('events_meetings'),
      phone: '+966 11 4567893',
      email: 'events@braira-alolaya.com',
      hours: t('8am_6pm')
    },
    {
      name: t('spa_wellness'),
      phone: '+966 11 4567894',
      email: 'spa@braira-alolaya.com',
      hours: t('8am_10pm')
    }
  ];

  const locationFeatures = [
    {
      icon: Car,
      title: t('valet_parking'),
      description: t('complimentary_valet_desc')
    },
    {
      icon: Plane,
      title: t('airport_distance'),
      description: t('airport_distance_desc')
    },
    {
      icon: MapPin,
      title: t('nearby_attractions'),
      description: t('attractions_desc')
    },
    {
      icon: Globe,
      title: t('business_district'),
      description: t('business_district_desc')
    }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <MessageSquare className="h-4 w-4" />
            <span className="font-medium">{t('get_in_touch')}</span>
          </div>
          
          <h1 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('contact_title')}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('contact_subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info) => (
              <Card key={info.title} className="text-center p-6 elegant-shadow hover:luxury-shadow transition-luxury">
                <info.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className={`font-display font-semibold text-lg mb-3 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, index) => (
                    <p key={index} className="text-primary font-semibold">{detail}</p>
                  ))}
                </div>
                <p className={`text-sm text-muted-foreground ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {info.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="elegant-shadow">
              <CardHeader>
                <CardTitle className={`text-2xl font-display ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {t('send_message')}
                </CardTitle>
                <p className={`text-muted-foreground ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {t('form_subtitle')}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder={t('first_name')} />
                  <Input placeholder={t('last_name')} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="email" placeholder={t('email_address')} />
                  <Input type="tel" placeholder={t('phone_number')} />
                </div>
                <Input placeholder={t('subject')} />
                <Textarea 
                  placeholder={t('message_placeholder')} 
                  rows={6}
                  className="resize-none"
                />
                <Button className="w-full bg-accent hover:bg-accent-glow text-accent-foreground">
                  {t('send_message')}
                </Button>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="elegant-shadow overflow-hidden">
              <div className="aspect-video bg-secondary flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-accent" />
                  <h3 className={`text-xl font-semibold mb-2 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                    {t('find_us_map')}
                  </h3>
                  <p className={`text-muted-foreground ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                    {t('interactive_map_coming')}
                  </p>
                  <Button className="mt-4 bg-primary hover:bg-primary-glow" size="sm">
                    {t('get_directions')}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('contact_departments')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('departments_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept) => (
              <Card key={dept.name} className="p-6 elegant-shadow hover:luxury-shadow transition-luxury">
                <h3 className={`text-xl font-display font-semibold mb-4 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {dept.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-primary">{dept.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-accent" />
                    <span className="text-primary">{dept.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className={`text-muted-foreground ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                      {dept.hours}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Features */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('prime_location')}
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              {t('location_advantages')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {locationFeatures.map((feature) => (
              <Card key={feature.title} className="text-center p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h4 className={`font-display font-semibold text-lg mb-3 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {feature.title}
                </h4>
                <p className={`text-sm ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Phone className="h-16 w-16 mx-auto mb-6 text-accent" />
          <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('ready_to_visit')}
          </h2>
          <p className={`text-xl mb-8 ${dir === 'rtl' ? 'font-arabic' : ''}`}>
            {t('visit_cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent-glow text-accent-foreground">
              <Phone className="h-4 w-4 mr-2" />
              {t('call_now')}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Mail className="h-4 w-4 mr-2" />
              {t('email_us')}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const Contact = () => {
  return (
    <I18nProvider>
      <ContactPage />
    </I18nProvider>
  );
};

export default Contact;