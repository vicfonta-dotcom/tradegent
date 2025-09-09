import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "TradeGent",
  description: "A modern trading agent frontend powered by Next.js 14 and Tailwind CSS"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
