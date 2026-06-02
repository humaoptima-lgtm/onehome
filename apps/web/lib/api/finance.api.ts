import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ENDPOINTS } from '@/lib/api-client';
import type { LedgerTransaction } from '@/types/ledger';
import type { ProjectWallet, Loan, EligibilityResult } from '@/types/project-finance';
import type { Payment, EscrowTransaction } from '@/types/payment';
import type { EligibilityData, PaymentData, DisbursementData } from '@/lib/validations/finance.schema';

// Query key factories
export const financeKeys = {
  all: ['finance'] as const,
  ledger: () => [...financeKeys.all, 'ledger'] as const,
  wallet: (projectId: string) => [...financeKeys.all, 'wallet', projectId] as const,
  loans: () => [...financeKeys.all, 'loans'] as const,
  loan: (id: string) => [...financeKeys.all, 'loan', id] as const,
  eligibility: () => [...financeKeys.all, 'eligibility'] as const,
};

export const paymentKeys = {
  all: ['payments'] as const,
  list: () => [...paymentKeys.all, 'list'] as const,
  detail: (id: string) => [...paymentKeys.all, 'detail', id] as const,
  escrow: (projectId: string) => [...paymentKeys.all, 'escrow', projectId] as const,
};

// Finance hooks
export function useLedger() {
  return useQuery({
    queryKey: financeKeys.ledger(),
    queryFn: () => api.get<LedgerTransaction[]>(ENDPOINTS.FINANCE.LEDGER),
  });
}

export function useProjectWallet(projectId: string) {
  return useQuery({
    queryKey: financeKeys.wallet(projectId),
    queryFn: () => api.get<ProjectWallet>(ENDPOINTS.FINANCE.WALLET(projectId)),
    enabled: !!projectId,
  });
}

export function useLoans() {
  return useQuery({
    queryKey: financeKeys.loans(),
    queryFn: () => api.get<Loan[]>(ENDPOINTS.FINANCE.LOANS),
  });
}

export function useCheckEligibility() {
  return useMutation({
    mutationFn: (data: EligibilityData) =>
      api.post<EligibilityResult>(ENDPOINTS.FINANCE.ELIGIBILITY, data),
  });
}

// Payment hooks
export function usePayments() {
  return useQuery({
    queryKey: paymentKeys.list(),
    queryFn: () => api.get<Payment[]>(ENDPOINTS.PAYMENT.CREATE),
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PaymentData) => api.post<Payment>(ENDPOINTS.PAYMENT.CREATE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.list() });
    },
  });
}

export function useEscrowStatus(projectId: string) {
  return useQuery({
    queryKey: paymentKeys.escrow(projectId),
    queryFn: () => api.get<EscrowTransaction[]>(ENDPOINTS.PAYMENT.ESCROW(projectId)),
    enabled: !!projectId,
  });
}

export function useDisbursement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DisbursementData) => api.post(ENDPOINTS.PAYMENT.DISBURSE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.list() });
      queryClient.invalidateQueries({ queryKey: financeKeys.ledger() });
    },
  });
}
