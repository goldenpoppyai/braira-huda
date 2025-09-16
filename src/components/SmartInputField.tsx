import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Lightbulb, Zap, MessageCircle, Clock } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { aiLearningEngine, type PredictiveInsight } from '@/lib/aiLearning';
import { type Message } from '@/lib/conversationFlow';

interface SmartInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  conversationHistory: Message[];
  disabled?: boolean;
  placeholder?: string;
}

export function SmartInputField({
  value,
  onChange,
  onSend,
  onKeyPress,
  conversationHistory,
  disabled = false,
  placeholder
}: SmartInputFieldProps) {
  const { t, language } = useI18n();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Generate autocomplete suggestions
  useEffect(() => {
    if (value.length > 1) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        const autocompleteSuggestions = aiLearningEngine.generateAutocompleteSuggestions(value, language);
        setSuggestions(autocompleteSuggestions);
        setShowSuggestions(autocompleteSuggestions.length > 0);
        setIsTyping(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsTyping(false);
    }
  }, [value, language]);

  // Generate predictive insights
  useEffect(() => {
    if (value.length > 2) {
      const predictiveInsights = aiLearningEngine.generatePredictiveInsights(
        value,
        conversationHistory,
        language
      );
      setInsights(predictiveInsights.slice(0, 3));
    } else {
      setInsights([]);
    }
  }, [value, conversationHistory, language]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      onKeyPress(e);
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Tab':
      case 'Enter':
        if (selectedSuggestionIndex >= 0) {
          e.preventDefault();
          applySuggestion(suggestions[selectedSuggestionIndex]);
        } else {
          onKeyPress(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
      default:
        onKeyPress(e);
    }
  };

  const applySuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  const getInsightIcon = (type: PredictiveInsight['type']) => {
    switch (type) {
      case 'intent_suggestion': return <Lightbulb className="h-3 w-3" />;
      case 'follow_up': return <MessageCircle className="h-3 w-3" />;
      case 'upsell': return <Zap className="h-3 w-3" />;
      case 'clarification': return <Clock className="h-3 w-3" />;
      default: return <Lightbulb className="h-3 w-3" />;
    }
  };

  const getInsightColor = (priority: PredictiveInsight['priority']) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'low': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="relative w-full">
      {/* Predictive Insights */}
      {insights.length > 0 && (
        <div className="mb-2 space-y-1">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${getInsightColor(insight.priority)}`}
              >
                {getInsightIcon(insight.type)}
                <span className="ml-1">{insight.content}</span>
              </Badge>
            </div>
          ))}
        </div>
      )}

      {/* Input Field with Suggestions */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder || (t as any)('type_message')}
              disabled={disabled}
              className="pr-4 transition-smooth focus:ring-2 focus:ring-accent/20"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            />
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-pulse flex space-x-1">
                  <div className="h-1 w-1 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-1 w-1 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-1 w-1 bg-accent rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
          </div>
          
          <Button 
            onClick={onSend}
            disabled={disabled || !value.trim()}
            size="sm"
            className="px-3 bg-gradient-to-r from-accent to-accent-glow hover:from-accent-glow hover:to-accent transition-luxury"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Autocomplete Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <Card 
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 z-50 p-2 bg-card/95 backdrop-blur-sm border shadow-elegant max-h-48 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-md cursor-pointer transition-smooth text-sm ${
                  index === selectedSuggestionIndex
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => applySuggestion(suggestion)}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {suggestion}
              </div>
            ))}
          </Card>
        )}
      </div>

      {/* Quick Action Suggestions */}
      <div className="mt-2 flex flex-wrap gap-2">
        {conversationHistory.length === 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange((t as any)('book_room_quick'))}
              className="h-7 text-xs"
            >
              {t('book_room')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange((t as any)('dining_inquiry_quick'))}
              className="h-7 text-xs"
            >
              {t('dining')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange((t as any)('spa_services_quick'))}
              className="h-7 text-xs"
            >
              {t('spa')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}