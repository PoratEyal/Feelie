"use client";

import { useEffect, useState } from "react";
import type { AddWordModalProps } from "@/types";
import "./AddWordModal.css";

export default function AddWordModal({ onClose, onSave }: AddWordModalProps) {
  const [word, setWord] = useState("");
  const [emoji, setEmoji] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleFindEmoji = async () => {
    const trimmed = word.trim();
    if (!trimmed) {
      setError("הזן מילה או משפט");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/emoji", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "שגיאה בחיפוש אמוג'י");
      }
      setEmoji(data.emoji ?? "❓");
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    const trimmed = word.trim();
    if (!trimmed || !emoji) return;
    onSave({
      label: trimmed,
      speech: trimmed,
      emoji,
    });
    onClose();
  };

  const handleClose = () => {
    setWord("");
    setEmoji(null);
    setError(null);
    setLoading(false);
    onClose();
  };

  return (
    <div
      className="add-word-modal-overlay"
      onClick={handleClose}
    >
      <div
        className="add-word-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="add-word-modal-close"
          onClick={handleClose}
          aria-label="סגור"
        >
          ✕
        </button>

        <h2 className="add-word-modal-title">הוסף מילה שלי</h2>

        {!emoji ? (
          <>
            <div>
              <label className="add-word-modal-label">
                מילה או משפט
              </label>
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="למשל: אוטו, רוצה לשחק..."
                className="add-word-modal-input"
                dir="rtl"
                autoFocus
                disabled={loading}
              />
            </div>
            {error && (
              <p className="add-word-modal-error">{error}</p>
            )}
            <button
              type="button"
              onClick={handleFindEmoji}
              disabled={loading}
              className="add-word-modal-btn-primary"
            >
              {loading && (
                <svg
                  className="add-word-modal-spinner"
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    className="opacity-75"
                  />
                </svg>
              )}
              {loading ? "מחפש אמוג'י..." : "מצא אמוג'י"}
            </button>
          </>
        ) : (
          <>
            <div className="add-word-modal-preview">
              <span className="add-word-modal-preview-emoji">{emoji}</span>
              <span className="add-word-modal-preview-word">{word.trim()}</span>
            </div>
            <div className="add-word-modal-actions">
              <button
                type="button"
                onClick={() => setEmoji(null)}
                className="add-word-modal-btn add-word-modal-btn-secondary"
              >
                שנה אמוג'י
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="add-word-modal-btn add-word-modal-btn-save"
              >
                שמור
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
