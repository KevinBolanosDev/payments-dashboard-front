"use client";

import {
  BarChart3,
  CreditCard,
  FileText,
  Home,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
    description: "Resumen general",
  },
  {
    name: "Clientes",
    href: "/clients",
    icon: Users,
    description: "Gestión de clientes",
  },
  {
    name: "Créditos",
    href: "/credits",
    icon: CreditCard,
    description: "Administrar créditos",
  },
  {
    name: "Reportes",
    href: "/reports",
    icon: BarChart3,
    description: "Análisis y estadísticas",
  },
  {
    name: "Documentos",
    href: "/documents",
    icon: FileText,
    description: "Contratos y documentos",
  },
  {
    name: "Configuración",
    href: "/settings",
    icon: Settings,
    description: "Ajustes del sistema",
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-card border-b border-border sticky top-[73px] z-40 backdrop-blur supports-[backdrop-filter]:bg-card/95">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-card border-b border-border sticky top-[73px] z-40 backdrop-blur supports-[backdrop-filter]:bg-card/95">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>

              <span className="font-semibold text-foreground">
                {navigationItems.find((item) => isActive(item.href))?.name ||
                  "Dashboard"}
              </span>
            </div>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-border bg-card">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs opacity-70">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
