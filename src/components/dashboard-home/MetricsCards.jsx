import {
  AlertTriangle,
  CheckCircle,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - in a real app, this would come from your database
const mockMetrics = {
  totalClients: 156,
  activeCredits: 89,
  totalAmount: 2450000,
  monthlyCollection: 185000,
  overduePayments: 12,
  completedCredits: 67,
};

export function MetricsCards() {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const metrics = [
    {
      id: "total-clients",
      title: "Total Clientes",
      value: mockMetrics.totalClients.toString(),
      icon: Users,
      description: "Clientes registrados",
      color: "text-primary",
    },
    {
      id: "active-credits",
      title: "Créditos Activos",
      value: mockMetrics.activeCredits.toString(),
      icon: CreditCard,
      description: "En proceso de pago",
      color: "text-secondary",
    },
    {
      id: "total-amount",
      title: "Monto Total",
      value: formatCurrency(mockMetrics.totalAmount),
      icon: DollarSign,
      description: "Capital prestado",
      color: "text-primary",
    },
    {
      id: "monthly-collection",
      title: "Cobro Mensual",
      value: formatCurrency(mockMetrics.monthlyCollection),
      icon: TrendingUp,
      description: "Recaudación esperada",
      color: "text-secondary",
    },
    {
      id: "overdue-payments",
      title: "Pagos Vencidos",
      value: mockMetrics.overduePayments.toString(),
      icon: AlertTriangle,
      description: "Requieren atención",
      color: "text-destructive",
    },
    {
      id: "completed-credits",
      title: "Créditos Completados",
      value: mockMetrics.completedCredits.toString(),
      icon: CheckCircle,
      description: "Pagados totalmente",
      color: "text-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
