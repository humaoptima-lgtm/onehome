import { Address, Coordinates, MediaItem } from './common';

/**
 * Indonesian property types — follows Indonesian market categories
 * NEVER use generic international property types
 */
export type PropertyType =
  | 'rumah-tapak'       // Landed House
  | 'rumah-cluster'     // Cluster House
  | 'rumah-subsidi'     // Subsidized House
  | 'rumah-komersial'   // Commercial House
  | 'rumah-second'      // Pre-owned House
  | 'ruko'              // Shophouse (Rumah Toko)
  | 'apartemen'         // Apartment
  | 'townhouse'         // Townhouse
  | 'kavling'           // Land Plot
  | 'villa'             // Villa
  | 'shophouse'         // Shophouse (modern)
  | 'commercial'        // Commercial Building
  | 'warehouse'         // Warehouse (Gudang)
  | 'industrial';       // Industrial Property

export type PropertyCondition = 'baru' | 'renovasi' | 'baik' | 'butuh-renovasi' | 'dalam-pembangunan';
export type PropertyStatus = 'tersedia' | 'terjual' | 'pending' | 'disewakan';
export type ListingType = 'dijual' | 'disewakan';

/** Indonesian property certificate types */
export type CertificateType = 'SHM' | 'SHGB' | 'HGB' | 'Strata Title' | 'AJB' | 'PPJB' | 'Girik';

/** Indonesian ownership method */
export type OwnershipMethod = 'kpr' | 'cash-keras' | 'cash-bertahap' | 'developer' | 'secondary';

export interface Developer {
  id: string;
  name: string;
  logo: string;
}

export interface Agent {
  id: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  company: string;
}

/** Indonesian property cost breakdown */
export interface PropertyCostBreakdown {
  propertyPrice: number;         // Harga Properti
  bphtb: number;                 // Bea Perolehan Hak atas Tanah dan Bangunan (5% of NJOP - NPTKP)
  ajbCost: number;               // Biaya AJB (1% of transaction)
  notaryCost: number;            // Biaya Notaris/PPAT
  mortgageCost: number;          // Biaya KPR (appraisal, provisi, admin, asuransi)
  estimatedRenovation: number;   // Estimasi Renovasi
  totalOwnershipCost: number;    // Total Biaya Kepemilikan
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  /** Price in IDR — NEVER USD */
  price: number;
  /** Price per m² in IDR */
  pricePerSqm?: number;
  address: Address;
  coordinates: Coordinates;
  type: PropertyType;
  listingType: ListingType;
  bedrooms: number;
  bathrooms: number;
  /** Land area in m² — NEVER sqft */
  landArea: number;
  /** Building area in m² — NEVER sqft */
  buildingArea: number;
  floors?: number;
  condition: PropertyCondition;
  yearBuilt: number;
  /** Indonesian property certificate */
  certificate?: CertificateType;
  developer?: Developer;
  agent: Agent;
  media: MediaItem[];
  features: string[];
  status: PropertyStatus;
  /** Monthly KPR installment estimate in IDR */
  estimatedMortgage?: number;
  /** Renovation cost estimate in IDR */
  estimatedRenovation?: number;
  /** Cost breakdown (BPHTB, AJB, Notary, etc.) */
  costBreakdown?: PropertyCostBreakdown;
  propertyScore?: number;
  views: number;
  savedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  query?: string;
  listingType?: ListingType;
  type?: PropertyType[];
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  minLandArea?: number;
  maxLandArea?: number;
  minBuildingArea?: number;
  maxBuildingArea?: number;
  condition?: PropertyCondition[];
  certificate?: CertificateType[];
  province?: string;
  city?: string;
  district?: string;
  developerId?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface InteriorPackage {
  id: string;
  name: string;
  tier: 'basic' | 'standard' | 'premium' | 'luxury';
  description: string;
  /** Price per m² in IDR */
  pricePerSqm: number;
  features: string[];
  image: string;
  estimatedDuration: string;
}

export interface FurniturePackage {
  id: string;
  name: string;
  type: 'move-in-ready' | 'custom' | 'full-furnished';
  description: string;
  /** Starting price in IDR */
  startingPrice: number;
  includes: string[];
  image: string;
}

export interface RenovationEstimate {
  condition: PropertyCondition;
  scope: string[];
  /** Cost in IDR */
  estimatedCost: number;
  estimatedDuration: string;
  breakdown: {
    category: string;
    cost: number;
  }[];
}

/**
 * Indonesian construction work categories
 * Based on RAB (Rencana Anggaran Biaya) standards
 */
export type ConstructionCategory =
  | 'pekerjaan-persiapan'
  | 'pondasi'
  | 'struktur'
  | 'dinding'
  | 'atap'
  | 'plafon'
  | 'lantai'
  | 'pintu-jendela'
  | 'mep'
  | 'sanitary'
  | 'furniture'
  | 'interior'
  | 'landscape'
  | 'smart-home';

/**
 * Indonesian construction cost estimation breakdown
 */
export interface ConstructionCostBreakdown {
  materialCost: number;         // Biaya Material
  laborCost: number;            // Biaya Tukang
  subcontractorCost: number;    // Biaya Sub-kon
  equipmentCost: number;        // Biaya Peralatan
  logisticsCost: number;        // Biaya Logistik
  contractorMargin: number;     // Margin Kontraktor
  contingency: number;          // Dana Cadangan
  tax: number;                  // PPN (11%)
  retention: number;            // Retensi (5%)
  projectTotal: number;         // Total Proyek
}

/**
 * Indonesian construction labor types
 */
export type LaborType =
  | 'mandor'
  | 'tukang-batu'
  | 'tukang-kayu'
  | 'tukang-besi'
  | 'tukang-cat'
  | 'tukang-keramik'
  | 'tukang-gypsum'
  | 'tukang-listrik'
  | 'tukang-plumbing'
  | 'interior-installer'
  | 'helper';
