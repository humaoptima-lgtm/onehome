'use client';

import React, { useState, useEffect } from 'react';
import styles from './MortgageCalculator.module.css';
import { RangeSlider } from '@/components/ui/RangeSlider';
import { formatCurrency } from '@/lib/utils';
import { Calculator, TrendingDown, Percent, CalendarDays } from 'lucide-react';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

export function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(5.0);
  const [tenureYears, setTenureYears] = useState(25);
  const downPaymentAmount = propertyPrice * (downPaymentPct / 100);
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = tenureYears * 12;
  const monthlyPayment = monthlyRate === 0 
    ? loanAmount / numPayments
    : Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1));

  const totalPaid = monthlyPayment * tenureYears * 12;
  const totalInterest = totalPaid - loanAmount;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Calculator size={22} className={styles.headerIcon} />
        <div>
          <h3 className={styles.title}>Kalkulator KPR</h3>
          <p className={styles.subtitle}>Simulasi cicilan untuk properti ini</p>
        </div>
      </div>

      <div className={styles.sliders}>
        <div className={styles.sliderGroup}>
          <div className={styles.sliderLabel}>
            <div className={styles.labelLeft}>
              <TrendingDown size={16} />
              <span>Uang Muka (DP)</span>
            </div>
            <strong>{downPaymentPct}% — {formatCurrency(downPaymentAmount)}</strong>
          </div>
          <RangeSlider
            min={10}
            max={90}
            step={5}
            value={downPaymentPct}
            onChange={setDownPaymentPct}
          />
        </div>

        <div className={styles.sliderGroup}>
          <div className={styles.sliderLabel}>
            <div className={styles.labelLeft}>
              <Percent size={16} />
              <span>Suku Bunga per Tahun</span>
            </div>
            <strong>{interestRate.toFixed(1)}%</strong>
          </div>
          <RangeSlider
            min={2}
            max={15}
            step={0.1}
            value={interestRate}
            onChange={setInterestRate}
          />
        </div>

        <div className={styles.sliderGroup}>
          <div className={styles.sliderLabel}>
            <div className={styles.labelLeft}>
              <CalendarDays size={16} />
              <span>Tenor Pinjaman</span>
            </div>
            <strong>{tenureYears} tahun</strong>
          </div>
          <RangeSlider
            min={5}
            max={30}
            step={1}
            value={tenureYears}
            onChange={setTenureYears}
          />
        </div>
      </div>

      <div className={styles.resultGrid}>
        <div className={styles.resultMain}>
          <span className={styles.resultLabel}>Estimasi Cicilan per Bulan</span>
          <span className={styles.resultValue}>{formatCurrency(monthlyPayment)}</span>
        </div>
        <div className={styles.resultRow}>
          <div className={styles.resultItem}>
            <span className={styles.resultItemLabel}>Pokok Pinjaman</span>
            <span className={styles.resultItemValue}>{formatCurrency(loanAmount)}</span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultItemLabel}>Total Bunga</span>
            <span className={styles.resultItemValue}>{formatCurrency(totalInterest)}</span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultItemLabel}>Total Pembayaran</span>
            <span className={styles.resultItemValue}>{formatCurrency(totalPaid)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
