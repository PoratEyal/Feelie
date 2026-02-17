// Data types - text that can be different for male/female voice
export type GenderedText = string | { m: string; f: string };

export interface ButtonItem {
  label: GenderedText;
  speech: GenderedText;
  emoji: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  buttons: ButtonItem[];
}

// Component props
export interface EmojiCardProps {
  emoji: string;
  label: string;
  borderColor: string;
  bgColor: string;
  labelColor: string;
  onClick: () => void;
  onMouseEnter?: () => void;
  onTouchStart?: () => void;
}

export interface EmojiModalProps {
  emoji: string;
  label: string;
  color: string;
  onClose: () => void;
  onReplay: () => void;
  onDelete?: () => void;
}

export interface AddWordModalProps {
  onClose: () => void;
  onSave: (item: ButtonItem) => void;
}

export interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  selectedVoice: string;
  onVoiceChange: (voice: string) => void;
}
