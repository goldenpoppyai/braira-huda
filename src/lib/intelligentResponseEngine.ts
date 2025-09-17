import { Language } from './i18n';

// Advanced NLP and Intent Recognition Engine
export interface UserIntent {
  primary: string;
  confidence: number;
  entities: Record<string, any>;
  sentiment: 'positive' | 'neutral' | 'negative';
  urgency: 'low' | 'medium' | 'high';
  context: string[];
}

export interface ConversationMemory {
  userId: string;
  conversations: ConversationEntry[];
  preferences: UserPreferences;
  learnedPatterns: LearnedPattern[];
  sessionHistory: SessionEntry[];
  totalInteractions: number;
  lastActive: string;
}

export interface ConversationEntry {
  id: string;
  timestamp: string;
  userMessage: string;
  agentResponse: string;
  intent: UserIntent;
  route: string;
  sessionId: string;
  actions: AgentAction[];
}

export interface UserPreferences {
  name?: string;
  preferredLanguage: Language;
  roomPreferences: {
    type?: 'deluxe' | 'executive' | 'junior_suite' | 'executive_suite';
    bedType?: 'king' | 'twin';
    floor?: 'high' | 'low';
    amenities: string[];
  };
  diningPreferences: {
    cuisine: string[];
    dietary: string[];
    seatingPreference?: 'window' | 'quiet' | 'lively';
  };
  spaPreferences: {
    treatmentTypes: string[];
    preferredTime?: 'morning' | 'afternoon' | 'evening';
  };
  communicationStyle: 'friendly' | 'professional' | 'casual';
  frequentRequests: string[];
  bookingHistory: BookingHistory[];
}

export interface LearnedPattern {
  pattern: string;
  frequency: number;
  context: string;
  lastSeen: string;
  confidence: number;
}

export interface SessionEntry {
  sessionId: string;
  startTime: string;
  endTime?: string;
  route: string;
  interactions: number;
  completedActions: AgentAction[];
}

export interface AgentAction {
  type: 'navigate' | 'open_booking' | 'show_info' | 'execute_search' | 'call_hotel' | 'memory_command';
  target: string;
  executed: boolean;
  timestamp: string;
  result?: any;
}

export interface BookingHistory {
  type: 'room' | 'dining' | 'spa' | 'meeting';
  date: string;
  details: Record<string, any>;
  status: 'completed' | 'cancelled' | 'pending';
}

export interface PredictiveResponse {
  response: string;
  confidence: number;
  suggestedActions: AgentAction[];
  contextualInfo: string[];
  followUpQuestions: string[];
}

export class IntelligentResponseEngine {
  private memory: ConversationMemory;
  private currentSessionId: string;
  private currentRoute: string = '/';

