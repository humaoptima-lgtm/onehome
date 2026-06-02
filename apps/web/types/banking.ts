/* ============================================
   Banking Domain Types
   Loan lifecycle, bank integration, credit assessment
   ============================================ */

export type LoanApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'additional_info_required'
  | 'approved'
  | 'rejected'
  | 'disbursed'
  | 'cancelled';

export type CreditAssessmentResult = 'eligible' | 'conditionally_eligible' | 'not_eligible';
export type DisbursementStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'reversed';

export interface Bank {
  id: string;
  name: string;
  code: string;
  logo_url: string;
  swift_code?: string;
  is_partner: boolean;
  loan_products: BankLoanProduct[];
  contact_email?: string;
  contact_phone?: string;
  is_active: boolean;
  created_at: string;
}

export interface BankLoanProduct {
  id: string;
  bank_id: string;
  name: string;
  loan_type: 'property' | 'renovation' | 'furniture' | 'combined';
  min_rate: number;
  max_rate: number;
  min_term_months: number;
  max_term_months: number;
  max_amount: number;
  min_down_payment_percent: number;
  requirements: string[];
  is_active: boolean;
}

export interface LoanApplication {
  id: string;
  user_id: string;
  bank_id: string;
  bank_name: string;
  product_id: string;
  project_id?: string;
  property_id?: string;
  loan_type: 'property' | 'renovation' | 'furniture' | 'combined';
  requested_amount: number;
  approved_amount?: number;
  interest_rate?: number;
  term_months: number;
  down_payment: number;
  monthly_installment?: number;
  purpose: string;
  status: LoanApplicationStatus;
  submitted_at?: string;
  reviewed_at?: string;
  approved_at?: string;
  rejected_reason?: string;
  documents: LoanDocument[];
  credit_assessment?: CreditAssessment;
  created_at: string;
  updated_at: string;
}

export interface LoanDocument {
  id: string;
  application_id: string;
  document_type: 'ktp' | 'npwp' | 'slip_gaji' | 'rekening_koran' | 'sertifikat' | 'imb' | 'pbb' | 'other';
  file_name: string;
  media_asset_id: string;
  url: string;
  is_encrypted: boolean; // AES-256 for sensitive docs
  uploaded_at: string;
  verified: boolean;
  verified_at?: string;
  verified_by?: string;
}

export interface LoanDisbursement {
  id: string;
  application_id: string;
  escrow_account_id: string;
  amount: number;
  currency: string;
  disbursement_reference: string;
  bank_reference?: string;
  status: DisbursementStatus;
  disbursed_at?: string;
  confirmed_at?: string;
  ledger_transaction_id?: string;
  created_at: string;
}

export interface CreditAssessment {
  id: string;
  application_id: string;
  user_id: string;
  monthly_income: number;
  existing_debt: number;
  monthly_expenses: number;
  debt_to_income_ratio: number;
  credit_score?: number;
  collateral_value?: number;
  loan_to_value_ratio?: number;
  result: CreditAssessmentResult;
  max_eligible_amount: number;
  recommended_amount: number;
  recommended_term_months: number;
  notes?: string;
  assessed_by?: string;
  assessed_at: string;
  created_at: string;
}

export interface BankWebhook {
  id: string;
  bank_id: string;
  event_type: 'disbursement_completed' | 'disbursement_failed' | 'payment_received' | 'application_updated';
  payload: Record<string, unknown>;
  status: 'received' | 'processed' | 'failed';
  processed_at?: string;
  error_message?: string;
  idempotency_key: string;
  created_at: string;
}
