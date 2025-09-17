"use client";

import { Edit, Eye, Mail, MoreHorizontal, Phone, Trash2 } from "lucide-react";
import { useState } from "react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock client data
const mockClients = [
  {
    id: 1,
    firstName: "María",
    lastName: "González",
    identification_number: "12345678",
    phone: "+57 300 123 4567",
    address: "Calle Principal 123, Bogotá",
    email: "maria.gonzalez@email.com",
    status: "active",
    observations: "Cliente con créditos activos",
    activeCredits: 2,
    totalDebt: 75000000,
    created_at: "2024-01-15",
  },
  {
    id: 2,
    firstName: "Carlos Rodríguez",
    lastName: "Rodríguez",
    identification_number: "23456789",
    phone: "+57 301 234 5678",
    address: "Avenida Central 456, Medellín",
    email: "carlos.rodriguez@email.com",
    status: "active",
    observations: "Cliente con créditos activos",
    activeCredits: 1,
    totalDebt: 25000000,
    created_at: "2024-02-20",
  },
  {
    id: 3,
    firstName: "Ana",
    lastName: "Martínez",
    identification_number: "34567890",
    phone: "+57 302 345 6789",
    address: "Plaza Mayor 789, Cali",
    email: "ana.martinez@email.com",
    status: "active",
    observations: "Cliente con créditos activos",
    totalDebt: 50000000,
    activeCredits: 1,
    created_at: "2023-12-10",
  },
  {
    id: 4,
    firstName: "Luis",
    lastName: "Fernández",
    identification_number: "45678901",
    phone: "+57 303 456 7890",
    address: "Calle Secundaria 321, Barranquilla",
    email: "luis.fernandez@email.com",
    status: "inactive",
    observations: "Cliente con créditos activos",
    activeCredits: 0,
    totalDebt: 0,
    created_at: "2024-06-01",
  },
  {
    id: 5,
    firstName: "Carmen",
    lastName: "López",
    identification_number: "56789012",
    phone: "+57 304 567 8901",
    address: "Avenida Norte 654, Cartagena",
    email: "carmen.lopez@email.com",
    status: "active",
    observations: "Cliente con créditos activos",
    activeCredits: 1,
    totalDebt: 30000000,
    created_at: "2024-02-15",
  },
];

export function ClientsTable() {
  const [clients] = useState(mockClients);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-secondary/20 text-secondary">
            Activo
          </Badge>
        );
      case "inactive":
        return <Badge variant="outline">Inactivo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Clientes Registrados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Identificación</TableHead>
                <TableHead>Créditos Activos</TableHead>
                <TableHead>Deuda Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Observaciones</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} className="hover:bg-accent/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {client.firstName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">
                          {client.firstName} {client.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {client.address}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground truncate max-w-[150px]">
                          {client.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {client.phone}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">
                      {client.identification_number}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span className="text-lg font-semibold text-foreground">
                        {client.activeCredits}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">
                      {formatCurrency(client.totalDebt)}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell>{client.observations}</TableCell>
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
