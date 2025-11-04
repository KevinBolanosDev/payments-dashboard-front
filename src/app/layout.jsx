import { Geist, Geist_Mono } from "next/font/google";

import { AuthGuard } from "@/components/AuthGuard";
import { QueryProvider } from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/theme-provider";
// import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/contexts/AuthContext";
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
            {/* <ToastProvider> */}
            <AuthProvider>
              <AuthGuard>
                <AppLayout>{children}</AppLayout>
              </AuthGuard>
            </AuthProvider>
            {/* </ToastProvider> */}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

// Componente separado para el layout de la aplicación
function AppLayout({ children }) {
  return <>{children}</>;
}
