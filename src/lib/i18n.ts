import React, { useState, createContext, useContext } from 'react';
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
    // Navigation
    home: "Home", rooms: "Rooms & Suites", dining: "Dining", spa: "Spa & Wellness",
    meetings: "Meetings & Events", offers: "Offers", about: "About", contact: "Contact",
    privacy_policy: "Privacy Policy", terms_conditions: "Terms & Conditions",
    careers: "Careers", press: "Press",
    
    // Hero Section
    hero_title: "Experience Luxury in the Heart of Riyadh",
    hero_subtitle: "Where traditional Arabian hospitality meets modern comfort",
    hero_cta_primary: "Book Your Stay", hero_cta_secondary: "Explore Rooms",
    
    // Concierge
    concierge_title: "Meet Huda, Your AI Concierge",
    concierge_subtitle: "24/7 personalized service in your preferred language",
    chat_placeholder: "Ask Huda anything about your stay...",
    
    // Common Actions
    book_now: "Book Now", learn_more: "Learn More", call_hotel: "Call Hotel",
    get_directions: "Get Directions", email_hotel: "Email Hotel",
    view_details: "View Details", request_quote: "Request Quote", 
    make_reservation: "Make Reservation", view_menu: "View Menu",
    book_room: "Book Room", book_treatment: "Book Treatment", book_spa: "Book Spa",
    spa_packages: "View Packages", select_package: "Select Package",
    
    // SEO
    seo_description: "Luxury hotel in Riyadh offering world-class amenities, exceptional service, and prime location in Al Olaya district.",
    
    // Rooms Page
    rooms_title: "Rooms & Suites", rooms_subtitle: "Elegant accommodations designed for your comfort and luxury",
    rooms_count: "179 Rooms & Suites Available", per_night: "per night",
    room_deluxe: "Deluxe Room", room_executive: "Executive Room", 
    room_junior_suite: "Junior Suite", room_executive_suite: "Executive Suite",
    room_price_deluxe: "SAR 450", room_price_executive: "SAR 650",
    room_price_junior: "SAR 850", room_price_suite: "SAR 1,200",
    room_amenities: "Room Amenities", amenities_subtitle: "Every comfort and convenience for your perfect stay",
    ready_to_book: "Ready to Book Your Stay?", booking_cta_subtitle: "Experience luxury with our best available rates",
    call_reservations: "Call Reservations",
    
    // Room Features
    king_bed: "King Size Bed", city_view: "City View", work_desk: "Work Desk",
    minibar: "Minibar", safe: "In-room Safe", wifi: "Complimentary Wi-Fi",
    executive_lounge: "Executive Lounge Access", separate_living: "Separate Living Area",
    panoramic_view: "Panoramic City View", work_area: "Business Work Area",
    dining_area: "Dining Area", premium_amenities: "Premium Amenities",
    butler_service: "Butler Service", includes: "Includes",
    
    // Amenities
    parking: "Valet Parking", coffee: "Coffee/Tea Maker", bathroom: "Marble Bathroom",
    tv: "Smart TV", ac: "Climate Control", bedding: "Premium Bedding",
    wifi_desc: "High-speed internet throughout the hotel",
    parking_desc: "Complimentary valet parking service",
    coffee_desc: "Premium coffee and tea facilities",
    bathroom_desc: "Luxurious marble bathroom with premium toiletries",
    tv_desc: "Smart TV with international channels",
    ac_desc: "Individual climate control",
    safe_desc: "Electronic safe for valuables",
    bedding_desc: "Egyptian cotton linens and pillows",
    
    // Dining Page
    dining_title: "Dining Excellence", dining_subtitle: "Authentic flavors and culinary artistry in elegant settings",
    halal_certified_dining: "Halal Certified Dining", dining_hours_varied: "Varied Hours",
    seating_capacity: "200+ Seats", restaurant_main_name: "Al Diwan Restaurant",
    coffee_lounge_name: "Majlis Coffee Lounge", room_service_name: "In-Room Dining",
    cuisine_international: "International Cuisine", cuisine_cafe: "Café & Light Meals",
    hours_breakfast_dinner: "6:30 AM - 11:00 PM", hours_all_day: "24 Hours",
    hours_24_7: "24/7 Service", all_rooms: "All Rooms & Suites",
    turkish_specialties: "Authentic Turkish cuisine with Halal certification",
    arabic_coffee_pastries: "Traditional Arabic coffee and fresh pastries",
    in_room_dining: "Extensive in-room dining menu with 24/7 service",
    halal_certified: "Halal Certified", menu_highlights: "Menu Highlights",
    menu_highlights_subtitle: "Signature dishes from our world-class chefs",
    ready_to_dine: "Ready to Dine With Us?", dining_cta_subtitle: "Reserve your table for an unforgettable culinary experience",
    call_restaurant: "Call Restaurant", find_us: "Find Restaurant",
    
    // Menu Categories
    menu_turkish: "Turkish Specialties", menu_arabic: "Arabic Cuisine",
    menu_international: "International", menu_healthy: "Healthy Options",
    kebab_selection: "Grilled Kebab Selection", meze_platter: "Traditional Meze Platter",
    turkish_desserts: "Turkish Desserts", mansaf_lamb: "Mansaf with Lamb",
    kabsa_rice: "Traditional Kabsa", baklava_selection: "Baklava Varieties",
    grilled_seafood: "Fresh Grilled Seafood", pasta_selection: "Italian Pasta",
    continental_breakfast: "Continental Breakfast", fresh_salads: "Garden Fresh Salads",
    grilled_vegetables: "Grilled Vegetables", fruit_selection: "Seasonal Fruits",
    
    // Dining Features
    live_cooking: "Live Cooking Stations",
    buffet_ala_carte: "Buffet & À la Carte",
    premium_coffee: "Premium Coffee Blends", fresh_pastries: "Daily Fresh Pastries",
    business_meetings: "Business Meeting Space", wifi_zone: "High-Speed Wi-Fi",
    "24_hour_service": "24-Hour Service", extensive_menu: "Extensive Menu",
    quick_delivery: "Express Delivery", dietary_accommodations: "Special Dietary Needs",
    
    // Spa Page  
    spa_title: "Spa & Wellness", spa_subtitle: "Rejuvenate your mind, body and spirit in our tranquil sanctuary",
    wellness_sanctuary: "Wellness Sanctuary", wellness_facilities: "Wellness Facilities",
    facilities_subtitle: "State-of-the-art facilities for your well-being",
    fitness_center: "Fitness Center", outdoor_pool: "Outdoor Swimming Pool",
    steam_room: "Steam Room & Sauna", hours_6am_11pm: "6:00 AM - 11:00 PM",
    hours_6am_10pm: "6:00 AM - 10:00 PM", hours_8am_10pm: "8:00 AM - 10:00 PM",
    modern_equipment: "Modern Fitness Equipment", cardio_zone: "Cardio Training Zone",
    weight_training: "Weight Training Area", personal_trainer: "Personal Training Available",
    heated_pool: "Heated Outdoor Pool", pool_bar: "Poolside Bar Service",
    sun_loungers: "Premium Sun Loungers", pool_service: "Pool Attendant Service",
    traditional_steam: "Traditional Steam Experience", aromatherapy: "Aromatherapy Sessions",
    relaxation_area: "Quiet Relaxation Area", towel_service: "Fresh Towel Service",
    
    spa_treatments_section: "Spa Treatments", treatments_subtitle: "Luxurious treatments by expert therapists",
    massage_therapy: "Massage Therapy", body_treatments: "Body Treatments",
    wellness_packages: "Wellness Packages", swedish_massage: "Swedish Massage",
    deep_tissue: "Deep Tissue Massage", hot_stone: "Hot Stone Therapy",
    couples_massage: "Couples Massage", body_scrub: "Exfoliating Body Scrub",
    body_wrap: "Detoxifying Body Wrap", aromatherapy_treatment: "Aromatherapy Treatment",
    half_day_wellness: "Half Day Wellness", full_day_retreat: "Full Day Retreat",
    weekend_wellness: "Weekend Wellness Retreat",
    
    price_swedish: "SAR 380", price_deep_tissue: "SAR 480", price_hot_stone: "SAR 520",
    price_couples: "SAR 750", price_body_scrub: "SAR 280", price_body_wrap: "SAR 350",
    price_aromatherapy: "SAR 450", price_half_day: "SAR 850", price_full_day: "SAR 1,500",
    price_weekend: "SAR 2,800",
    
    spa_amenities: "Spa Amenities", relaxation_lounge: "Relaxation Lounge",
    hydrotherapy: "Hydrotherapy Pool", organic_products: "Organic Products",
    expert_therapists: "Expert Therapists", relaxation_lounge_desc: "Peaceful pre and post-treatment space",
    hydrotherapy_desc: "Therapeutic water treatments", organic_products_desc: "Natural and organic spa products",
    expert_therapists_desc: "Certified and experienced therapists",
    ready_to_relax: "Ready to Relax?", spa_cta_subtitle: "Book your wellness escape today",
    
    // Meetings Page
    meetings_title: "Meetings & Events", meetings_subtitle: "Sophisticated venues for memorable business events and celebrations",
    business_events_venue: "Premium Business Venue", central_riyadh_location: "Central Riyadh Location",
    valet_parking_available: "Valet Parking Available", event_spaces: "Event Spaces",
    spaces_subtitle: "Flexible venues for every occasion", grand_ballroom: "Grand Ballroom",
    conference_room_a: "Conference Room A", conference_room_b: "Conference Room B",
    business_center: "24-Hour Business Center", capacity_configurations: "Capacity Configurations",
    theater: "Theater Style", banquet: "Banquet Style", classroom: "Classroom Style",
    reception: "Reception Style", boardroom: "Boardroom Style", ushape: "U-Shape Style",
    workstations: "Workstations", meeting: "Meeting Room", guests: "Guests",
    included_features: "Included Features", av_equipment: "A/V Equipment",
    air_conditioning: "Climate Control", natural_light: "Natural Light",
    stage_area: "Stage Area", dance_floor: "Dance Floor", smart_tv: "Smart TV Display",
    video_conferencing: "Video Conferencing", whiteboard: "Interactive Whiteboard",
    high_speed_wifi: "High-Speed Wi-Fi", climate_control: "Individual Climate Control",
    lcd_projector: "LCD Projector", sound_system: "Premium Sound System",
    flip_charts: "Flip Charts", teleconference: "Teleconference Capability",
    refreshment_station: "Refreshment Station", "24_hour_access": "24-Hour Access",
    printing_services: "Printing & Copying", internet_stations: "Internet Workstations",
    secretarial_services: "Secretarial Support", courier_services: "Courier Services",
    virtual_tour: "Virtual Tour",
    
    event_services: "Event Services", services_subtitle: "Complete support for successful events",
    av_services: "Audio Visual", catering_services: "Catering Services",
    support_services: "Event Support", business_services: "Business Services",
    lcd_projectors: "LCD Projectors", sound_systems: "Sound Systems",
    microphones: "Wireless Microphones", video_conferencing: "Video Conferencing",
    live_streaming: "Live Streaming", coffee_breaks: "Coffee Breaks",
    business_lunch: "Business Lunches", gala_dinner: "Gala Dinners",
    cocktail_reception: "Cocktail Receptions", dietary_options: "Dietary Options",
    event_coordination: "Event Coordination", technical_support: "Technical Support",
    registration_desk: "Registration Services", translation_services: "Translation Services",
    photography: "Event Photography", high_speed_internet: "High-Speed Internet",
    printing_copying: "Printing & Copying", secretarial_support: "Secretarial Support",
    courier_services: "Courier Services", concierge_desk: "Concierge Services",
    
    meeting_packages: "Meeting Packages", packages_subtitle: "All-inclusive packages for seamless events",
    half_day_package: "Half Day Package", full_day_package: "Full Day Package",
    residential_package: "Residential Package", "4_hours": "4 Hours", "8_hours": "8 Hours",
    "2_days": "2 Days", room_rental: "Room Rental", basic_av: "Basic A/V Equipment",
    coffee_break: "Coffee Break", mineral_water: "Mineral Water", premium_av: "Premium A/V Setup",
    two_coffee_breaks: "Two Coffee Breaks", business_lunch: "Business Lunch",
    accommodation: "Accommodation", all_meals: "All Meals", welcome_reception: "Welcome Reception",
    package_half_day_price: "From SAR 1,200", package_full_day_price: "From SAR 2,500",
    package_residential_price: "From SAR 4,800", ready_to_plan_event: "Ready to Plan Your Event?",
    event_cta_subtitle: "Let our expert team help create your perfect event",
    call_events_team: "Call Events Team", schedule_site_visit: "Schedule Site Visit",
    
    // Offers Page
    offers_title: "Special Offers", offers_subtitle: "Exclusive deals and packages for unforgettable experiences",
    exclusive_deals: "Exclusive Hotel Deals", featured_offers: "Featured Offers",
    featured_offers_subtitle: "Limited-time offers with exceptional value",
    early_bird_offer: "Early Bird Special", book_advance_save: "Book in advance and save up to 25%",
    valid_until_december: "Valid through December 2025", romantic_getaway: "Romantic Getaway",
    perfect_couples_escape: "Perfect escape for couples", valid_weekends_only: "Valid weekends only",
    business_traveler_special: "Business Traveler Special", enhanced_business_experience: "Enhanced experience for business guests",
    valid_weekdays: "Valid weekdays only", save: "Save", terms_conditions: "Terms & Conditions",
    advance_booking_21_days: "21-day advance booking required", non_refundable: "Non-refundable rate",
    subject_availability: "Subject to availability", room_upgrade: "Complimentary room upgrade",
    complimentary_breakfast: "Complimentary breakfast", late_checkout: "Late checkout until 3 PM",
    book_early_bird: "Book Early Bird", minimum_2_nights: "Minimum 2-night stay",
    weekend_stays_only: "Weekend stays only", advance_booking_required: "Advance booking required",
    couples_spa: "Couples spa treatment", romantic_dinner: "Romantic dinner for two",
    champagne_welcome: "Champagne welcome", rose_petals: "Rose petal turndown",
    book_romantic: "Book Romantic Package", weekday_stays_only: "Weekday stays only",
    corporate_rates: "Corporate rates apply", flexible_cancellation: "Flexible cancellation",
    executive_room: "Executive room upgrade", meeting_room_credit: "Meeting room credit",
    airport_transfer: "Airport transfer", business_breakfast: "Business breakfast",
    book_business: "Book Business Deal",
    
    seasonal_offers: "Seasonal Offers", seasonal_offers_subtitle: "Special packages for every season",
    summer_escape: "Summer Escape", beat_the_heat: "Beat the heat with our summer specials",
    june_august: "June - August", pool_access: "Premium pool access",
    cooling_drinks: "Complimentary cooling drinks", summer_menu: "Special summer menu",
    family_package: "Family Fun Package", perfect_family_vacation: "Perfect for family vacations",
    school_holidays: "During school holidays", kids_stay_free: "Kids stay free",
    family_activities: "Family activities included", children_menu: "Special children's menu",
    wellness_retreat: "Wellness Week", rejuvenate_mind_body: "Rejuvenate your mind and body",
    spa_season: "Throughout the year", spa_treatments: "Spa treatments included",
    healthy_cuisine: "Healthy cuisine options", yoga_classes: "Daily yoga classes",
    culinary_experience: "Culinary Journey", taste_extraordinary: "Taste the extraordinary",
    chef_specials: "Chef's special periods", tasting_menu: "Multi-course tasting menu",
    wine_pairing: "Wine pairing included", cooking_class: "Hands-on cooking class",
    
    membership_program: "Membership Program", membership_subtitle: "Join our exclusive membership for special privileges",
    join_membership: "Join Membership", priority_booking: "Priority Booking",
    exclusive_discounts: "Exclusive Member Discounts", flexible_cancellation: "Flexible Cancellation",
    member_events: "Member-Only Events", priority_booking_desc: "Priority reservation access",
    exclusive_discounts_desc: "Up to 20% off best available rates",
    flexible_cancellation_desc: "Free cancellation up to 24 hours",
    member_events_desc: "Exclusive events and experiences",
    never_miss_deal: "Never Miss a Deal", newsletter_subtitle: "Subscribe to our newsletter for exclusive offers",
    enter_email: "Enter your email", subscribe: "Subscribe",
    
    // About Page
    about_title: "About Braira Al Olaya", about_subtitle: "Discover the story behind Riyadh's premier luxury hotel",
    est_2018: "Est. 2018", our_story: "Our Story", hotel_exterior: "Hotel Exterior", 
    story_paragraph_1: "Located in the heart of Al Olaya district, Braira Al Olaya Riyadh has been setting the standard for luxury hospitality since 2018.",
    story_paragraph_2: "Our 179 elegantly appointed rooms and suites offer guests a perfect blend of traditional Arabian charm and contemporary comfort.",
    story_paragraph_3: "With world-class amenities, exceptional service, and a prime location near Riyadh's business and shopping districts, we create unforgettable experiences.",
    experience_braira: "Experience Braira", rooms_suites: "Rooms & Suites", happy_guests: "Happy Guests",
    guest_rating: "Guest Rating", years_excellence: "Years of Excellence", our_values: "Our Values",
    values_subtitle: "The principles that guide everything we do", arabian_hospitality: "Arabian Hospitality",
    hospitality_desc: "Genuine warmth and personalized service rooted in traditional values",
    excellence_service: "Service Excellence", excellence_desc: "Exceeding expectations through attention to detail",
    cultural_respect: "Cultural Sensitivity", cultural_respect_desc: "Honoring local customs while embracing global perspectives",
    guest_satisfaction: "Guest Satisfaction", satisfaction_desc: "Creating memorable experiences for every visitor",
    our_journey: "Our Journey", journey_subtitle: "Key milestones in our story of excellence",
    hotel_opening: "Hotel Opening", hotel_opening_desc: "Braira Al Olaya opens as Riyadh's newest luxury destination",
    "4_star_certification": "4-Star Certification", "4_star_desc": "Achieved international 4-star luxury rating",
    guest_excellence_award: "Guest Excellence Award", excellence_award_desc: "Recognized for outstanding guest satisfaction",
    sustainability_certification: "Green Certification", sustainability_desc: "Committed to environmental responsibility",
    awards_recognition: "Awards & Recognition", awards_subtitle: "Industry recognition for our commitment to excellence",
    tripadvisor_excellence: "TripAdvisor Excellence", booking_guest_award: "Booking.com Guest Award",
    green_key_certification: "Green Key Certification", halal_tourism_award: "Halal Tourism Award",
    meet_our_team: "Meet Our Team", team_subtitle: "Dedicated professionals committed to your comfort",
    general_manager_name: "Ahmed Al-Rashid", general_manager: "General Manager", "25_years_experience": "25 Years Experience",
    chef_name: "Chef Mohammad Farid", executive_chef: "Executive Chef", "15_years_experience": "15 Years Experience",
    concierge_manager_name: "Sara Al-Mansouri", concierge_manager: "Concierge Manager", "12_years_experience": "12 Years Experience",
    join_our_story: "Join Our Story", join_story_subtitle: "Become part of the Braira Al Olaya legacy",
    contact_us: "Contact Us",
    
    // Contact Page  
    contact_title: "Contact Us", contact_subtitle: "We're here to assist you 24/7 with exceptional service",
    get_in_touch: "Get In Touch", phone_reservations: "Phone Reservations", phone_hours: "24/7 Available",
    email_contact: "Email Contact", email_response_time: "Response within 2 hours", hotel_address: "Hotel Address",
    full_address: "Olaya Street, Al Olaya District, Riyadh 12211, Saudi Arabia", central_location_desc: "Prime location in business district",
    front_desk_hours: "Front Desk", "24_hours_available": "24 Hours Available", always_here_for_you: "Always here for you",
    send_message: "Send Us a Message", form_subtitle: "Get in touch and we'll respond promptly",
    first_name: "First Name", last_name: "Last Name", email_address: "Email Address", phone_number: "Phone Number",
    subject: "Subject", message_placeholder: "How can we help you today?", find_us_map: "Find Us",
    interactive_map_coming: "Interactive map coming soon", contact_departments: "Contact Our Departments",
    departments_subtitle: "Direct contact for specific services", reservations_dept: "Reservations Department",
    guest_services: "Guest Services", events_meetings: "Events & Meetings", spa_wellness: "Spa & Wellness",
    "6am_midnight": "6:00 AM - 12:00 AM", "8am_6pm": "8:00 AM - 6:00 PM", "8am_10pm": "8:00 AM - 10:00 PM",
    prime_location: "Our Prime Location", location_advantages: "Strategic location with easy access to everything Riyadh offers",
    valet_parking: "Complimentary Valet", complimentary_valet_desc: "Professional valet parking service",
    airport_distance: "Airport Access", airport_distance_desc: "35 minutes from King Khalid International Airport",
    nearby_attractions: "Nearby Attractions", attractions_desc: "Walking distance to malls, restaurants, and landmarks",
    business_district: "Business Hub", business_district_desc: "Heart of Riyadh's financial and commercial center",
    ready_to_visit: "Ready to Visit Us?", visit_cta_subtitle: "We look forward to welcoming you to Braira Al Olaya",
    call_now: "Call Now", email_us: "Email Us",
    
    // AI Responses
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