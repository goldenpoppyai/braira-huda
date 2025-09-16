import { Language } from './i18n';
import { Message, ConversationState } from './conversationFlow';

export interface LearningPattern {
  id: string;
  pattern: string;
  intent: string;
  confidence: number;
  frequency: number;
  language: Language;
  context: Record<string, any>;
  lastUsed: Date;
  userFeedback?: 'positive' | 'negative';
}

export interface UserBehaviorData {
  commonIntents: Record<string, number>;
  preferredTimeOfDay: Record<string, number>;
  averageSessionLength: number;
  bookingPatterns: Record<string, any>;
  languagePreference: Language;
  responseTime: number[];
  satisfactionRating: number;
}

export interface PredictiveInsight {
  type: 'intent_suggestion' | 'follow_up' | 'upsell' | 'clarification';
  content: string;
  confidence: number;
  action?: string;
  priority: 'low' | 'medium' | 'high';
}

export class AILearningEngine {
  private learningPatterns: Map<string, LearningPattern> = new Map();
  private userBehavior: UserBehaviorData;
  private conversationContext: any[] = [];

  constructor() {
    this.userBehavior = {
      commonIntents: {},
      preferredTimeOfDay: {},
      averageSessionLength: 0,
      bookingPatterns: {},
      languagePreference: 'en',
      responseTime: [],
      satisfactionRating: 5
    };
    this.loadLearningData();
  }

  // Learning from user interactions
  learnFromInteraction(
    userInput: string, 
    recognizedIntent: string, 
    confidence: number, 
    language: Language,
    userFeedback?: 'positive' | 'negative'
  ): void {
    const patternId = this.generatePatternId(userInput, recognizedIntent);
    const existingPattern = this.learningPatterns.get(patternId);

    if (existingPattern) {
      // Update existing pattern
      existingPattern.frequency += 1;
      existingPattern.lastUsed = new Date();
      existingPattern.confidence = this.adjustConfidence(existingPattern.confidence, confidence, userFeedback);
      if (userFeedback) {
        existingPattern.userFeedback = userFeedback;
      }
    } else {
      // Create new pattern
      const newPattern: LearningPattern = {
        id: patternId,
        pattern: this.extractPattern(userInput),
        intent: recognizedIntent,
        confidence: confidence,
        frequency: 1,
        language,
        context: this.extractContext(userInput),
        lastUsed: new Date(),
        userFeedback
      };
      this.learningPatterns.set(patternId, newPattern);
    }

    this.updateUserBehavior(recognizedIntent, language);
    this.saveLearningData();
  }

  // Generate predictive insights
  generatePredictiveInsights(
    currentMessage: string, 
    conversationHistory: Message[], 
    language: Language
  ): PredictiveInsight[] {
    const insights: PredictiveInsight[] = [];

    // Intent prediction based on partial input
    const intentSuggestion = this.predictIntent(currentMessage, language);
    if (intentSuggestion) {
      insights.push(intentSuggestion);
    }

    // Follow-up suggestions
    const followUps = this.generateFollowUpSuggestions(conversationHistory, language);
    insights.push(...followUps);

    // Upselling opportunities
    const upsellOpportunities = this.identifyUpsellOpportunities(conversationHistory);
    insights.push(...upsellOpportunities);

    // Clarification needs
    const clarifications = this.identifyClarificationNeeds(currentMessage, conversationHistory);
    insights.push(...clarifications);

    return insights.sort((a, b) => b.confidence - a.confidence);
  }

  // Smart auto-complete suggestions
  generateAutocompleteSuggestions(partialInput: string, language: Language): string[] {
    const suggestions: string[] = [];
    const normalizedInput = partialInput.toLowerCase().trim();

    if (normalizedInput.length < 2) return suggestions;

    // Find matching patterns
    const matchingPatterns = Array.from(this.learningPatterns.values())
      .filter(pattern => 
        pattern.language === language &&
        pattern.pattern.toLowerCase().includes(normalizedInput) &&
        pattern.frequency > 1
      )
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5);

