import { QueryClient } from "@tanstack/react-query";

// Configuración del cliente de TanStack Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo que los datos se consideran "frescos" (no se revalidan)
      staleTime: 5 * 60 * 1000, // 5 minutos

      // Tiempo que los datos se mantienen en caché
      gcTime: 10 * 60 * 1000, // 10 minutos (antes era cacheTime)

      // Reintentos en caso de error
      retry: (failureCount, error) => {
        // No reintentar en errores 4xx (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Máximo 3 reintentos para otros errores
        return failureCount < 3;
      },

      // Revalidar cuando la ventana recupera el foco
      refetchOnWindowFocus: true,

      // Revalidar cuando se reconecta a internet
      refetchOnReconnect: true,

      // No revalidar al montar el componente si los datos están frescos
      refetchOnMount: true,
    },
    mutations: {
      // Reintentos para mutaciones
      retry: 1,
    },
  },
});

// Configuraciones específicas por tipo de query
export const queryOptions = {
  // Para datos que cambian frecuentemente
  realtime: {
    staleTime: 30 * 1000, // 30 segundos
    refetchInterval: 60 * 1000, // Revalidar cada minuto
  },

  // Para datos que cambian poco
  static: {
    staleTime: 30 * 60 * 1000, // 30 minutos
    gcTime: 60 * 60 * 1000, // 1 hora
  },

  // Para estadísticas que se calculan pesadamente
  heavy: {
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  },
};
