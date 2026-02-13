"use client";

import { useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import EmojiCard from "@/components/EmojiCard";
import EmojiModal from "@/components/EmojiModal";
import AddWordModal from "@/components/AddWordModal";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useMyWords } from "@/hooks/useMyWords";
import { categories, cardColors } from "@/data/categories";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addWordModalOpen, setAddWordModalOpen] = useState(false);
  const [modal, setModal] = useState<{
    emoji: string;
    label: string;
    speech: string;
    color: string;
  } | null>(null);

  const { speak, preload, selectedVoice, setSelectedVoice } = useTextToSpeech();
  const { myWords, addWord, removeWord } = useMyWords();
  const currentCategory = categories.find((c) => c.id === activeCategory);
  const isMyWords = activeCategory === "my-words";
  const buttons = isMyWords ? myWords : (currentCategory?.buttons ?? []);

  const handleCardClick = useCallback(
    (emoji: string, label: string, speech: string, color: string) => {
      setModal({ emoji, label, speech, color });
      speak(speech);
    },
    [speak]
  );

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      {/* Sidebar - fixed position, never affects layout */}
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        selectedVoice={selectedVoice}
        onVoiceChange={setSelectedVoice}
      />

      {/* Main content - lg:mr-72 reserves space for fixed sidebar on desktop */}
      <main className="flex-1 min-h-screen flex flex-col lg:mr-72 w-full min-w-0">
        {/* Mobile top bar */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 px-4 py-3 border-b border-gray-100 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-3xl font-black text-pink-500">feeli</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Emoji Grid - fills entire screen */}
        <div className="flex-1 min-h-0 p-[40px] relative bg-[#f5f5f5]">
          {isMyWords && buttons.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <p className="text-xl text-gray-500 font-medium">
                עדיין אין לך מילים מותאמות
              </p>
              <p className="text-gray-400">הוסף מילה או משפט ונגלה לך אמוג'י מתאים</p>
              <button
                onClick={() => setAddWordModalOpen(true)}
                className="px-8 py-4 rounded-2xl bg-pink-500 text-white font-bold text-lg hover:bg-pink-600 transition-colors cursor-pointer"
              >
                הוסף מילה ראשונה
              </button>
            </div>
          ) : (
            <div
              className="grid w-full h-full gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              style={{ gridAutoRows: "minmax(0, 1fr)" }}
            >
              {buttons.map((button, index) => {
                const color = cardColors[index % cardColors.length];
                return (
                  <EmojiCard
                    key={isMyWords ? `${button.label}-${index}` : button.label}
                    emoji={button.emoji}
                    label={button.label}
                    borderColor={color.border}
                    bgColor={color.bg}
                    labelColor={color.label}
                    onClick={() =>
                      handleCardClick(button.emoji, button.label, button.speech, color.label)
                    }
                    onMouseEnter={() => preload(button.speech)}
                    onTouchStart={() => preload(button.speech)}
                  />
                );
              })}
            </div>
          )}
          {isMyWords && buttons.length > 0 && (
            <button
              onClick={() => setAddWordModalOpen(true)}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 lg:left-[calc(50%-144px)] px-6 py-4 rounded-2xl bg-pink-500 text-white text-lg font-bold shadow-lg hover:bg-pink-600 hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
              aria-label="הוסף מילה"
            >
              <span className="text-2xl">+</span>
              <span>הוספת מילה</span>
            </button>
          )}
        </div>
      </main>

      {/* Emoji display modal */}
      {modal && (
        <EmojiModal
          emoji={modal.emoji}
          label={modal.label}
          color={modal.color}
          onClose={() => setModal(null)}
          onReplay={() => speak(modal.speech)}
          onDelete={
            isMyWords
              ? () => {
                  removeWord(modal.label);
                  setModal(null);
                }
              : undefined
          }
        />
      )}

      {/* Add word modal */}
      {addWordModalOpen && (
        <AddWordModal
          onClose={() => setAddWordModalOpen(false)}
          onSave={(item) => addWord(item)}
        />
      )}
    </div>
  );
}
