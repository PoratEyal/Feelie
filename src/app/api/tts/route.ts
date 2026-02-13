import { NextRequest, NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import path from "path";

let cachedClient: TextToSpeechClient | null = null;

function getClient() {
  if (cachedClient) return cachedClient;
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (keyJson) {
    try {
      const credentials = JSON.parse(keyJson);
      cachedClient = new TextToSpeechClient({ credentials });
      return cachedClient;
    } catch {
      console.error("Invalid GOOGLE_SERVICE_ACCOUNT_KEY JSON");
    }
  }
  const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (credsPath) {
    const resolved = path.isAbsolute(credsPath)
      ? credsPath
      : path.join(process.cwd(), credsPath);
    cachedClient = new TextToSpeechClient({ keyFilename: resolved });
    return cachedClient;
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
    console.error("TTS error:", error);
    return NextResponse.json(
      { error: "TTS service unavailable" },
      { status: 500 }
    );
  }
}
