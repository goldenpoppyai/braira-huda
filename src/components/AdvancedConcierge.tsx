import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Brain, 
  Zap, 
  Star,
  Calendar,
  MapPin,
  Coffee,
  Bed,
  Users,
  Phone,
  Mail,
  Download,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { intelligentEngine, type ConversationEntry, type AgentAction, type PredictiveResponse, type UserIntent } from '@/lib/intelligentResponseEngine';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  intent?: string;
  confidence?: number;
  actions?: AgentAction[];
}

interface SuggestionChip {
  text: string;
  action: () => void;
  type: 'populate' | 'execute';
  icon?: React.ReactNode;
}

export default function AdvancedConcierge() {
  
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Core state
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Advanced features state
  const [suggestions, setSuggestions] = useState<SuggestionChip[]>([]);
  const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
  const [userPreferences, setUserPreferences] = useState(intelligentEngine.getUserPreferences());
  const [predictiveSuggestions, setPredictiveSuggestions] = useState<string[]>([]);
  const [activeActions, setActiveActions] = useState<AgentAction[]>([]);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  
  // Initialize conversation and load memory
  useEffect(() => {
    intelligentEngine.setCurrentRoute(location.pathname);
    loadConversationHistory();
    updatePredictiveSuggestions();
    initializeWelcomeMessage();
  }, [location.pathname]);

  // Speech recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const loadConversationHistory = useCallback(() => {
    const history = intelligentEngine.getRecentConversations(30);
    setConversationHistory(history);
    
    // Convert to display messages
    const displayMessages = history.map(entry => [
      {
        id: `user_${entry.id}`,
        content: entry.userMessage,
        isUser: true,
        timestamp: new Date(entry.timestamp),
        intent: entry.intent.primary,
        confidence: entry.intent.confidence
      },
      {
        id: `agent_${entry.id}`,
        content: entry.agentResponse,
        isUser: false,
        timestamp: new Date(entry.timestamp),
        actions: entry.actions
      }
    ]).flat();
    
    setMessages(displayMessages);
  }, []);

  const updatePredictiveSuggestions = useCallback(() => {
    const suggestions = intelligentEngine.getPredictiveSuggestions();
    setPredictiveSuggestions(suggestions);
    
    // Generate smart suggestion chips
    const chips: SuggestionChip[] = suggestions.map(suggestion => ({
      text: suggestion,
      action: () => setInput(suggestion),
      type: 'populate' as const,
      icon: getSuggestionIcon(suggestion)
    }));
    
    // Add contextual action chips
    chips.push(...getContextualActionChips());
    
    setSuggestions(chips);
  }, [location.pathname]);

  const getSuggestionIcon = (suggestion: string): React.ReactNode => {
    const lower = suggestion.toLowerCase();
    if (lower.includes('room') || lower.includes('book')) return <Bed className="w-3 h-3" />;
    if (lower.includes('dining') || lower.includes('restaurant')) return <Coffee className="w-3 h-3" />;
    if (lower.includes('spa') || lower.includes('massage')) return <Star className="w-3 h-3" />;
    if (lower.includes('meeting') || lower.includes('event')) return <Users className="w-3 h-3" />;
    return <Lightbulb className="w-3 h-3" />;
  };

  const getContextualActionChips = (): SuggestionChip[] => {
    const baseChips: SuggestionChip[] = [
      {
        text: 'Call Hotel',
        action: () => executeAction({ type: 'call_hotel', target: '+966112345678', executed: false, timestamp: new Date().toISOString() }),
        type: 'execute',
        icon: <Phone className="w-3 h-3" />
      },
      {
        text: 'Get Directions',
        action: () => executeAction({ type: 'navigate', target: '/contact', executed: false, timestamp: new Date().toISOString() }),
        type: 'execute',
        icon: <MapPin className="w-3 h-3" />
      }
    ];

    // Add route-specific chips
    switch (location.pathname) {
      case '/rooms':
        baseChips.unshift({
          text: 'Quick Booking',
          action: () => executeAction({ type: 'open_booking', target: 'room_booking', executed: false, timestamp: new Date().toISOString() }),
          type: 'execute',
          icon: <Calendar className="w-3 h-3" />
        });
        break;
      case '/dining':
        baseChips.unshift({
          text: 'Make Reservation',
          action: () => executeAction({ type: 'open_booking', target: 'dining_reservation', executed: false, timestamp: new Date().toISOString() }),
          type: 'execute',
          icon: <Coffee className="w-3 h-3" />
        });
        break;
      case '/spa':
        baseChips.unshift({
          text: 'Book Treatment',
          action: () => executeAction({ type: 'open_booking', target: 'spa_booking', executed: false, timestamp: new Date().toISOString() }),
          type: 'execute',
          icon: <Star className="w-3 h-3" />
        });
        break;
    }

    return baseChips;
  };

  const initializeWelcomeMessage = useCallback(() => {
    if (messages.length === 0) {
      const preferences = intelligentEngine.getUserPreferences();
      const timeGreeting = getTimeBasedGreeting();
      
      let welcomeMessage = '';
      if (preferences.name) {
        welcomeMessage = `${timeGreeting}, ${preferences.name}! Great to see you again. I remember your preferences and I'm here to provide personalized assistance.`;
      } else {
        welcomeMessage = `${timeGreeting}! I'm Huda, your intelligent AI concierge. I learn from our conversations and adapt to provide you with personalized, efficient service.`;
      }
      
      setMessages([{
        id: 'welcome',
        content: welcomeMessage,
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [messages.length]);

  const getTimeBasedGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const executeAction = useCallback(async (action: AgentAction) => {
    setActiveActions(prev => [...prev, { ...action, executed: true }]);
    
    switch (action.type) {
      case 'navigate':
        navigate(action.target);
        break;
      
      case 'open_booking':
        // Simulate opening booking widget
        const bookingUrls: Record<string, string> = {
          room_booking: 'https://braira.com/book-room',
          dining_reservation: 'https://braira.com/dining-reservation',
          spa_booking: 'https://braira.com/spa-booking'
        };
        
        if (bookingUrls[action.target]) {
          window.open(bookingUrls[action.target], '_blank');
        }
        break;
      
      case 'call_hotel':
        window.open(`tel:${action.target}`, '_self');
        break;
      
      case 'show_info':
        // This would show contextual information
        break;
    }
  }, [navigate]);

  const processMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    setIsLoading(true);
    
    // Add user message
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      content: userMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      // Analyze intent
      const intent = intelligentEngine.analyzeIntent(userMessage);
      
      // Handle memory commands
      if (intent.primary === 'memory_command') {
        const memoryResponse = intelligentEngine.handleMemoryCommand(userMessage);
        const agentMsg: Message = {
          id: `agent_${Date.now()}`,
          content: memoryResponse,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, agentMsg]);
        setIsLoading(false);
        return;
      }
      
      // Generate intelligent response
      const response: PredictiveResponse = await intelligentEngine.generateResponse(userMessage, intent);
      
      // Enhanced response with 2-sentence limit
      let finalResponse = response.response;
      const sentences = finalResponse.split(/[.!?]+/).filter(s => s.trim());
      if (sentences.length > 2) {
        finalResponse = sentences.slice(0, 2).join('. ') + '.';
      }
      
      // Create agent message
      const agentMsg: Message = {
        id: `agent_${Date.now()}`,
        content: finalResponse,
        isUser: false,
        timestamp: new Date(),
        intent: intent.primary,
        confidence: intent.confidence,
        actions: response.suggestedActions
      };
      
      setMessages(prev => [...prev, agentMsg]);
      
      // Store conversation
      intelligentEngine.storeConversation(
        userMessage,
        finalResponse,
        intent,
        response.suggestedActions
      );
      
      // Execute high-confidence actions automatically
      response.suggestedActions.forEach(action => {
        if (intent.confidence > 0.8 && action.type === 'navigate') {
          setTimeout(() => executeAction(action), 1000);
        }
      });
      
      // Update suggestions and preferences
      updatePredictiveSuggestions();
      setUserPreferences(intelligentEngine.getUserPreferences());
      
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        id: `error_${Date.now()}`,
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again.",
        isUser: false,
        timestamp: new Date()
      }]);
    }
    
    setIsLoading(false);
  }, [executeAction, updatePredictiveSuggestions]);

  const handleSuggestionClick = useCallback((suggestion: SuggestionChip) => {
    if (suggestion.type === 'populate') {
      setInput(suggestion.text);
      inputRef.current?.focus();
    } else {
      suggestion.action();
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);

  const resetConversation = useCallback(() => {
    intelligentEngine.handleMemoryCommand('reset memory');
    setMessages([]);
    setConversationHistory([]);
    setActiveActions([]);
    initializeWelcomeMessage();
    updatePredictiveSuggestions();
  }, [initializeWelcomeMessage, updatePredictiveSuggestions]);

  const exportConversation = useCallback(() => {
    intelligentEngine.handleMemoryCommand('export memory');
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isExpanded ? 'w-96 h-[650px]' : 'w-80 h-16'} shadow-2xl border-primary/20 backdrop-blur-sm`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Huda AI</h3>
            <p className="text-xs opacity-90">Smart Concierge</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {userPreferences.name && (
            <Badge variant="secondary" className="text-xs bg-white/20 text-white border-none">
              {userPreferences.name}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-1 h-6 w-6"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <CardContent className="p-0 h-[calc(100%-60px)] flex flex-col">
          {/* Stats Bar */}
          <div className="p-2 bg-muted/50 border-b flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-500" />
                {conversationHistory.length} memories
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-blue-500" />
                {Math.round(userPreferences.frequentRequests.length * 10)}% learned
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={exportConversation}
                className="h-6 w-6 p-0"
              >
                <Download className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetConversation}
                className="h-6 w-6 p-0"
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Suggestion Chips */}
          <div className="p-3 border-b">
            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant={suggestion.type === 'execute' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="h-7 text-xs flex items-center gap-1 px-2"
                >
                  {suggestion.icon}
                  {suggestion.text}
                  {suggestion.type === 'execute' && <ArrowRight className="w-3 h-3" />}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl p-4 ${
                    message.isUser 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    
                    {/* Intent and confidence for user messages */}
                    {message.isUser && message.intent && (
                      <div className="mt-2 flex items-center gap-2 text-xs opacity-70">
                        <Badge variant="secondary" className="text-xs bg-white/20">
                          {message.intent}
                        </Badge>
                        <span>{Math.round((message.confidence || 0) * 100)}% confident</span>
                      </div>
                    )}
                    
                    {/* Action buttons for agent messages */}
                    {!message.isUser && message.actions && message.actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="secondary"
                            size="sm"
                            onClick={() => executeAction(action)}
                            className="h-6 text-xs"
                          >
                            {action.type === 'navigate' && <MapPin className="w-3 h-3 mr-1" />}
                            {action.type === 'open_booking' && <Calendar className="w-3 h-3 mr-1" />}
                            {action.type === 'call_hotel' && <Phone className="w-3 h-3 mr-1" />}
                            {action.target}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs opacity-50 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-2xl p-4 max-w-[75%]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <Separator />

          {/* Input Area */}
          <div className="p-3 pt-2 bg-background">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && processMessage(input)}
                  placeholder="Ask Huda anything..."
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleListening}
                    className={`h-6 w-6 p-0 ${isListening ? 'text-red-500' : ''}`}
                  >
                    {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="h-6 w-6 p-0"
                  >
                    {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </Button>
                </div>
              </div>
              <Button
                onClick={() => processMessage(input)}
                disabled={!input.trim() || isLoading}
                size="sm"
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}