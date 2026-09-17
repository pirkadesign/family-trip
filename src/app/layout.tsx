import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "シルバーウィーク家族旅行",
  description: "登別・室蘭・伊達を巡る家族旅行のしおり",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
