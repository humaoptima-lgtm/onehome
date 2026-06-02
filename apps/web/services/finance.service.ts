import { calculateKPR } from '@/lib/utils';
import { PropertyCondition, RenovationEstimate } from '@/types/property';

export async function estimateRenovationCost(
  buildingArea: number, 
  condition: PropertyCondition, 
  scope: string[]
): Promise<RenovationEstimate> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  /** Base cost per m² in IDR depending on condition */
  const baseCostMap: Record<PropertyCondition, number> = {
    'baru': 0,
    'baik': 3_000_000,
    'renovasi': 1_500_000,
    'butuh-renovasi': 8_000_000,
    'dalam-pembangunan': 12_000_000,
  };
  
  const baseCostPerSqm = baseCostMap[condition] || 5_000_000;
  
  // Scope multipliers
  let scopeMultiplier = 1;
  if (scope.includes('structural')) scopeMultiplier += 0.5;
  if (scope.includes('kitchen')) scopeMultiplier += 0.3;
  if (scope.includes('bathroom')) scopeMultiplier += 0.2;
  
  const cost = buildingArea * baseCostPerSqm * scopeMultiplier;
  
  return {
    condition,
    scope,
    estimatedCost: cost,
    estimatedDuration: cost > 1_500_000_000 ? '12-16 minggu' : '4-8 minggu',
    breakdown: [
      { category: 'Material', cost: cost * 0.45 },
      { category: 'Tenaga Kerja', cost: cost * 0.40 },
      { category: 'Izin & Manajemen', cost: cost * 0.15 }
    ]
  };
}

/**
 * Get KPR calculation
 * Indonesian banking terms: DP (Uang Muka), Tenor, Cicilan
 */
export function getKPRCalculation(
  hargaProperti: number,
  dpPersen: number = 20,
  sukuBunga: number = 8.5,
  tenorTahun: number = 20
) {
  const dpAmount = hargaProperti * (dpPersen / 100);
  const pokokPinjaman = hargaProperti - dpAmount;
  const cicilanBulanan = calculateKPR(hargaProperti, sukuBunga, tenorTahun, dpPersen);
  
  return {
    dpAmount,
    pokokPinjaman,
    cicilanBulanan,
    sukuBunga,
    tenorTahun,
  };
}

/** Legacy alias */
export const getMortgageCalculation = (
  price: number,
  downPaymentPercent: number = 20,
  interestRate: number = 8.5,
  years: number = 20
) => getKPRCalculation(price, downPaymentPercent, interestRate, years);
