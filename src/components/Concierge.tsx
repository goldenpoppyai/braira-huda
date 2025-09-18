import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BOOKING_URL } from "@/lib/config";
import { MessageCircle, Send, Bot, User, Loader2, Calendar, MapPin, Star, X } from "lucide-react";
import { conversationFlow } from "@/lib/conversationFlow";
import { useI18n } from "@/lib/i18n";

/**
 * Concierge - consolidated, client-only demo mode
 * - Uses conversationFlow.processMessage(...) for deterministic local responses
 * - Exposes global event 'open-huda-concierge' to open the widget
 * - Provides a minimized floating button when closed
 * - Uses browser speechSynthesis as a TTS fallback (no external API needed)
 */

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
};

export default function Concierge() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-0",
      role: "assistant",
      content:
        "Hello 👋 I'm your Braira Olaya AI Concierge. I can help with room bookings, dining, spa, meetings and more. How can I help you today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-huda-concierge", handler);
    return () => window.removeEventListener("open-huda-concierge", handler);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const speak = (text: string) => {
    try {
      if (typeof window === "undefined") return;
      const synth = (window as any).speechSynthesis;
      if (synth && typeof synth.speak === "function") {
        const ut = new SpeechSynthesisUtterance(text);
        ut.lang = "en-US";
        synth.cancel();
        synth.speak(ut);
      }
    } catch (e) {
      // speech not available; ignore
    }
  };

  const sendMessage = async (raw: string) => {
    if (!raw || raw.trim() === "") return;
    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: raw,
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Use the local conversationFlow engine (client-only)
      const aiText = conversationFlow.processMessage(raw);

      const assistantMessage: Message = {
        id: `a-${Date.now() + 1}`,
        role: "assistant",
        content: aiText,
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, assistantMessage]);
      // TTS fallback
      speak(aiText);
    } catch (err) {
      const fallback = "Sorry — I'm having trouble right now. Please try again or visit our booking page.";
      setMessages((prev) => [
        ...prev,
        { id: `err-${Date.now()}`, role: "assistant", content: fallback, timestamp: new Date().toISOString() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  // If closed, show minimized button
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          data-huda-open="true"
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full p-0 flex items-center justify-center bg-accent text-white shadow-lg"
          aria-label="Open concierge"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  // Main open UI
  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="elegant-shadow bg-card/95 backdrop-blur-sm border-accent/20">
        <CardHeader className="p-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-accent" />
              <div>
                <CardTitle className="text-sm font-semibold">Braira Al Olaya Concierge</CardTitle>
                <div className="text-xs text-muted-foreground">AI assistant — demo mode (client-only)</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => window.open(BOOKING_URL, "_blank", "noopener")}>
                Book
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} aria-label="Close concierge">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div ref={scrollRef} className="max-h-64 overflow-y-auto p-3 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-md ${m.role === "user" ? "bg-primary text-white" : "bg-white/10 text-white"
                    }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{m.content}</div>
                  <div className="text-xs text-white/60 mt-1">{new Date(m.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t">
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me about rooms, dining, or services..."
                aria-label="Concierge input"
              />
              <Button
                className="bg-accent"
                onClick={() => sendMessage(input)}
                aria-label="Send message"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
