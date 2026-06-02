'use client';

import React, { useState, useMemo } from 'react';
import { PageShell, StatCard } from '@/components/layout/PageShell';
import { Calculator, Ruler, MapPin, Paintbrush, Layers, Package, TrendingDown, FileText } from 'lucide-react';
import { formatCurrency, formatArea } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const LOCATIONS = [
  { label: 'Jakarta', multiplier: 1.3 },
  { label: 'Bandung', multiplier: 1.0 },
  { label: 'Surabaya', multiplier: 1.05 },
  { label: 'Bali', multiplier: 1.25 },
  { label: 'Yogyakarta', multiplier: 0.85 },
  { label: 'Semarang', multiplier: 0.9 },
  { label: 'Makassar', multiplier: 0.8 },
  { label: 'Medan', multiplier: 0.85 },
];

const CONDITIONS = [
  { label: 'Bangunan Baru', key: 'new', rate: 4_500_000 },
  { label: 'Renovasi Ringan', key: 'light', rate: 3_200_000 },
  { label: 'Renovasi Berat', key: 'heavy', rate: 5_800_000 },
  { label: 'Total Gut Reno', key: 'gut', rate: 7_500_000 },
];

const STYLES = [
  { label: 'Minimalis', key: 'minimalist', multiplier: 1.0 },
  { label: 'Modern', key: 'modern', multiplier: 1.15 },
  { label: 'Klasik', key: 'classic', multiplier: 1.25 },
  { label: 'Mewah / Luxury', key: 'luxury', multiplier: 1.6 },
];

const GRADES = [
  { label: 'Ekonomi', key: 'economy', multiplier: 0.7 },
  { label: 'Standar', key: 'standard', multiplier: 1.0 },
  { label: 'Premium', key: 'premium', multiplier: 1.4 },
  { label: 'Mewah', key: 'luxury', multiplier: 2.0 },
];

const SCOPES = [
  { label: 'Struktur', key: 'structure', pct: 0.25 },
  { label: 'Dinding & Plafon', key: 'walls', pct: 0.12 },
  { label: 'Lantai', key: 'floor', pct: 0.1 },
  { label: 'Atap', key: 'roof', pct: 0.1 },
  { label: 'MEP (Listrik & Plumbing)', key: 'mep', pct: 0.15 },
  { label: 'Pintu & Jendela', key: 'doors', pct: 0.08 },
  { label: 'Dapur', key: 'kitchen', pct: 0.1 },
  { label: 'Kamar Mandi', key: 'bathroom', pct: 0.1 },
];

