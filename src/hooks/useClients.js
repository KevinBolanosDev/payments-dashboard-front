import { queryOptions } from "@/lib/queryClient";
import {
  createClient,
  deleteClient,
  getClientById,
  getClientCredits,
  getClients,
  getClientsStats,
  searchClients,
  updateClient,
} from "@/services/clientsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ============================================================================
// HOOKS PARA QUERIES (LECTURA)
// ============================================================================

/**
 * Hook para obtener todos los clientes
 */
export function useClients(params = {}) {
  return useQuery({
    queryKey: ["clients", params],
    queryFn: () => getClients(params),
    ...queryOptions.static,
  });
}

/**
 * Hook para obtener un cliente por ID
 */
export function useClient(id) {
  return useQuery({
    queryKey: ["clients", id],
    queryFn: () => getClientById(id),
    enabled: !!id, // Solo ejecutar si hay ID
    ...queryOptions.static,
  });
}

/**
 * Hook para obtener estadísticas de clientes
 */
export function useClientsStats() {
  return useQuery({
    queryKey: ["clients", "stats"],
    queryFn: getClientsStats,
    ...queryOptions.heavy, // Datos pesados, cachear más tiempo
  });
}

/**
 * Hook para buscar clientes
 */
export function useSearchClients(searchTerm) {
  return useQuery({
    queryKey: ["clients", "search", searchTerm],
    queryFn: () => searchClients(searchTerm),
    enabled: !!searchTerm && searchTerm.length >= 2, // Solo buscar con 2+ caracteres
    ...queryOptions.realtime, // Búsquedas en tiempo real
  });
}

/**
 * Hook para obtener créditos de un cliente
 */
export function useClientCredits(clientId, params = {}) {
  return useQuery({
    queryKey: ["clients", clientId, "credits", params],
    queryFn: () => getClientCredits(clientId, params),
    enabled: !!clientId,
    ...queryOptions.static,
  });
}

// ============================================================================
// HOOKS PARA MUTATIONS (ESCRITURA)
// ============================================================================

/**
 * Hook para crear un nuevo cliente
 */
export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClient,
    onSuccess: (newClient) => {
      // Invalidar la lista de clientes para refrescarla
      queryClient.invalidateQueries({ queryKey: ["clients"] });

      // Actualizar estadísticas
      queryClient.invalidateQueries({ queryKey: ["clients", "stats"] });

      console.log("✅ Cliente creado exitosamente:", newClient);
    },
    onError: (error) => {
      console.error("❌ Error al crear cliente:", error);
    },
  });
}

/**
 * Hook para actualizar un cliente
 */
export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClient,
    onSuccess: (updatedClient, variables) => {
      // Actualizar el cliente específico en caché
      queryClient.setQueryData(["clients", variables.id], updatedClient);

      // Invalidar la lista de clientes
      queryClient.invalidateQueries({ queryKey: ["clients"] });

      console.log("✅ Cliente actualizado exitosamente:", updatedClient);
    },
    onError: (error) => {
      console.error("❌ Error al actualizar cliente:", error);
    },
  });
}

/**
 * Hook para eliminar un cliente
 */
export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClient,
    onSuccess: (_, deletedId) => {
      // Remover el cliente específico del caché
      queryClient.removeQueries({ queryKey: ["clients", deletedId] });

      // Invalidar la lista de clientes
      queryClient.invalidateQueries({ queryKey: ["clients"] });

      // Actualizar estadísticas
      queryClient.invalidateQueries({ queryKey: ["clients", "stats"] });

      console.log("✅ Cliente eliminado exitosamente");
    },
    onError: (error) => {
      console.error("❌ Error al eliminar cliente:", error);
    },
  });
}
