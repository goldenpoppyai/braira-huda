import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'ar' | 'ms' | 'fr' | 'id' | 'hi';

export const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English', dir: 'ltr' as const },
  { code: 'ar' as Language, name: 'Arabic', nativeName: 'العربية', dir: 'rtl' as const },
  { code: 'ms' as Language, name: 'Malay', nativeName: 'Bahasa Malaysia', dir: 'ltr' as const },
  { code: 'fr' as Language, name: 'French', nativeName: 'Français', dir: 'ltr' as const },
  { code: 'id' as Language, name: 'Indonesian', nativeName: 'Bahasa Indonesia', dir: 'ltr' as const },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' as const },
];

export const hotelNames: Record<Language, string> = {
  en: "Braira Al Olaya Riyadh",
  ar: "فندق بريرا العليا", 
  ms: "Hotel Braira Al Olaya",
  fr: "Braira Al Olaya Riyadh",
  id: "Hotel Braira Al Olaya",
  hi: "ब्राइरा अल ओलाया रियाध"
};

const translations = {
  en: {
    home: "Home", rooms: "Rooms & Suites", dining: "Dining", spa: "Spa & Wellness",
    meetings: "Meetings & Events", offers: "Offers", about: "About", contact: "Contact",
    hero_title: "Experience Luxury in the Heart of Riyadh",
    hero_subtitle: "Where traditional Arabian hospitality meets modern comfort",
    hero_cta_primary: "Book Your Stay", hero_cta_secondary: "Explore Rooms",
    concierge_title: "Meet Huda, Your AI Concierge",
    concierge_subtitle: "24/7 personalized service in your preferred language",
    chat_placeholder: "Ask Huda anything about your stay...",
    book_now: "Book Now", learn_more: "Learn More", call_hotel: "Call Hotel",
    get_directions: "Get Directions", email_hotel: "Email Hotel",
    privacy_policy: "Privacy Policy", terms_conditions: "Terms & Conditions",
    careers: "Careers", press: "Press",
    seo_description: "Luxury hotel in Riyadh offering world-class amenities, exceptional service, and prime location in Al Olaya district.",
    ai_welcome: "Hello — I'm Huda, your personal concierge. How can I help today?",
    ai_availability: "I found available rooms for your dates. Would you like to see rates or book now?",
    ai_booking_confirm: "Great — I'll place a provisional booking. May I have your full name and email to confirm?",
    ai_dining: "I can reserve a table for you. Any dietary notes or special occasion?",
    ai_service: "Housekeeping request sent. Estimated arrival: 20 minutes.",
    ai_escalation: "I'm escalating this to reception — someone will join shortly.",
    ai_fallback: "Sorry, I didn't catch that. Could you rephrase or should I connect you to reception?"
  },
  ar: {
    home: "الرئيسية", rooms: "الغرف والأجنحة", dining: "المطاعم", spa: "السبا والصحة",
    meetings: "الاجتماعات والفعاليات", offers: "العروض", about: "عن الفندق", contact: "اتصل بنا",
    hero_title: "اختبر الفخامة في قلب الرياض", hero_subtitle: "حيث تلتقي الضيافة العربية التقليدية بالراحة العصرية",
    hero_cta_primary: "احجز إقامتك", hero_cta_secondary: "استكشف الغرف",
    concierge_title: "تعرّف على هدى، مضيفتك الرقمية", concierge_subtitle: "خدمة شخصية على مدار الساعة بلغتك المفضلة",
    chat_placeholder: "اسأل هدى أي شيء عن إقامتك...", book_now: "احجز الآن", learn_more: "اعرف المزيد",
    call_hotel: "اتصل بالفندق", get_directions: "احصل على الاتجاهات", email_hotel: "راسل الفندق",
    privacy_policy: "سياسة الخصوصية", terms_conditions: "الشروط والأحكام", careers: "الوظائف", press: "الصحافة",
    seo_description: "فندق فاخر في الرياض يقدم وسائل راحة عالمية وخدمة استثنائية وموقع متميز في حي العليا.",
    ai_welcome: "مرحباً، أنا هدى، خدمة الكونسيرج الرقمية. بماذا أستطيع مساعدتك؟",
    ai_availability: "يوجد غرف متاحة في التواريخ المحددة. هل تود الاطلاع على الأسعار أو الحجز الآن؟",
    ai_booking_confirm: "حسناً — سأقوم بوضع حجز مؤقت. هل أستطيع الحصول على الاسم الكامل والبريد الإلكتروني لتأكيد الحجز؟",
    ai_dining: "أستطيع حجز طاولة لك. هل هناك ملاحظات غذائية أو مناسبة خاصة؟",
    ai_service: "تم إرسال طلب التدبير المنزلي. الوقت المقدر: 20 دقيقة.",
    ai_escalation: "سأحوّل طلبك لموظفي الاستقبال — سيتواصل معك أحدهم قريباً.",
    ai_fallback: "عذراً، لم أفهم. هل يمكنك إعادة الصياغة أم تود الاتصال بالاستقبال؟"
  },
  ms: { home: "Laman Utama", rooms: "Bilik & Suite", dining: "Tempat Makan", spa: "Spa & Kesihatan", meetings: "Mesyuarat & Acara", offers: "Tawaran", about: "Tentang", contact: "Hubungi", hero_title: "Rasai Kemewahan di Tengah-tengah Riyadh", hero_subtitle: "Di mana keramahan Arab tradisional bertemu dengan keselesaan moden", hero_cta_primary: "Tempah Penginapan", hero_cta_secondary: "Jelajah Bilik", concierge_title: "Kenali Huda, Concierge AI Anda", concierge_subtitle: "Perkhidmatan peribadi 24/7 dalam bahasa pilihan anda", chat_placeholder: "Tanya Huda apa-apa tentang penginapan anda...", book_now: "Tempah Sekarang", learn_more: "Ketahui Lebih Lanjut", call_hotel: "Hubungi Hotel", get_directions: "Dapatkan Arah", email_hotel: "Email Hotel", privacy_policy: "Dasar Privasi", terms_conditions: "Terma & Syarat", careers: "Kerjaya", press: "Akhbar", seo_description: "Hotel mewah di Riyadh yang menawarkan kemudahan kelas dunia, perkhidmatan luar biasa, dan lokasi utama di daerah Al Olaya.", ai_welcome: "Hai — saya Huda, perkhidmatan concierge anda. Boleh saya bantu?", ai_availability: "Terdapat bilik tersedia pada tarikh anda. Mahu lihat harga atau buat tempahan?", ai_booking_confirm: "Bagus — saya akan buat tempahan sementara. Boleh saya dapatkan nama penuh dan emel anda?", ai_dining: "Saya boleh tempah meja untuk anda. Ada alergi atau acara istimewa?", ai_service: "Permintaan housekeeping telah dihantar. Anggaran tiba: 20 minit.", ai_escalation: "Saya akan eskalasikan ini ke kaunter — seseorang akan menyertai sebentar lagi.", ai_fallback: "Maaf, saya tidak faham. Boleh jelaskan semula atau sambungkan ke kaunter?" },
  fr: { home: "Accueil", rooms: "Chambres & Suites", dining: "Restauration", spa: "Spa & Bien-être", meetings: "Réunions & Événements", offers: "Offres", about: "À propos", contact: "Contact", hero_title: "Découvrez le Luxe au Cœur de Riyadh", hero_subtitle: "Où l'hospitalité arabe traditionnelle rencontre le confort moderne", hero_cta_primary: "Réservez Votre Séjour", hero_cta_secondary: "Explorer les Chambres", concierge_title: "Rencontrez Huda, Votre Concierge IA", concierge_subtitle: "Service personnalisé 24h/24 dans votre langue préférée", chat_placeholder: "Demandez à Huda tout sur votre séjour...", book_now: "Réserver Maintenant", learn_more: "En Savoir Plus", call_hotel: "Appeler l'Hôtel", get_directions: "Obtenir l'Itinéraire", email_hotel: "Email Hôtel", privacy_policy: "Politique de Confidentialité", terms_conditions: "Conditions Générales", careers: "Carrières", press: "Presse", seo_description: "Hôtel de luxe à Riyadh offrant des équipements de classe mondiale, un service exceptionnel et un emplacement privilégié dans le quartier d'Al Olaya.", ai_welcome: "Bonjour — je suis Huda, votre concierge. Comment puis-je vous aider ?", ai_availability: "Des chambres sont disponibles pour vos dates. Voulez-vous voir les tarifs ou réserver ?", ai_booking_confirm: "Très bien — je vais créer une réservation provisoire. Pouvez-vous indiquer votre nom complet et email ?", ai_dining: "Je peux réserver une table. Des restrictions alimentaires ou une occasion spéciale ?", ai_service: "Demande envoyée au service d'étage. Arrivée estimée : 20 minutes.", ai_escalation: "J'escalade vers la réception — quelqu'un vous répondra sous peu.", ai_fallback: "Désolé, je n'ai pas saisi. Pouvez-vous reformuler ou souhaitez-vous la réception ?" },
  id: { home: "Beranda", rooms: "Kamar & Suite", dining: "Tempat Makan", spa: "Spa & Kesehatan", meetings: "Rapat & Acara", offers: "Penawaran", about: "Tentang", contact: "Kontak", hero_title: "Rasakan Kemewahan di Jantung Riyadh", hero_subtitle: "Di mana keramahan Arab tradisional bertemu kenyamanan modern", hero_cta_primary: "Pesan Menginap", hero_cta_secondary: "Jelajahi Kamar", concierge_title: "Kenali Huda, Concierge AI Anda", concierge_subtitle: "Layanan personal 24/7 dalam bahasa pilihan Anda", chat_placeholder: "Tanya Huda tentang menginap Anda...", book_now: "Pesan Sekarang", learn_more: "Pelajari Lebih Lanjut", call_hotel: "Hubungi Hotel", get_directions: "Dapatkan Arah", email_hotel: "Email Hotel", privacy_policy: "Kebijakan Privasi", terms_conditions: "Syarat & Ketentuan", careers: "Karir", press: "Pers", seo_description: "Hotel mewah di Riyadh yang menawarkan fasilitas kelas dunia, layanan luar biasa, dan lokasi utama di distrik Al Olaya.", ai_welcome: "Halo — saya Huda, concierge Anda. Ada yang bisa saya bantu?", ai_availability: "Tersedia kamar pada tanggal Anda. Mau lihat harga atau pesan sekarang?", ai_booking_confirm: "Baik — saya akan membuat pemesanan sementara. Boleh minta nama lengkap dan email Anda?", ai_dining: "Saya bisa pesan meja untuk Anda. Ada catatan diet atau acara khusus?", ai_service: "Permintaan housekeeping dikirim. Perkiraan kedatangan: 20 menit.", ai_escalation: "Saya akan teruskan ini ke resepsionis — seseorang akan segera bergabung.", ai_fallback: "Maaf, saya tidak mengerti. Bisa ulangi atau hubungkan ke resepsionis?" },
  hi: { home: "होम", rooms: "कमरे और सूट", dining: "भोजन", spa: "स्पा और वेलनेस", meetings: "मीटिंग और इवेंट्स", offers: "ऑफर्स", about: "हमारे बारे में", contact: "संपर्क", hero_title: "रियाध के दिल में लक्ज़री का अनुभव करें", hero_subtitle: "जहाँ पारंपरिक अरबी आतिथ्य आधुनिक आराम से मिलता है", hero_cta_primary: "अपना ठहरना बुक करें", hero_cta_secondary: "कमरे देखें", concierge_title: "हुडा से मिलें, आपकी AI कंसीयर्ज", concierge_subtitle: "आपकी पसंदीदा भाषा में 24/7 व्यक्तिगत सेवा", chat_placeholder: "हुडा से अपने ठहरने के बारे में कुछ भी पूछें...", book_now: "अभी बुक करें", learn_more: "और जानें", call_hotel: "होटल को कॉल करें", get_directions: "दिशा प्राप्त करें", email_hotel: "होटल को ईमेल करें", privacy_policy: "गोपनीयता नीति", terms_conditions: "नियम और शर्तें", careers: "करियर", press: "प्रेस", seo_description: "रियाध में लक्ज़री होटल जो विश्व स्तरीय सुविधाएं, असाधारण सेवा, और अल ओलाया जिले में प्रमुख स्थान प्रदान करता है।", ai_welcome: "नमस्ते— मैं हुडा हूँ, आपकी कंज़ियर्ज। मैं कैसे मदद कर सकती हूँ?", ai_availability: "आपकी तारीखों के लिए कमरे उपलब्ध हैं। क्या आप दरें देखना चाहेंगे या अभी बुक करना चाहेंगे?", ai_booking_confirm: "ठीक है— मैं अस्थायी बुकिंग कर देती हूँ। पुष्टि के लिए आपका पूरा नाम और ईमेल बताइए।", ai_dining: "मैं आपके लिए टेबल बुक कर सकती हूँ। कोई भोजन संबंधी नोट या विशेष अवसर है?", ai_service: "हाउसकीपिंग भेज दिया गया है। अनुमानित आगमन: 20 मिनट।", ai_escalation: "मैं इसे रिसेप्शन को सौंप रही हूँ — कोई शीघ्र ही जुड़ जाएगा।", ai_fallback: "माफ़ कीजिए, मैं समझ नहीं पाई। क्या आप दोहरा सकते हैं या रिसेप्शन से जोड़ दूं?" }
};

export type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dir: 'ltr' | 'rtl';
  hotelName: string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within an I18nProvider');
  return context;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const currentLang = languages.find(l => l.code === language)!;
  
  const t = (key: TranslationKey): string => translations[language][key] || translations.en[key] || key;
  
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    dir: currentLang.dir,
    hotelName: hotelNames[language]
  };

  return React.createElement(I18nContext.Provider, { value }, children);
}