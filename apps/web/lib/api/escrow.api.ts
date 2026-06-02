import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { EscrowAccount, EscrowTransaction, EscrowDispute, EscrowRelease, Refund } from '@/types/escrow';

/* ============================================
   Escrow Domain API Hooks
   ============================================ */

// --- Escrow Accounts ---
export function useEscrowAccount(projectId: string) {
  return useQuery({
    queryKey: ['escrow-account', projectId],
    queryFn: () => api.get<EscrowAccount>(`/api/escrow/projects/${projectId}/account`),
    enabled: !!projectId,
  });
}

export function useEscrowAccounts(filters?: { status?: string }) {
  return useQuery({
    queryKey: ['escrow-accounts', filters],
    queryFn: () => api.get<EscrowAccount[]>('/api/escrow/accounts', filters),
  });
}

// --- Escrow Transactions ---
export function useEscrowTransactions(accountId: string) {
  return useQuery({
    queryKey: ['escrow-transactions', accountId],
    queryFn: () => api.get<EscrowTransaction[]>(`/api/escrow/accounts/${accountId}/transactions`),
    enabled: !!accountId,
  });
}

// --- Escrow Disputes ---
export function useEscrowDisputes(filters?: { project_id?: string; status?: string }) {
  return useQuery({
    queryKey: ['escrow-disputes', filters],
    queryFn: () => api.get<EscrowDispute[]>('/api/escrow/disputes', filters),
  });
}

export function useEscrowDispute(disputeId: string) {
  return useQuery({
    queryKey: ['escrow-disputes', disputeId],
    queryFn: () => api.get<EscrowDispute>(`/api/escrow/disputes/${disputeId}`),
    enabled: !!disputeId,
  });
}

export function useOpenDispute() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<EscrowDispute>) =>
      api.post<EscrowDispute>('/api/escrow/disputes', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['escrow-disputes'] });
      qc.invalidateQueries({ queryKey: ['escrow-account'] });
    },
  });
}

export function useResolveDispute() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { resolution: string; resolution_notes: string } }) =>
      api.patch<EscrowDispute>(`/api/escrow/disputes/${id}/resolve`, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['escrow-disputes', id] });
      qc.invalidateQueries({ queryKey: ['escrow-disputes'] });
      qc.invalidateQueries({ queryKey: ['escrow-account'] });
    },
  });
}

// --- Escrow Releases ---
export function useEscrowReleases(accountId: string) {
  return useQuery({
    queryKey: ['escrow-releases', accountId],
    queryFn: () => api.get<EscrowRelease[]>(`/api/escrow/accounts/${accountId}/releases`),
    enabled: !!accountId,
  });
}

export function useRequestRelease() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { escrow_account_id: string; milestone_id: string }) =>
      api.post<EscrowRelease>('/api/escrow/releases', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['escrow-releases'] });
      qc.invalidateQueries({ queryKey: ['escrow-account'] });
    },
  });
}

export function useApproveRelease() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (releaseId: string) =>
      api.patch<EscrowRelease>(`/api/escrow/releases/${releaseId}/approve`, {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['escrow-releases'] });
      qc.invalidateQueries({ queryKey: ['escrow-account'] });
      qc.invalidateQueries({ queryKey: ['escrow-transactions'] });
    },
  });
}

// --- Refunds ---
export function useRefunds(accountId: string) {
  return useQuery({
    queryKey: ['escrow-refunds', accountId],
    queryFn: () => api.get<Refund[]>(`/api/escrow/accounts/${accountId}/refunds`),
    enabled: !!accountId,
  });
}

export function useRequestRefund() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Refund>) =>
      api.post<Refund>('/api/escrow/refunds', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['escrow-refunds'] });
      qc.invalidateQueries({ queryKey: ['escrow-account'] });
    },
  });
}
