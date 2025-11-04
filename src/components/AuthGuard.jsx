"use client";

import { DashboardHeader } from "@/components/dashboard-home/DashboardHeader";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Rutas que no requieren autenticación
const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

// Componente de loading para autenticación
function AuthLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg mx-auto">
          <span className="text-primary-foreground font-bold text-2xl">CM</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-muted-foreground">
            Verificando autenticación...
          </span>
        </div>
      </div>
    </div>
  );
}

export function AuthGuard({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !isPublicRoute) {
        // Usuario no autenticado intentando acceder a ruta protegida
        router.push("/login");
      } else if (isAuthenticated && isPublicRoute) {
        // Usuario autenticado intentando acceder a ruta pública (como login)
        router.push("/");
      }
    }
  }, [isAuthenticated, isLoading, isPublicRoute, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return <AuthLoading />;
  }

  // Si es una ruta pública y el usuario no está autenticado, mostrar el contenido sin layout
  if (isPublicRoute && !isAuthenticated) {
    return children;
  }

  // Si es una ruta protegida y el usuario está autenticado, mostrar con layout completo
  if (!isPublicRoute && isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <Navigation />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    );
  }

  // En cualquier otro caso, mostrar loading (mientras se redirige)
  return <AuthLoading />;
}
