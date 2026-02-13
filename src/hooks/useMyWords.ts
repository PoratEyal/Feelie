"use client";

import { useCallback, useEffect, useState } from "react";
import type { ButtonItem } from "@/types";

const STORAGE_KEY = "feeli-my-words";

function loadFromStorage(): ButtonItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is ButtonItem =>
        x != null &&
        typeof x === "object" &&
        typeof (x as ButtonItem).label === "string" &&
        typeof (x as ButtonItem).speech === "string" &&
        typeof (x as ButtonItem).emoji === "string"
    );
  } catch {
    return [];
  }
}

function saveToStorage(items: ButtonItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function useMyWords() {
  const [myWords, setMyWords] = useState<ButtonItem[]>([]);

  useEffect(() => {
    setMyWords(loadFromStorage());
  }, []);

  const addWord = useCallback((item: ButtonItem) => {
    setMyWords((prev) => {
      const next = [...prev, item];
      saveToStorage(next);
      return next;
    });
  }, []);

  const removeWord = useCallback((label: string) => {
    setMyWords((prev) => {
      const next = prev.filter((w) => w.label !== label);
      saveToStorage(next);
      return next;
    });
  }, []);

  return { myWords, addWord, removeWord };
}
