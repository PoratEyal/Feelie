import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות פרטיות – Feeli",
  description: "מדיניות הפרטיות של אפליקציית Feeli",
};

export default function PrivacyPage() {
  const updated = "24 בפברואר 2026";

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "48px 24px",
        fontFamily: "inherit",
        lineHeight: 1.8,
        color: "#1a1a1a",
        direction: "rtl",
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
        מדיניות פרטיות
      </h1>
      <p style={{ color: "#666", marginBottom: 40 }}>עדכון אחרון: {updated}</p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          1. מבוא
        </h2>
        <p>
          אפליקציית Feeli (&quot;האפליקציה&quot;) היא כלי תקשורת תומכת (AAC)
          בעברית המיועד לילדים עם אוטיזם. אנו מייחסים חשיבות עליונה לפרטיות
          המשתמשים, ובפרט לפרטיות הילדים.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          2. המידע שאנו אוספים
        </h2>
        <p>
          <strong>אנו לא אוספים מידע אישי מזהה.</strong> האפליקציה פועלת
          באופן מקומי על המכשיר. הנתונים היחידים שנשמרים הם:
        </p>
        <ul style={{ paddingRight: 20, marginTop: 8 }}>
          <li>
            <strong>העדפות משתמש</strong> — כגון הקטגוריה האחרונה שנצפתה
            ובחירת קול — נשמרות מקומית על המכשיר בלבד (UserDefaults / SwiftData).
          </li>
          <li>
            <strong>בקשות TTS</strong> — טקסטים קצרים נשלחים ל-API חיצוני של
            ElevenLabs לצורך הפקת קול בלבד, ואינם נשמרים אצלנו.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          3. שיתוף מידע עם צדדים שלישיים
        </h2>
        <p>
          אנו אינם מוכרים, סוחרים, או מעבירים מידע אישי לצדדים שלישיים.
          האפליקציה משתמשת ב-ElevenLabs API לצורך המרת טקסט לדיבור בלבד.
          ניתן לעיין במדיניות הפרטיות של ElevenLabs בכתובת{" "}
          <a
            href="https://elevenlabs.io/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#e85d8a" }}
          >
            elevenlabs.io/privacy
          </a>
          .
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          4. פרטיות ילדים
        </h2>
        <p>
          האפליקציה מיועדת לשימוש בפיקוח הורים או מטפלים. אנו לא אוספים
          במכוון מידע אישי מילדים מתחת לגיל 13, ואין באפליקציה פרסום,
          רכישות בתוך האפליקציה, או תכונות רשת חברתית.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          5. אבטחת מידע
        </h2>
        <p>
          כל הנתונים המקומיים מאוחסנים בצורה מאובטחת על מכשיר המשתמש. אנו
          עושים שימוש ב-HTTPS עבור כל תקשורת עם שרתים חיצוניים.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          6. שינויים במדיניות
        </h2>
        <p>
          אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו
          בדף זה עם תאריך עדכון חדש.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          7. יצירת קשר
        </h2>
        <p>
          לשאלות בנוגע למדיניות הפרטיות, ניתן לפנות אלינו בכתובת:{" "}
          <a
            href="mailto:eyal1.porat@gmail.com"
            style={{ color: "#e85d8a" }}
          >
            eyal1.porat@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}