export default function CalculatorPage() {
  const [area, setArea] = useState(120);
  const [locationIdx, setLocationIdx] = useState(0);
  const [conditionIdx, setConditionIdx] = useState(1);
  const [styleIdx, setStyleIdx] = useState(0);
  const [gradeIdx, setGradeIdx] = useState(1);
  const [scopeKeys, setScopeKeys] = useState<string[]>(SCOPES.map(s => s.key));

  const toggleScope = (key: string) => {
    setScopeKeys(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const calc = useMemo(() => {
    const baseRate = CONDITIONS[conditionIdx].rate;
    const locMul = LOCATIONS[locationIdx].multiplier;
    const styleMul = STYLES[styleIdx].multiplier;
    const gradeMul = GRADES[gradeIdx].multiplier;
    const scopePct = SCOPES.filter(s => scopeKeys.includes(s.key)).reduce((sum, s) => sum + s.pct, 0);

    const subtotal = area * baseRate * locMul * styleMul * gradeMul * scopePct;
    const material = subtotal * 0.55;
    const labor = subtotal * 0.30;
    const tax = subtotal * 0.11;
    const margin = subtotal * 0.10;
    const contingency = subtotal * 0.05;
    const total = subtotal + tax + margin + contingency;

    return { material, labor, tax, margin, contingency, total };
  }, [area, locationIdx, conditionIdx, styleIdx, gradeIdx, scopeKeys]);

  const sliderStyle = (val: number, min: number, max: number) => ({
    background: `linear-gradient(90deg, var(--color-emerald) ${((val - min) / (max - min)) * 100}%, var(--color-border) ${((val - min) / (max - min)) * 100}%)`,
  });

  return (
    <PageShell title="Kalkulator Biaya Renovasi" subtitle="Estimasi biaya renovasi berdasarkan luas, lokasi, kondisi, gaya, dan material — sesuai standar SNI.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 32, alignItems: 'start' }}>
        {/* Left: Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Area Slider */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: 8 }}><Ruler size={16} /> Luas Bangunan</label>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-emerald)' }}>{formatArea(area)}</span>
            </div>
            <input type="range" min={20} max={500} value={area} onChange={e => setArea(Number(e.target.value))}
              style={{ width: '100%', height: 6, borderRadius: 999, appearance: 'none', cursor: 'pointer', ...sliderStyle(area, 20, 500) }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--color-slate)', marginTop: 4 }}>
              <span>20 m²</span><span>500 m²</span>
            </div>
          </div>

          {/* Location */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><MapPin size={16} /> Lokasi</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {LOCATIONS.map((loc, i) => (
                <button key={loc.label} onClick={() => setLocationIdx(i)} style={{
                  padding: '10px 8px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                  border: `1.5px solid ${i === locationIdx ? 'var(--color-emerald)' : 'var(--color-border)'}`,
                  background: i === locationIdx ? 'var(--color-emerald-light)' : 'white',
                  color: i === locationIdx ? 'var(--color-emerald)' : 'var(--color-slate)',
                  cursor: 'pointer', transition: 'all 150ms',
                }}>
                  {loc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><Layers size={16} /> Kondisi</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {CONDITIONS.map((c, i) => (
                <button key={c.key} onClick={() => setConditionIdx(i)} style={{
                  padding: '12px', borderRadius: 8, fontSize: 13, fontWeight: 500, textAlign: 'left',
                  border: `1.5px solid ${i === conditionIdx ? 'var(--color-emerald)' : 'var(--color-border)'}`,
                  background: i === conditionIdx ? 'var(--color-emerald-light)' : 'white',
                  color: i === conditionIdx ? 'var(--color-emerald)' : 'var(--color-slate)',
                  cursor: 'pointer', transition: 'all 150ms',
                }}>
                  <div>{c.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{formatCurrency(c.rate)}/m²</div>
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><Paintbrush size={16} /> Gaya Desain</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {STYLES.map((s, i) => (
                <button key={s.key} onClick={() => setStyleIdx(i)} style={{
                  padding: '10px 8px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                  border: `1.5px solid ${i === styleIdx ? 'var(--color-emerald)' : 'var(--color-border)'}`,
                  background: i === styleIdx ? 'var(--color-emerald-light)' : 'white',
                  color: i === styleIdx ? 'var(--color-emerald)' : 'var(--color-slate)',
                  cursor: 'pointer', transition: 'all 150ms',
                }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Material Grade */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><Package size={16} /> Grade Material</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {GRADES.map((g, i) => (
                <button key={g.key} onClick={() => setGradeIdx(i)} style={{
                  padding: '10px 8px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                  border: `1.5px solid ${i === gradeIdx ? 'var(--color-emerald)' : 'var(--color-border)'}`,
                  background: i === gradeIdx ? 'var(--color-emerald-light)' : 'white',
                  color: i === gradeIdx ? 'var(--color-emerald)' : 'var(--color-slate)',
                  cursor: 'pointer', transition: 'all 150ms',
                }}>
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scope */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><Layers size={16} /> Lingkup Pekerjaan</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {SCOPES.map(s => (
                <button key={s.key} onClick={() => toggleScope(s.key)} style={{
                  padding: '10px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500, textAlign: 'left',
                  border: `1.5px solid ${scopeKeys.includes(s.key) ? 'var(--color-emerald)' : 'var(--color-border)'}`,
                  background: scopeKeys.includes(s.key) ? 'var(--color-emerald-light)' : 'white',
                  color: scopeKeys.includes(s.key) ? 'var(--color-emerald)' : 'var(--color-slate)',
                  cursor: 'pointer', transition: 'all 150ms',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${scopeKeys.includes(s.key) ? 'var(--color-emerald)' : 'var(--color-border)'}`, background: scopeKeys.includes(s.key) ? 'var(--color-emerald)' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'white', fontSize: 11 }}>
                    {scopeKeys.includes(s.key) && '✓'}
                  </span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Results (Sticky) */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-slate)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estimasi Total Biaya</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--color-navy)', marginBottom: 24, fontFamily: 'var(--font-display)' }}>
              {formatCurrency(calc.total, true)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[
                { label: 'Biaya Material', value: calc.material, color: 'var(--color-emerald)', pct: 55 },
                { label: 'Biaya Tukang', value: calc.labor, color: 'var(--color-info)', pct: 30 },
                { label: 'PPN (11%)', value: calc.tax, color: 'var(--color-warning)', pct: 11 },
                { label: 'Margin Kontraktor', value: calc.margin, color: 'var(--color-gold)', pct: 10 },
                { label: 'Dana Cadangan', value: calc.contingency, color: 'var(--color-slate)', pct: 5 },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span style={{ color: 'var(--color-slate)' }}>{item.label}</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{formatCurrency(item.value, true)}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: 'var(--color-bg-cool)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: 999, transition: 'width 500ms' }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--color-slate)', marginBottom: 6 }}>
                <span>Biaya per m²</span>
                <span style={{ fontWeight: 600 }}>{formatCurrency(Math.round(calc.total / area))}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--color-slate)' }}>
                <span>Estimasi Durasi</span>
                <span style={{ fontWeight: 600 }}>{Math.max(2, Math.round(area / 30))} Bulan</span>
              </div>
            </div>

            <Button className="w-full gap-2 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white" size="lg">
              <FileText size={16} /> Buat Tender Sekarang
            </Button>
            <Button variant="outline" className="w-full mt-2 gap-2" size="lg">
              <TrendingDown size={16} /> Simulasi Pembiayaan
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
