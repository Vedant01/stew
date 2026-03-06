import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stew — Your Salary Deserves a Best Friend",
  description: "Stew is an AI-native personal finance companion for urban Indians. Connect your UPI, get brutal honesty + emotional intelligence, and actually understand where your money goes.",
  keywords: "personal finance, AI, UPI, Account Aggregator, India, fintech, budgeting, savings",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🍲</text></svg>" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