    // Generate common completions
    const commonCompletions = this.getCommonCompletions(normalizedInput, language);
    
    // Combine and deduplicate
    const allSuggestions = [
      ...matchingPatterns.map(p => this.reconstructSuggestion(p.pattern, partialInput)),
      ...commonCompletions
    ];

    return [...new Set(allSuggestions)].slice(0, 5);
  }

  // Context-aware response enhancement
  enhanceResponse(baseResponse: string, context: ConversationState, language: Language): string {
    let enhancedResponse = baseResponse;

    // Add personalization based on user preferences
    if (context.userPreferences.previousStay) {
      const welcomeBack = this.getLocalizedText('welcome_back', language);
      enhancedResponse = `${welcomeBack} ${enhancedResponse}`;
    }

    // Add relevant upsells or suggestions
    const contextualSuggestions = this.getContextualSuggestions(context, language);
    if (contextualSuggestions.length > 0) {
      enhancedResponse += `\n\n${contextualSuggestions.join(' ')}`;
    }

    // Add helpful follow-up questions
    const followUpQuestions = this.generateContextualQuestions(context, language);
    if (followUpQuestions.length > 0) {
      enhancedResponse += `\n\n${followUpQuestions[0]}`;
    }

    return enhancedResponse;
  }

  // Get learning analytics
  getLearningAnalytics(): any {
    return {
      totalPatterns: this.learningPatterns.size,
      topIntents: this.getTopIntents(),
      languageDistribution: this.getLanguageDistribution(),
      confidenceMetrics: this.getConfidenceMetrics(),
      userBehavior: this.userBehavior,
      learningTrends: this.getLearningTrends()
    };
  }

  // Private helper methods
  private generatePatternId(input: string, intent: string): string {
    return `${intent}_${input.toLowerCase().replace(/\s+/g, '_').substring(0, 20)}`;
  }

  private extractPattern(input: string): string {
    // Extract key phrases and normalize
    return input.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private extractContext(input: string): Record<string, any> {
    const context: Record<string, any> = {};
    
    // Extract entities (dates, numbers, names, etc.)
    const datePattern = /(\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}-\d{1,2}-\d{4}|tomorrow|today|next week)/i;
    const numberPattern = /\b\d+\b/g;
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    
    if (datePattern.test(input)) {
      context.hasDate = true;
    }
    if (numberPattern.test(input)) {
      context.hasNumbers = true;
    }
    if (emailPattern.test(input)) {
      context.hasEmail = true;
    }

    return context;
  }

  private adjustConfidence(
    currentConfidence: number, 
    newConfidence: number, 
    feedback?: 'positive' | 'negative'
  ): number {
    let adjusted = (currentConfidence + newConfidence) / 2;
    
    if (feedback === 'positive') {
      adjusted = Math.min(1.0, adjusted + 0.1);
    } else if (feedback === 'negative') {
      adjusted = Math.max(0.1, adjusted - 0.2);
    }
    
    return adjusted;
  }

  private updateUserBehavior(intent: string, language: Language): void {
    this.userBehavior.commonIntents[intent] = (this.userBehavior.commonIntents[intent] || 0) + 1;
    this.userBehavior.languagePreference = language;
    
    const hour = new Date().getHours();
    const timeSlot = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
    this.userBehavior.preferredTimeOfDay[timeSlot] = (this.userBehavior.preferredTimeOfDay[timeSlot] || 0) + 1;
  }

  private predictIntent(partialInput: string, language: Language): PredictiveInsight | null {
    const normalizedInput = partialInput.toLowerCase();
    
    // Find the most likely intent based on learned patterns
    const matchingPatterns = Array.from(this.learningPatterns.values())
      .filter(pattern => 
        pattern.language === language &&
        pattern.pattern.startsWith(normalizedInput) &&
        pattern.confidence > 0.7
      )
      .sort((a, b) => b.confidence * b.frequency - a.confidence * a.frequency);

    if (matchingPatterns.length > 0) {
      const topPattern = matchingPatterns[0];
      return {
        type: 'intent_suggestion',
        content: `Based on your input, you might be looking for ${topPattern.intent}`,
        confidence: topPattern.confidence,
        priority: 'medium'
      };
    }

    return null;
  }

  private generateFollowUpSuggestions(history: Message[], language: Language): PredictiveInsight[] {
    const suggestions: PredictiveInsight[] = [];
    
    if (history.length === 0) return suggestions;

    const lastMessage = history[history.length - 1];
    
    // Generate contextual follow-ups based on last intent
    if (lastMessage.intent === 'book_room') {
      suggestions.push({
        type: 'follow_up',
        content: this.getLocalizedText('suggest_dining', language),
        confidence: 0.8,
        priority: 'medium'
      });
    }

    return suggestions;
  }

  private identifyUpsellOpportunities(history: Message[]): PredictiveInsight[] {
    const opportunities: PredictiveInsight[] = [];
    
    // Analyze conversation for upsell potential
    const hasRoomBooking = history.some(m => m.intent === 'book_room');
    const hasSpaInquiry = history.some(m => m.intent === 'spa_booking');
    
    if (hasRoomBooking && !hasSpaInquiry) {
      opportunities.push({
        type: 'upsell',
        content: 'Would you like to enhance your stay with our spa services?',
        confidence: 0.7,
        priority: 'low'
      });
    }

    return opportunities;
  }

  private identifyClarificationNeeds(currentMessage: string, history: Message[]): PredictiveInsight[] {
    const clarifications: PredictiveInsight[] = [];
    
    // Check for ambiguous language
    const ambiguousTerms = ['it', 'that', 'this', 'there'];
    const hasAmbiguity = ambiguousTerms.some(term => currentMessage.toLowerCase().includes(term));
    
    if (hasAmbiguity && history.length > 0) {
      clarifications.push({
        type: 'clarification',
        content: 'Could you please be more specific about what you\'re referring to?',
        confidence: 0.6,
        priority: 'medium'
      });
    }

    return clarifications;
  }

  private getCommonCompletions(input: string, language: Language): string[] {
    const completions: Record<Language, Record<string, string[]>> = {
      en: {
        'book': ['book a room', 'book a table', 'book spa treatment'],
        'what': ['what time', 'what are your rates', 'what amenities'],
        'can': ['can you help', 'can I book', 'can you recommend'],
        'i need': ['I need a room', 'I need help', 'I need information']
      },
      ar: {
        'احجز': ['احجز غرفة', 'احجز طاولة', 'احجز علاج سبا'],
        'ما': ['ما هو الوقت', 'ما هي الأسعار', 'ما هي المرافق'],
        'هل': ['هل يمكنكم المساعدة', 'هل يمكنني الحجز', 'هل توصون'],
        'أحتاج': ['أحتاج غرفة', 'أحتاج مساعدة', 'أحتاج معلومات']
      },
      ms: {}, fr: {}, id: {}, hi: {}
    };

    const langCompletions = completions[language] || completions.en;
    
    for (const [key, values] of Object.entries(langCompletions)) {
      if (key.startsWith(input.toLowerCase())) {
        return values;
      }
    }
    
    return [];
  }

  private reconstructSuggestion(pattern: string, partialInput: string): string {
    // Smart reconstruction of full suggestion from pattern
    const words = pattern.split(' ');
    const inputWords = partialInput.toLowerCase().split(' ');
    
    // Find where the input matches in the pattern
    for (let i = 0; i <= words.length - inputWords.length; i++) {
      const slice = words.slice(i, i + inputWords.length);
      if (slice.join(' ').startsWith(inputWords.join(' '))) {
        return words.slice(i).join(' ');
      }
    }
    
    return pattern;
  }

  private getContextualSuggestions(context: ConversationState, language: Language): string[] {
    const suggestions: string[] = [];
    
    if (context.activeBooking?.type === 'room') {
      suggestions.push(this.getLocalizedText('suggest_spa', language));
    }
    
    return suggestions;
  }

  private generateContextualQuestions(context: ConversationState, language: Language): string[] {
    const questions: string[] = [];
    
    if (context.activeBooking && context.activeBooking.status === 'collecting_info') {
      questions.push(this.getLocalizedText('need_more_info', language));
    }
    
    return questions;
  }

  private getLocalizedText(key: string, language: Language): string {
    const texts: Record<string, Record<Language, string>> = {
      welcome_back: {
        en: 'Welcome back!',
        ar: 'أهلاً بعودتكم!',
        ms: 'Selamat kembali!',
        fr: 'Bon retour!',
        id: 'Selamat datang kembali!',
        hi: 'वापसी पर स्वागत है!'
      },
      suggest_dining: {
        en: 'Would you like to make a dining reservation?',
        ar: 'هل تريدون حجز طاولة في المطعم؟',
        ms: 'Adakah anda ingin membuat tempahan makan?',
        fr: 'Souhaitez-vous faire une réservation au restaurant?',
        id: 'Apakah Anda ingin membuat reservasi makan?',
        hi: 'क्या आप डाइनिंग रिज़र्वेशन करना चाहेंगे?'
      },
      suggest_spa: {
        en: 'Consider adding spa services to your stay.',
        ar: 'فكروا في إضافة خدمات السبا لإقامتكم.',
        ms: 'Pertimbangkan untuk menambah perkhidmatan spa.',
        fr: 'Considérez ajouter des services spa à votre séjour.',
        id: 'Pertimbangkan menambahkan layanan spa.',
        hi: 'अपने प्रवास में स्पा सेवाएं जोड़ने पर विचार करें।'
      },
      need_more_info: {
        en: 'Is there anything else you\'d like to add?',
        ar: 'هل هناك شيء آخر تريدون إضافته؟',
        ms: 'Adakah apa-apa lagi yang ingin anda tambah?',
        fr: 'Y a-t-il autre chose que vous aimeriez ajouter?',
        id: 'Apakah ada hal lain yang ingin Anda tambahkan?',
        hi: 'क्या कुछ और है जो आप जोड़ना चाहेंगे?'
      }
    };
    
    return texts[key]?.[language] || texts[key]?.['en'] || '';
  }

  private getTopIntents(): Array<{intent: string, count: number}> {
    return Object.entries(this.userBehavior.commonIntents)
      .map(([intent, count]) => ({intent, count}))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private getLanguageDistribution(): Record<Language, number> {
    const distribution: Record<string, number> = {};
    
    Array.from(this.learningPatterns.values()).forEach(pattern => {
      distribution[pattern.language] = (distribution[pattern.language] || 0) + 1;
    });
    
    return distribution as Record<Language, number>;
  }

  private getConfidenceMetrics(): any {
    const confidences = Array.from(this.learningPatterns.values()).map(p => p.confidence);
    
    return {
      average: confidences.reduce((a, b) => a + b, 0) / confidences.length || 0,
      min: Math.min(...confidences) || 0,
      max: Math.max(...confidences) || 0
    };
  }

  private getLearningTrends(): any {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const recentPatterns = Array.from(this.learningPatterns.values())
      .filter(p => p.lastUsed >= oneWeekAgo);
    
    return {
      weeklyGrowth: recentPatterns.length,
      topGrowingIntents: this.getTopIntents().slice(0, 3)
    };
  }

  private loadLearningData(): void {
    try {
      const stored = localStorage.getItem('huda_ai_learning');
      if (stored) {
        const data = JSON.parse(stored);
        if (data.patterns) {
          this.learningPatterns = new Map(data.patterns);
        }
        if (data.behavior) {
          this.userBehavior = { ...this.userBehavior, ...data.behavior };
        }
      }
    } catch (error) {
      console.warn('Failed to load learning data:', error);
    }
  }

  private saveLearningData(): void {
    try {
      const data = {
        patterns: Array.from(this.learningPatterns.entries()),
        behavior: this.userBehavior,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('huda_ai_learning', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save learning data:', error);
    }
  }
}

export const aiLearningEngine = new AILearningEngine();