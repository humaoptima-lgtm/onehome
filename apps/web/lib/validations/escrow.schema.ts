import { z } from 'zod';

/* ============================================
   Escrow Validation Schemas
   ============================================ */

export const EscrowDisputeSchema = z.object({
  escrow_account_id: z.string().min(1, 'Escrow account diperlukan'),
  project_id: z.string().min(1, 'Project ID diperlukan'),
  milestone_id: z.string().optional(),
  reason: z.string().min(1, 'Pilih alasan dispute'),
  description: z.string().min(20, 'Deskripsi minimal 20 karakter').max(2000),
  disputed_amount: z.number().min(1, 'Masukkan jumlah yang didisputasi'),
  evidence_urls: z.array(z.string()).optional(),
});

export const EscrowReleaseSchema = z.object({
  escrow_account_id: z.string().min(1),
  milestone_id: z.string().min(1, 'Pilih milestone'),
  notes: z.string().optional(),
});

export const EscrowReleaseApprovalSchema = z.object({
  release_id: z.string().min(1),
  approval_status: z.enum(['approved', 'rejected'], {
    error: 'Pilih status approval',
  }),
  rejection_reason: z.string().optional(),
});

export const RefundRequestSchema = z.object({
  escrow_account_id: z.string().min(1),
  dispute_id: z.string().optional(),
  amount: z.number().min(1, 'Masukkan jumlah refund'),
  reason: z.string().min(10, 'Jelaskan alasan refund (min 10 karakter)').max(500),
  refund_method: z.enum(['original_payment', 'bank_transfer', 'escrow_credit'], {
    error: 'Pilih metode refund',
  }),
});

export type EscrowDisputeFormData = z.infer<typeof EscrowDisputeSchema>;
export type EscrowReleaseFormData = z.infer<typeof EscrowReleaseSchema>;
export type EscrowReleaseApprovalFormData = z.infer<typeof EscrowReleaseApprovalSchema>;
export type RefundRequestFormData = z.infer<typeof RefundRequestSchema>;
