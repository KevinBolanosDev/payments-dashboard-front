// TODO: Crear página de administración de usuarios
// Esta página permitirá a los admins gestionar usuarios pendientes de aprobación

// Funcionalidades necesarias:
// - Lista de usuarios pendientes con información básica (nombre, email, fecha de registro)
// - Botones para aprobar, rechazar o suspender usuarios
// - Filtros por estado (PENDING, APPROVED, REJECTED, SUSPENDED)
// - Paginación para manejar muchos usuarios
// - Modal para confirmar acciones (aprobar/rechazar)
// - Campo para agregar razón de rechazo

// Ejemplo de estructura:
/*
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { adminService } from "@/services/adminService";

export default function UsersAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('PENDING');

  useEffect(() => {
    loadUsers();
  }, [filter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers(filter);
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await adminService.approveUser(userId);
      loadUsers(); // Recargar lista
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleReject = async (userId, reason) => {
    try {
      await adminService.rejectUser(userId, reason);
      loadUsers(); // Recargar lista
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Administración de Usuarios</h1>

      // Filtros
      // Lista de usuarios
      // Botones de acción
    </div>
  );
}
*/
