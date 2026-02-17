import type { ButtonItem, Category } from "@/types";

export type { ButtonItem, Category };

export const categories: Category[] = [
  {
    id: "home",
    name: "ראשי",
    description: "כפתורים מהירים",
    icon: "🏡",
    color: "#ec4899",
    buttons: [
      { label: "כן", speech: "כֵּן", emoji: "✅" },
      { label: "לא", speech: "לֹא", emoji: "❌" },
      { label: "אולי", speech: "אוּלַי", emoji: "🤔" },
      { label: { m: "לא יודע", f: "לא יודעת" }, speech: { m: "לֹא יוֹדֵעַ", f: "לֹא יוֹדַעַת" }, emoji: "🙄" },
      { label: "עזרה", speech: "עֶזְרָה", emoji: "🆘" },
      { label: "הפסקה", speech: "הַפְסָקָה", emoji: "⏸️" },
      { label: "סיימתי", speech: "סִיַּמְתִּי", emoji: "🏁" },
    ],
  },
  {
    id: "emotions",
    name: "רגשות",
    description: "זיהוי והבעת רגש",
    icon: "😊",
    color: "#8b5cf6",
    buttons: [
      { label: { m: "שמח", f: "שמחה" }, speech: { m: "שָׂמֵחַ", f: "שְׂמֵחָה" }, emoji: "😊" },
      { label: { m: "עצוב", f: "עצובה" }, speech: { m: "עָצוּב", f: "עֲצוּבָה" }, emoji: "😢" },
      { label: { m: "כועס", f: "כועסת" }, speech: { m: "כּוֹעֵס", f: "כּוֹעֶסֶת" }, emoji: "😠" },
      { label: { m: "מפחד", f: "מפחדת" }, speech: { m: "מְפַחֵד", f: "מְפַחֶדֶת" }, emoji: "😨" },
      { label: { m: "עייף", f: "עייפה" }, speech: { m: "עָיֵף", f: "עֲיֵפָה" }, emoji: "😴" },
      { label: { m: "רגוע", f: "רגועה" }, speech: { m: "רָגוּעַ", f: "רְגוּעָה" }, emoji: "😌" },
      { label: { m: "מבולבל", f: "מבולבלת" }, speech: { m: "מְבֻלְבָּל", f: "מְבֻלְבֶּלֶת" }, emoji: "😕" },
      { label: { m: "נרגש", f: "נרגשת" }, speech: { m: "נִרְגָּשׁ", f: "נִרְגֶּשֶׁת" }, emoji: "🤩" },
      { label: { m: "מודאג", f: "מודאגת" }, speech: { m: "מוֹדָאָג", f: "מוֹדָאֶגֶת" }, emoji: "😟" },
      { label: { m: "מתבייש", f: "מתביישת" }, speech: { m: "מִתְבַּיֵּשׁ", f: "מִתְבַּיֶּשֶׁת" }, emoji: "😳" },
      { label: { m: "משועמם", f: "משועממת" }, speech: { m: "מְשֻׁעֲמָם", f: "מְשֻׁעֲמֶמֶת" }, emoji: "😑" },
    ],
  },
  {
    id: "needs",
    name: "אני צריך",
    description: "הבעת צורך בסיסי",
    icon: "🫶",
    color: "#f97316",
    buttons: [
      { label: "אוכל", speech: "אֹכֶל", emoji: "🍽️" },
      { label: "מים", speech: "מַיִם", emoji: "💧" },
      { label: "שירותים", speech: "שֵׁרוּתִים", emoji: "🚽" },
      { label: "חיבוק", speech: "חִבּוּק", emoji: "🤗" },
      { label: "שקט", speech: "שֶׁקֶט", emoji: "🤫" },
      { label: "מנוחה", speech: "מְנֻחָה", emoji: "🛋️" },
      { label: "תרופה", speech: "תְּרוּפָה", emoji: "💊" },
      { label: "לצאת החוצה", speech: "לָצֵאת הַחוּצָה", emoji: "🚪" },
      { label: "לשבת", speech: "לָשֶׁבֶת", emoji: "🪑" },
      { label: "לקום", speech: "לָקוּם", emoji: "🧍" },
    ],
  },
  {
    id: "body",
    name: "גוף / כאב",
    description: "הבעת כאב",
    icon: "🤕",
    color: "#ef4444",
    buttons: [
      { label: "כואב לי", speech: "כּוֹאֵב לִי", emoji: "🤕" },
      { label: "ראש", speech: "רֹאשׁ", emoji: "🤯" },
      { label: "בטן", speech: "בֶּטֶן", emoji: "🤢" },
      { label: "גרון", speech: "גָּרוֹן", emoji: "😷" },
      { label: "אוזן", speech: "אֹזֶן", emoji: "👂" },
      { label: "שיניים", speech: "שִׁנַּיִם", emoji: "🦷" },
      { label: "רגל", speech: "רֶגֶל", emoji: "🦵" },
      { label: "יד", speech: "יָד", emoji: "✋" },
    ],
  },
  {
    id: "regulation",
    name: "ויסות",
    description: "התמודדות עם עומס",
    icon: "🧘",
    color: "#3b82f6",
    buttons: [
      { label: "זה רועש", speech: "זֶה רוֹעֵשׁ", emoji: "🔊" },
      { label: "זה חזק מדי", speech: "זֶה חָזָק מִדַּי", emoji: "📢" },
      { label: "שקט בבקשה", speech: "שֶׁקֶט בְּבַקָּשָׁה", emoji: "🤫" },
      { label: "פחות", speech: "פָּחוֹת", emoji: "➖" },
      { label: { m: "תכבה אור", f: "תכבי אור" }, speech: { m: "תְּכַבֶּה אוֹר", f: "תְּכַבִּי אוֹר" }, emoji: "💡" },
      { label: { m: "אני רוצה לבד", f: "אני רוצה לבד" }, speech: { m: "אֲנִי רוֹצֶה לְבַד", f: "אֲנִי רוֹצָה לְבַד" }, emoji: "🧘" },
      { label: { m: "תעצור", f: "תעצרי" }, speech: { m: "תַּעֲצוֹר", f: "תַּעֲצְרִי" }, emoji: "🛑" },
      { label: "חם לי", speech: "חַם לִי", emoji: "🥵" },
      { label: "קר לי", speech: "קַר לִי", emoji: "🥶" },
    ],
  },
  {
    id: "social",
    name: "חברתי",
    description: "תקשורת יומיומית",
    icon: "👋",
    color: "#10b981",
    buttons: [
      { label: "שלום", speech: "שָׁלוֹם", emoji: "👋" },
      { label: "ביי", speech: "בַּי", emoji: "🫡" },
      { label: "תודה", speech: "תּוֹדָה", emoji: "🙏" },
      { label: "סליחה", speech: "סְלִיחָה", emoji: "😔" },
      { label: "בבקשה", speech: "בְּבַקָּשָׁה", emoji: "🙏" },
      { label: "אהבה", speech: "אַהֲבָה", emoji: "❤️" },
      { label: { m: "רוצה לשחק", f: "רוצה לשחק" }, speech: { m: "רוֹצֶה לְשַׂחֵק", f: "רוֹצָה לְשַׂחֵק" }, emoji: "🎮" },
      { label: "תורי", speech: "תּוֹרִי", emoji: "☝️" },
      { label: { m: "תחכה", f: "תחכי" }, speech: { m: "תְּחַכֶּה", f: "תְּחַכִּי" }, emoji: "🤚" },
    ],
  },
  {
    id: "activities",
    name: "פעילויות",
    description: "בחירה פשוטה",
    icon: "🎨",
    color: "#14b8a6",
    buttons: [
      { label: "לשחק", speech: "לְשַׂחֵק", emoji: "🎯" },
      { label: "לצייר", speech: "לְצַיֵּר", emoji: "🎨" },
      { label: "כדור", speech: "כַּדּוּר", emoji: "⚽" },
      { label: "מוזיקה", speech: "מוּזִיקָה", emoji: "🎵" },
      { label: "טלוויזיה", speech: "טֶלֶוִיזְיָה", emoji: "📺" },
      { label: "מחשב", speech: "מַחְשֵׁב", emoji: "💻" },
      { label: "טאבלט", speech: "טַבְּלֵט", emoji: "📱" },
      { label: "ספר", speech: "סֵפֶר", emoji: "📖" },
      { label: "פאזל", speech: "פָּאזֶל", emoji: "🧩" },
    ],
  },
  {
    id: "time",
    name: "זמן",
    description: "סדר יום בסיסי",
    icon: "⏰",
    color: "#eab308",
    buttons: [
      { label: "עכשיו", speech: "עַכְשָׁיו", emoji: "⏰" },
      { label: "אחר כך", speech: "אַחַר כָּךְ", emoji: "⏳" },
      { label: { m: "עוד אחד", f: "עוד אחת" }, speech: { m: "עוֹד אֶחָד", f: "עוֹד אַחַת" }, emoji: "☝️" },
      { label: "בית", speech: "בַּיִת", emoji: "🏠" },
      { label: "גן", speech: "גַּן", emoji: "🏫" },
      { label: "היום", speech: "הַיּוֹם", emoji: "📅" },
      { label: "מחר", speech: "מָחָר", emoji: "🌅" },
    ],
  },
  {
    id: "family",
    name: "משפחה",
    description: "אנשים קרובים",
    icon: "👨‍👩‍👧‍👦",
    color: "#f59e0b",
    buttons: [
      { label: "אמא", speech: "אִמָּא", emoji: "👩" },
      { label: "אבא", speech: "אַבָּא", emoji: "👨" },
      { label: "אחות", speech: "אָחוֹת", emoji: "👧" },
      { label: "אח", speech: "אָח", emoji: "👦" },
      { label: "סבא", speech: "סַבָּא", emoji: "👴" },
      { label: "סבתא", speech: "סָבְתָא", emoji: "👵" },
      { label: "חבר", speech: "חָבֵר", emoji: "🤝" },
      { label: "מורה", speech: "מוֹרָה", emoji: "👩‍🏫" },
    ],
  },
  {
    id: "food",
    name: "מזון ושתייה",
    description: "אוכל ומשקאות",
    icon: "🍎",
    color: "#22c55e",
    buttons: [
      { label: "לחם", speech: "לֶחֶם", emoji: "🍞" },
      { label: "חלב", speech: "חָלָב", emoji: "🥛" },
      { label: "מיץ", speech: "מִיץ", emoji: "🧃" },
      { label: "פרי", speech: "פְּרִי", emoji: "🍎" },
      { label: "ירק", speech: "יָרָק", emoji: "🥕" },
      { label: "ממתק", speech: "מַמְתָּק", emoji: "🍬" },
      { label: "מים", speech: "מַיִם", emoji: "💧" },
      { label: "תה", speech: "תֵּה", emoji: "🍵" },
    ],
  },
];

// Color palette for individual cards - cycles through these
export const cardColors = [
  { border: "#c084fc", bg: "#f3e8ff", label: "#a855f7" }, // purple
  { border: "#f87171", bg: "#fee2e2", label: "#ef4444" }, // red
  { border: "#60a5fa", bg: "#dbeafe", label: "#3b82f6" }, // blue
  { border: "#facc15", bg: "#fef9c3", label: "#eab308" }, // yellow
  { border: "#34d399", bg: "#d1fae5", label: "#10b981" }, // green
  { border: "#c084fc", bg: "#f5d0fe", label: "#a855f7" }, // violet
  { border: "#f472b6", bg: "#fce7f3", label: "#ec4899" }, // pink
  { border: "#fb923c", bg: "#fed7aa", label: "#f97316" }, // orange
];
