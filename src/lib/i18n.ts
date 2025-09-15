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
    weekend_retreat: "Weekend Wellness Retreat",
    
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
    microphones: "Wireless Microphones", video_conferencing_equipment: "Video Conferencing",
    live_streaming: "Live Streaming", coffee_breaks: "Coffee Breaks",
    business_lunch: "Business Lunches", gala_dinner: "Gala Dinners",
    cocktail_reception: "Cocktail Receptions", dietary_options: "Dietary Options",
    event_coordination: "Event Coordination", technical_support: "Technical Support",
    registration_desk: "Registration Services", translation_services: "Translation Services",
    photography: "Event Photography", high_speed_internet: "High-Speed Internet",
    printing_copying: "Printing & Copying", secretarial_support: "Secretarial Support",
    courier_services_events: "Courier Services", concierge_desk: "Concierge Services",
    
    meeting_packages: "Meeting Packages", packages_subtitle: "All-inclusive packages for seamless events",
    half_day_package: "Half Day Package", full_day_package: "Full Day Package",
    residential_package: "Residential Package", "4_hours": "4 Hours", "8_hours": "8 Hours",
    "2_days": "2 Days", room_rental: "Room Rental", basic_av: "Basic A/V Equipment",
    coffee_break: "Coffee Break", mineral_water: "Mineral Water", premium_av: "Premium A/V Setup",
    two_coffee_breaks: "Two Coffee Breaks", business_lunch_package: "Business Lunch",
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
    valid_weekdays: "Valid weekdays only", save: "Save", terms_conditions_apply: "Terms & Conditions",
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
    wellness_retreat_offer: "Wellness Week", rejuvenate_mind_body: "Rejuvenate your mind and body",
    spa_season: "Throughout the year", spa_treatments: "Spa treatments included",
    healthy_cuisine: "Healthy cuisine options", yoga_classes: "Daily yoga classes",
    culinary_experience: "Culinary Journey", taste_extraordinary: "Taste the extraordinary",
    chef_specials: "Chef's special periods", tasting_menu: "Multi-course tasting menu",
    wine_pairing: "Wine pairing included", cooking_class: "Hands-on cooking class",
    
    membership_program: "Membership Program", membership_subtitle: "Join our exclusive membership for special privileges",
    join_membership: "Join Membership", priority_booking: "Priority Booking",
    exclusive_discounts: "Exclusive Member Discounts", flexible_cancellation_membership: "Flexible Cancellation",
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
    awards_recognition: "Awards & Recognition", awards_desc: "Recognized for excellence in hospitality and service",
    expansion_phase: "Expansion Phase", expansion_desc: "Enhanced facilities and guest experience upgrades",
    contact_us: "Contact Us", contact_subtitle: "Get in touch with our team for any inquiries",
    contact_address: "Address", contact_phone: "Phone", contact_email: "Email",
    address_line_1: "Al Olaya District", address_line_2: "Riyadh, Saudi Arabia",
    phone_number: "+966 11 XXX XXXX", email_address: "info@brairaalolaya.com",
    hours_operation: "Hours of Operation", "24_7_service": "24/7 Service",
    general_inquiry: "General Inquiry", reservation_inquiry: "Reservations",
    event_inquiry: "Events & Meetings", spa_inquiry: "Spa & Wellness",
    
    // AI Concierge
    ai_welcome: "Hello! I'm Huda, your AI concierge.",
    ai_help: "How can I help you today?",
    ai_fallback: "I'd be happy to help you with information about our hotel, rooms, dining, spa, or any other services.",
    ai_availability: "Let me check room availability for your dates.",
    ai_dining: "I can help you with restaurant reservations and dining information.",
    ai_service: "I can assist with room service, housekeeping, and concierge requests.",
    ai_escalation: "Let me connect you with a human agent for personalized assistance.",
    ai_booking_confirm: "Your booking has been confirmed. You'll receive a confirmation email shortly.",
    
    // Team & Staff
    meet_our_team: "Meet Our Team",
    team_subtitle: "The dedicated professionals who make your stay exceptional",
    general_manager_name: "Ahmed Al-Rashid",
    general_manager: "General Manager",
    "25_years_experience": "25+ years in hospitality",
    chef_name: "Chef Mohammad Hassan",
    executive_chef: "Executive Chef",
    "15_years_experience": "15+ years culinary expertise",
    concierge_manager_name: "Fatima Al-Zahra",
    concierge_manager: "Concierge Manager",
    "12_years_experience": "12+ years guest services",
    
    // Awards & Recognition
    awards_subtitle: "Recognition for our commitment to excellence",
    guest_excellence_award: "Guest Excellence Award 2023",
    excellence_award_desc: "Recognized for outstanding guest satisfaction",
    sustainability_certification: "Sustainability Certification",
    sustainability_desc: "Committed to environmental responsibility",
    tripadvisor_excellence: "TripAdvisor Certificate of Excellence",
    booking_guest_award: "Booking.com Guest Review Award",
    green_key_certification: "Green Key Environmental Certification",
    halal_tourism_award: "Halal Tourism Award",
    
    // Contact Information
    phone_reservations: "+966 11 XXX XXXX",
    phone_restaurant: "+966 11 XXX XXXX",
    phone_spa: "+966 11 XXX XXXX",
    phone_events: "+966 11 XXX XXXX",
    email_reservations: "reservations@brairaalolaya.com",
    email_restaurant: "dining@brairaalolaya.com",
    email_spa: "spa@brairaalolaya.com",
    email_events: "events@brairaalolaya.com",
    
    // Form Fields
    full_name: "Full Name",
    email_address_field: "Email Address",
    phone_number_field: "Phone Number",
    check_in_date: "Check-in Date",
    check_out_date: "Check-out Date",
    number_of_guests: "Number of Guests",
    room_type: "Room Type",
    special_requests: "Special Requests",
    message: "Message",
    send_message: "Send Message",
    submit_inquiry: "Submit Inquiry",
    required_field: "This field is required",
    
    // CTA Sections
    join_our_story: "Join Our Story",
    join_story_subtitle: "Experience the finest in Arabian hospitality",
    
    // Contact Page Additional Keys
    phone_hours: "24 hours / 7 days",
    email_contact: "Email Contact",
    email_response_time: "Response within 2 hours",
    hotel_address: "Hotel Address",
    full_address: "Al Olaya District, King Fahd Road, Riyadh 12333, Saudi Arabia",
    central_location_desc: "Prime location in Riyadh's business district",
    front_desk_hours: "Front Desk Hours",
    "24_hours_available": "24 Hours Available",
    always_here_for_you: "We're always here to assist you",
    reservations_dept: "Reservations Department",
    guest_services: "Guest Services",
    "6am_midnight": "6:00 AM - 12:00 AM",
    events_meetings: "Events & Meetings",
    "8am_6pm": "8:00 AM - 6:00 PM",
    spa_wellness: "Spa & Wellness",
    "8am_10pm": "8:00 AM - 10:00 PM",
    valet_parking: "Valet Parking",
    complimentary_valet_desc: "Complimentary valet parking for all guests",
    airport_distance: "Airport Distance",
    airport_distance_desc: "35 minutes drive from King Khalid International Airport",
    nearby_attractions: "Nearby Attractions",
    attractions_desc: "Walking distance to Kingdom Centre, Al Faisaliah Tower",
    business_district: "Business District",
    business_district_desc: "Located in the heart of Riyadh's financial district",
    get_in_touch: "Get in Touch",
    contact_title: "Contact Our Team",
    form_subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    first_name: "First Name",
    last_name: "Last Name",
    subject: "Subject",
    message_placeholder: "Tell us how we can help you...",
    find_us_map: "Find Us on Map",
    interactive_map_coming: "Interactive map integration coming soon",
    contact_departments: "Contact Departments",
    departments_subtitle: "Reach the right department for faster assistance",
    prime_location: "Prime Location",
    location_advantages: "Discover the advantages of our central location",
    ready_to_visit: "Ready to Visit Us?",
    visit_cta_subtitle: "We look forward to welcoming you to Braira Al Olaya",
    call_now: "Call Now",
    email_us: "Email Us",
    wellness_retreat: "Wellness Retreat",
    
    // Additional Missing Keys
    deluxe_room_desc: "Spacious room with modern amenities and city views",
    executive_room_desc: "Enhanced room with executive lounge access",
    junior_suite_desc: "Separate living area with premium amenities", 
    executive_suite_desc: "Luxurious suite with panoramic views and butler service",
    swedish_massage_desc: "Classic relaxation massage for stress relief",
    deep_tissue_desc: "Therapeutic massage for muscle tension relief",
    hot_stone_desc: "Warming stone therapy for deep relaxation",
    couples_massage_desc: "Romantic massage experience for two",
    body_scrub_desc: "Exfoliating treatment for smooth, soft skin",
    body_wrap_desc: "Detoxifying wrap for body purification",
    aromatherapy_treatment_desc: "Essential oil therapy for mind and body",
    half_day_wellness_desc: "4-hour wellness package with treatments and facilities",
    full_day_retreat_desc: "Complete day of relaxation and rejuvenation",
    weekend_retreat_desc: "2-day wellness escape with accommodation"
  },
  ar: {
    // Basic translations - to be expanded
    home: "الرئيسية", rooms: "الغرف والأجنحة", dining: "المطاعم", spa: "السبا والعافية",
    meetings: "الاجتماعات والفعاليات", offers: "العروض", about: "حولنا", contact: "اتصل بنا",
    book_now: "احجز الآن", learn_more: "اعرف أكثر"
  },
  ms: {
    // Basic translations - to be expanded
    home: "Beranda", rooms: "Bilik & Suite", dining: "Restoran", spa: "Spa & Kesihatan",
    meetings: "Mesyuarat & Acara", offers: "Tawaran", about: "Tentang Kami", contact: "Hubungi",
    book_now: "Tempah Sekarang", learn_more: "Ketahui Lebih Lanjut"
  },
  fr: {
    // Basic translations - to be expanded
    home: "Accueil", rooms: "Chambres & Suites", dining: "Restaurants", spa: "Spa & Bien-être",
    meetings: "Réunions & Événements", offers: "Offres", about: "À Propos", contact: "Contact",
    book_now: "Réserver", learn_more: "En Savoir Plus"
  },
  id: {
    // Basic translations - to be expanded
    home: "Beranda", rooms: "Kamar & Suite", dining: "Restoran", spa: "Spa & Kesehatan",
    meetings: "Rapat & Acara", offers: "Penawaran", about: "Tentang Kami", contact: "Kontak",
    book_now: "Pesan Sekarang", learn_more: "Pelajari Lebih Lanjut"
  },
  hi: {
    // Basic translations - to be expanded
    home: "होम", rooms: "कमरे और सूट", dining: "डाइनिंग", spa: "स्पा और वेलनेस",
    meetings: "मीटिंग और इवेंट्स", offers: "ऑफर्स", about: "हमारे बारे में", contact: "संपर्क",
    book_now: "अभी बुक करें", learn_more: "और जानें"
  }
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

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

// Alias for backward compatibility
export const useI18n = useTranslation;

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };
  
  const dir: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr';
  const hotelName = hotelNames[language];
  
  const value = { language, setLanguage, t, dir, hotelName };
  
  return React.createElement(I18nContext.Provider, { value }, children);
}