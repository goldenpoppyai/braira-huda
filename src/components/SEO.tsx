import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from '@/lib/i18n';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'business.hotel';
  structuredData?: any;
  noIndex?: boolean;
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/braira-hero.jpg',
  ogType = 'business.hotel',
  structuredData,
  noIndex = false
}: SEOProps) {
  const { language, hotelName, dir } = useI18n();
  
  const fullTitle = title ? `${title} | ${hotelName}` : hotelName;
  const defaultDescription = getDefaultDescription(language);
  const finalDescription = description || defaultDescription;
  const defaultKeywords = getDefaultKeywords(language);
  const finalKeywords = keywords || defaultKeywords;
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = canonical || currentUrl;
  
  // Generate default structured data for hotel
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": hotelName,
    "description": finalDescription,
    "url": canonicalUrl,
    "image": ogImage,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Olaya District",
      "addressLocality": "Riyadh",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.7136",
      "longitude": "46.6753"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Free WiFi",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "Restaurant",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Spa",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Fitness Center",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Business Center",
        "value": true
      }
    ],
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "priceRange": "$$$"
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} dir={dir} />
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={getOGLocale(language)} />
      <meta property="og:site_name" content={hotelName} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Viewport for mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      
      {/* Theme colors for mobile browsers */}
      <meta name="theme-color" content="#1a1a2e" />
      <meta name="msapplication-TileColor" content="#1a1a2e" />
      
      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Alternate language versions */}
      <link rel="alternate" hrefLang="en" href={`${canonicalUrl}?lang=en`} />
      <link rel="alternate" hrefLang="ar" href={`${canonicalUrl}?lang=ar`} />
      <link rel="alternate" hrefLang="ms" href={`${canonicalUrl}?lang=ms`} />
      <link rel="alternate" hrefLang="fr" href={`${canonicalUrl}?lang=fr`} />
      <link rel="alternate" hrefLang="id" href={`${canonicalUrl}?lang=id`} />
      <link rel="alternate" hrefLang="hi" href={`${canonicalUrl}?lang=hi`} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
    </Helmet>
  );
}

function getDefaultDescription(language: string): string {
  const descriptions = {
    en: 'Experience luxury at Braira Al Olaya Hotel in Riyadh. Premium accommodations, world-class dining, spa services, and business facilities in the heart of Al Olaya district.',
    ar: 'استمتع بالفخامة في فندق بريرا العليا في الرياض. إقامة فاخرة ومطاعم عالمية وخدمات سبا ومرافق أعمال في قلب حي العليا.',
    ms: 'Alami kemewahan di Hotel Braira Al Olaya di Riyadh. Penginapan premium, restoran berkelas dunia, perkhidmatan spa, dan kemudahan perniagaan di jantung daerah Al Olaya.',
    fr: 'Découvrez le luxe au Braira Al Olaya Hotel à Riyadh. Hébergement premium, restaurants de classe mondiale, services spa et installations d\'affaires au cœur du quartier Al Olaya.',
    id: 'Rasakan kemewahan di Hotel Braira Al Olaya di Riyadh. Akomodasi premium, restoran kelas dunia, layanan spa, dan fasilitas bisnis di jantung distrik Al Olaya.',
    hi: 'रियाद में ब्रायरा अल ओलाया होटल में लक्जरी का अनुभव करें। अल ओलाया जिले के दिल में प्रीमियम आवास, विश्व स्तरीय भोजन, स्पा सेवाएं और व्यावसायिक सुविधाएं।'
  };
  return descriptions[language as keyof typeof descriptions] || descriptions.en;
}

function getDefaultKeywords(language: string): string {
  const keywords = {
    en: 'Braira Al Olaya Hotel, Riyadh luxury hotel, 5-star hotel Riyadh, Al Olaya accommodation, business hotel Riyadh, spa hotel Saudi Arabia',
    ar: 'فندق بريرا العليا، فندق فاخر الرياض، فندق 5 نجوم الرياض، إقامة العليا، فندق أعمال الرياض، فندق سبا السعودية',
    ms: 'Hotel Braira Al Olaya, hotel mewah Riyadh, hotel 5 bintang Riyadh, penginapan Al Olaya, hotel perniagaan Riyadh, hotel spa Arab Saudi',
    fr: 'Hôtel Braira Al Olaya, hôtel de luxe Riyadh, hôtel 5 étoiles Riyadh, hébergement Al Olaya, hôtel d\'affaires Riyadh, hôtel spa Arabie Saoudite',
    id: 'Hotel Braira Al Olaya, hotel mewah Riyadh, hotel bintang 5 Riyadh, akomodasi Al Olaya, hotel bisnis Riyadh, hotel spa Arab Saudi',
    hi: 'ब्रायरा अल ओलाया होटल, रियाद लक्जरी होटल, 5-स्टार होटल रियाद, अल ओलाया आवास, बिजनेस होटल रियाद, स्पा होटल सऊदी अरब'
  };
  return keywords[language as keyof typeof keywords] || keywords.en;
}

function getOGLocale(language: string): string {
  const locales = {
    en: 'en_US',
    ar: 'ar_SA', 
    ms: 'ms_MY',
    fr: 'fr_FR',
    id: 'id_ID',
    hi: 'hi_IN'
  };
  return locales[language as keyof typeof locales] || 'en_US';
}