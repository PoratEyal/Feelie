import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "./globals.css";

const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Feeli - תקשורת בלי מילים",
  description: "אפליקציית תקשורת חזותית לילדים עם אוטיזם",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${varelaRound.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
