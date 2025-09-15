import { Language } from './i18n';

export interface ConversationState {
  currentIntent: string;
  context: Record<string, any>;
  userPreferences: UserPreferences;
  conversationHistory: Message[];
  activeBooking?: BookingSession;
}

export interface UserPreferences {
  language: Language;
  roomType?: string;
  dietaryRestrictions?: string[];
  budgetRange?: string;
  travelPurpose?: 'business' | 'leisure' | 'family';
  previousStay?: boolean;
}

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  intent?: string;
  confidence?: number;
  language: Language;
}

export interface BookingSession {
  id: string;
  type: 'room' | 'dining' | 'spa' | 'meeting';
  status: 'initiated' | 'collecting_info' | 'confirming' | 'completed' | 'cancelled';
  data: Record<string, any>;
  step: number;
  totalSteps: number;
}

export class ConversationFlow {
  private state: ConversationState;
  
  constructor(language: Language = 'en') {
    this.state = {
      currentIntent: 'greeting',
      context: {},
      userPreferences: { language },
      conversationHistory: [],
      activeBooking: undefined
    };
  }

  // Intent Recognition
  recognizeIntent(userInput: string): { intent: string; confidence: number; entities: Record<string, any> } {
    const input = userInput.toLowerCase();
    
    // Room booking intents
    if (this.containsKeywords(input, ['book', 'room', 'stay', 'reservation', 'غرفة', 'حجز'])) {
      return { intent: 'book_room', confidence: 0.9, entities: this.extractRoomEntities(input) };
    }
    
    // Dining intents
    if (this.containsKeywords(input, ['restaurant', 'dining', 'food', 'menu', 'مطعم', 'طعام'])) {
      return { intent: 'dining_inquiry', confidence: 0.85, entities: this.extractDiningEntities(input) };
    }
    
    // Spa intents
    if (this.containsKeywords(input, ['spa', 'massage', 'wellness', 'treatment', 'سبا', 'تدليك'])) {
      return { intent: 'spa_booking', confidence: 0.85, entities: this.extractSpaEntities(input) };
    }
    
    // Meeting/Events intents
    if (this.containsKeywords(input, ['meeting', 'conference', 'event', 'اجتماع', 'مؤتمر'])) {
      return { intent: 'meeting_booking', confidence: 0.8, entities: this.extractMeetingEntities(input) };
    }
    
    // Service requests
    if (this.containsKeywords(input, ['service', 'help', 'housekeeping', 'concierge', 'خدمة', 'مساعدة'])) {
      return { intent: 'service_request', confidence: 0.75, entities: this.extractServiceEntities(input) };
    }
    
    // Information requests
    if (this.containsKeywords(input, ['information', 'about', 'location', 'amenities', 'معلومات', 'موقع'])) {
      return { intent: 'information_request', confidence: 0.7, entities: this.extractInfoEntities(input) };
    }
    
    // Complaint/feedback
    if (this.containsKeywords(input, ['complaint', 'problem', 'issue', 'شكوى', 'مشكلة'])) {
      return { intent: 'complaint', confidence: 0.8, entities: {} };
    }
    
    // Default fallback
    return { intent: 'general_inquiry', confidence: 0.5, entities: {} };
  }

  // Process user message and generate response
  processMessage(userInput: string): string {
    const recognition = this.recognizeIntent(userInput);
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date(),
      intent: recognition.intent,
      confidence: recognition.confidence,
      language: this.state.userPreferences.language
    };
    
    this.state.conversationHistory.push(message);
    this.state.currentIntent = recognition.intent;
    
