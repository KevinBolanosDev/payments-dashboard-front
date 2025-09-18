import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle,
  CreditCard,
  DollarSign,
} from "lucide-react";

// Mock data - in a real app, this would come from your database
const mockStats = {
  totalCredits: 89,
  activeCredits: 67,
  completedCredits: 18,
  overdueCredits: 4,
  totalAmount: 2450000000,
  averageAmount: 27528090,
};

export function CreditsStats() {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: "Total de Créditos",
      value: mockStats.totalCredits.toString(),
      icon: CreditCard,
      description: "Créditos registrados",
      color: "text-primary",
    },
    {
      title: "Créditos Activos",
      value: mockStats.activeCredits.toString(),
      icon: CheckCircle,
      description: "En proceso de pago",
      color: "text-secondary",
    },
    {
      title: "Créditos Vencidos",
      value: mockStats.overdueCredits.toString(),
      icon: AlertTriangle,
      description: "Requieren atención",
      color: "text-destructive",
    },
    {
      title: "Monto Promedio",
      value: formatCurrency(mockStats.averageAmount),
      icon: DollarSign,
      description: "Por crédito",
      color: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
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
