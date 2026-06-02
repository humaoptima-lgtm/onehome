'use client';

import React, { useState } from 'react';
import styles from './RenovationEstimator.module.css';
import { formatCurrency } from '@/lib/utils';
import { Hammer, Clock, CheckSquare } from 'lucide-react';
import { PropertyCondition } from '@/types/property';

interface RenovationEstimatorProps {
  buildingArea: number;
  currentCondition: PropertyCondition;
}

const SCOPES = [
  { id: 'structural', label: 'Struktur & Fondasi', icon: '🧱' },
  { id: 'electrical', label: 'Instalasi Listrik', icon: '⚡' },
  { id: 'plumbing', label: 'Plumbing & Air', icon: '🚿' },
  { id: 'kitchen', label: 'Renovasi Dapur', icon: '🍳' },
  { id: 'bathroom', label: 'Renovasi Kamar Mandi', icon: '🛁' },
  { id: 'flooring', label: 'Lantai & Keramik', icon: '🏗️' },
  { id: 'painting', label: 'Cat & Finishing', icon: '🎨' },
  { id: 'roofing', label: 'Atap & Waterproofing', icon: '🏠' },
];

const CONDITION_LABELS: Record<PropertyCondition, string> = {
  'baru': 'Baru (Tidak Perlu Renovasi)',
  'baik': 'Baik (Renovasi Minor)',
  'renovasi': 'Sudah Direnovasi',
  'butuh-renovasi': 'Perlu Renovasi Besar',
  'dalam-pembangunan': 'Dalam Pembangunan',
};

/** Base renovation cost per m² in IDR */
const BASE_COST_PER_SQM: Record<PropertyCondition, number> = {
  'baru': 0,
  'baik': 3_000_000,
  'renovasi': 1_500_000,
  'butuh-renovasi': 8_000_000,
  'dalam-pembangunan': 12_000_000,
};

export function RenovationEstimator({ buildingArea, currentCondition }: RenovationEstimatorProps) {
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [condition, setCondition] = useState<PropertyCondition>(currentCondition);

  const toggleScope = (scopeId: string) => {
    setSelectedScopes(prev =>
      prev.includes(scopeId)
        ? prev.filter(s => s !== scopeId)
        : [...prev, scopeId]
    );
  };

  // Calculate cost
  const baseCost = buildingArea * (BASE_COST_PER_SQM[condition] || 400);
  let multiplier = 1;
  if (selectedScopes.includes('structural')) multiplier += 0.5;
  if (selectedScopes.includes('kitchen')) multiplier += 0.3;
  if (selectedScopes.includes('bathroom')) multiplier += 0.2;
  if (selectedScopes.includes('electrical')) multiplier += 0.15;
  if (selectedScopes.includes('plumbing')) multiplier += 0.15;
  if (selectedScopes.includes('flooring')) multiplier += 0.1;
  if (selectedScopes.includes('painting')) multiplier += 0.05;
  if (selectedScopes.includes('roofing')) multiplier += 0.2;

  const totalCost = baseCost * multiplier;
  const duration = totalCost > 1_500_000_000 ? '12-16 minggu' : totalCost > 500_000_000 ? '8-12 minggu' : '4-8 minggu';

  const breakdown = [
    { label: 'Material', pct: 45, amount: totalCost * 0.45 },
    { label: 'Tenaga Kerja', pct: 40, amount: totalCost * 0.40 },
    { label: 'Izin & Manajemen', pct: 15, amount: totalCost * 0.15 },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Hammer size={22} className={styles.headerIcon} />
        <div>
          <h3 className={styles.title}>Estimasi Biaya Renovasi</h3>
          <p className={styles.subtitle}>Pilih lingkup renovasi untuk estimasi biaya</p>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.conditionSection}>
          <label className={styles.fieldLabel}>Kondisi Properti</label>
          <select
            className={styles.select}
            value={condition}
            onChange={(e) => setCondition(e.target.value as PropertyCondition)}
          >
            {Object.entries(CONDITION_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className={styles.scopeSection}>
          <label className={styles.fieldLabel}>Lingkup Renovasi</label>
          <div className={styles.scopeGrid}>
            {SCOPES.map(scope => (
              <button
                key={scope.id}
                className={`${styles.scopeChip} ${selectedScopes.includes(scope.id) ? styles.selected : ''}`}
                onClick={() => toggleScope(scope.id)}
              >
                <span className={styles.scopeIcon}>{scope.icon}</span>
                <span>{scope.label}</span>
                {selectedScopes.includes(scope.id) && <CheckSquare size={16} className={styles.checkIcon} />}
              </button>
            ))}
          </div>
        </div>

        {totalCost > 0 && (
          <div className={styles.results}>
            <div className={styles.costHeader}>
              <span className={styles.costLabel}>Estimasi Total</span>
              <span className={styles.costValue}>{formatCurrency(totalCost)}</span>
            </div>

            <div className={styles.durationRow}>
              <Clock size={16} />
              <span>Estimasi waktu pengerjaan: <strong>{duration}</strong></span>
            </div>

            <div className={styles.breakdownList}>
              {breakdown.map((item, i) => (
                <div key={i} className={styles.breakdownItem}>
                  <div className={styles.breakdownLabelRow}>
                    <span>{item.label}</span>
                    <span className={styles.breakdownPct}>{item.pct}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className={styles.breakdownAmount}>{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
