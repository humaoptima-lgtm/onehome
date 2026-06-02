/* ============================================
   Audit Log Types — FinTech Compliance
   ============================================ */

export interface AuditLog {
  id: string;
  user_id: string;
  user_name?: string;
  user_role?: string;
  action: string; // 'create' | 'update' | 'delete' | 'view' | 'approve' | 'reject' | 'disburse' | 'login' | 'logout'
  entity_type: string; // 'property' | 'tender' | 'bid' | 'project' | 'payment' | 'document' | 'user' | 'vendor'
  entity_id: string;
  old_value?: Record<string, unknown>;
  new_value?: Record<string, unknown>;
  ip_address: string;
  user_agent?: string;
  created_at: string;
}

/* ============================================
   Analytics Types — Admin Dashboard
   ============================================ */

export interface KPI {
  label: string;
  value: number;
  previous_value?: number;
  change_percentage?: number;
  trend: 'up' | 'down' | 'neutral';
  format: 'number' | 'currency' | 'percentage';
}

export interface DashboardMetrics {
  total_users: KPI;
  active_vendors: KPI;
  properties_listed: KPI;
  projects_running: KPI;
  gmv: KPI;
  revenue: KPI;
  approval_rate: KPI;
  fraud_alerts: KPI;
}

export interface ConversionFunnel {
  stage: string;
  count: number;
  conversion_rate: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface AnalyticsReport {
  period: 'daily' | 'weekly' | 'monthly';
  metrics: DashboardMetrics;
  user_growth: TimeSeriesData[];
  revenue_breakdown: { category: string; amount: number }[];
  geographic_distribution: { region: string; count: number }[];
  conversion_funnel: ConversionFunnel[];
  vendor_leaderboard: { vendor_id: string; name: string; score: number; projects: number; revenue: number }[];
}
