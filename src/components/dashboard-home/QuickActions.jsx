import { BarChart3, CreditCard, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickActions() {
  const actions = [
    {
      id: "new-client",
      title: "Nuevo Cliente",
      description: "Registrar cliente",
      icon: Users,
      href: "/clients/new",
    },
    {
      id: "new-credit",
      title: "Nuevo Crédito",
      description: "Crear crédito",
      icon: CreditCard,
      href: "/credits/new",
    },
    {
      id: "new-payment",
      title: "Registrar Pago",
      description: "Anotar pago",
      icon: Plus,
      href: "/payments/new",
    },
    {
      id: "view-reports",
      title: "Ver Reportes",
      description: "Análisis detallado",
      icon: BarChart3,
      href: "/reports",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.id}
              variant="ghost"
              className="w-full justify-start h-auto p-4 hover:bg-accent"
              asChild
            >
              <a href={action.href}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-foreground">
                      {action.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </div>
              </a>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
