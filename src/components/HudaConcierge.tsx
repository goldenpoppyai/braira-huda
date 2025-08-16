import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Mic, MicOff, Send, X, Minimize2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function HudaConcierge() {
  const { t, language, dir } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('ai_welcome'),
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI response logic - in production this would connect to a real AI service
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('room') || lowerMessage.includes('availability') || lowerMessage.includes('book')) {
      return t('ai_availability');
    }
    if (lowerMessage.includes('dining') || lowerMessage.includes('restaurant') || lowerMessage.includes('table')) {
      return t('ai_dining');
    }
    if (lowerMessage.includes('service') || lowerMessage.includes('housekeeping') || lowerMessage.includes('clean')) {
      return t('ai_service');
    }
    if (lowerMessage.includes('human') || lowerMessage.includes('reception') || lowerMessage.includes('help')) {
      return t('ai_escalation');
    }
    if (lowerMessage.includes('confirm') || lowerMessage.includes('yes') || lowerMessage.includes('book it')) {
      return t('ai_booking_confirm');
    }
    
    return t('ai_fallback');
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(message),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      // Stop voice recognition
    } else {
      setIsListening(true);
      // Start voice recognition
      // In production, integrate with Web Speech API
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gold-gradient hover:bg-primary-glow gold-shadow transition-luxury"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] ${dir === 'rtl' ? 'right-auto left-6' : ''}`}>
      <Card className="elegant-shadow bg-card/95 backdrop-blur-sm border-accent/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">هـ</span>
              </div>
              <div>
                <CardTitle className="text-lg font-display">
                  {t('concierge_title').split(',')[0]} {/* Just "Meet Huda" part */}
                </CardTitle>
                <p className="text-xs text-muted-foreground">{t('concierge_subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-4 pt-0">
            {/* Messages */}
            <div className="h-80 overflow-y-auto mb-4 space-y-3 pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm transition-luxury ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <p className={language === 'ar' ? 'font-arabic' : ''}>{message.text}</p>
                    <span className="text-xs opacity-70 block mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground rounded-lg px-3 py-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chat_placeholder')}
                className="flex-1 border-accent/20 focus:border-accent"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={toggleVoiceInput}
                className={`border-accent/20 hover:bg-accent/10 ${isListening ? 'bg-accent/20' : ''}`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim()}
                className="bg-gold-gradient hover:bg-primary-glow text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Language Info */}
            <div className="mt-2 text-xs text-muted-foreground text-center">
              {t('concierge_subtitle')}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}