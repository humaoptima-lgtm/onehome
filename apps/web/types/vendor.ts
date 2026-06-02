export type VendorCategory =
  | 'contractor'             // Kontraktor
  | 'interior-designer'      // Desainer Interior
  | 'architect'              // Arsitek
  | 'furniture-maker'        // Pembuat Furnitur
  | 'kitchen-specialist'     // Spesialis Kitchen Set
  | 'landscape-specialist'   // Spesialis Landscape
  | 'smart-home-installer'   // Smart Home Installer
  | 'mep-specialist'         // Spesialis MEP
  | 'handyman';              // Tukang

/**
 * Indonesian vendor verification documents
 */
export interface VendorVerification {
  nib?: string;                 // Nomor Induk Berusaha
  npwp?: string;                // Nomor Pokok Wajib Pajak
  siup?: string;                // Surat Izin Usaha Perdagangan
  companyDeed?: string;         // Akta Perusahaan
  bankAccountVerified: boolean; // Bank Account Verification
  portfolioVerified: boolean;   // Portfolio Verification
  addressVerified: boolean;     // Business Address Verification
  verificationStatus: 'pending' | 'verified' | 'rejected' | 'expired';
  verifiedAt?: string;
  expiresAt?: string;
}

export interface VendorPackage {
  id: string;
  name: string;
  tier: 'basic' | 'standard' | 'premium' | 'luxury';
  description: string;
  /** Starting price in IDR */
  startingPrice: number;
  features: string[];
  deliveryTime: string;
  revisions: number;
}

export interface VendorReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  projectType: string;
  images?: string[];
  createdAt: string;
  helpful: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  beforeImage?: string;
  afterImage?: string;
  /** Budget in IDR */
  budget: number;
  duration: string;
  style: string;
  /** Indonesian city */
  location?: string;
}

export interface Vendor {
  id: string;
  companyName: string;
  slug: string;
  category: VendorCategory;
  description: string;
  story?: string;
  rating: number;
  reviewCount: number;
  projectsCompleted: number;
  yearsExperience: number;
  /** Starting price in IDR */
  startingPrice: number;
  verified: boolean;
  featured: boolean;
  responseTime: string;
  coverImage: string;
  profileImage: string;
  portfolioThumbnails: string[];
  specializations: string[];
  /** Indonesian cities/regions served */
  serviceArea: string[];
  teamSize?: number;
  /** Indonesian business verification */
  verification?: VendorVerification;
  packages: VendorPackage[];
  portfolio: PortfolioProject[];
  reviews: VendorReview[];
  faq: { question: string; answer: string }[];
  materialsUsed?: { name: string; brand: string; image?: string }[];
  createdAt: string;
}

export interface VendorFilters {
  query?: string;
  category?: VendorCategory;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  verified?: boolean;
  location?: string;
  sortBy?: string;
}
