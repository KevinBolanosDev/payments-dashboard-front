// TODO: Crear servicio para funciones de administración
// Este archivo contendrá las llamadas API para gestión de usuarios por parte de admins

// Funciones necesarias:
// - getUsers(filter): Obtener usuarios con filtro por estado
// - getPendingUsers(): Obtener solo usuarios pendientes
// - approveUser(userId): Aprobar usuario
// - rejectUser(userId, reason): Rechazar usuario con razón
// - suspendUser(userId): Suspender usuario

// Ejemplo de estructura:
/*
import api from './api';

export const adminService = {
  // GET /admin/users?status=PENDING
  getUsers: async (status = 'PENDING') => {
    const { data } = await api.get(`/admin/users`, {
      params: { status }
    });
    return data;
  },

  // GET /admin/users/pending
  getPendingUsers: async () => {
    const { data } = await api.get('/admin/users/pending');
    return data;
  },

  // POST /admin/users/:id/approve
  approveUser: async (userId) => {
    const { data } = await api.post(`/admin/users/${userId}/approve`);
    return data;
  },

  // POST /admin/users/:id/reject
  rejectUser: async (userId, reason) => {
    const { data } = await api.post(`/admin/users/${userId}/reject`, {
      reason
    });
    return data;
  },

  // POST /admin/users/:id/suspend
  suspendUser: async (userId) => {
    const { data } = await api.post(`/admin/users/${userId}/suspend`);
    return data;
  },

  // GET /admin/users (todos los usuarios con paginación)
  getAllUsers: async (page = 1, limit = 10) => {
    const { data } = await api.get('/admin/users', {
      params: { page, limit }
    });
    return data;
  }
};

export default adminService;
*/
