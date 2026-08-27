import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Bricolage_Grotesque, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["600", "700", "800"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif-italic",
  style: ["italic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shlok Shukla | Software Engineer & Product Designer",
  description: "Portfolio of Shlok Shukla - B.Tech in CSE from VIT Bhopal. Building high-performance web systems and intuitive product experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${bricolageGrotesque.variable} ${playfairDisplay.variable} font-sans bg-background text-foreground antialiased selection:bg-brand-500 selection:text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