  constructor() {
    this.currentSessionId = this.generateSessionId();
    this.memory = this.loadMemory();
    this.startSession();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadMemory(): ConversationMemory {
    const stored = localStorage.getItem('huda_memory');
    if (stored) {
      return JSON.parse(stored);
    }
    
    return {
      userId: `user_${Date.now()}`,
      conversations: [],
      preferences: {
        preferredLanguage: 'en',
        roomPreferences: { amenities: [] },
        diningPreferences: { cuisine: [], dietary: [] },
        spaPreferences: { treatmentTypes: [] },
        communicationStyle: 'friendly',
        frequentRequests: [],
        bookingHistory: []
      },
      learnedPatterns: [],
      sessionHistory: [],
      totalInteractions: 0,
      lastActive: new Date().toISOString()
    };
  }

  private saveMemory(): void {
    localStorage.setItem('huda_memory', JSON.stringify(this.memory));
  }

  private startSession(): void {
    const session: SessionEntry = {
      sessionId: this.currentSessionId,
      startTime: new Date().toISOString(),
      route: this.currentRoute,
      interactions: 0,
      completedActions: []
    };
    
    this.memory.sessionHistory.push(session);
    this.saveMemory();
  }

  setCurrentRoute(route: string): void {
    this.currentRoute = route;
  }

  // Advanced Intent Recognition with NLP
  analyzeIntent(message: string): UserIntent {
    const lowercaseMessage = message.toLowerCase();
    
    // Intent patterns with confidence scoring
    const intentPatterns = {
      book_room: {
        keywords: ['book', 'reserve', 'room', 'suite', 'stay', 'check-in', 'accommodation'],
        phrases: ['book a room', 'make reservation', 'check availability', 'room booking'],
        confidence: 0.9
      },
      dining_inquiry: {
        keywords: ['restaurant', 'dining', 'food', 'meal', 'breakfast', 'dinner', 'lunch'],
        phrases: ['restaurant hours', 'make dinner reservation', 'room service'],
        confidence: 0.85
      },
      spa_booking: {
        keywords: ['spa', 'massage', 'treatment', 'wellness', 'relax', 'therapy'],
        phrases: ['book spa', 'spa appointment', 'massage booking'],
        confidence: 0.9
      },
      hotel_info: {
        keywords: ['hours', 'location', 'amenities', 'facilities', 'services', 'policy'],
        phrases: ['what time', 'where is', 'do you have', 'hotel information'],
        confidence: 0.7
      },
      meeting_events: {
        keywords: ['meeting', 'conference', 'event', 'business', 'ballroom', 'presentation'],
        phrases: ['book meeting room', 'event space', 'conference facilities'],
        confidence: 0.8
      },
      memory_command: {
        keywords: ['remember', 'forget', 'memory', 'export', 'reset'],
        phrases: ['what do you remember', 'reset memory', 'export memory'],
        confidence: 0.95
      }
    };

    let bestMatch = { intent: 'general_inquiry', confidence: 0.3 };
    
    for (const [intent, pattern] of Object.entries(intentPatterns)) {
      let score = 0;
      
      // Check keywords
      pattern.keywords.forEach(keyword => {
        if (lowercaseMessage.includes(keyword)) {
          score += pattern.confidence * 0.3;
        }
      });
      
      // Check phrases (higher weight)
      pattern.phrases.forEach(phrase => {
        if (lowercaseMessage.includes(phrase)) {
          score += pattern.confidence * 0.7;
        }
      });
      
      if (score > bestMatch.confidence) {
        bestMatch = { intent, confidence: Math.min(score, 1.0) };
      }
    }

    // Extract entities
    const entities = this.extractEntities(message);
    
    // Sentiment analysis
    const sentiment = this.analyzeSentiment(message);
    
    // Urgency detection
    const urgency = this.detectUrgency(message);
    
    // Context from current route
    const context = this.getRouteContext();

    return {
      primary: bestMatch.intent,
      confidence: bestMatch.confidence,
      entities,
      sentiment,
      urgency,
      context
    };
  }

  private extractEntities(message: string): Record<string, any> {
    const entities: Record<string, any> = {};
    const lowercaseMessage = message.toLowerCase();
    
    // Extract dates
    const datePattern = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})|(\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{2,4})/gi;
    const dates = message.match(datePattern);
    if (dates) entities.dates = dates;
    
    // Extract numbers
    const numberPattern = /\b\d+\b/g;
    const numbers = message.match(numberPattern);
    if (numbers) entities.numbers = numbers.map(Number);
    
    // Extract room types
    const roomTypes = ['deluxe', 'executive', 'suite', 'junior'];
    roomTypes.forEach(type => {
      if (lowercaseMessage.includes(type)) {
        entities.roomType = type;
      }
    });
    
    // Extract names (basic pattern)
    const namePattern = /(?:my name is|i'm|i am|call me)\s+([a-z]+)/i;
    const nameMatch = message.match(namePattern);
    if (nameMatch) entities.name = nameMatch[1];
    
    return entities;
  }

  private analyzeSentiment(message: string): 'positive' | 'neutral' | 'negative' {
    const positive = ['great', 'wonderful', 'excellent', 'amazing', 'perfect', 'love', 'fantastic', 'good'];
    const negative = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disappointed', 'problem'];
    
    const lowercaseMessage = message.toLowerCase();
    let score = 0;
    
    positive.forEach(word => {
      if (lowercaseMessage.includes(word)) score += 1;
    });
    
    negative.forEach(word => {
      if (lowercaseMessage.includes(word)) score -= 1;
    });
    
    if (score > 0) return 'positive';
    if (score < 0) return 'negative';
    return 'neutral';
  }

