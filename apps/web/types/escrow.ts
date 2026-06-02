/* ============================================
   Escrow Domain Types
   Escrow accounts, transactions, disputes, releases
   ============================================ */

export type EscrowAccountStatus = 'pending_funding' | 'funded' | 'active' | 'partially_released' | 'fully_released' | 'disputed' | 'closed';
export type EscrowTransactionType = 'funding' | 'release' | 'retention_hold' | 'retention_release' | 'refund' | 'fee_deduction' | 'adjustment';
export type EscrowDisputeStatus = 'opened' | 'evidence_collection' | 'under_review' | 'inspection_scheduled' | 'resolved' | 'escalated';
export type EscrowDisputeResolution = 'vendor_favor' | 'homeowner_favor' | 'partial_refund' | 'redo_work' | 'mediation';

export interface EscrowAccount {
  id: string;
  project_id: string;
  tender_id: string;
  homeowner_id: string;
  vendor_id: string;
  bank_reference?: string;
  total_funded: number;
  total_released: number;
  total_retained: number;
  available_balance: number;
  currency: string; // IDR
  status: EscrowAccountStatus;
  funded_at?: string;
  closed_at?: string;
  ledger_account_id: string;
  created_at: string;
  updated_at: string;
}

export interface EscrowTransaction {
  id: string;
  escrow_account_id: string;
  transaction_type: EscrowTransactionType;
  amount: number;
  currency: string;
  reference_type: 'milestone_payment' | 'loan_disbursement' | 'retention' | 'dispute_resolution' | 'refund';
  reference_id: string;
  description: string;
  from_account_id?: string;
  to_account_id?: string;
  ledger_transaction_id: string;
  idempotency_key: string;
  status: 'pending' | 'completed' | 'failed' | 'reversed';
  processed_at?: string;
  created_at: string;
}

export interface EscrowDispute {
  id: string;
  escrow_account_id: string;
  project_id: string;
  milestone_id?: string;
  raised_by: string; // user_id
  raised_by_role: 'homeowner' | 'vendor';
  reason: string;
  description: string;
  evidence_urls: string[]; // media_asset IDs
  disputed_amount: number;
  status: EscrowDisputeStatus;
  resolution?: EscrowDisputeResolution;
  resolution_notes?: string;
  resolved_by?: string;
  resolved_at?: string;
  inspection_date?: string;
  inspection_notes?: string;
  ledger_adjustment_id?: string;
  created_at: string;
  updated_at: string;
}

export interface EscrowRelease {
  id: string;
  escrow_account_id: string;
  milestone_id: string;
  vendor_id: string;
  gross_amount: number;
  platform_fee: number;
  tax_amount: number;
  retention_amount: number;
  net_amount: number; // amount actually sent to vendor
  currency: string;
  approval_status: 'pending' | 'approved' | 'rejected';
  approved_by?: string; // dual approval
  second_approved_by?: string; // dual approval (for amounts > threshold)
  approved_at?: string;
  released_at?: string;
  vendor_bank_account_encrypted?: string; // AES-256
  ledger_transaction_id?: string;
  idempotency_key: string;
  created_at: string;
}

export interface Refund {
  id: string;
  escrow_account_id: string;
  dispute_id?: string;
  refund_to: string; // user_id
  amount: number;
  currency: string;
  reason: string;
  refund_method: 'original_payment' | 'bank_transfer' | 'escrow_credit';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  bank_reference?: string;
  ledger_transaction_id?: string;
  idempotency_key: string;
  processed_at?: string;
  created_at: string;
}
