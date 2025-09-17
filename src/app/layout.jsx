import { Geist, Geist_Mono } from "next/font/google";

import { DashboardHeader } from "@/components/dashboard-home/DashboardHeader";
import { Navigation } from "@/components/Navigation";
import { QueryProvider } from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CM Management",
  description: "Sistema de gestión de cobros y créditos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background">
              <DashboardHeader />
              <Navigation />
              <main className="container mx-auto px-4 py-8">{children}</main>
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
