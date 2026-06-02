/* ============================================
   Common Types — Indonesia First
   ============================================ */

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | '360tour' | 'floorplan' | 'drone';
  url: string;
  thumbnailUrl: string;
  caption?: string;
  sortOrder: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

/** Indonesian administrative hierarchy */
export interface Address {
  province: string;       // Provinsi
  city: string;           // Kota/Kabupaten
  district: string;       // Kecamatan
  village?: string;       // Kelurahan/Desa
  postalCode?: string;    // Kode Pos
  full: string;           // Full formatted address
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  label: string;
  field: string;
  direction: SortDirection;
}

/** Indonesian timezone */
export type IndonesianTimezone = 'WIB' | 'WITA' | 'WIT';

/** Indonesian currency — always IDR */
export const CURRENCY = 'IDR' as const;
export const CURRENCY_LOCALE = 'id-ID' as const;
