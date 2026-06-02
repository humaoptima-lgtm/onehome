/* ============================================
   Project Types — Construction Management
   ============================================ */

export type ProjectStatus = 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
export type MilestoneStatus = 'pending' | 'active' | 'completed' | 'delayed' | 'disputed';

export const MILESTONE_STAGES = [
  'planning',
  'demolition', 
  'construction',
  'interior',
  'finishing',
  'inspection',
  'handover',
] as const;

export type MilestoneStage = typeof MILESTONE_STAGES[number];

export interface Project {
  id: string;
  tender_id: string;
  property_id: string;
  vendor_id: string;
  wallet_id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress_percentage: number;
  budget_approved: number;
  budget_spent: number;
  start_date: string;
  target_completion_date: string;
  actual_completion_date?: string;
  milestones: Milestone[];
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  id: string;
  project_id: string;
  stage: MilestoneStage;
  name: string;
  description: string;
  status: MilestoneStatus;
  progress_percentage: number;
  budget_allocation: number;
  budget_spent: number;
  start_date?: string;
  target_date: string;
  completed_date?: string;
  assigned_team?: string;
  disbursement_amount?: number;
  disbursement_status?: 'pending' | 'approved' | 'released';
  order: number;
}

export interface DailyReport {
  id: string;
  project_id: string;
  milestone_id: string;
  date: string;
  author_id: string;
  author_name: string;
  summary: string;
  tasks_completed: string[];
  tasks_planned: string[];
  issues: ProjectIssue[];
  worker_count: number;
  weather: string;
  photos: string[]; // media_asset IDs
  created_at: string;
}

export interface ProjectIssue {
  id: string;
  project_id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'escalated';
  reported_by: string;
  assigned_to?: string;
  resolved_at?: string;
  created_at: string;
}

export interface ProjectPhoto {
  id: string;
  project_id: string;
  milestone_id?: string;
  media_asset_id: string;
  url: string;
  thumbnail_url: string;
  room_type?: string;
  phase: 'before' | 'during' | 'after';
  caption?: string;
  taken_at: string;
}

export interface SiteVisit {
  id: string;
  project_id: string;
  milestone_id?: string;
  visitor_id: string;
  visitor_name: string;
  visitor_role: 'homeowner' | 'vendor' | 'inspector' | 'bank_officer';
  visit_date: string;
  purpose: string;
  notes: string;
  photos: string[]; // media_asset IDs
  findings: string[];
  follow_up_required: boolean;
  follow_up_notes?: string;
  created_at: string;
}

export interface Inspection {
  id: string;
  project_id: string;
  milestone_id: string;
  inspector_id: string;
  inspector_name: string;
  inspection_type: 'milestone_completion' | 'quality_check' | 'safety_audit' | 'final_handover';
  scheduled_date: string;
  actual_date?: string;
  status: 'scheduled' | 'in_progress' | 'passed' | 'failed' | 'conditional';
  checklist: InspectionCheckItem[];
  overall_score?: number; // 0-100
  notes: string;
  photos: string[];
  defects_found: string[];
  remediation_required: boolean;
  remediation_deadline?: string;
  approved_for_payment: boolean;
  created_at: string;
  updated_at: string;
}

export interface InspectionCheckItem {
  id: string;
  category: string;
  item: string;
  status: 'pass' | 'fail' | 'na';
  notes?: string;
}

export interface ChangeOrder {
  id: string;
  project_id: string;
  milestone_id?: string;
  requested_by: string; // user_id
  requested_by_role: 'homeowner' | 'vendor';
  title: string;
  description: string;
  reason: 'design_change' | 'unforeseen_condition' | 'material_upgrade' | 'scope_addition' | 'scope_reduction';
  cost_impact: number; // positive = increase, negative = decrease
  timeline_impact_days: number;
  status: 'requested' | 'under_review' | 'approved' | 'rejected' | 'implemented';
  approved_by?: string;
  approved_at?: string;
  documents: string[]; // media_asset IDs
  ledger_transaction_id?: string;
  created_at: string;
  updated_at: string;
}