  private detectUrgency(message: string): 'low' | 'medium' | 'high' {
    const urgent = ['urgent', 'asap', 'immediately', 'now', 'emergency', 'quick'];
    const medium = ['soon', 'today', 'tonight', 'this evening'];
    
    const lowercaseMessage = message.toLowerCase();
    
    if (urgent.some(word => lowercaseMessage.includes(word))) return 'high';
    if (medium.some(word => lowercaseMessage.includes(word))) return 'medium';
    return 'low';
  }

  private getRouteContext(): string[] {
    const routeContexts: Record<string, string[]> = {
      '/': ['home', 'overview', 'general'],
      '/rooms': ['rooms', 'accommodation', 'booking'],
      '/dining': ['dining', 'restaurant', 'food'],
      '/spa': ['spa', 'wellness', 'treatments'],
      '/meetings': ['meetings', 'events', 'business'],
      '/offers': ['offers', 'packages', 'deals'],
      '/about': ['about', 'information', 'hotel'],
      '/contact': ['contact', 'support', 'help']
    };
    
    return routeContexts[this.currentRoute] || ['general'];
  }

  // Generate intelligent response with prediction
  async generateResponse(message: string, intent: UserIntent): Promise<PredictiveResponse> {
    // Learn from this interaction
    this.learnFromInteraction(message, intent);
    
    // Generate contextual response
    const response = await this.generateContextualResponse(message, intent);
    
    // Suggest actions based on intent and context
    const suggestedActions = this.generateSuggestedActions(intent);
    
    // Get contextual information
    const contextualInfo = this.getContextualInfo(intent);
    
    // Generate follow-up questions
    const followUpQuestions = this.generateFollowUpQuestions(intent);
    
    return {
      response,
      confidence: intent.confidence,
      suggestedActions,
      contextualInfo,
      followUpQuestions
    };
  }

  private async generateContextualResponse(message: string, intent: UserIntent): Promise<string> {
    const style = this.memory.preferences.communicationStyle;
    const userName = this.memory.preferences.name;
    
    // Personality adaptation
    const greetings = {
      friendly: userName ? `Hi ${userName}! ` : 'Hi there! ',
      professional: userName ? `Good day, ${userName}. ` : 'Good day. ',
      casual: userName ? `Hey ${userName}! ` : 'Hey! '
    };
    
    const greeting = Math.random() < 0.3 ? greetings[style] : '';
    
    // Intent-based responses
    const responses: Record<string, string[]> = {
      book_room: [
        "I'd be happy to help you book a room. Let me show you our available options.",
        "Perfect! I'll help you find the ideal room for your stay."
      ],
      dining_inquiry: [
        "Our restaurants offer exceptional dining experiences. Let me share the details.",
        "I'll help you discover our culinary offerings and make reservations."
      ],
      spa_booking: [
        "Our spa offers rejuvenating treatments. I'll help you book the perfect wellness experience.",
        "Let me help you unwind with our luxurious spa services."
      ],
      hotel_info: [
        "I'm here to help with any hotel information you need.",
        "I'll provide you with all the details about our facilities and services."
      ],
      meeting_events: [
        "Our event spaces are perfect for memorable occasions. Let me show you the options.",
        "I'll help you plan the perfect meeting or event at our hotel."
      ],
      memory_command: [
        "I'll help you manage your conversation history and preferences.",
        "Let me assist you with your memory settings."
      ],
      general_inquiry: [
        "I'm here to assist you with anything you need during your stay.",
        "How can I make your experience at Braira Al Olaya exceptional today?"
      ]
    };
    
    const intentResponses = responses[intent.primary] || responses.general_inquiry;
    const baseResponse = intentResponses[Math.floor(Math.random() * intentResponses.length)];
    
    return greeting + baseResponse;
  }

