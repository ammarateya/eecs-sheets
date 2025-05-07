import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "EECS Sheets | UMich EECS Course Cheat Sheets",
  description:
    "A platform for UMich EECS students to share and discover course cheat sheets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pressStart2P.variable}>
      <body className="flex min-h-screen flex-col bg-indigo-950">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
