import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const PROMPT = `Return ONLY a single emoji that best represents this Hebrew word or phrase. No explanation, no quotes, no extra text. Just one emoji character.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured" },
      { status: 500 }
    );
  }

  let body: { word?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const word = typeof body?.word === "string" ? body.word.trim() : "";
  if (!word) {
    return NextResponse.json(
      { error: "Missing or empty 'word' in request body" },
      { status: 400 }
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${PROMPT}\n\nWord/phrase: ${word}`,
    });

    const text = response.text?.trim();
    if (!text) {
      return NextResponse.json(
        { error: "No emoji returned from AI" },
        { status: 502 }
      );
    }

    // Extract first emoji in case model returned extra chars
    const emojiMatch = text.match(/[\p{Emoji}\p{Emoji_Presentation}\p{Extended_Pictographic}]/u);
    const emoji = emojiMatch ? emojiMatch[0] : text[0] ?? "❓";

    return NextResponse.json({ emoji });
  } catch (error) {
    console.error("Gemini emoji API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Emoji lookup failed: ${message}` },
      { status: 500 }
    );
  }
}
