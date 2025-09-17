import api from "@/lib/api";

// ============================================================================
// SERVICIOS PARA CLIENTES
// ============================================================================

/**
 * Obtener todos los clientes con paginación y filtros
 */
export const getClients = async (params = {}) => {
  const { data } = await api.get("/clients", { params });
  return data;
};

/**
 * Obtener un cliente por ID
 */
export const getClientById = async (id) => {
  const { data } = await api.get(`/clients/${id}`);
  return data;
};

/**
 * Crear un nuevo cliente
 */
export const createClient = async (clientData) => {
  const { data } = await api.post("/clients", clientData);
  return data;
};

/**
 * Actualizar un cliente existente
 */
export const updateClient = async ({ id, ...clientData }) => {
  const { data } = await api.put(`/clients/${id}`, clientData);
  return data;
};

/**
 * Eliminar un cliente
 */
export const deleteClient = async (id) => {
  const { data } = await api.delete(`/clients/${id}`);
  return data;
};

/**
 * Obtener estadísticas de clientes
 */
export const getClientsStats = async () => {
  const { data } = await api.get("/clients/stats");
  // La API devuelve { success: true, data: stats, message: '...' }
  // Necesitamos devolver solo los datos de estadísticas
  return data.data;
};

/**
 * Buscar clientes por término
 */
export const searchClients = async (searchTerm) => {
  const { data } = await api.get("/clients/search", {
    params: { q: searchTerm },
  });
  return data;
};

/**
 * Obtener créditos de un cliente específico
 */
export const getClientCredits = async (clientId, params = {}) => {
  const { data } = await api.get(`/clients/${clientId}/credits`, { params });
  return data;
};
