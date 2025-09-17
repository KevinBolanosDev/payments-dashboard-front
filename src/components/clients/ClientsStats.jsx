import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, UserCheck, Users, UserX } from "lucide-react";

// Mock data - in a real app, this would come from your database
const mockStats = {
  totalClients: 156,
  activeClients: 142,
  inactiveClients: 14,
  newThisMonth: 8,
};

export function ClientsStats() {
  const stats = [
    {
      id: "total-clients",
      title: "Total de Clientes",
      value: mockStats.totalClients.toString(),
      icon: Users,
      description: "Clientes registrados",
      color: "text-primary",
    },
    {
      id: "active-clients",
      title: "Clientes Activos",
      value: mockStats.activeClients.toString(),
      icon: UserCheck,
      description: "Con créditos vigentes",
      color: "text-secondary",
    },
    {
      id: "inactive-clients",
      title: "Clientes Inactivos",
      value: mockStats.inactiveClients.toString(),
      icon: UserX,
      description: "Sin créditos activos",
      color: "text-muted-foreground",
    },
    {
      id: "new-this-month",
      title: "Nuevos Este Mes",
      value: mockStats.newThisMonth.toString(),
      icon: TrendingUp,
      description: "Registrados en el mes",
      color: "text-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
