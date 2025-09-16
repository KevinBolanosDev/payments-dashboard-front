import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock recent activity data
const recentActivity = [
  {
    id: 1,
    type: "payment",
    client: "María González",
    amount: 2500000,
    description: "Pago mensual recibido",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "completed",
  },
  {
    id: 2,
    type: "credit",
    client: "Carlos Rodríguez",
    amount: 15000000,
    description: "Nuevo crédito aprobado",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    status: "active",
  },
  {
    id: 3,
    type: "payment",
    client: "Ana Martínez",
    amount: 1800000,
    description: "Pago parcial recibido",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    status: "partial",
  },
  {
    id: 4,
    type: "overdue",
    client: "Luis Fernández",
    amount: 3200000,
    description: "Pago vencido - requiere seguimiento",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: "overdue",
  },
  {
    id: 5,
    type: "payment",
    client: "Carmen López",
    amount: 1944440,
    description: "Pago mensual recibido",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: "completed",
  },
];

export function RecentActivity() {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-secondary/20 text-secondary">
            Completado
          </Badge>
        );
      case "active":
        return (
          <Badge variant="default" className="bg-primary/20 text-primary">
            Activo
          </Badge>
        );
      case "partial":
        return <Badge variant="outline">Parcial</Badge>;
      case "overdue":
        return <Badge variant="destructive">Vencido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "payment":
        return "💰";
      case "credit":
        return "📋";
      case "overdue":
        return "⚠️";
      default:
        return "📄";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {activity.client
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">
                    {getActivityIcon(activity.type)}
                  </span>
                  <p className="font-medium text-foreground truncate">
                    {activity.client}
                  </p>
                  {getStatusBadge(activity.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {formatCurrency(activity.amount)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(activity.timestamp, {
                      addSuffix: true,
                      locale: es,
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
