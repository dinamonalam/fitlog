import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${inter.variable} font-[family-name:var(--font-inter)] min-h-screen flex flex-col`}
      >
        <PlanProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#161a20",
                color: "#fff",
                border: "1px solid #ffffff20",
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}