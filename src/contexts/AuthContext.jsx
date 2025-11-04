"use client";

import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto
const AuthContext = createContext({});

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// Provider del contexto de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  //   const { addToast } = useToast();

  // Verificar si hay un token válido al cargar la aplicación
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      // Verificar si el token es válido
      const userData = await authService.verifyToken();

      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // Token inválido, limpiar
        localStorage.removeItem("auth_token");
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      localStorage.removeItem("auth_token");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        const { user: userData, token } = response.data;

        // Guardar token en localStorage
        localStorage.setItem("auth_token", token);

        // Actualizar estado
        setUser(userData);
        setIsAuthenticated(true);

        // TODO: Instalar y configurar sistema de notificaciones toast
        // Mostrar notificación de éxito
        // addToast({
        //   title: "¡Bienvenido!",
        //   description: `Sesión iniciada como ${
        //     userData.firstName || userData.name || userData.email
        //   }`,
        //   variant: "success",
        // });

        // Redirigir al dashboard
        router.push("/");

        return { success: true };
      } else {
        return {
          success: false,
          message: response.message || "Credenciales inválidas",
        };
      }
    } catch (error) {
      console.error("Error en login:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error de conexión",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);

      if (response.success && response.data) {
        const { user: newUser, token } = response.data;

        // Guardar token en localStorage
        localStorage.setItem("auth_token", token);

        // Actualizar estado
        setUser(newUser);
        setIsAuthenticated(true);

        // TODO: Instalar y configurar sistema de notificaciones toast
        // Mostrar notificación de éxito
        // addToast({
        //   title: "¡Registro exitoso!",
        //   description: `Bienvenido ${
        //     newUser.firstName || newUser.name || newUser.email
        //   }`,
        //   variant: "success",
        // });

        // Redirigir al dashboard
        router.push("/");

        return { success: true };
      } else {
        return {
          success: false,
          message: response.message || "Error en el registro",
        };
      }
    } catch (error) {
      console.error("Error en registro:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error de conexión",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Llamar al endpoint de logout si existe
      await authService.logout();
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      // Limpiar estado local independientemente del resultado
      localStorage.removeItem("auth_token");
      setUser(null);
      setIsAuthenticated(false);

      // TODO: Instalar y configurar sistema de notificaciones toast
      // Mostrar notificación de logout
      // addToast({
      //   title: "Sesión cerrada",
      //   description: "Has cerrado sesión exitosamente",
      //   variant: "default",
      // });

      router.push("/login");
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
