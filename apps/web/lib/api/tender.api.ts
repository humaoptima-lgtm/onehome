import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ENDPOINTS } from '@/lib/api-client';
import type { Tender } from '@/types/tender';
import type { Bid } from '@/types/bid';
import type { CreateTenderFormData } from '@/lib/validations/tender.schema';

// Query key factory
export const tenderKeys = {
  all: ['tenders'] as const,
  lists: () => [...tenderKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...tenderKeys.lists(), filters] as const,
  details: () => [...tenderKeys.all, 'detail'] as const,
  detail: (id: string) => [...tenderKeys.details(), id] as const,
  bids: (tenderId: string) => [...tenderKeys.all, 'bids', tenderId] as const,
  compare: (tenderId: string) => [...tenderKeys.all, 'compare', tenderId] as const,
};

/**
 * Fetch all tenders (for dashboard)
 */
export function useTenders(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: tenderKeys.list(filters || {}),
    queryFn: () => api.get<Tender[]>(ENDPOINTS.TENDER.LIST, filters as Record<string, string>),
    // Will use mock data in dev until NestJS is ready
    placeholderData: [],
  });
}

/**
 * Fetch single tender detail
 */
export function useTender(id: string) {
  return useQuery({
    queryKey: tenderKeys.detail(id),
    queryFn: () => api.get<Tender>(ENDPOINTS.TENDER.DETAIL(id)),
    enabled: !!id,
  });
}

/**
 * Fetch bids for a tender
 */
export function useBids(tenderId: string) {
  return useQuery({
    queryKey: tenderKeys.bids(tenderId),
    queryFn: () => api.get<Bid[]>(ENDPOINTS.TENDER.BIDS(tenderId)),
    enabled: !!tenderId,
    placeholderData: [],
  });
}

/**
 * Create a new tender
 */
export function useCreateTender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTenderFormData) =>
      api.post<Tender>(ENDPOINTS.TENDER.CREATE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tenderKeys.lists() });
    },
  });
}

/**
 * Award a tender to a vendor
 * Triggers: project wallet creation, escrow setup, notification
 */
export function useAwardTender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tenderId, vendorId }: { tenderId: string; vendorId: string }) =>
      api.post(ENDPOINTS.TENDER.AWARD(tenderId), { vendor_id: vendorId }),
    onSuccess: (_, { tenderId }) => {
      queryClient.invalidateQueries({ queryKey: tenderKeys.detail(tenderId) });
      queryClient.invalidateQueries({ queryKey: tenderKeys.bids(tenderId) });
    },
  });
}
