import { z } from 'zod';

/* ============================================
   Finance & Payment Validation Schemas
   ============================================ */

export const LoanApplicationSchema = z.object({
  loan_type: z.enum(['property', 'renovation', 'furniture', 'combined']),
  principal_amount: z.number().min(10_000_000, 'Minimum Rp 10 juta'),
  term_months: z.number().min(12, 'Minimum 12 bulan').max(360, 'Maksimal 30 tahun'),
  down_payment_percent: z.number().min(10, 'Down payment minimal 10%').max(90),
  partner_institution: z.string().min(1, 'Pilih lembaga pembiayaan'),
  
  // Personal info for eligibility
  monthly_income: z.number().min(1, 'Masukkan penghasilan bulanan'),
  employment_type: z.enum(['employed', 'self_employed', 'business_owner', 'freelancer']),
  employment_years: z.number().min(0),
});

export const EligibilitySchema = z.object({
  monthly_income: z.number().min(1, 'Masukkan penghasilan bulanan'),
  existing_debt: z.number().min(0).default(0),
  monthly_expenses: z.number().min(0).default(0),
  desired_loan_amount: z.number().min(1_000_000, 'Minimum Rp 1 juta'),
  desired_term_months: z.number().min(12).max(360),
});

export const PaymentSchema = z.object({
  amount: z.number().min(1, 'Masukkan jumlah pembayaran'),
  method: z.enum(['virtual_account', 'qris', 'bank_transfer', 'credit_card', 'ewallet']),
  reference_type: z.string().min(1),
  reference_id: z.string().min(1),
});

export const DisbursementSchema = z.object({
  vendor_id: z.string().min(1, 'Pilih vendor'),
  project_id: z.string().min(1),
  milestone_id: z.string().min(1),
  amount: z.number().min(1, 'Masukkan jumlah disbursement'),
  bank_code: z.string().min(1, 'Pilih bank'),
  account_number: z.string().min(8, 'Nomor rekening minimal 8 digit').max(20),
  account_holder_name: z.string().min(3, 'Masukkan nama pemilik rekening'),
});

export type LoanApplicationData = z.infer<typeof LoanApplicationSchema>;
export type EligibilityData = z.infer<typeof EligibilitySchema>;
export type PaymentData = z.infer<typeof PaymentSchema>;
export type DisbursementData = z.infer<typeof DisbursementSchema>;
