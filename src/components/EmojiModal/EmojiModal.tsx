"use client";

import { useEffect } from "react";
import type { EmojiModalProps } from "@/types";
import "./EmojiModal.css";

export default function EmojiModal({
  emoji,
  label,
  color,
  onClose,
  onReplay,
  onDelete,
}: EmojiModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="emoji-modal-overlay" onClick={onClose}>
      <div
        className="emoji-modal-content animate-pop"
        style={{ backgroundColor: color }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="emoji-modal-close"
          onClick={onClose}
          aria-label="סגור"
        >
          ✕
        </button>

        <span className="emoji-modal-emoji bounce">{emoji}</span>
        <span className="emoji-modal-label">{label}</span>

        <div className="emoji-modal-actions">
          <button
            type="button"
            className="emoji-modal-btn emoji-modal-btn-secondary"
            onClick={(e) => {
              e.stopPropagation();
              onReplay();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
            השמע שוב
          </button>
          {onDelete && (
            <button
              type="button"
              className="emoji-modal-btn emoji-modal-btn-secondary emoji-modal-btn-delete-confirm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
              מחיקת מילה
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
