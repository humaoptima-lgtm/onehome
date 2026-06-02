import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as IDR currency
 * All amounts are stored in IDR — NO conversion from USD
 * Format: Rp 150.000.000 (Indonesian dot separator)
 */
export function formatCurrency(amount: number, compact = false): string {
  if (compact && amount >= 1_000_000_000_000) {
    return `Rp ${(amount / 1_000_000_000_000).toFixed(1)} Triliun`;
  }
  if (compact && amount >= 1_000_000_000) {
    return `Rp ${(amount / 1_000_000_000).toFixed(1)} Miliar`;
  }
  if (compact && amount >= 1_000_000) {
    return `Rp ${(amount / 1_000_000).toFixed(0)} Juta`;
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number with Indonesian dot separator
 * Example: 1.000.000 (NOT 1,000,000)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Format area in m² — NEVER use sqft
 */
export function formatArea(sqm: number): string {
  return `${formatNumber(sqm)} m²`;
}

/**
 * Format land area in hectare (for large plots)
 */
export function formatHectare(sqm: number): string {
  if (sqm >= 10000) {
    return `${(sqm / 10000).toFixed(2)} ha`;
  }
  return formatArea(sqm);
}

/**
 * Calculate monthly KPR (Kredit Pemilikan Rumah) installment
 * Uses Indonesian banking terms: DP, Tenor, Cicilan
 * 
 * @param hargaProperti - Property price in IDR
 * @param sukuBungaTahunan - Annual interest rate (e.g., 8.5 for 8.5%)
 * @param tenorTahun - Loan tenor in years
 * @param dpPersen - DP percentage (e.g., 20 for 20%)
 * @returns Monthly installment (cicilan bulanan) in IDR
 */
export function calculateKPR(
  hargaProperti: number,
  sukuBungaTahunan: number,
  tenorTahun: number,
  dpPersen: number = 20
): number {
  const pokokPinjaman = hargaProperti * (1 - dpPersen / 100);
  const bungaBulanan = sukuBungaTahunan / 100 / 12;
  const jumlahCicilan = tenorTahun * 12;

  if (bungaBulanan === 0) return pokokPinjaman / jumlahCicilan;

  const cicilan =
    (pokokPinjaman * bungaBulanan * Math.pow(1 + bungaBulanan, jumlahCicilan)) /
    (Math.pow(1 + bungaBulanan, jumlahCicilan) - 1);

  return Math.round(cicilan);
}

/**
 * Legacy alias for backward compatibility
 */
export const calculateMortgage = calculateKPR;

/**
 * Calculate BPHTB (Bea Perolehan Hak atas Tanah dan Bangunan)
 * Formula: 5% × (NJOP - NPTKP)
 * NPTKP varies by region, default Rp 80.000.000
 */
export function calculateBPHTB(njop: number, nptkp: number = 80_000_000): number {
  const taxable = Math.max(0, njop - nptkp);
  return Math.round(taxable * 0.05);
}

/**
 * Calculate AJB cost (Akta Jual Beli)
 * Typically 1% of transaction value
 */
export function calculateAJBCost(transactionValue: number): number {
  return Math.round(transactionValue * 0.01);
}

/**
 * Calculate notary/PPAT cost
 * Typically 0.5-1% of transaction value
 */
export function calculateNotaryCost(transactionValue: number): number {
  return Math.round(transactionValue * 0.005);
}

/**
 * Calculate total ownership cost breakdown
 * Indonesian property acquisition costs
 */
export function calculateOwnershipCost(propertyPrice: number, estimatedRenovation: number = 0) {
  const bphtb = calculateBPHTB(propertyPrice);
  const ajbCost = calculateAJBCost(propertyPrice);
  const notaryCost = calculateNotaryCost(propertyPrice);
  const mortgageCost = Math.round(propertyPrice * 0.025); // ~2.5% for KPR fees (appraisal, provisi, admin, asuransi)

  return {
    propertyPrice,
    bphtb,
    ajbCost,
    notaryCost,
    mortgageCost,
    estimatedRenovation,
    totalOwnershipCost: propertyPrice + bphtb + ajbCost + notaryCost + mortgageCost + estimatedRenovation,
  };
}

/**
 * Calculate PPN (Pajak Pertambahan Nilai) — 11%
 */
export function calculatePPN(amount: number): number {
  return Math.round(amount * 0.11);
}

/**
 * Calculate PPh for vendor payments
 * PPh 23: 2% (for services)
 * PPh Final: 2.5% (for construction)
 */
export function calculatePPh(amount: number, type: 'pph23' | 'pph-final' = 'pph-final'): number {
  const rate = type === 'pph23' ? 0.02 : 0.025;
  return Math.round(amount * rate);
}

/**
 * Format date in Indonesian format: DD/MM/YYYY
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

/**
 * Format date with Indonesian month names
 * Example: 15 Januari 2024
 */
export function formatDateLong(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to a specified length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Get star rating display
 */
export function getStarRating(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
}

/**
 * Pluralize a word (simple version — Bahasa Indonesia doesn't pluralize)
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural || singular + 's');
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
