export type TenderStatus = 'draft' | 'open' | 'reviewing' | 'awarded' | 'in-progress' | 'completed' | 'cancelled';
export type BidStatus = 'pending' | 'shortlisted' | 'accepted' | 'rejected' | 'withdrawn';

export interface TenderScope {
  categories: string[];
  description: string;
  rooms?: string[];
  specificRequirements?: string[];
}

export interface Tender {
  id: string;
  referenceNumber: string;
  customerId: string;
  propertyId?: string;
  title: string;
  description: string;
  propertyInfo: {
    address: string;
    type: string;
    size: number;
    condition: string;
  };
  photos: string[];
  floorPlans: string[];
  scope: TenderScope;
  budgetMin: number;
  budgetMax: number;
  timeline: {
    startDate: string;
    duration: string;
    urgency: 'flexible' | 'normal' | 'urgent';
  };
  selectedVendorIds: string[];
  status: TenderStatus;
  bids: Bid[];
  bidCount: number;
  createdAt: string;
  deadline: string;
}

export interface Bid {
  id: string;
  tenderId: string;
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  vendorAvatar: string;
  price: number;
  timeline: string;
  proposal: string;
  attachments: string[];
  status: BidStatus;
  createdAt: string;
}

export interface TenderFormData {
  step: number;
  propertyAddress: string;
  propertyType: string;
  propertySize: number;
  propertyCondition: string;
  photos: File[];
  floorPlans: File[];
  scopeCategories: string[];
  scopeDescription: string;
  specificRequirements: string[];
  budgetMin: number;
  budgetMax: number;
  startDate: string;
  duration: string;
  urgency: 'flexible' | 'normal' | 'urgent';
  selectedVendorIds: string[];
}

export interface TenderCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description: string;
  parent_id?: string;
  sub_categories?: TenderCategory[];
  is_active: boolean;
  sort_order: number;
}

export interface BidItem {
  id: string;
  bid_id: string;
  category: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  material_spec?: string;
  notes?: string;
}

export interface VendorInvitation {
  id: string;
  tender_id: string;
  vendor_id: string;
  vendor_name: string;
  vendor_avatar?: string;
  invited_by: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  message?: string;
  responded_at?: string;
  expires_at: string;
  created_at: string;
}
