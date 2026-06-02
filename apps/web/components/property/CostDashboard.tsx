'use client';

import React, { useState } from 'react';
import styles from './CostDashboard.module.css';
import { formatCurrency } from '@/lib/utils';
import { ChevronDown, ChevronUp, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CostItem {
  label: string;
  amount: number;
  color: string;
  editable?: boolean;
}

interface CostDashboardProps {
  propertyPrice: number;
  renovationCost?: number;
  interiorCost?: number;
  furnitureCost?: number;
  downPaymentPct?: number;
  interestRate?: number;
  tenureYears?: number;
}

export function CostDashboard({
  propertyPrice,
  renovationCost = 0,
  interiorCost = 0,
  furnitureCost = 0,
  downPaymentPct = 20,
  interestRate = 5,
  tenureYears = 25,
}: CostDashboardProps) {
  const [expanded, setExpanded] = useState(false);

  // Derived costs
  const legalFees = propertyPrice * 0.05; // ~5% for legal, notary, taxes
  const bphtb = propertyPrice * 0.05; // Transfer tax

  const totalProjectCost = propertyPrice + renovationCost + interiorCost + furnitureCost + legalFees + bphtb;
  const downPaymentAmount = propertyPrice * (downPaymentPct / 100);
  const loanAmount = totalProjectCost - downPaymentAmount;

  // Monthly mortgage
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = tenureYears * 12;
  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / numPayments;
  } else {
    monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const costs: CostItem[] = [
    { label: 'Harga Properti', amount: propertyPrice, color: '#0B1D3A' },
    { label: 'Renovasi', amount: renovationCost, color: '#1B7A5A' },
    { label: 'Desain Interior', amount: interiorCost, color: '#C8A951' },
    { label: 'Furnitur', amount: furnitureCost, color: '#64748B' },
    { label: 'Biaya Legal & Notaris', amount: legalFees, color: '#94A3B8' },
    { label: 'BPHTB & Pajak', amount: bphtb, color: '#E2E8F0' },
  ];

  const activeCosts = costs.filter(c => c.amount > 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <PieChart size={20} className={styles.headerIcon} />
        <h3 className={styles.title}>Ringkasan Biaya</h3>
      </div>

      {/* Monthly Payment Highlight */}
      <div className={styles.monthlySection}>
        <span className={styles.monthlyLabel}>Estimasi Cicilan per Bulan</span>
        <span className={styles.monthlyValue}>{formatCurrency(Math.round(monthlyPayment))}</span>
        <span className={styles.monthlyNote}>tenor {tenureYears} tahun, bunga {interestRate}%</span>
      </div>

      {/* Cost Breakdown */}
      <div className={styles.breakdownSection}>
        <button className={styles.expandToggle} onClick={() => setExpanded(!expanded)}>
          <span>Rincian Total: <strong>{formatCurrency(totalProjectCost)}</strong></span>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expanded && (
          <div className={styles.costList}>
            {/* Visual bar */}
            <div className={styles.barChart}>
              {activeCosts.map((cost) => (
                <div
                  key={cost.label}
                  className={styles.barSegment}
                  style={{
                    width: `${(cost.amount / totalProjectCost) * 100}%`,
                    backgroundColor: cost.color,
                  }}
                  title={`${cost.label}: ${formatCurrency(cost.amount)}`}
                />
              ))}
            </div>

            {/* Line items */}
            {activeCosts.map((cost) => (
              <div key={cost.label} className={styles.costRow}>
                <div className={styles.costDot} style={{ backgroundColor: cost.color }} />
                <span className={styles.costLabel}>{cost.label}</span>
                <span className={styles.costAmount}>{formatCurrency(cost.amount)}</span>
              </div>
            ))}

            <div className={styles.totalRow}>
              <span>Total Investasi</span>
              <strong>{formatCurrency(totalProjectCost)}</strong>
            </div>

            <div className={styles.dpRow}>
              <span>Uang Muka ({downPaymentPct}%)</span>
              <span>- {formatCurrency(downPaymentAmount)}</span>
            </div>

            <div className={styles.loanRow}>
              <span>Pokok Pinjaman</span>
              <strong>{formatCurrency(loanAmount)}</strong>
            </div>
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      <div className={styles.ctaSection}>
        <Button className="w-full bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white" size="lg">
          Ajukan KPR Sekarang
        </Button>
        <Button variant="outline" className="w-full" size="default">
          Jadwalkan Kunjungan
        </Button>
        <Button variant="ghost" className="w-full" size="default">
          Konsultasi Desainer
        </Button>
      </div>
    </div>
  );
}