  private generateSuggestedActions(intent: UserIntent): AgentAction[] {
    const actions: AgentAction[] = [];
    
    switch (intent.primary) {
      case 'book_room':
        actions.push({
          type: 'navigate',
          target: '/rooms',
          executed: false,
          timestamp: new Date().toISOString()
        });
        actions.push({
          type: 'open_booking',
          target: 'room_booking',
          executed: false,
          timestamp: new Date().toISOString()
        });
        break;
      
      case 'dining_inquiry':
        actions.push({
          type: 'navigate',
          target: '/dining',
          executed: false,
          timestamp: new Date().toISOString()
        });
        break;
      
      case 'spa_booking':
        actions.push({
          type: 'navigate',
          target: '/spa',
          executed: false,
          timestamp: new Date().toISOString()
        });
        actions.push({
          type: 'open_booking',
          target: 'spa_booking',
          executed: false,
          timestamp: new Date().toISOString()
        });
        break;
      
      case 'meeting_events':
        actions.push({
          type: 'navigate',
          target: '/meetings',
          executed: false,
          timestamp: new Date().toISOString()
        });
        break;
    }
    
    return actions;
  }

  private getContextualInfo(intent: UserIntent): string[] {
    const info: string[] = [];
    
    switch (intent.primary) {
      case 'book_room':
        info.push('179 rooms and suites available');
        info.push('Rates from SAR 450 per night');
        if (this.memory.preferences.roomPreferences.type) {
          info.push(`You previously preferred ${this.memory.preferences.roomPreferences.type} rooms`);
        }
        break;
      
      case 'dining_inquiry':
        info.push('Al Diwan Restaurant - International cuisine');
        info.push('Majlis Coffee Lounge - Traditional Arabic coffee');
        info.push('24/7 room service available');
        break;
      
      case 'spa_booking':
        info.push('Full spa and wellness facilities');
        info.push('Expert therapists available');
        info.push('Treatments from SAR 280');
        break;
    }
    
    return info;
  }

  private generateFollowUpQuestions(intent: UserIntent): string[] {
    const questions: string[] = [];
    
    switch (intent.primary) {
      case 'book_room':
        questions.push('What dates are you looking for?');
        questions.push('How many guests will be staying?');
        questions.push('Do you have a room type preference?');
        break;
      
      case 'dining_inquiry':
        questions.push('What type of cuisine interests you?');
        questions.push('Are you looking for a specific dining time?');
        break;
      
      case 'spa_booking':
        questions.push('What type of treatment interests you?');
        questions.push('When would you prefer your appointment?');
        break;
    }
    
    return questions;
  }

  private learnFromInteraction(message: string, intent: UserIntent): void {
    // Extract and learn preferences
    if (intent.entities.name && !this.memory.preferences.name) {
      this.memory.preferences.name = intent.entities.name;
    }
    
    if (intent.entities.roomType) {
      this.memory.preferences.roomPreferences.type = intent.entities.roomType as any;
    }
    
    // Track frequent requests
    if (!this.memory.preferences.frequentRequests.includes(intent.primary)) {
      this.memory.preferences.frequentRequests.push(intent.primary);
    }
    
    // Learn patterns
    const pattern = this.extractPattern(message);
    const existingPattern = this.memory.learnedPatterns.find(p => p.pattern === pattern);
    
    if (existingPattern) {
      existingPattern.frequency++;
      existingPattern.lastSeen = new Date().toISOString();
    } else {
      this.memory.learnedPatterns.push({
        pattern,
        frequency: 1,
        context: intent.context.join(','),
        lastSeen: new Date().toISOString(),
        confidence: intent.confidence
      });
    }
    
    this.memory.totalInteractions++;
    this.memory.lastActive = new Date().toISOString();
    this.saveMemory();
  }

  private extractPattern(message: string): string {
    // Simple pattern extraction - could be enhanced with more sophisticated NLP
    return message.toLowerCase()
      .replace(/[^\\w\\s]/g, '')
      .split(' ')
      .filter(word => word.length > 2)
      .slice(0, 3)
      .join(' ');
  }

