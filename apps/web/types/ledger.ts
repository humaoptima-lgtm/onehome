/* ============================================
   Ledger Domain Types — Double-Entry Accounting
   Rule: No balance column updates.
   Rule: SUM(DEBIT) = SUM(CREDIT) always.
   ============================================ */

export type AccountCategory = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
export type EntryType = 'debit' | 'credit';
export type TransactionStatus = 'pending' | 'posted' | 'reversed' | 'failed';

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

export interface ReconciliationLog {
  id: string;
  reconciliation_type: 'ledger' | 'escrow' | 'bank_settlement';
  period_start: string;
  period_end: string;
  total_debits: number;
  total_credits: number;
  is_balanced: boolean;
  discrepancy_amount: number;
  discrepancies: ReconciliationDiscrepancy[];
  executed_by: string; // 'system' or user_id
  executed_at: string;
  created_at: string;
}

export interface ReconciliationDiscrepancy {
  account_id: string;
  account_name: string;
  expected_balance: number;
  actual_balance: number;
  difference: number;
  status: 'pending' | 'resolved' | 'escalated';
  notes?: string;
}

export interface AccountBalanceSnapshot {
  id: string;
  account_id: string;
  snapshot_date: string;
  debit_total: number;
  credit_total: number;
  net_balance: number;
  created_at: string;
}
