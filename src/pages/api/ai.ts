import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request: messages required" });
    }

    // Add system prompt (brand voice)
    const systemMessage = {
      role: "system",
      content: `You are Braira Olaya Hotel's AI Concierge. 
- Always be polite, warm, and professional.
- Provide useful, conversational, human-like responses.
- You can help with room booking, amenities, dining, spa, directions, and general guest questions.
- Keep replies concise and easy to read.
- If asked something unrelated to the hotel, politely redirect the guest back to hotel services.`,
    };

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply = completion.choices[0]?.message?.content || "I'm here to assist you.";

    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error("AI Concierge API error:", error);
    return res.status(500).json({
      error: "Failed to connect to AI service. Please try again later.",
    });
  }
}
