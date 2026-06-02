/* ============================================
   Project Finance Domain Types
   Wallet = View Layer, Ledger = Source of Truth
   ============================================ */

export type WalletStatus = 'active' | 'frozen' | 'closed' | 'pending_approval';
export type LoanStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'disbursed' | 'active' | 'completed' | 'defaulted';
export type LoanType = 'property' | 'renovation' | 'furniture' | 'combined';

export interface ProjectWallet {
  id: string;
  project_id: string;
  escrow_account_id?: string;
  approved_amount: number;
  released_amount: number;
  retention_amount: number;
  available_balance: number;
  currency: string; // IDR
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

export interface ProjectBudget {
  id: string;
  project_id: string;
  category: string;
  description: string;
  estimated_amount: number;
  actual_amount: number;
  variance: number;
  variance_percentage: number;
  status: 'on_budget' | 'over_budget' | 'under_budget';
}

export interface MilestonePayment {
  id: string;
  project_id: string;
  milestone_id: string;
  wallet_id: string;
  escrow_release_id?: string;
  gross_amount: number;
  platform_fee: number;
  tax_amount: number;
  retention_amount: number;
  net_amount: number;
  status: 'pending_inspection' | 'approved' | 'released' | 'disputed';
  ledger_transaction_id?: string;
  created_at: string;
}

export interface VendorPayable {
  id: string;
  project_id: string;
  vendor_id: string;
  total_contract: number;
  total_paid: number;
  total_retained: number;
  outstanding: number;
  currency: string;
  payments: MilestonePayment[];
}

export interface RetentionAccount {
  id: string;
  project_id: string;
  vendor_id: string;
  total_retained: number;
  total_released: number;
  balance: number;
  warranty_end_date: string;
  auto_release_date: string;
  status: 'holding' | 'partially_released' | 'fully_released';
}

export interface FundAllocation {
  id: string;
  project_id: string;
  source: 'loan_disbursement' | 'self_funded' | 'partial_loan';
  loan_application_id?: string;
  amount: number;
  allocated_at: string;
  ledger_transaction_id: string;
}

/* --- Legacy Loan types (kept for backward compatibility) --- */

export interface Loan {
  id: string;
  user_id: string;
  loan_type: LoanType;
  partner_institution: string;
  principal_amount: number;
  interest_rate: number;
  term_months: number;
  down_payment: number;
  monthly_installment: number;
  total_interest: number;
  outstanding_balance: number;
  status: LoanStatus;
  approved_at?: string;
  disbursed_at?: string;
  created_at: string;
}

export interface Installment {
  id: string;
  loan_id: string;
  period: number;
  due_date: string;
  principal: number;
  interest: number;
  total: number;
  status: 'upcoming' | 'paid' | 'overdue' | 'partial';
  paid_at?: string;
  transaction_id?: string;
}

export interface LoanOption {
  id: string;
  loan_type: LoanType;
  partner: string;
  partner_logo: string;
  min_rate: number;
  max_rate: number;
  min_term_months: number;
  max_term_months: number;
  max_amount: number;
  min_down_payment_percent: number;
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