  // Store conversation entry
  storeConversation(userMessage: string, agentResponse: string, intent: UserIntent, actions: AgentAction[]): void {
    const conversation: ConversationEntry = {
      id: `conv_${Date.now()}`,
      timestamp: new Date().toISOString(),
      userMessage,
      agentResponse,
      intent,
      route: this.currentRoute,
      sessionId: this.currentSessionId,
      actions
    };
    
    this.memory.conversations.push(conversation);
    
    // Keep only last 1000 conversations to prevent storage overflow
    if (this.memory.conversations.length > 1000) {
      this.memory.conversations = this.memory.conversations.slice(-1000);
    }
    
    // Update session
    const currentSession = this.memory.sessionHistory.find(s => s.sessionId === this.currentSessionId);
    if (currentSession) {
      currentSession.interactions++;
      currentSession.completedActions.push(...actions.filter(a => a.executed));
    }
    
    this.saveMemory();
  }

  // Memory management commands
  handleMemoryCommand(command: string): string {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('reset memory')) {
      this.resetMemory();
      return "I've reset my memory. We're starting fresh!";
    }
    
    if (lowerCommand.includes('what do you remember')) {
      return this.getMemorySummary();
    }
    
    if (lowerCommand.includes('export memory')) {
      return this.exportMemory();
    }
    
    return "I can help you with: 'reset memory', 'what do you remember?', or 'export memory'.";
  }

  private resetMemory(): void {
    this.memory = {
      userId: this.memory.userId,
      conversations: [],
      preferences: {
        preferredLanguage: 'en',
        roomPreferences: { amenities: [] },
        diningPreferences: { cuisine: [], dietary: [] },
        spaPreferences: { treatmentTypes: [] },
        communicationStyle: 'friendly',
        frequentRequests: [],
        bookingHistory: []
      },
      learnedPatterns: [],
      sessionHistory: [],
      totalInteractions: 0,
      lastActive: new Date().toISOString()
    };
    this.saveMemory();
  }

  private getMemorySummary(): string {
    const { preferences, totalInteractions, conversations } = this.memory;
    
    let summary = `I remember ${totalInteractions} interactions with you. `;
    
    if (preferences.name) {
      summary += `Your name is ${preferences.name}. `;
    }
    
    if (preferences.roomPreferences.type) {
      summary += `You prefer ${preferences.roomPreferences.type} rooms. `;
    }
    
    if (preferences.frequentRequests.length > 0) {
      summary += `You often ask about ${preferences.frequentRequests.slice(0, 3).join(', ')}. `;
    }
    
    if (conversations.length > 0) {
      summary += `Our last conversation was about ${conversations[conversations.length - 1].intent.primary}.`;
    }
    
    return summary;
  }

  private exportMemory(): string {
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        totalInteractions: this.memory.totalInteractions,
        preferences: this.memory.preferences,
        conversationCount: this.memory.conversations.length,
        lastActive: this.memory.lastActive
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `huda-memory-export-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      return "I've prepared your memory export for download. Check your downloads folder!";
    } catch (error) {
      return "Sorry, I couldn't export your memory data right now.";
    }
  }

  // Get recent conversations for display
  getRecentConversations(limit: number = 30): ConversationEntry[] {
    return this.memory.conversations.slice(-limit);
  }

  // Get user preferences
  getUserPreferences(): UserPreferences {
    return this.memory.preferences;
  }

  // Get predictive suggestions based on current context
  getPredictiveSuggestions(): string[] {
    const patterns = this.memory.learnedPatterns
      .filter(p => p.confidence > 0.5)
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5);
    
    const contextSuggestions: Record<string, string[]> = {
      '/': [
        'Show me available rooms',
        'What dining options do you have?',
        'Tell me about spa services'
      ],
      '/rooms': [
        'Book a deluxe room',
        'Check room availability',
        'Compare room prices'
      ],
      '/dining': [
        'Make a dinner reservation',
        'Show me the menu',
        'What are your restaurant hours?'
      ],
      '/spa': [
        'Book a massage',
        'Show spa packages',
        'What treatments do you offer?'
      ]
    };
    
    return contextSuggestions[this.currentRoute] || contextSuggestions['/'];
  }
}

// Singleton instance
export const intelligentEngine = new IntelligentResponseEngine();
