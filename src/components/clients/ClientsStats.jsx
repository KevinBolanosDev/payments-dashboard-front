"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClientsStats } from "@/hooks/useClients";
import { TrendingUp, UserCheck, Users, UserX } from "lucide-react";

export function ClientsStats() {
  const { data: stats, isLoading, error, isError } = useClientsStats();

  console.log("stats data:", stats);

  if (isError) {
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded-md">
        Error al cargar las estadísticas:{" "}
        {error?.message || "Error desconocido"}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Cargando estadísticas...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-muted-foreground p-4 border border-gray-200 rounded-md">
        No hay estadísticas disponibles
      </div>
    );
  }

  const statsData = [
    {
      id: "total-clients",
      title: "Total de Clientes",
      value: (stats?.totalClients ?? 0).toString(),
      icon: Users,
      description: "Clientes registrados",
      color: "text-primary",
    },
    {
      id: "active-clients",
      title: "Clientes Activos",
      value: (stats?.activeClients ?? 0).toString(),
      icon: UserCheck,
      description: "Con créditos vigentes",
      color: "text-secondary",
    },
    {
      id: "inactive-clients",
      title: "Clientes Inactivos",
      value: (stats?.inactiveClients ?? 0).toString(),
      icon: UserX,
      description: "Sin créditos activos",
      color: "text-muted-foreground",
    },
    {
      id: "new-this-month",
      title: "Nuevos Este Mes",
      value: (stats?.newClientsThisMonth ?? 0).toString(),
      icon: TrendingUp,
      description: "Registrados en el mes",
      color: "text-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData?.map((stat) => {
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
