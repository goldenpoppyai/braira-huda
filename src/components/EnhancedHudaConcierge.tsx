import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Send, X, RotateCcw, Download, BarChart3, User, Bot } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { VoiceInterface } from './VoiceInterface';
import { conversationFlow, type Message, type ConversationState } from '@/lib/conversationFlow';

interface ConversationAnalytics {
  totalMessages: number;
  intentBreakdown: Record<string, number>;
  averageConfidence: number;
  completedBookings: number;
  escalationRate: number;
  languageUsage: Record<string, number>;
}

export function EnhancedHudaConcierge() {
  const { t, language, hotelName } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState | null>(null);
  const [analytics, setAnalytics] = useState<ConversationAnalytics>({
    totalMessages: 0,
    intentBreakdown: {},
    averageConfidence: 0,
    completedBookings: 0,
    escalationRate: 0,
    languageUsage: {}
  });
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize conversation flow with user's language
  useEffect(() => {
    conversationFlow.updateUserPreferences({ language });
    setConversationState(conversationFlow.getState());
    
    // Add welcome message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'bot',
        content: getWelcomeMessage(),
        timestamp: new Date(),
        language,
        intent: 'greeting'
      };
      setMessages([welcomeMessage]);
    }
  }, [language]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getWelcomeMessage = (): string => {
    const welcomeMessages = {
      en: `Welcome to ${hotelName}! I'm Huda, your AI concierge. I'm here to assist you 24/7 with room bookings, dining reservations, spa appointments, and any questions about our hotel. How may I help you today?`,
      ar: `أهلاً بكم في ${hotelName}! أنا هدى، المساعدة الذكية. أنا هنا لمساعدتكم على مدار الساعة في حجز الغرف وحجوزات المطاعم ومواعيد السبا وأي أسئلة حول فندقنا. كيف يمكنني مساعدتكم اليوم؟`,
      ms: `Selamat datang ke ${hotelName}! Saya Huda, concierge AI anda. Saya di sini untuk membantu anda 24/7 dengan tempahan bilik, tempahan restoran, temujanji spa, dan sebarang soalan tentang hotel kami.`,
      fr: `Bienvenue au ${hotelName}! Je suis Huda, votre concierge IA. Je suis là pour vous assister 24h/24 avec les réservations de chambres, réservations de restaurant, rendez-vous spa, et toute question sur notre hôtel.`,
      id: `Selamat datang di ${hotelName}! Saya Huda, concierge AI Anda. Saya di sini untuk membantu Anda 24/7 dengan pemesanan kamar, reservasi restoran, janji spa, dan pertanyaan tentang hotel kami.`,
      hi: `${hotelName} में आपका स्वागत है! मैं हुदा हूं, आपकी AI कंसीयर्ज। मैं 24/7 कमरे की बुकिंग, डाइनिंग रिज़र्वेशन, स्पा अपॉइंटमेंट, और हमारे होटल के बारे में किसी भी सवाल में आपकी मदद के लिए यहां हूं।`
    };
    
    return welcomeMessages[language] || welcomeMessages.en;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Process message through conversation flow
    try {
      const response = conversationFlow.processMessage(inputMessage.trim());
      
      // Simulate typing delay
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: response,
          timestamp: new Date(),
          language
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        
        // Update conversation state and analytics
        const newState = conversationFlow.getState();
        setConversationState(newState);
        updateAnalytics(newState);
        
        // Auto-speak response if TTS is enabled
        handleTextToSpeech(response);
      }, 1000 + Math.random() * 1000);
      
    } catch (error) {
      console.error('Error processing message:', error);
      setIsTyping(false);
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInputMessage(transcript);
    setIsListening(false);
  };

  const handleTextToSpeech = (text: string) => {
    setIsSpeaking(true);
    // TTS implementation would trigger here
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const updateAnalytics = (state: ConversationState) => {
    const messages = state.conversationHistory;
    const intentCounts: Record<string, number> = {};
    let totalConfidence = 0;
    let confidenceCount = 0;
    const langUsage: Record<string, number> = {};

    messages.forEach(msg => {
      if (msg.intent) {
        intentCounts[msg.intent] = (intentCounts[msg.intent] || 0) + 1;
      }
      if (msg.confidence) {
        totalConfidence += msg.confidence;
        confidenceCount++;
      }
      langUsage[msg.language] = (langUsage[msg.language] || 0) + 1;
    });

    setAnalytics({
      totalMessages: messages.length,
      intentBreakdown: intentCounts,
      averageConfidence: confidenceCount > 0 ? totalConfidence / confidenceCount : 0,
      completedBookings: state.activeBooking?.status === 'completed' ? 1 : 0,
      escalationRate: (intentCounts['complaint'] || 0) / Math.max(messages.length, 1),
      languageUsage: langUsage
    });
  };

  const handleClearConversation = () => {
    conversationFlow.clearHistory();
    setMessages([{
      id: 'welcome-new',
      type: 'bot',
      content: getWelcomeMessage(),
      timestamp: new Date(),
      language,
      intent: 'greeting'
    }]);
    setConversationState(conversationFlow.getState());
  };

  const handleExportFlow = () => {
    const flowJson = conversationFlow.exportFlowJSON();
    const blob = new Blob([flowJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `huda-conversation-flow-${language}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-primary hover:bg-primary-glow shadow-luxury text-white"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="absolute -top-2 -left-2 h-4 w-4 bg-green-500 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[600px] shadow-luxury flex flex-col">
        <CardHeader className="flex-shrink-0 bg-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Huda</CardTitle>
                <p className="text-sm text-white/80">{t('concierge_subtitle')}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="text-white hover:bg-white/20"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExportFlow}
                className="text-white hover:bg-white/20"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearConversation}
                className="text-white hover:bg-white/20"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Conversation Status */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-400 rounded-full" />
              <span className="text-xs">Online</span>
            </div>
            {conversationState?.activeBooking && (
              <Badge variant="secondary" className="text-xs">
                {conversationState.activeBooking.type} booking in progress
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Analytics Panel */}
          {showAnalytics && (
            <div className="p-4 bg-muted border-b">
              <h4 className="font-semibold mb-2">Conversation Analytics</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Messages: {analytics.totalMessages}</div>
                <div>Confidence: {(analytics.averageConfidence * 100).toFixed(1)}%</div>
                <div>Bookings: {analytics.completedBookings}</div>
                <div>Language: {language.toUpperCase()}</div>
              </div>
              <Separator className="my-2" />
              <div className="text-xs">
                <strong>Intents:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Object.entries(analytics.intentBreakdown).map(([intent, count]) => (
                    <Badge key={intent} variant="outline" className="text-xs">
                      {intent}: {count}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.intent && (
                          <Badge variant="outline" className="text-xs">
                            {message.intent}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="flex-shrink-0 border-t p-4">
            <VoiceInterface
              onTranscript={handleVoiceTranscript}
              onSpeak={handleTextToSpeech}
              isListening={isListening}
              isSpeaking={isSpeaking}
            />
            
            <div className="flex space-x-2 mt-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chat_placeholder')}
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                { key: 'book_room', text: 'Book Room' },
                { key: 'dining', text: 'Dining' },
                { key: 'spa', text: 'Spa' },
                { key: 'location', text: 'Location' }
              ].map((action) => (
                <Button
                  key={action.key}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(action.text)}
                  className="text-xs"
                >
                  {action.text}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}