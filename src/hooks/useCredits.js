import { queryOptions } from "@/lib/queryClient";
import {
  cancelCredit,
  createCredit,
  getActiveCredits,
  getCreditById,
  getCredits,
  getCreditsByClient,
  getCreditsStats,
  getOverdueCredits,
  updateCredit,
  updateCreditStatus,
} from "@/services/creditsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ============================================================================
// HOOKS PARA QUERIES (LECTURA)
// ============================================================================

/**
 * Hook para obtener todos los créditos
 */
export function useCredits(params = {}) {
  return useQuery({
    queryKey: ["credits", params],
    queryFn: () => getCredits(params),
    ...queryOptions.static,
  });
}

/**
 * Hook para obtener un crédito por ID
 */
export function useCredit(id) {
  return useQuery({
    queryKey: ["credits", id],
    queryFn: () => getCreditById(id),
    enabled: !!id,
    ...queryOptions.static,
  });
}

/**
 * Hook para obtener créditos activos
 */
export function useActiveCredits(params = {}) {
  return useQuery({
    queryKey: ["credits", "active", params],
    queryFn: () => getActiveCredits(params),
    ...queryOptions.realtime, // Datos importantes, actualizar frecuentemente
  });
}

/**
 * Hook para obtener créditos vencidos
 */
export function useOverdueCredits(params = {}) {
  return useQuery({
    queryKey: ["credits", "overdue", params],
    queryFn: () => getOverdueCredits(params),
    ...queryOptions.realtime, // Datos críticos, actualizar frecuentemente
  });
}

/**
 * Hook para obtener estadísticas de créditos
 */
export function useCreditsStats() {
  return useQuery({
    queryKey: ["credits", "stats"],
    queryFn: getCreditsStats,
    ...queryOptions.heavy, // Datos pesados, cachear más tiempo
  });
}

/**
 * Hook para obtener créditos por cliente
 */
export function useCreditsByClient(clientId, params = {}) {
  return useQuery({
    queryKey: ["credits", "client", clientId, params],
    queryFn: () => getCreditsByClient(clientId, params),
    enabled: !!clientId,
    ...queryOptions.static,
  });
}

// ============================================================================
// HOOKS PARA MUTATIONS (ESCRITURA)
// ============================================================================

/**
 * Hook para crear un nuevo crédito
 */
export function useCreateCredit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCredit,
    onSuccess: (newCredit) => {
      // Invalidar todas las queries relacionadas con créditos
      queryClient.invalidateQueries({ queryKey: ["credits"] });

      // Invalidar créditos del cliente específico
      if (newCredit.clientId) {
        queryClient.invalidateQueries({
          queryKey: ["clients", newCredit.clientId, "credits"],
        });
      }

      console.log("✅ Crédito creado exitosamente:", newCredit);
    },
    onError: (error) => {
      console.error("❌ Error al crear crédito:", error);
    },
  });
}

/**
 * Hook para actualizar un crédito
 */
export function useUpdateCredit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCredit,
    onSuccess: (updatedCredit, variables) => {
      // Actualizar el crédito específico en caché
      queryClient.setQueryData(["credits", variables.id], updatedCredit);

      // Invalidar listas de créditos
      queryClient.invalidateQueries({ queryKey: ["credits"] });

      console.log("✅ Crédito actualizado exitosamente:", updatedCredit);
    },
    onError: (error) => {
      console.error("❌ Error al actualizar crédito:", error);
    },
  });
}

/**
 * Hook para cancelar un crédito
 */
export function useCancelCredit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelCredit,
    onSuccess: (cancelledCredit, creditId) => {
      // Actualizar el crédito específico en caché
      queryClient.setQueryData(["credits", creditId], cancelledCredit);

      // Invalidar listas de créditos
      queryClient.invalidateQueries({ queryKey: ["credits"] });

      // Actualizar estadísticas
      queryClient.invalidateQueries({ queryKey: ["credits", "stats"] });

      console.log("✅ Crédito cancelado exitosamente");
    },
    onError: (error) => {
      console.error("❌ Error al cancelar crédito:", error);
    },
  });
}

/**
 * Hook para actualizar el estado de un crédito
 */
export function useUpdateCreditStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCreditStatus,
    onSuccess: (updatedCredit, variables) => {
      // Actualizar el crédito específico en caché
      queryClient.setQueryData(["credits", variables.id], updatedCredit);

      // Invalidar listas de créditos
      queryClient.invalidateQueries({ queryKey: ["credits"] });

      // Actualizar estadísticas si cambió a un estado final
      if (["paid", "cancelled"].includes(variables.status)) {
        queryClient.invalidateQueries({ queryKey: ["credits", "stats"] });
      }

      console.log("✅ Estado de crédito actualizado exitosamente");
    },
    onError: (error) => {
      console.error("❌ Error al actualizar estado de crédito:", error);
    },
  });
}
