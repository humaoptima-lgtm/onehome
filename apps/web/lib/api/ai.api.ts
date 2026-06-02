import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { AIDesignRequest, AICostEstimation, AIRecommendation, AIUsageLog } from '@/types/ai';

/* ============================================
   AI Domain API Hooks
   Connects to separate FastAPI/Python service
   ============================================ */

// --- AI Design Studio ---
export function useAIDesignRequests(userId?: string) {
  return useQuery({
    queryKey: ['ai-design-requests', userId],
    queryFn: () => api.get<AIDesignRequest[]>('/api/ai/designs', { user_id: userId }),
  });
}

export function useAIDesignRequest(requestId: string) {
  return useQuery({
    queryKey: ['ai-design-requests', requestId],
    queryFn: () => api.get<AIDesignRequest>(`/api/ai/designs/${requestId}`),
    enabled: !!requestId,
    // Poll while processing
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'queued' || status === 'processing' ? 3000 : false;
    },
  });
}

export function useCreateAIDesign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      room_type: string;
      style: string;
      intensity: number;
      source_image_url: string;
      source_media_asset_id: string;
      reference_image_urls?: string[];
      additional_instructions?: string;
    }) => api.post<AIDesignRequest>('/api/ai/designs', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['ai-design-requests'] });
    },
  });
}

// --- AI Cost Estimation ---
export function useAICostEstimations(userId?: string) {
  return useQuery({
    queryKey: ['ai-cost-estimations', userId],
    queryFn: () => api.get<AICostEstimation[]>('/api/ai/cost-estimations', { user_id: userId }),
  });
}

export function useAICostEstimation(estimationId: string) {
  return useQuery({
    queryKey: ['ai-cost-estimations', estimationId],
    queryFn: () => api.get<AICostEstimation>(`/api/ai/cost-estimations/${estimationId}`),
    enabled: !!estimationId,
  });
}

export function useCreateAICostEstimation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      location: string;
      area_sqm: number;
      property_age: number;
      condition: string;
      design_style: string;
      scopes: { category: string; area_sqm: number; material_grade: string }[];
    }) => api.post<AICostEstimation>('/api/ai/cost-estimations', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['ai-cost-estimations'] });
    },
  });
}

// --- AI Recommendations ---
export function useAIRecommendation(type: 'vendor' | 'design' | 'material' | 'financing', context: Record<string, unknown>) {
  return useQuery({
    queryKey: ['ai-recommendations', type, context],
    queryFn: () => api.post<AIRecommendation>('/api/ai/recommendations', { recommendation_type: type, context }),
    enabled: Object.keys(context).length > 0,
  });
}

// --- AI Usage Logs (Admin) ---
export function useAIUsageLogs(filters?: { user_id?: string; service?: string; date_from?: string; date_to?: string }) {
  return useQuery({
    queryKey: ['ai-usage-logs', filters],
    queryFn: () => api.get<AIUsageLog[]>('/api/ai/usage-logs', filters),
  });
}
