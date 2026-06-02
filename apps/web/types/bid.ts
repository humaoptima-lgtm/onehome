/* ============================================
   Bid Types — Extended for Comparison
   ============================================ */

export type BidStatus = 'pending' | 'reviewed' | 'shortlisted' | 'awarded' | 'rejected' | 'withdrawn';

export interface Bid {
  id: string;
  tender_id: string;
  vendor_id: string;
  vendor_name: string;
  vendor_company: string;
  vendor_rating: number;
  vendor_review_count: number;
  vendor_avatar: string;
  vendor_verified: boolean;
  vendor_projects_completed: number;
  vendor_years_experience: number;
  
  price: number;
  timeline_days: number;
  timeline_description: string;
  warranty_months: number;
  warranty_description: string;
  material_grade: 'economy' | 'standard' | 'premium' | 'luxury';
  payment_terms: string;
  
  proposal: string;
  attachments: string[]; // media_asset IDs
  portfolio_preview: string[]; // thumbnail URLs
  
  response_time_hours: number;
  risk_score: 'low' | 'medium' | 'high';
  ai_recommendation?: 'best_value' | 'fastest' | 'most_experienced' | 'highest_rated';
  
  status: BidStatus;
  shortlisted_at?: string;
  awarded_at?: string;
  created_at: string;
}

export interface BidComparison {
  tender_id: string;
  bids: Bid[];
  recommended_bid_id?: string;
  comparison_generated_at: string;
}

export interface BidAttachment {
  id: string;
  bid_id: string;
  media_asset_id: string;
  name: string;
  type: 'proposal_document' | 'cost_breakdown' | 'portfolio' | 'certification' | 'other';
  url: string;
}