    const response = this.generateResponse(recognition.intent, recognition.entities);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      language: this.state.userPreferences.language
    };
    
    this.state.conversationHistory.push(botMessage);
    
    return response;
  }

  // Generate contextual responses
  private generateResponse(intent: string, entities: Record<string, any>): string {
    const lang = this.state.userPreferences.language;
    
    switch (intent) {
      case 'book_room':
        return this.handleRoomBooking(entities);
      
      case 'dining_inquiry':
        return this.handleDiningInquiry(entities);
      
      case 'spa_booking':
        return this.handleSpaBooking(entities);
      
      case 'meeting_booking':
        return this.handleMeetingBooking(entities);
      
      case 'service_request':
        return this.handleServiceRequest(entities);
      
      case 'information_request':
        return this.handleInformationRequest(entities);
      
      case 'complaint':
        return this.handleComplaint();
      
      default:
        return this.getLocalizedResponse('general_help', lang);
    }
  }

  // Specific handlers
  private handleRoomBooking(entities: Record<string, any>): string {
    if (!this.state.activeBooking) {
      this.state.activeBooking = {
        id: Date.now().toString(),
        type: 'room',
        status: 'initiated',
        data: entities,
        step: 1,
        totalSteps: 5
      };
      
      return this.getLocalizedResponse('room_booking_start', this.state.userPreferences.language);
    }
    
    return this.continueRoomBooking(entities);
  }

  private continueRoomBooking(entities: Record<string, any>): string {
    const booking = this.state.activeBooking!;
    
    switch (booking.step) {
      case 1: // Check-in date
        if (entities.checkIn) {
          booking.data.checkIn = entities.checkIn;
          booking.step = 2;
          return this.getLocalizedResponse('ask_checkout_date', this.state.userPreferences.language);
        }
        return this.getLocalizedResponse('ask_checkin_date', this.state.userPreferences.language);
      
      case 2: // Check-out date
        if (entities.checkOut) {
          booking.data.checkOut = entities.checkOut;
          booking.step = 3;
          return this.getLocalizedResponse('ask_guests_count', this.state.userPreferences.language);
        }
        return this.getLocalizedResponse('ask_checkout_date', this.state.userPreferences.language);
      
      case 3: // Number of guests
        if (entities.guests) {
          booking.data.guests = entities.guests;
          booking.step = 4;
          return this.getLocalizedResponse('ask_room_preference', this.state.userPreferences.language);
        }
        return this.getLocalizedResponse('ask_guests_count', this.state.userPreferences.language);
      
      case 4: // Room preference
        if (entities.roomType) {
          booking.data.roomType = entities.roomType;
          booking.step = 5;
          return this.generateBookingSummary();
        }
        return this.getLocalizedResponse('ask_room_preference', this.state.userPreferences.language);
      
      case 5: // Confirmation
        booking.status = 'completed';
        return this.getLocalizedResponse('booking_confirmed', this.state.userPreferences.language);
      
      default:
        return this.getLocalizedResponse('booking_error', this.state.userPreferences.language);
    }
  }

  private handleDiningInquiry(entities: Record<string, any>): string {
    const responses = {
      en: "I'd be happy to help with dining. We have Al Diwan Restaurant serving Turkish cuisine, Majlis Coffee Lounge, and 24/7 room service. All our dining is Halal certified. What would you like to know?",
      ar: "سأكون سعيدة لمساعدتك بخصوص المطاعم. لدينا مطعم الديوان الذي يقدم المأكولات التركية، وصالة قهوة المجلس، وخدمة الغرف على مدار الساعة. جميع مطاعمنا حاصلة على شهادة حلال. ماذا تود أن تعرف؟",
      ms: "Saya berbesar hati membantu dengan hal dining. Kami ada Restoran Al Diwan yang menyajikan masakan Turki, Majlis Coffee Lounge, dan room service 24/7. Semua makanan kami bersertifikat Halal.",
      fr: "Je serais ravie de vous aider avec la restauration. Nous avons le Restaurant Al Diwan servant une cuisine turque, le Majlis Coffee Lounge, et un service en chambre 24h/24. Tous nos services de restauration sont certifiés Halal.",
      id: "Saya senang membantu tentang dining. Kami memiliki Restoran Al Diwan yang menyajikan masakan Turki, Majlis Coffee Lounge, dan layanan kamar 24/7. Semua makanan kami bersertifikat Halal.",
      hi: "मुझे डाइनिंग के बारे में मदद करने में खुशी होगी। हमारे पास अल दीवान रेस्टोरेंट है जो तुर्की व्यंजन परोसता है, मजलिस कॉफी लाउंज, और 24/7 रूम सर्विस। हमारा सभी भोजन हलाल प्रमाणित है।"
    };
    
    return responses[this.state.userPreferences.language] || responses.en;
  }

  private handleSpaBooking(entities: Record<string, any>): string {
    const responses = {
      en: "Our spa offers Swedish massage, deep tissue therapy, hot stone treatments, and couples massage. We also have a fitness center, outdoor pool, and steam room. What treatment interests you?",
      ar: "يقدم السبا تدليك سويدي، وعلاج الأنسجة العميقة، وعلاج الأحجار الساخنة، وتدليك للأزواج. لدينا أيضاً مركز لياقة بدنية ومسبح خارجي وغرفة بخار. ما العلاج الذي يهمك؟",
      ms: "Spa kami menawarkan Swedish massage, terapi deep tissue, rawatan hot stone, dan couples massage. Kami juga ada pusat kecergasan, kolam renang luar, dan bilik stim.",
      fr: "Notre spa propose des massages suédois, thérapie des tissus profonds, traitements aux pierres chaudes, et massage en couple. Nous avons aussi un centre de fitness, piscine extérieure et hammam.",
      id: "Spa kami menawarkan pijat Swedia, terapi jaringan dalam, perawatan batu panas, dan pijat pasangan. Kami juga memiliki pusat kebugaran, kolam renang outdoor, dan ruang uap.",
      hi: "हमारा स्पा स्वीडिश मसाज, डीप टिश्यू थेरेपी, हॉट स्टोन ट्रीटमेंट, और कपल्स मसाज प्रदान करता है। हमारे पास फिटनेस सेंटर, आउटडोर पूल, और स्टीम रूम भी है।"
    };
    
    return responses[this.state.userPreferences.language] || responses.en;
  }

  private handleMeetingBooking(entities: Record<string, any>): string {
    const responses = {
      en: "We have excellent meeting facilities including a Grand Ballroom (300 guests), Conference Room A (40 guests), Conference Room B (30 guests), and a 24-hour Business Center. What type of event are you planning?",
      ar: "لدينا مرافق اجتماعات ممتازة تشمل القاعة الكبرى (300 ضيف)، قاعة المؤتمرات أ (40 ضيف)، قاعة المؤتمرات ب (30 ضيف)، ومركز أعمال يعمل 24 ساعة. ما نوع الفعالية التي تخطط لها؟",
      ms: "Kami mempunyai kemudahan mesyuarat yang sangat baik termasuk Grand Ballroom (300 tetamu), Conference Room A (40 tetamu), Conference Room B (30 tetamu), dan Business Center 24 jam.",
      fr: "Nous avons d'excellentes installations de réunion incluant une Grande Salle de Bal (300 invités), Salle de Conférence A (40 invités), Salle de Conférence B (30 invités), et un Centre d'Affaires 24h/24.",
      id: "Kami memiliki fasilitas meeting yang sangat baik termasuk Grand Ballroom (300 tamu), Conference Room A (40 tamu), Conference Room B (30 tamu), dan Business Center 24 jam.",
      hi: "हमारे पास उत्कृष्ट मीटिंग सुविधाएं हैं जिनमें ग्रैंड बॉलरूम (300 मेहमान), कॉन्फ्रेंस रूम A (40 मेहमान), कॉन्फ्रेंस रूम B (30 मेहमान), और 24-घंटे बिजनेस सेंटर शामिल है।"
    };
    
    return responses[this.state.userPreferences.language] || responses.en;
  }

  private handleServiceRequest(entities: Record<string, any>): string {
    const responses = {
      en: "I can help with housekeeping, room service, concierge services, transportation, or connecting you with our front desk. What service do you need?",
      ar: "يمكنني المساعدة في التدبير المنزلي، وخدمة الغرف، وخدمات الكونسيرج، والنقل، أو توصيلك بمكتب الاستقبال. ما الخدمة التي تحتاجها؟",
      ms: "Saya boleh membantu dengan housekeeping, room service, perkhidmatan concierge, pengangkutan, atau menghubungkan anda dengan meja depan.",
      fr: "Je peux vous aider avec le ménage, le service en chambre, les services de conciergerie, le transport, ou vous connecter avec notre réception.",
      id: "Saya dapat membantu dengan housekeeping, room service, layanan concierge, transportasi, atau menghubungkan Anda dengan front desk.",
      hi: "मैं हाउसकीपिंग, रूम सर्विस, कंसीयर्ज सेवाओं, परिवहन, या हमारे फ्रंट डेस्क से जोड़ने में मदद कर सकती हूं।"
    };
    
    return responses[this.state.userPreferences.language] || responses.en;
  }

  private handleInformationRequest(entities: Record<string, any>): string {
    const responses = {
      en: "I can provide information about our rooms, dining, spa, meeting facilities, location, amenities, or local attractions. What would you like to know about?",
      ar: "يمكنني تقديم معلومات عن غرفنا، والمطاعم، والسبا، ومرافق الاجتماعات، والموقع، والمرافق، أو المعالم المحلية. ماذا تود أن تعرف؟",
      ms: "Saya boleh memberikan maklumat tentang bilik, dining, spa, kemudahan mesyuarat, lokasi, kemudahan, atau tarikan tempatan.",
      fr: "Je peux fournir des informations sur nos chambres, restauration, spa, installations de réunion, emplacement, équipements, ou attractions locales.",
      id: "Saya dapat memberikan informasi tentang kamar, dining, spa, fasilitas meeting, lokasi, amenitas, atau atraksi lokal.",
      hi: "मैं हमारे कमरों, डाइनिंग, स्पा, मीटिंग सुविधाओं, स्थान, सुविधाओं, या स्थानीय आकर्षणों के बारे में जानकारी प्रदान कर सकती हूं।"
    };
    
    return responses[this.state.userPreferences.language] || responses.en;
  }

  private handleComplaint(): string {
    const responses = {
      en: "I'm sorry to hear about your concern. Let me connect you with our Guest Relations Manager who can assist you personally. Your satisfaction is our priority.",
      ar: "أنا آسفة لسماع قلقك. دعني أوصلك بمدير علاقات الضيوف الذي يمكنه مساعدتك شخصياً. رضاك هو أولويتنا.",
      ms: "Saya minta maaf mendengar kebimbangan anda. Biar saya hubungkan anda dengan Pengurus Perhubungan Tetamu yang boleh membantu anda secara peribadi.",
      fr: "Je suis désolée d'entendre votre préoccupation. Permettez-moi de vous connecter avec notre Responsable des Relations Clients qui peut vous aider personnellement.",
      id: "Saya minta maaf mendengar kekhawatiran Anda. Izinkan saya menghubungkan Anda dengan Manajer Hubungan Tamu yang dapat membantu Anda secara pribadi.",
      hi: "मुझे आपकी चिंता सुनकर खुशी हुई। मैं आपको हमारे गेस्ट रिलेशन मैनेजर से जोड़ती हूं जो आपकी व्यक्तिगत रूप से सहायता कर सकते हैं।"
    };
    
    return responses[this.state.userPreferences.language] || responses.en;
  }

  // Helper methods
  private containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  private extractRoomEntities(input: string): Record<string, any> {
    const entities: Record<string, any> = {};
    
    // Extract dates (basic pattern)
    const datePattern = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/g;
    const dates = input.match(datePattern);
    if (dates && dates.length >= 1) entities.checkIn = dates[0];
    if (dates && dates.length >= 2) entities.checkOut = dates[1];
    
    // Extract number of guests
    const guestPattern = /(\d+)\s*(guest|people|person|ضيف|أشخاص)/i;
    const guestMatch = input.match(guestPattern);
    if (guestMatch) entities.guests = parseInt(guestMatch[1]);
    
    // Extract room types
    if (input.includes('deluxe') || input.includes('ديلوكس')) entities.roomType = 'deluxe';
    if (input.includes('executive') || input.includes('تنفيذي')) entities.roomType = 'executive';
    if (input.includes('suite') || input.includes('جناح')) entities.roomType = 'suite';
    
    return entities;
  }

  private extractDiningEntities(input: string): Record<string, any> {
    const entities: Record<string, any> = {};
    
    if (input.includes('turkish') || input.includes('تركي')) entities.cuisine = 'turkish';
    if (input.includes('arabic') || input.includes('عربي')) entities.cuisine = 'arabic';
    if (input.includes('coffee') || input.includes('قهوة')) entities.venue = 'coffee_lounge';
    if (input.includes('room service') || input.includes('خدمة الغرف')) entities.venue = 'room_service';
    
    return entities;
  }

  private extractSpaEntities(input: string): Record<string, any> {
    const entities: Record<string, any> = {};
    
    if (input.includes('massage') || input.includes('تدليك')) entities.service = 'massage';
    if (input.includes('facial') || input.includes('وجه')) entities.service = 'facial';
    if (input.includes('couples') || input.includes('أزواج')) entities.type = 'couples';
    
    return entities;
  }

  private extractMeetingEntities(input: string): Record<string, any> {
    const entities: Record<string, any> = {};
    
    // Extract capacity
    const capacityPattern = /(\d+)\s*(people|person|guests|attendees|أشخاص|حضور)/i;
    const capacityMatch = input.match(capacityPattern);
    if (capacityMatch) entities.capacity = parseInt(capacityMatch[1]);
    
    if (input.includes('ballroom') || input.includes('قاعة كبرى')) entities.venue = 'ballroom';
    if (input.includes('conference') || input.includes('مؤتمر')) entities.type = 'conference';
    if (input.includes('wedding') || input.includes('زفاف')) entities.type = 'wedding';
    
    return entities;
  }

  private extractServiceEntities(input: string): Record<string, any> {
    const entities: Record<string, any> = {};
    
    if (input.includes('housekeeping') || input.includes('تنظيف')) entities.service = 'housekeeping';
    if (input.includes('room service') || input.includes('خدمة الغرف')) entities.service = 'room_service';
    if (input.includes('concierge') || input.includes('كونسيرج')) entities.service = 'concierge';
    if (input.includes('transport') || input.includes('نقل')) entities.service = 'transport';
    
    return entities;
  }

  private extractInfoEntities(input: string): Record<string, any> {
    const entities: Record<string, any> = {};
    
    if (input.includes('location') || input.includes('موقع')) entities.topic = 'location';
    if (input.includes('amenities') || input.includes('مرافق')) entities.topic = 'amenities';
    if (input.includes('attractions') || input.includes('معالم')) entities.topic = 'attractions';
    if (input.includes('policy') || input.includes('سياسة')) entities.topic = 'policy';
    
    return entities;
  }

  private generateBookingSummary(): string {
    const booking = this.state.activeBooking!;
    const responses = {
      en: `Perfect! Here's your booking summary:
- Check-in: ${booking.data.checkIn}
- Check-out: ${booking.data.checkOut}  
- Guests: ${booking.data.guests}
- Room Type: ${booking.data.roomType}
Would you like me to proceed with this reservation?`,
      ar: `ممتاز! إليك ملخص حجزك:
- تاريخ الوصول: ${booking.data.checkIn}
- تاريخ المغادرة: ${booking.data.checkOut}
- عدد الضيوف: ${booking.data.guests}
- نوع الغرفة: ${booking.data.roomType}
هل تود أن أواصل مع هذا الحجز؟`
    };
    
    return responses[this.state.userPreferences.language] || responses.en;
  }

  private getLocalizedResponse(key: string, language: Language): string {
    const responses: Record<string, Record<Language, string>> = {
      general_help: {
        en: "I'm Huda, your AI concierge. I can help with room bookings, dining reservations, spa appointments, meeting arrangements, and general hotel information. How may I assist you?",
        ar: "أنا هدى، المساعدة الذكية. يمكنني المساعدة في حجز الغرف، وحجوزات المطاعم، ومواعيد السبا، وترتيب الاجتماعات، ومعلومات الفندق العامة. كيف يمكنني مساعدتك؟",
        ms: "Saya Huda, concierge AI anda. Saya boleh membantu dengan tempahan bilik, tempahan restoran, temujanji spa, urusan mesyuarat, dan maklumat hotel am.",
        fr: "Je suis Huda, votre concierge IA. Je peux vous aider avec les réservations de chambres, réservations de restaurant, rendez-vous spa, arrangements de réunions, et informations générales de l'hôtel.",
        id: "Saya Huda, concierge AI Anda. Saya dapat membantu dengan pemesanan kamar, reservasi restoran, janji spa, pengaturan meeting, dan informasi hotel umum.",
        hi: "मैं हुदा हूं, आपकी AI कंसीयर्ज। मैं कमरे की बुकिंग, डाइनिंग रिज़र्वेशन, स्पा अपॉइंटमेंट, मीटिंग व्यवस्था, और सामान्य होटल जानकारी में मदद कर सकती हूं।"
      },
      room_booking_start: {
        en: "I'd be happy to help you book a room! When would you like to check in?",
        ar: "سأكون سعيدة لمساعدتك في حجز غرفة! متى تود الوصول؟",
        ms: "Saya berbesar hati membantu anda menempah bilik! Bila anda ingin check in?",
        fr: "Je serais ravie de vous aider à réserver une chambre! Quand souhaitez-vous faire votre check-in?",
        id: "Saya senang membantu Anda memesan kamar! Kapan Anda ingin check in?",
        hi: "मुझे आपके लिए कमरा बुक करने में खुशी होगी! आप कब चेक इन करना चाहते हैं?"
      }
    };
    
    return responses[key]?.[language] || responses[key]?.en || "I'm here to help!";
  }

  // Public methods for state management
  getState(): ConversationState {
    return this.state;
  }

  updateUserPreferences(preferences: Partial<UserPreferences>): void {
    this.state.userPreferences = { ...this.state.userPreferences, ...preferences };
  }

  getConversationHistory(): Message[] {
    return this.state.conversationHistory;
  }

  clearHistory(): void {
    this.state.conversationHistory = [];
  }

  exportFlowJSON(): string {
    return JSON.stringify({
      version: "1.0",
      language: this.state.userPreferences.language,
      flows: {
        greeting: {
          triggers: ["hello", "hi", "start", "مرحبا", "السلام عليكم"],
          responses: ["general_help"],
          nextStates: ["room_booking", "dining_inquiry", "spa_booking", "information_request"]
        },
        room_booking: {
          triggers: ["book", "room", "stay", "حجز", "غرفة"],
          steps: ["check_in_date", "check_out_date", "guest_count", "room_preference", "confirmation"],
          responses: ["room_booking_start"],
          nextStates: ["payment", "modification", "cancellation"]
        },
        dining_inquiry: {
          triggers: ["restaurant", "food", "dining", "مطعم", "طعام"],
          responses: ["dining_options"],
          nextStates: ["reservation", "menu_inquiry", "dietary_requirements"]
        },
        spa_booking: {
          triggers: ["spa", "massage", "wellness", "سبا", "تدليك"],
          responses: ["spa_options"],
          nextStates: ["treatment_selection", "time_booking", "therapist_preference"]
        },
        escalation: {
          triggers: ["human", "agent", "manager", "موظف", "مدير"],
          responses: ["escalation_message"],
          nextStates: ["end_conversation"]
        }
      },
      entities: {
        dates: ["check_in", "check_out", "appointment_date"],
        numbers: ["guests", "duration", "capacity"],
        preferences: ["room_type", "cuisine", "treatment_type"]
      }
    }, null, 2);
  }
}

export const conversationFlow = new ConversationFlow();