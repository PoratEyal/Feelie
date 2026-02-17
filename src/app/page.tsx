"use client";

import { useState, useCallback, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import EmojiCard from "@/components/EmojiCard";
import AddWordModal from "@/components/AddWordModal";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useMyWords } from "@/hooks/useMyWords";
import { getGenderedText } from "@/lib/gender";
import { categories, cardColors } from "@/data/categories";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addWordModalOpen, setAddWordModalOpen] = useState(false);

  const { speak, preload, selectedVoice, setSelectedVoice, isFemale } = useTextToSpeech();
  const { myWords, addWord } = useMyWords();
  const currentCategory = categories.find((c) => c.id === activeCategory);
  const isMyWords = activeCategory === "my-words";
  const buttons = isMyWords ? myWords : (currentCategory?.buttons ?? []);

  const handleCardClick = useCallback(
    (speech: string) => {
      speak(speech);
    },
    [speak]
  );

  useEffect(() => {
    if (sidebarOpen && typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [sidebarOpen]);

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
        <div
          className="sticky top-0 bg-white/80 backdrop-blur-md z-30 px-4 py-3 border-b border-gray-100 lg:hidden"
          style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
        >
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
        <div
          className="flex-1 min-h-0 p-4 sm:p-6 lg:p-10 relative bg-[#f5f5f5] overflow-y-auto"
          style={{
            paddingLeft: "max(1rem, env(safe-area-inset-left))",
            paddingRight: "max(1rem, env(safe-area-inset-right))",
            paddingBottom: isMyWords && buttons.length > 0 ? "max(6rem, calc(6rem + env(safe-area-inset-bottom)))" : undefined,
          }}
        >
          {isMyWords && buttons.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <p className="text-xl text-gray-500 font-medium">
                עדיין אין לך מילים מותאמות
              </p>
              <p className="text-gray-400">
                {isFemale ? "הוסיפי מילה או משפט ונגלה לך אמוג'י מתאים" : "הוסף מילה או משפט ונגלה לך אמוג'י מתאים"}
              </p>
              <button
                onClick={() => setAddWordModalOpen(true)}
                className="px-8 py-4 rounded-2xl bg-pink-500 text-white font-bold text-lg hover:bg-pink-600 transition-colors cursor-pointer"
              >
                {isFemale ? "הוסיפי מילה ראשונה" : "הוסף מילה ראשונה"}
              </button>
            </div>
          ) : (
            <div
              className="grid w-full h-full gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              style={{ gridAutoRows: "minmax(0, 1fr)" }}
            >
              {buttons.map((button, index) => {
                const color = cardColors[index % cardColors.length];
                const label = getGenderedText(button.label, isFemale);
                const speech = getGenderedText(button.speech, isFemale);
                return (
                  <EmojiCard
                    key={isMyWords ? `${label}-${index}` : label}
                    emoji={button.emoji}
                    label={label}
                    borderColor={color.border}
                    bgColor={color.bg}
                    labelColor={color.label}
                    onClick={() => handleCardClick(speech)}
                    onMouseEnter={() => preload(speech)}
                    onTouchStart={() => preload(speech)}
                  />
                );
              })}
            </div>
          )}
          {isMyWords && buttons.length > 0 && (
            <button
              onClick={() => setAddWordModalOpen(true)}
              className="fixed left-1/2 -translate-x-1/2 lg:left-[calc(50%-144px)] px-6 py-4 rounded-2xl bg-pink-500 text-white text-lg font-bold shadow-lg hover:bg-pink-600 hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
              style={{ bottom: "max(2rem, env(safe-area-inset-bottom))" }}
              aria-label={isFemale ? "הוסיפי מילה" : "הוסף מילה"}
            >
              <span className="text-2xl">+</span>
              <span>{isFemale ? "הוסיפי מילה" : "הוסף מילה"}</span>
            </button>
          )}
        </div>
      </main>

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
