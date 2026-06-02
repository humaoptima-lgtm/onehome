/* ============================================
   Payment Types — Xendit Integration
   ============================================ */

export type PaymentMethod = 'virtual_account' | 'qris' | 'bank_transfer' | 'credit_card' | 'ewallet';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'expired' | 'refunded';
export type DisbursementStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Payment {
  id: string;
  user_id: string;
  reference_type: string; // 'tender_deposit' | 'milestone_payment' | 'subscription'
  reference_id: string;
  amount: number;
  currency: string; // IDR
  method: PaymentMethod;
  status: PaymentStatus;
  external_id?: string; // Xendit payment ID
  payment_url?: string; // redirect URL for payment page
  paid_at?: string;
  expired_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface EscrowTransaction {
  id: string;
  project_id: string;
  wallet_id: string;
  milestone_id: string;
  amount: number;
  type: 'deposit' | 'release' | 'retention_release' | 'refund';
  status: DisbursementStatus;
  transaction_id: string; // links to LedgerTransaction
  approved_by?: string;
  approved_at?: string;
  created_at: string;
}

export interface Disbursement {
  id: string;
  vendor_id: string;
  project_id: string;
  amount: number;
  bank_code: string;
  account_number_encrypted: string; // AES-256
  account_holder_name: string;
  status: DisbursementStatus;
  external_id?: string; // Xendit disbursement ID
  disbursed_at?: string;
  created_at: string;
}
