import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Bank, LoanApplication, LoanDisbursement, CreditAssessment } from '@/types/banking';
import type { PaginatedResponse } from '@/types/common';

/* ============================================
   Banking Domain API Hooks
   ============================================ */

// --- Banks ---
export function useBanks(partnersOnly?: boolean) {
  return useQuery({
    queryKey: ['banks', { partnersOnly }],
    queryFn: () => api.get<Bank[]>('/api/banks', { partners_only: partnersOnly }),
  });
}

export function useBank(bankId: string) {
  return useQuery({
    queryKey: ['banks', bankId],
    queryFn: () => api.get<Bank>(`/api/banks/${bankId}`),
    enabled: !!bankId,
  });
}

// --- Loan Applications ---
export function useLoanApplications(filters?: { status?: string; user_id?: string }) {
  return useQuery({
    queryKey: ['loan-applications', filters],
    queryFn: () => api.get<PaginatedResponse<LoanApplication>>('/api/banking/applications', filters),
  });
}

export function useLoanApplication(applicationId: string) {
  return useQuery({
    queryKey: ['loan-applications', applicationId],
    queryFn: () => api.get<LoanApplication>(`/api/banking/applications/${applicationId}`),
    enabled: !!applicationId,
  });
}

export function useCreateLoanApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<LoanApplication>) =>
      api.post<LoanApplication>('/api/banking/applications', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['loan-applications'] });
    },
  });
}

export function useUpdateLoanApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<LoanApplication> }) =>
      api.patch<LoanApplication>(`/api/banking/applications/${id}`, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['loan-applications', id] });
      qc.invalidateQueries({ queryKey: ['loan-applications'] });
    },
  });
}

// --- Loan Disbursements ---
export function useLoanDisbursements(applicationId: string) {
  return useQuery({
    queryKey: ['loan-disbursements', applicationId],
    queryFn: () => api.get<LoanDisbursement[]>(`/api/banking/applications/${applicationId}/disbursements`),
    enabled: !!applicationId,
  });
}

// --- Credit Assessment ---
export function useCreditAssessment(applicationId: string) {
  return useQuery({
    queryKey: ['credit-assessment', applicationId],
    queryFn: () => api.get<CreditAssessment>(`/api/banking/applications/${applicationId}/assessment`),
    enabled: !!applicationId,
  });
}

export function useRequestCreditAssessment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { application_id: string; monthly_income: number; existing_debt: number; monthly_expenses: number }) =>
      api.post<CreditAssessment>(`/api/banking/applications/${data.application_id}/assess`, data),
    onSuccess: (_, { application_id }) => {
      qc.invalidateQueries({ queryKey: ['credit-assessment', application_id] });
      qc.invalidateQueries({ queryKey: ['loan-applications', application_id] });
    },
  });
}
