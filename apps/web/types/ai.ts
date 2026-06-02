/* ============================================
   AI Domain Types
   AI Design Studio, Cost Estimation, Recommendations
   Separate FastAPI/Python service
   ============================================ */

export type AIRequestStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
export type AIDesignStyle = 'minimalist' | 'japandi' | 'scandinavian' | 'industrial' | 'modern_luxury' | 'tropical' | 'contemporary' | 'classic';
export type AIRoomType = 'living_room' | 'bedroom' | 'kitchen' | 'bathroom' | 'dining_room' | 'home_office' | 'balcony' | 'outdoor';

export interface AIDesignRequest {
  id: string;
  user_id: string;
  room_type: AIRoomType;
  style: AIDesignStyle;
  intensity: number; // 0-100: how much to transform
  source_image_url: string; // uploaded to R2
  source_media_asset_id: string;
  reference_image_urls?: string[];
  additional_instructions?: string;
  status: AIRequestStatus;
  queue_position?: number;
  processing_started_at?: string;
  processing_completed_at?: string;
  error_message?: string;
  results: AIDesignResult[];
  created_at: string;
}

export interface AIDesignResult {
  id: string;
  request_id: string;
  variation_index: number; // 0, 1, 2... for multiple variations
  result_image_url: string; // stored in R2
  result_media_asset_id: string;
  thumbnail_url: string;
  style_applied: AIDesignStyle;
  confidence_score: number; // 0-1
  metadata: Record<string, unknown>;
  is_favorite: boolean;
  created_at: string;
}

export interface AICostEstimation {
  id: string;
  user_id: string;
  property_id?: string;
  location: string;
  area_sqm: number;
  property_age: number;
  condition: 'new' | 'good' | 'needs_repair' | 'renovation_required';
  design_style: AIDesignStyle;
  scopes: AICostScope[];
  total_estimated_cost: number;
  cost_breakdown: AICostBreakdown;
  regional_factor: number; // multiplier based on location
  confidence_level: 'low' | 'medium' | 'high';
  valid_until: string; // estimation expiry
  created_at: string;
}

export interface AICostScope {
  category: string; // 'kitchen', 'bathroom', 'flooring', etc.
  area_sqm: number;
  material_grade: 'economy' | 'standard' | 'premium' | 'luxury';
  estimated_cost: number;
}

export interface AICostBreakdown {
  material_cost: number;
  labor_cost: number;
  contractor_margin: number;
  tax_ppn: number; // 10% PPN
  contingency: number; // 5-10%
  total: number;
}

export interface AIRecommendation {
  id: string;
  user_id: string;
  recommendation_type: 'vendor' | 'design' | 'material' | 'financing';
  context: Record<string, unknown>; // input data that drove the recommendation
  recommendations: AIRecommendationItem[];
  model_version: string;
  created_at: string;
}

export interface AIRecommendationItem {
  rank: number;
  entity_type: string; // 'vendor', 'design_style', 'material', 'bank'
  entity_id: string;
  score: number; // 0-1
  reasoning: string;
  badges: string[]; // 'Best Value', 'Fastest', 'Most Experienced'
}

export interface AIUsageLog {
  id: string;
  user_id: string;
  service: 'design' | 'cost_estimation' | 'recommendation' | 'chat' | 'property_description';
  request_id: string;
  tokens_used?: number;
  processing_time_ms: number;
  cost_usd?: number;
  status: 'success' | 'failure';
  error_message?: string;
  created_at: string;
}
