"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  DollarSign,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useState } from "react";

// Mock credit data
const mockCredits = [
  {
    id: 1,
    client_name: "María González",
    amount: 50000000,
    interest_rate: 12.5,
    term_months: 24,
    monthly_payment: 2500000,
    start_date: "2024-01-15",
    end_date: "2026-01-15",
    status: "active",
    description: "Crédito personal para mejoras del hogar",
    payments_made: 8,
    remaining_balance: 35000000,
  },
  {
    id: 2,
    client_name: "Carlos Rodríguez",
    amount: 25000000,
    interest_rate: 15.0,
    term_months: 12,
    monthly_payment: 2291670,
    start_date: "2024-03-01",
    end_date: "2025-03-01",
    status: "active",
    description: "Crédito para vehículo usado",
    payments_made: 5,
    remaining_balance: 15000000,
  },
  {
    id: 3,
    client_name: "Ana Martínez",
    amount: 75000000,
    interest_rate: 10.0,
    term_months: 36,
    monthly_payment: 2416670,
    start_date: "2023-12-01",
    end_date: "2026-12-01",
    status: "active",
    description: "Crédito hipotecario pequeño",
    payments_made: 12,
    remaining_balance: 55000000,
  },
  {
    id: 4,
    client_name: "Luis Fernández",
    amount: 15000000,
    interest_rate: 18.0,
    term_months: 6,
    monthly_payment: 2750000,
    start_date: "2024-06-01",
    end_date: "2024-12-01",
    status: "completed",
    description: "Crédito de emergencia",
    payments_made: 6,
    remaining_balance: 0,
  },
  {
    id: 5,
    client_name: "Carmen López",
    amount: 30000000,
    interest_rate: 14.0,
    term_months: 18,
    monthly_payment: 1944440,
    start_date: "2024-02-15",
    end_date: "2025-08-15",
    status: "overdue",
    description: "Crédito para negocio",
    payments_made: 6,
    remaining_balance: 20000000,
  },
];

export function CreditsTable() {
  const [credits] = useState(mockCredits);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-secondary/20 text-secondary">
            Activo
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="default" className="bg-primary/20 text-primary">
            Completado
          </Badge>
        );
      case "overdue":
        return <Badge variant="destructive">Vencido</Badge>;
      case "cancelled":
        return <Badge variant="outline">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentProgress = (credit) => {
    const progress = (credit.payments_made / credit.term_months) * 100;
    return Math.min(progress, 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Créditos Registrados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Cuota Mensual</TableHead>
                <TableHead>Progreso</TableHead>
                <TableHead>Saldo Restante</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {credits.map((credit) => (
                <TableRow key={credit.id} className="hover:bg-accent/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {credit.client_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">
                          {credit.client_name}
                        </div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {credit.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">
                        {formatCurrency(credit.amount)}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {credit.term_months} meses
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">
                        {formatCurrency(credit.monthly_payment)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {credit.interest_rate}% interés
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {credit.payments_made}/{credit.term_months}
                        </span>
                        <span className="text-muted-foreground">
                          {Math.round(getPaymentProgress(credit))}%
                        </span>
                      </div>
                      <Progress
                        value={getPaymentProgress(credit)}
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">
                      {formatCurrency(credit.remaining_balance)}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(credit.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DollarSign className="h-4 w-4 mr-2" />
                          Registrar pago
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
