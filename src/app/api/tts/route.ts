import { NextRequest, NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import path from "path";
import { existsSync } from "fs";

let cachedClient: TextToSpeechClient | null = null;

function getClient(): TextToSpeechClient {
  if (cachedClient) return cachedClient;
  // GOOGLE_SERVICE_ACCOUNT_KEY = full JSON content (for Vercel). Use this first.
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (keyJson?.trim()) {
    try {
      const credentials = JSON.parse(keyJson);
      cachedClient = new TextToSpeechClient({ credentials });
      return cachedClient;
    } catch {
      console.error("Invalid GOOGLE_SERVICE_ACCOUNT_KEY JSON");
    }
  }
  // If GOOGLE_APPLICATION_CREDENTIALS looks like JSON, user pasted content into wrong var - use it
  const appCreds = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (appCreds?.trim().startsWith("{")) {
    try {
      const credentials = JSON.parse(appCreds);
      cachedClient = new TextToSpeechClient({ credentials });
      return cachedClient;
    } catch {
      console.error("GOOGLE_APPLICATION_CREDENTIALS contains invalid JSON (use GOOGLE_SERVICE_ACCOUNT_KEY instead)");
    }
  }
  // GOOGLE_APPLICATION_CREDENTIALS = path to file (e.g. ./keys/service-account.json)
  const credsPath = appCreds;
  if (credsPath?.trim() && !credsPath.trim().startsWith("{")) {
    const resolved = path.isAbsolute(credsPath)
      ? credsPath
      : path.join(process.cwd(), credsPath);
    if (existsSync(resolved)) {
      cachedClient = new TextToSpeechClient({ keyFilename: resolved });
      return cachedClient;
    }
  }
  cachedClient = new TextToSpeechClient();
  return cachedClient;
}

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text");
  const voiceName = request.nextUrl.searchParams.get("voice") || "he-IL-Wavenet-A";

  if (!text?.trim()) {
    return NextResponse.json({ error: "Missing text parameter" }, { status: 400 });
  }

  // On Vercel, GOOGLE_APPLICATION_CREDENTIALS file is not deployed - use GOOGLE_SERVICE_ACCOUNT_KEY
  if (process.env.VERCEL && !process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    console.error("TTS: GOOGLE_SERVICE_ACCOUNT_KEY must be set in Vercel environment variables");
    return NextResponse.json(
      { error: "TTS service unavailable" },
      { status: 503 }
    );
  }

  try {
    const client = getClient();
    const [response] = await client.synthesizeSpeech({
      input: { text: text.trim() },
      voice: {
        languageCode: "he-IL",
        name: voiceName,
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: 0.95,
      },
    });

    const audioContent = response.audioContent;
    if (!audioContent || audioContent.length < 100) {
      return NextResponse.json(
        { error: "TTS generated empty or invalid audio" },
        { status: 502 }
      );
    }

    let bytes: Uint8Array;
    if (typeof audioContent === "string") {
      bytes = new Uint8Array(Buffer.from(audioContent, "base64"));
    } else if (Buffer.isBuffer(audioContent)) {
      bytes = new Uint8Array(audioContent);
    } else {
      bytes = audioContent instanceof Uint8Array ? audioContent : new Uint8Array(audioContent);
    }

    return new NextResponse(bytes as unknown as BodyInit, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    const err = error as Error & { code?: number; details?: string };
    console.error("TTS error:", err?.message || err);
    if (err?.code === 7 || err?.message?.includes("Could not load the default credentials")) {
      console.error(
        "TTS: Set GOOGLE_SERVICE_ACCOUNT_KEY in Vercel env vars with the full service account JSON (keys/service-account.json contents)"
      );
    }
    return NextResponse.json(
      { error: "TTS service unavailable" },
      { status: 500 }
    );
  }
}
