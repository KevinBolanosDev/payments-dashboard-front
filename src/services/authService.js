import api from "@/lib/api";

// ============================================================================
// SERVICIO DE AUTENTICACIÓN
// ============================================================================

/**
 * Iniciar sesión con email y contraseña
 */
export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

/**
 * Registrar un nuevo usuario
 */
export const register = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

/**
 * Cerrar sesión
 */
export const logout = async () => {
  try {
    const { data } = await api.post("/auth/logout");
    return data;
  } catch (error) {
    // Si falla el logout en el servidor, no es crítico
    console.warn("Error en logout del servidor:", error);
    return { success: true };
  }
};

/**
 * Verificar si el token actual es válido
 */
export const verifyToken = async () => {
  try {
    const { data } = await api.get("/auth/verify");
    return data.data; // Retorna los datos del usuario
  } catch (error) {
    console.error("Token inválido:", error);
    return null;
  }
};

/**
 * Obtener perfil del usuario actual
 */
export const getProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return data.data;
};

/**
 * Actualizar perfil del usuario
 */
export const updateProfile = async (profileData) => {
  const { data } = await api.put("/auth/profile", profileData);
  return data;
};

/**
 * Cambiar contraseña
 */
export const changePassword = async (passwordData) => {
  const { data } = await api.post("/auth/change-password", passwordData);
  return data;
};

/**
 * Solicitar restablecimiento de contraseña
 */
export const requestPasswordReset = async (email) => {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data;
};

/**
 * Restablecer contraseña con token
 */
export const resetPassword = async (resetData) => {
  const { data } = await api.post("/auth/reset-password", resetData);
  return data;
};

// Exportar como objeto para facilitar el uso
export const authService = {
  login,
  register,
  logout,
  verifyToken,
  getProfile,
  updateProfile,
  changePassword,
  requestPasswordReset,
  resetPassword,
};
