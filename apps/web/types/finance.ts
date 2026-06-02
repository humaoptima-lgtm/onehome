/* ============================================
   Finance Types — FinTech Grade
   Double-Entry Ledger System
   ============================================ */

export type AccountCategory = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
export type EntryType = 'debit' | 'credit';
export type TransactionStatus = 'pending' | 'posted' | 'reversed' | 'failed';
export type WalletStatus = 'active' | 'frozen' | 'closed' | 'pending_approval';
export type LoanStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'disbursed' | 'active' | 'completed' | 'defaulted';

/**
 * Indonesian financing product types
 * Based on OJK-regulated banking products
 */
export type LoanType =
  | 'kpr'                   // Kredit Pemilikan Rumah
  | 'kpr-take-over'         // KPR Take Over
  | 'kpr-refinancing'       // KPR Refinancing
  | 'kredit-renovasi'       // Renovation Loan
  | 'kredit-furnitur'       // Furniture Financing
  | 'kredit-konstruksi'     // Construction Financing
  | 'bridge-financing';     // Bridge Financing

/** Indonesian interest rate type */
export type RateType = 'fixed' | 'floating' | 'combination';

/* --- Ledger --- */

export interface LedgerAccount {
  id: string;
  owner_id: string;
  account_name: string;
  account_category: AccountCategory;
  currency: string; // IDR
  is_active: boolean;
  created_at: string;
}

export interface LedgerTransaction {
  id: string;
  reference_type: string; // 'tender_payment' | 'milestone_disbursement' | 'refund' | 'fee'
  reference_id: string;
  description: string;
  status: TransactionStatus;
  entries: JournalEntry[];
  created_at: string;
}

export interface JournalEntry {
  id: string;
  transaction_id: string;
  account_id: string;
  account_name?: string;
  amount: number; // stored as integer cents to avoid floating point
  entry_type: EntryType;
  created_at: string;
}

/* --- Project Wallet (Escrow) --- */

export interface ProjectWallet {
  id: string;
  project_id: string;
  approved_amount: number;
  released_amount: number;
  retention_amount: number;
  available_balance: number;
  status: WalletStatus;
  milestones: WalletMilestone[];
  created_at: string;
  updated_at: string;
}

export interface WalletMilestone {
  id: string;
  wallet_id: string;
  milestone_name: string;
  amount: number;
  percentage: number; // of total approved_amount
  status: 'pending' | 'approved' | 'released' | 'disputed';
  released_at?: string;
}

/* --- Loans & Financing --- */

export interface Loan {
  id: string;
  user_id: string;
  loan_type: LoanType;
  /** Indonesian bank partner */
  partner_institution: string;
  /** All amounts in IDR */
  principal_amount: number;
  /** Annual interest rate (%) */
  interest_rate: number;
  /** Rate type: fixed, floating, or combination */
  rate_type: RateType;
  /** Tenor in months — Indonesian banking term */
  tenor_months: number;
  /** DP (Uang Muka) — NOT "down payment" */
  dp_amount: number;
  /** Cicilan bulanan */
  monthly_installment: number;
  total_interest: number;
  outstanding_balance: number;
  /** SLIK OJK check status */
  slik_status?: 'clean' | 'collectible' | 'substandard' | 'doubtful' | 'loss';
  /** LTV ratio */
  ltv_ratio?: number;
  status: LoanStatus;
  approved_at?: string;
  disbursed_at?: string;
  created_at: string;
}

export interface Installment {
  id: string;
  loan_id: string;
  period: number; // month number
  due_date: string;
  principal: number;
  interest: number;
  total: number;
  status: 'upcoming' | 'paid' | 'overdue' | 'partial';
  paid_at?: string;
  transaction_id?: string; // links to LedgerTransaction
}

export interface LoanOption {
  id: string;
  loan_type: LoanType;
  /** Indonesian bank partner */
  partner: string;
  partner_logo: string;
  min_rate: number;
  max_rate: number;
  rate_type: RateType;
  /** Min/max tenor in months */
  min_tenor_months: number;
  max_tenor_months: number;
  /** Max plafon in IDR */
  max_amount: number;
  /** Min DP percentage (e.g., 10 = 10%) */
  min_dp_percent: number;
  /** Max LTV ratio (e.g., 90 = 90%) */
  max_ltv: number;
  requirements: string[];
}

export interface EligibilityResult {
  monthly_income: number;
  existing_debt: number;
  monthly_expenses: number;
  debt_to_income_ratio: number;
  max_loan_amount: number;
  approval_probability: 'low' | 'medium' | 'high' | 'very_high';
  recommended_loan_amount: number;
  recommended_term_months: number;
}
