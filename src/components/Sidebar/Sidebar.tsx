"use client";

import { categories } from "@/data/categories";
import type { SidebarProps } from "@/types";
import "./Sidebar.css";

export default function Sidebar({
  activeCategory,
  onCategoryChange,
  isOpen,
  onClose,
  selectedVoice,
  onVoiceChange,
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`sidebar ${isOpen ? "open" : "closed"}`}
      >
        <nav className="sidebar-nav">
          <button
            type="button"
            className={`sidebar-item ${activeCategory !== "my-words" ? "" : "active"}`}
            onClick={() => {
              onCategoryChange("my-words");
              onClose();
            }}
            style={
              activeCategory === "my-words"
                ? {
                    backgroundColor: "#ec489915",
                    border: "1px solid #ec489915",
                  }
                : undefined
            }
          >
            <span className="sidebar-item-icon">⭐</span>
            <div className="sidebar-item-content">
              <div
                className="sidebar-item-title"
                style={activeCategory === "my-words" ? { color: "#ec4899" } : undefined}
              >
                 המילים שלי
              </div>
              <div className="sidebar-item-desc">
                מילים מותאמות אישית
              </div>
            </div>
          </button>
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                className={`sidebar-item ${isActive ? "active" : ""}`}
                onClick={() => {
                  onCategoryChange(category.id);
                  onClose();
                }}
                style={
                  isActive
                    ? {
                        backgroundColor: category.color + "15",
                        border: `1px solid ${category.color}15`,
                      }
                    : undefined
                }
              >
                <span className="sidebar-item-icon">{category.icon}</span>
                <div className="sidebar-item-content">
                  <div
                    className="sidebar-item-title"
                    style={isActive ? { color: category.color } : undefined}
                  >
                    {category.name}
                  </div>
                  <div className="sidebar-item-desc">
                    {category.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-voice">
          <div className="sidebar-voice-buttons">
            <button
              type="button"
              className={`sidebar-voice-btn ${
                selectedVoice === "he-IL-Wavenet-A" ? "selected" : "default"
              }`}
              onClick={() => onVoiceChange("he-IL-Wavenet-A")}
            >
              <span>👩</span>
              <span>בַּת</span>
            </button>
            <button
              type="button"
              className={`sidebar-voice-btn ${
                selectedVoice === "he-IL-Wavenet-B" ? "selected" : "default"
              }`}
              onClick={() => onVoiceChange("he-IL-Wavenet-B")}
            >
              <span>👨</span>
              <span>בֵּן</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
