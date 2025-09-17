import api from "@/lib/api";

// ============================================================================
// SERVICIOS PARA CRÉDITOS
// ============================================================================

/**
 * Obtener todos los créditos con paginación y filtros
 */
export const getCredits = async (params = {}) => {
  const { data } = await api.get("/credits", { params });
  return data;
};

/**
 * Obtener un crédito por ID
 */
export const getCreditById = async (id) => {
  const { data } = await api.get(`/credits/${id}`);
  return data;
};

/**
 * Crear un nuevo crédito
 */
export const createCredit = async (creditData) => {
  const { data } = await api.post("/credits", creditData);
  return data;
};

/**
 * Actualizar un crédito existente
 */
export const updateCredit = async ({ id, ...creditData }) => {
  const { data } = await api.put(`/credits/${id}`, creditData);
  return data;
};

/**
 * Cancelar un crédito
 */
export const cancelCredit = async (id) => {
  const { data } = await api.patch(`/credits/${id}/cancel`);
  return data;
};

/**
 * Obtener créditos activos
 */
export const getActiveCredits = async (params = {}) => {
  const { data } = await api.get("/credits/active", { params });
  return data;
};

/**
 * Obtener créditos vencidos
 */
export const getOverdueCredits = async (params = {}) => {
  const { data } = await api.get("/credits/overdue", { params });
  return data;
};

/**
 * Obtener estadísticas de créditos
 */
export const getCreditsStats = async () => {
  const { data } = await api.get("/credits/statistics");
  return data;
};

/**
 * Actualizar el estado de un crédito
 */
export const updateCreditStatus = async ({ id, status }) => {
  const { data } = await api.patch(`/credits/${id}/status`, { status });
  return data;
};

/**
 * Obtener créditos por cliente
 */
export const getCreditsByClient = async (clientId, params = {}) => {
  const { data } = await api.get(`/credits/client/${clientId}`, { params });
  return data;
};
