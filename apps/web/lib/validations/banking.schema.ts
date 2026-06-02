import { z } from 'zod';

/* ============================================
   Banking Validation Schemas
   ============================================ */

export const LoanApplicationSchema = z.object({
  bank_id: z.string().min(1, 'Pilih bank'),
  product_id: z.string().min(1, 'Pilih produk pinjaman'),
  project_id: z.string().optional(),
  property_id: z.string().optional(),
  loan_type: z.enum(['property', 'renovation', 'furniture', 'combined'], {
    error: 'Pilih jenis pinjaman',
  }),
  requested_amount: z.number().min(10_000_000, 'Minimum pinjaman Rp 10 juta'),
  term_months: z.number().min(6, 'Minimum tenor 6 bulan').max(360, 'Maksimum tenor 30 tahun'),
  down_payment: z.number().min(0, 'Uang muka tidak boleh negatif'),
  purpose: z.string().min(10, 'Jelaskan tujuan pinjaman (min 10 karakter)').max(500),
});

export const CreditAssessmentSchema = z.object({
  application_id: z.string().min(1),
  monthly_income: z.number().min(1_000_000, 'Masukkan penghasilan bulanan'),
  existing_debt: z.number().min(0, 'Hutang tidak boleh negatif'),
  monthly_expenses: z.number().min(0, 'Pengeluaran tidak boleh negatif'),
  collateral_value: z.number().optional(),
});

export const LoanDocumentUploadSchema = z.object({
  application_id: z.string().min(1),
  document_type: z.enum(['ktp', 'npwp', 'slip_gaji', 'rekening_koran', 'sertifikat', 'imb', 'pbb', 'other'], {
    error: 'Pilih jenis dokumen',
  }),
  file: z.object({
    name: z.string(),
    size: z.number().max(10 * 1024 * 1024, 'Maksimum 10MB per file'),
    type: z.string(),
  }),
});

export type LoanApplicationFormData = z.infer<typeof LoanApplicationSchema>;
export type CreditAssessmentFormData = z.infer<typeof CreditAssessmentSchema>;
export type LoanDocumentUploadFormData = z.infer<typeof LoanDocumentUploadSchema>;
