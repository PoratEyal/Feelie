import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תמיכה – Feeli",
  description: "מרכז התמיכה של אפליקציית Feeli – שאלות נפוצות ויצירת קשר",
};

export default function SupportPage() {
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
        תמיכה
      </h1>
      <p style={{ color: "#666", marginBottom: 40 }}>
        אפליקציית Feeli – כלי תקשורת תומכת (AAC) בעברית לילדים עם אוטיזם
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          יצירת קשר
        </h2>
        <p>
          לכל שאלה, בעיה טכנית, או בקשת תמיכה – ניתן לפנות אלינו ישירות
          בכתובת המייל:
        </p>
        <p style={{ marginTop: 12 }}>
          <a
            href="mailto:eyal1.porat@gmail.com"
            style={{
              color: "#e85d8a",
              fontWeight: 600,
              fontSize: 18,
              textDecoration: "none",
            }}
          >
            eyal1.porat@gmail.com
          </a>
        </p>
        <p style={{ color: "#666", marginTop: 8 }}>
          נשתדל להשיב תוך 1–2 ימי עסקים.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          שאלות נפוצות
        </h2>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>
            האפליקציה לא מדברת – מה לעשות?
          </h3>
          <p>
            יש לוודא שעוצמת הקול במכשיר אינה מושתקת ושמתג ה-Silent אינו
            פעיל. בנוסף, יש לוודא שיש חיבור לאינטרנט פעיל, שכן הפקת הקול
            דורשת גישה לשרת.
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>
            איך מוסיפים מילה מותאמת אישית?
          </h3>
          <p>
            יש לעבור לקטגוריה &quot;המילים שלי&quot; ולהקיש על כפתור
            &quot;הוסף מילה&quot;. הזינו את המילה או המשפט הרצוי, ו-Feeli
            תמצא אמוג&apos;י מתאים באופן אוטומטי.
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>
            איך משנים את הקול?
          </h3>
          <p>
            בסרגל הצד ניתן לבחור בין קול זכר לקול נקבה. הבחירה נשמרת
            אוטומטית לפעמים הבאות.
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>
            האם האפליקציה עובדת ללא אינטרנט?
          </h3>
          <p>
            הכרטיסיות והתפריטים זמינים ללא אינטרנט, אך הפקת הקול (Text-to-Speech)
            דורשת חיבור פעיל לרשת.
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>
            האם המידע שלי נשמר?
          </h3>
          <p>
            המילים המותאמות אישית נשמרות מקומית על המכשיר בלבד. אנו לא
            אוספים ולא מאחסנים מידע אישי בשרתים שלנו. לפרטים נוספים ראו
            את{" "}
            <a
              href="/privacy"
              style={{ color: "#e85d8a" }}
            >
              מדיניות הפרטיות
            </a>
            .
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          דיווח על בעיה
        </h2>
        <p>
          נתקלתם בבאג או בהתנהגות בלתי צפויה? שלחו לנו מייל עם תיאור הבעיה,
          גרסת האפליקציה (ניתן למצוא ב-App Store), ודגם המכשיר. נשמח לעזור!
        </p>
        <p style={{ marginTop: 12 }}>
          <a
            href="mailto:eyal1.porat@gmail.com?subject=דיווח%20על%20בעיה%20–%20Feeli"
            style={{
              display: "inline-block",
              marginTop: 4,
              padding: "12px 28px",
              borderRadius: 12,
              backgroundColor: "#e85d8a",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 16,
            }}
          >
            שלח דיווח
          </a>
        </p>
      </section>
    </main>
  );
}
