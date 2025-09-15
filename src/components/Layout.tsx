import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Phone, Mail } from 'lucide-react';
import { LanguagePicker } from './LanguagePicker';
import { EnhancedHudaConcierge } from './EnhancedHudaConcierge';
import { useI18n } from '@/lib/i18n';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t, dir, hotelName } = useI18n();

  const navigation = [
    { key: 'home', href: '/' },
    { key: 'rooms', href: '/rooms' },
    { key: 'dining', href: '/dining' },
    { key: 'spa', href: '/spa' },
    { key: 'meetings', href: '/meetings' },
    { key: 'offers', href: '/offers' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <div className={`min-h-screen bg-background ${dir === 'rtl' ? 'rtl' : 'ltr'}`} dir={dir}>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <a 
              href="tel:+966114567890" 
              className="flex items-center space-x-2 hover:text-accent transition-smooth"
            >
              <Phone className="h-3 w-3" />
              <span>+966 11 456 7890</span>
            </a>
            <a 
              href="mailto:info@brairaalolaya.com" 
              className="flex items-center space-x-2 hover:text-accent transition-smooth"
            >
              <Mail className="h-3 w-3" />
              <span>info@brairaalolaya.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <LanguagePicker />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 elegant-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <div>
                  <h1 className="text-xl font-display font-semibold text-foreground">
                    {hotelName}
                  </h1>
                  <p className="text-xs text-muted-foreground">{t('seo_description').substring(0, 30)}...</p>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-foreground hover:text-accent font-medium transition-smooth"
                >
                  {t(item.key as any)}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                {t('call_hotel')}
              </Button>
              <Button className="bg-gold-gradient hover:bg-primary-glow text-white font-semibold">
                {t('book_now')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-luxury text-luxury-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Hotel Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold">
                    {hotelName}
                  </h3>
                  <p className="text-luxury-foreground/80">Luxury & Hospitality</p>
                </div>
              </div>
              <p className="text-luxury-foreground/70 mb-6 max-w-md">
                {t('seo_description')}
              </p>
              <div className="flex items-center space-x-4">
                <Button size="sm" className="bg-accent hover:bg-accent-glow text-accent-foreground">
                  {t('book_now')}
                </Button>
                <Button variant="outline" size="sm" className="border-accent/20 text-accent hover:bg-accent/10">
                  {t('get_directions')}
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-accent">{t('about')}</h4>
              <ul className="space-y-2 text-sm">
                {navigation.slice(0, 4).map((item) => (
                  <li key={item.key}>
                    <a 
                      href={item.href} 
                      className="text-luxury-foreground/70 hover:text-accent transition-smooth"
                    >
                      {t(item.key as any)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4 text-accent">{t('contact')}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="/privacy" 
                    className="text-luxury-foreground/70 hover:text-accent transition-smooth"
                  >
                    {t('privacy_policy')}
                  </a>
                </li>
                <li>
                  <a 
                    href="/terms" 
                    className="text-luxury-foreground/70 hover:text-accent transition-smooth"
                  >
                    {t('terms_conditions')}
                  </a>
                </li>
                <li>
                  <a 
                    href="/careers" 
                    className="text-luxury-foreground/70 hover:text-accent transition-smooth"
                  >
                    {t('careers')}
                  </a>
                </li>
                <li>
                  <a 
                    href="/press" 
                    className="text-luxury-foreground/70 hover:text-accent transition-smooth"
                  >
                    {t('press')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-luxury-foreground/20 mt-12 pt-8 text-center">
            <p className="text-luxury-foreground/60 text-sm">
              © 2024 {hotelName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Enhanced AI Concierge */}
      <EnhancedHudaConcierge />
    </div>
  );
}