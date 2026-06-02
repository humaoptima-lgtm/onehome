/* ============================================
   Outbox Pattern Types (Rule 8)
   Guaranteed event delivery via database outbox
   ============================================ */

export type OutboxStatus = 'PENDING' | 'PUBLISHED' | 'FAILED' | 'DEAD_LETTER';

export interface OutboxEvent {
  id: string;
  event_name: DomainEventName;
  aggregate_type: string; // 'tender', 'project', 'escrow', 'banking', etc.
  aggregate_id: string;
  payload: Record<string, unknown>;
  status: OutboxStatus;
  retry_count: number;
  max_retries: number;
  published_at?: string;
  error_message?: string;
  created_at: string;
}

export interface DeadLetterEntry {
  id: string;
  outbox_event_id: string;
  event_name: DomainEventName;
  aggregate_type: string;
  aggregate_id: string;
  payload: Record<string, unknown>;
  reason: string;
  stack_trace?: string;
  retry_count: number;
  last_attempted_at: string;
  created_at: string;
}

export interface OutboxMetrics {
  pending_count: number;
  published_count_24h: number;
  failed_count_24h: number;
  dead_letter_count: number;
  avg_publish_latency_ms: number;
  publish_rate_per_minute: number;
  consumer_lag: Record<string, number>; // per-domain lag
  last_sweep_at: string;
}

export interface EventConsumerStatus {
  domain: string;
  consumer_id: string;
  status: 'healthy' | 'degraded' | 'down';
  last_processed_at: string;
  events_processed_24h: number;
  avg_processing_time_ms: number;
  error_rate_percent: number;
}

/* ============================================
   Domain Event Types — All 17 Events
   ============================================ */

export type DomainEventName =
  | 'TenderCreated'
  | 'BidSubmitted'
  | 'VendorSelected'
  | 'ProjectCreated'
  | 'MilestoneSubmitted'
  | 'MilestoneApproved'
  | 'LoanApproved'
  | 'LoanDisbursed'
  | 'EscrowFunded'
  | 'PaymentReleased'
  | 'RetentionHeld'
  | 'RetentionReleased'
  | 'RefundIssued'
  | 'DisputeOpened'
  | 'DisputeResolved'
  | 'ProjectCompleted'
  | 'WarrantyExpired';

export interface DomainEvent<T = Record<string, unknown>> {
  id: string;
  event_name: DomainEventName;
  aggregate_type: string;
  aggregate_id: string;
  payload: T;
  timestamp: string;
  idempotency_key: string;
}

/* --- Typed Event Payloads --- */

export interface TenderCreatedPayload {
  tender_id: string;
  customer_id: string;
  property_id?: string;
  budget_min: number;
  budget_max: number;
}

export interface BidSubmittedPayload {
  bid_id: string;
  tender_id: string;
  vendor_id: string;
  amount: number;
}

export interface VendorSelectedPayload {
  tender_id: string;
  vendor_id: string;
  awarded_amount: number;
}

export interface MilestoneApprovedPayload {
  project_id: string;
  milestone_id: string;
  amount: number;
}

export interface LoanDisbursedPayload {
  application_id: string;
  escrow_account_id: string;
  amount: number;
  bank_reference: string;
}

export interface EscrowFundedPayload {
  escrow_account_id: string;
  project_id: string;
  amount: number;
}

export interface PaymentReleasedPayload {
  escrow_account_id: string;
  milestone_id: string;
  vendor_id: string;
  gross_amount: number;
  net_amount: number;
  retention_amount: number;
}

export interface DisputeOpenedPayload {
  dispute_id: string;
  escrow_account_id: string;
  raised_by: string;
  disputed_amount: number;
  reason: string;
}

export interface ProjectCompletedPayload {
  project_id: string;
  vendor_id: string;
  final_cost: number;
  duration_days: number;
}

/* ============================================
   QStash Scheduler Types
   ============================================ */

export interface SchedulerJob {
  id: string;
  name: string;
  cron_expression: string;
  description: string;
  last_run_at?: string;
  next_run_at: string;
  last_result: 'success' | 'failure' | 'pending';
  is_active: boolean;
}

export const DAILY_SCHEDULER_JOBS: Omit<SchedulerJob, 'id' | 'last_run_at' | 'next_run_at' | 'last_result'>[] = [
  { name: 'retention-release-check', cron_expression: '0 0 * * *', description: 'Check and auto-release retentions after warranty period', is_active: true },
  { name: 'warranty-expiration-check', cron_expression: '0 1 * * *', description: 'Mark expired warranties and notify homeowners', is_active: true },
  { name: 'escrow-reconciliation', cron_expression: '0 2 * * *', description: 'Verify escrow balances match ledger entries', is_active: true },
  { name: 'ledger-reconciliation', cron_expression: '0 3 * * *', description: 'SUM(DEBIT) = SUM(CREDIT) validation', is_active: true },
  { name: 'bank-settlement-validation', cron_expression: '0 4 * * *', description: 'Verify disbursements match bank records', is_active: true },
  { name: 'failed-event-retry', cron_expression: '0 5 * * *', description: 'Retry FAILED outbox events (not DEAD_LETTER)', is_active: true },
  { name: 'notification-cleanup', cron_expression: '0 6 * * *', description: 'Archive old notification logs (>90 days)', is_active: true },
];
