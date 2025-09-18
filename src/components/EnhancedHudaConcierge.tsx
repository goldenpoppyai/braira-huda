// src/components/EnhancedHudaConcierge.tsx
// (Only the changes: the file remains otherwise intact; below is the full updated file.)
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Send, X, RotateCcw, Download, BarChart3, User, Bot, Brain, Zap } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { VoiceInterface } from './VoiceInterface';
import { SmartInputField } from './SmartInputField';
import { ConversationAnalytics } from './ConversationAnalytics';
import { conversationFlow, type Message, type ConversationState } from '@/lib/conversationFlow';
import { aiLearningEngine } from '@/lib/aiLearning';

// ... (other typing & helper code remains unchanged)

export default function EnhancedHudaConcierge() {
  const { t, language, hotelName } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Allow other parts of the app to programmatically open the concierge
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-huda-concierge', handler);
    return () => window.removeEventListener('open-huda-concierge', handler);
  }, []);

  // ... (rest unchanged: handleSendMessage, analytics, export, formatting)

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          data-huda-open="true"
          aria-label="open-huda-concierge"
          className="h-16 w-16 rounded-full bg-primary hover:bg-primary-glow shadow-luxury text-white"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="absolute -top-2 -left-2 h-4 w-4 bg-green-500 rounded-full animate-pulse" />
      </div>
    );
  }

  // ... (rest of the expanded widget unchanged and continues)
  return (
    <div className="fixed bottom-6 right-6 z-50 w-96">
      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm">Huda — {hotelName}</CardTitle>
                <div className="text-xs text-muted-foreground">AI Concierge</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => { setIsOpen(false); }} size="sm" variant="ghost" aria-label="close-huda">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* messages, input area, analytics, actions — unchanged */}
        </CardContent>
      </Card>
    </div>
  );
}
