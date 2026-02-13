"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const VOICE_STORAGE_KEY = "feeli-tts-voice";
const VOICE_FEMALE = "he-IL-Wavenet-A";
const VOICE_MALE = "he-IL-Wavenet-B";
const CACHE_MAX = 30;

function cacheKey(text: string, voice: string) {
  return `${text.trim()}|${voice}`;
}

export function useTextToSpeech() {
  const audioUnlockedRef = useRef(false);
  const cacheRef = useRef<Map<string, string>>(new Map());
  const [selectedVoice, setSelectedVoiceState] = useState<string>(VOICE_FEMALE);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(VOICE_STORAGE_KEY);
      if (stored === VOICE_FEMALE || stored === VOICE_MALE) {
        setSelectedVoiceState(stored);
      }
    } catch {}
  }, []);

  const setSelectedVoice = useCallback((voice: string) => {
    setSelectedVoiceState(voice);
    try {
      localStorage.setItem(VOICE_STORAGE_KEY, voice);
    } catch {}
    cacheRef.current.clear();
  }, []);

  const unlockAudio = useCallback(() => {
    if (audioUnlockedRef.current) return;
    try {
      const ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      audioUnlockedRef.current = true;
    } catch {
      audioUnlockedRef.current = true;
    }
  }, []);

  const evictCache = useCallback(() => {
    const cache = cacheRef.current;
    if (cache.size >= CACHE_MAX) {
      const firstKey = cache.keys().next().value;
      if (firstKey) {
        URL.revokeObjectURL(cache.get(firstKey)!);
        cache.delete(firstKey);
      }
    }
  }, []);

  const fetchAndCache = useCallback(
    (text: string, retryCount = 0): Promise<string> => {
      const encoded = encodeURIComponent(text.trim());
      const voiceParam = encodeURIComponent(selectedVoice);
      const url = `/api/tts?text=${encoded}&voice=${voiceParam}`;

      return fetch(url)
        .then(async (res) => {
          const contentType = res.headers.get("content-type") || "";
          if (!res.ok || (!contentType.includes("audio") && !contentType.includes("octet-stream"))) {
            const err = await res.json().catch(() => ({ error: res.statusText }));
            throw new Error(err.error || "TTS failed");
          }
          const blob = await res.blob();
          if (blob.size < 100) {
            const errText = await blob.text();
            throw new Error(errText || "Invalid audio");
          }
          return URL.createObjectURL(blob);
        })
        .catch((err) => {
          if (retryCount < 2) {
            return new Promise<string>((resolve, reject) => {
              setTimeout(() => fetchAndCache(text, retryCount + 1).then(resolve).catch(reject), 500 + retryCount * 300);
            });
          }
          throw err;
        });
    },
    [selectedVoice]
  );

  const preload = useCallback(
    (text: string) => {
      if (!text?.trim()) return;
      const key = cacheKey(text, selectedVoice);
      if (cacheRef.current.has(key)) return;

      unlockAudio();
      evictCache();
      fetchAndCache(text).then((blobUrl) => {
        cacheRef.current.set(key, blobUrl);
      }).catch(() => {});
    },
    [selectedVoice, unlockAudio, evictCache, fetchAndCache]
  );

  const speak = useCallback(
    (text: string) => {
      if (!text?.trim()) return;

      unlockAudio();

      const key = cacheKey(text, selectedVoice);
      const cachedUrl = cacheRef.current.get(key);

      if (cachedUrl) {
        const audio = new Audio(cachedUrl);
        audio.volume = 1;
        audio.onerror = () => cacheRef.current.delete(key);
        return audio.play();
      }

      evictCache();
      fetchAndCache(text)
        .then((blobUrl) => {
          cacheRef.current.set(key, blobUrl);
          const audio = new Audio(blobUrl);
          audio.volume = 1;
          audio.onerror = () => {
            cacheRef.current.delete(key);
            URL.revokeObjectURL(blobUrl);
          };
          return audio.play();
        })
        .catch(() => {});
    },
    [selectedVoice, unlockAudio, evictCache, fetchAndCache]
  );

  const isSupported = true;

  return { speak, preload, isSupported, selectedVoice, setSelectedVoice };
}
