import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BOOKING_URL } from "@/lib/config";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Loader2,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";

// Types
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  sentiment?: "positive" | "neutral" | "negative";
}

export function Concierge() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello 👋 I'm your Braira Olaya AI Concierge. How may I assist you today? (e.g., room booking, dining, spa, directions)",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Simple sentiment analysis
  const analyzeSentiment = (text: string): "positive" | "neutral" | "negative" => {
    const lower = text.toLowerCase();
    if (/[!|😊|😁|great|thanks|perfect|love]/.test(lower)) return "positive";
    if (/[angry|bad|terrible|disappointed|😡|👎]/.test(lower)) return "negative";
    return "neutral";
  };

  // Predictive hinting (basic intent detection)
  const detectIntent = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("book") || lower.includes("reserve")) {
      return {
        suggestion: `Would you like me to take you to our booking page?`,
        action: () => window.open(BOOKING_URL, "_blank", "noopener"),
      };
    }
    if (lower.includes("spa")) {
      return { suggestion: "We have a wonderful spa — would you like details on treatments?" };
    }
    if (lower.includes("restaurant") || lower.includes("dining")) {
      return { suggestion: "Would you like to see our restaurant menu or reserve a table?" };
    }
    if (lower.includes("where") || lower.includes("location") || lower.includes("map")) {
      return {
        suggestion: "I can show you directions to Braira Olaya.",
        action: () =>
          window.open(
            "https://www.google.com/maps?q=Braira+Olaya+Hotel,+Olaya+St,+Riyadh",
            "_blank",
            "noopener"
          ),
      };
    }
    return null;
  };

  // Handle message send
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      sentiment: analyzeSentiment(input),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Detect predictive intent
      const intent = detectIntent(userMessage.content);

      // Call AI backend (uses /api/ai/route under /src/pages/api)
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: "user", content: userMessage.content },
          ],
        }),
      });

      let aiText = "";
      if (res.ok) {
        const data = await res.json();
        aiText = data.reply || "I'm here to assist you.";
      } else {
        aiText =
          "I couldn't reach the server right now. But you can still book directly at our booking page.";
      }

      // Append AI response
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiText },
        ...(intent
          ? [
              {
                role: "assistant",
                content: intent.suggestion,
              } as Message,
            ]
          : []),
      ]);

      // If intent has immediate action, call it
      if (intent?.action) {
        intent.action();
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while connecting. Please try again or use our booking page.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 w-96 shadow-2xl border border-border rounded-2xl overflow-hidden flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-primary text-white px-4 py-3">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-semibold">Braira Concierge</h3>
        </div>
        <Star className="h-4 w-4 text-yellow-300" />
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4 h-96" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-[80%] text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.content}
                {msg.role === "user" && msg.sentiment && (
                  <span
                    className={`ml-2 text-xs ${
                      msg.sentiment === "positive"
                        ? "text-green-400"
                        : msg.sentiment === "negative"
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                  >
                    ({msg.sentiment})
                  </span>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center text-muted-foreground text-sm">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Concierge is typing...
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex items-center p-3 border-t border-border">
        <Input
          className="flex-1"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button
          size="icon"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="ml-2"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
