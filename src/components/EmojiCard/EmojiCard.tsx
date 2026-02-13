"use client";

import type { EmojiCardProps } from "@/types";
import "./EmojiCard.css";

export default function EmojiCard({
  emoji,
  label,
  borderColor,
  bgColor,
  labelColor,
  onClick,
  onMouseEnter,
  onTouchStart,
}: EmojiCardProps) {
  return (
    <button
      className="emoji-card group"
      style={{
        border: `2px solid ${borderColor}40`,
        backgroundColor: bgColor,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart}
    >
      <div className="emoji-wrapper">
        <span className="emoji">{emoji}</span>
      </div>
      <div className="label" style={{ backgroundColor: labelColor }}>
        {label}
      </div>
    </button>
  );
}
