import { useAuth as useAuthContext } from "@/contexts/AuthContext";

// Re-exportar el hook del contexto para mantener consistencia
export const useAuth = useAuthContext;

// Hook adicional para verificar permisos (para futuras expansiones)
export const usePermissions = () => {
  const { user, isAuthenticated } = useAuthContext();

  const hasPermission = (permission) => {
    if (!isAuthenticated || !user) return false;

    // Por ahora, como solo hay un tipo de usuario, todos tienen todos los permisos
    // En el futuro se puede expandir con roles y permisos específicos
    return true;
  };

  const canAccess = (resource) => {
    if (!isAuthenticated || !user) return false;

    // Lógica de acceso a recursos específicos
    switch (resource) {
      case "clients":
      case "credits":
      case "reports":
      case "documents":
      case "settings":
        return true;
      default:
        return false;
    }
  };

  return {
    hasPermission,
    canAccess,
    isAuthenticated,
    user,
  };
};

// Hook para obtener información del usuario actual
export const useCurrentUser = () => {
  const { user, isAuthenticated, isLoading } = useAuthContext();

  const getUserInfo = () => {
    if (!user) return null;

    return {
      id: user.id,
      name:
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.name || user.email?.split("@")[0] || "Usuario",
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      initials: getInitials(user),
    };
  };

  const getInitials = (user) => {
    if (!user) return "U";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return {
    user: getUserInfo(),
    isAuthenticated,
    isLoading,
    rawUser: user, // Usuario sin procesar del contexto
  };
};
