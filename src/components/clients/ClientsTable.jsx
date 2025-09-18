"use client";

import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Loader2,
  MoreHorizontal,
  Phone,
  Trash2,
} from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClients } from "@/hooks/useClients";

export function ClientsTable() {
  // State para la paginación
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Hooks para obtener datos de los clientes
  const {
    data: clientsResponse,
    isLoading,
    error,
    isError,
    isFetching,
  } = useClients({
    page,
    limit,
  });

  const clients = clientsResponse?.data || [];
  const pagination = clientsResponse?.pagination || {};

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
      case "suspended":
        return <Badge variant="destructive">Suspendido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Funciones de paginación
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < pagination.totalPages) {
      setPage(page + 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Componente de loading con skeleton
  const LoadingSkeleton = () => (
    <>
      {Array.from({ length: limit }, (_, i) => (
        <TableRow key={i}>
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <div className="text-center">
              <Skeleton className="h-6 w-6 mx-auto" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-8" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  // Componente de loading simple para el centro
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <span className="ml-2 text-muted-foreground">Cargando clientes...</span>
    </div>
  );

  // Componente de error
  const ErrorMessage = () => (
    <div className="flex flex-col items-center justify-center py-8 text-destructive">
      <div className="flex items-center mb-4">
        <AlertCircle className="h-6 w-6 mr-2" />
        <div>
          <p className="font-medium">Error al cargar los clientes</p>
          <p className="text-sm text-muted-foreground">
            {error?.message || "Ha ocurrido un error inesperado"}
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.location.reload()}
        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
      >
        Reintentar
      </Button>
    </div>
  );

  // Componente de tabla vacía
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
      <div className="text-center mb-4">
        <p className="font-medium">No hay clientes registrados</p>
        <p className="text-sm">
          Los clientes aparecerán aquí una vez que los agregues
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => (window.location.href = "/clients/new")}
      >
        Agregar primer cliente
      </Button>
    </div>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Clientes Registrados</CardTitle>
          {!isLoading && !isError && (
            <p className="text-sm text-muted-foreground mt-1">
              {pagination.totalItems || 0} cliente
              {(pagination.totalItems || 0) !== 1 ? "s" : ""} en total
            </p>
          )}
        </div>
        {isFetching && !isLoading && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Actualizando...
          </div>
        )}
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
                <TableHead>Estado</TableHead>
                <TableHead>Observaciones</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <LoadingSkeleton />
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <ErrorMessage />
                  </TableCell>
                </TableRow>
              ) : clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <EmptyState />
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((client) => (
                  <TableRow key={client.id} className="hover:bg-accent/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {client.firstName
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">
                            {client.firstName} {client.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {client.address || "Sin dirección"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {client.phone || "Sin teléfono"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">
                        {client.identificationNumber}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <span className="text-lg font-semibold text-foreground">
                          {client.activeCreditsCount || 0}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {client.observations || "Sin observaciones"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
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
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Controles de Paginación */}
        {!isLoading && !isError && clients.length > 0 && (
          <div className="flex items-center justify-between px-2 py-4">
            <div className="text-sm text-muted-foreground">
              Mostrando {(page - 1) * limit + 1} a{" "}
              {Math.min(page * limit, pagination.totalItems || 0)} de{" "}
              {pagination.totalItems || 0} clientes
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={page <= 1 || isFetching}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              {/* Note: This is the pagination buttons */}
              <div className="flex items-center space-x-1">
                {/* Números de página */}
                {(() => {
                  const totalPages = pagination.totalPages || 1;
                  const maxButtons = Math.min(5, totalPages);
                  const pages = [];

                  // Calcular el rango de páginas a mostrar
                  let startPage = Math.max(
                    1,
                    page - Math.floor(maxButtons / 2)
                  );
                  let endPage = Math.min(
                    totalPages,
                    startPage + maxButtons - 1
                  );

                  // Ajustar si estamos cerca del final
                  if (endPage - startPage + 1 < maxButtons) {
                    startPage = Math.max(1, endPage - maxButtons + 1);
                  }

                  // Generar los botones
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <Button
                        key={i}
                        variant={page === i ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(i)}
                        disabled={isFetching}
                        className={`min-w-[40px] ${
                          page === i
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {i}
                      </Button>
                    );
                  }

                  return pages;
                })()}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={page >= (pagination.totalPages || 1) || isFetching}
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
