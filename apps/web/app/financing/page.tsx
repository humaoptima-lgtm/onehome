'use client';

import React, { useState, useMemo } from 'react';
import { PageShell, StatCard } from '@/components/layout/PageShell';
import { Wallet, TrendingUp, Calculator, Shield, Building2, ArrowRight, Check, Info } from 'lucide-react';
import { formatCurrency, calculateKPR } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MiniChart } from '@/components/shared/MiniChart';

const PRODUCTS = [
  { label: 'KPR', desc: 'Kredit Pemilikan Rumah', icon: '🏠', rate: 8.5, tenor: 25 },
  { label: 'KPR Take Over', desc: 'Pindah bank, bunga lebih rendah', icon: '🔄', rate: 7.9, tenor: 20 },
  { label: 'KPR Refinancing', desc: 'Dana tunai dari properti', icon: '💰', rate: 9.0, tenor: 15 },
  { label: 'Kredit Renovasi', desc: 'Pinjaman khusus renovasi', icon: '🔨', rate: 10.5, tenor: 10 },
  { label: 'Kredit Furnitur', desc: 'Cicilan furnitur & interior', icon: '🛋️', rate: 12.0, tenor: 5 },
  { label: 'Kredit Konstruksi', desc: 'Bangun rumah dari awal', icon: '🏗️', rate: 11.0, tenor: 15 },
];

const BANKS = [
  { name: 'BCA', rate: 8.25, logo: '🔵' },
  { name: 'BRI', rate: 8.50, logo: '🔷' },
  { name: 'Mandiri', rate: 8.75, logo: '🟡' },
  { name: 'BNI', rate: 8.90, logo: '🟠' },
  { name: 'CIMB Niaga', rate: 8.15, logo: '🔴' },
  { name: 'BTN', rate: 7.99, logo: '🟢' },
];

const chartData = [
  { name: 'Jan', value: 8.9 }, { name: 'Feb', value: 8.7 }, { name: 'Mar', value: 8.5 },
  { name: 'Apr', value: 8.6 }, { name: 'Mei', value: 8.4 }, { name: 'Jun', value: 8.5 },
];

export default function FinancingPage() {
  const [price, setPrice] = useState(1_500_000_000);
  const [dp, setDp] = useState(20);
  const [tenor, setTenor] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [selectedProduct, setSelectedProduct] = useState(0);

  const cicilan = useMemo(() => calculateKPR(price, rate, tenor, dp), [price, rate, tenor, dp]);
  const totalBayar = cicilan * tenor * 12;
  const totalBunga = totalBayar - (price * (1 - dp / 100));

  return (
    <PageShell title="Pusat Pembiayaan" subtitle="Simulasi KPR, renovasi, dan furnitur — semua dalam satu platform." badge="OJK Compliant" badgeColor="var(--color-info)">
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
        <StatCard label="Rata-rata Bunga KPR" value="8.5% p.a." icon={<TrendingUp size={22} style={{ color: 'var(--color-emerald)' }} />} trend="down" trendLabel="-0.3%" />
        <StatCard label="DP Minimum" value="10%" icon={<Wallet size={22} style={{ color: 'var(--color-emerald)' }} />} />
        <StatCard label="Tenor Maksimal" value="25 Tahun" icon={<Calculator size={22} style={{ color: 'var(--color-emerald)' }} />} />
        <StatCard label="Escrow Protection" value="100%" icon={<Shield size={22} style={{ color: 'var(--color-emerald)' }} />} />
      </div>

      {/* Products */}
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: 'var(--color-navy)' }}>Produk Pembiayaan</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
        {PRODUCTS.map((p, i) => (
          <button key={p.label} onClick={() => { setSelectedProduct(i); setRate(p.rate); setTenor(Math.min(tenor, p.tenor)); }}
            style={{
              padding: 24, borderRadius: 12, textAlign: 'left', cursor: 'pointer',
              border: `2px solid ${i === selectedProduct ? 'var(--color-emerald)' : 'var(--color-border)'}`,
              background: i === selectedProduct ? 'var(--color-emerald-light)' : 'white',
              transition: 'all 150ms',
            }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 4 }}>{p.label}</div>
            <div style={{ fontSize: 13, color: 'var(--color-slate)', marginBottom: 8 }}>{p.desc}</div>
            <div style={{ fontSize: 12, color: 'var(--color-emerald)', fontWeight: 600 }}>Mulai dari {p.rate}% p.a. — maks {p.tenor} tahun</div>
          </button>
        ))}
      </div>

      {/* Calculator */}
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: 'var(--color-navy)' }}>Simulasi Cicilan</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, marginBottom: 48, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Price */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>Harga Properti</label>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-emerald)' }}>{formatCurrency(price, true)}</span>
            </div>
            <input type="range" min={200_000_000} max={10_000_000_000} step={50_000_000} value={price} onChange={e => setPrice(Number(e.target.value))}
              style={{ width: '100%', height: 6, borderRadius: 999, appearance: 'none', cursor: 'pointer' }} />
          </div>
          {/* DP */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>Uang Muka (DP)</label>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-emerald)' }}>{dp}% — {formatCurrency(price * dp / 100, true)}</span>
            </div>
            <input type="range" min={10} max={50} value={dp} onChange={e => setDp(Number(e.target.value))}
              style={{ width: '100%', height: 6, borderRadius: 999, appearance: 'none', cursor: 'pointer' }} />
          </div>
          {/* Tenor */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>Tenor</label>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-emerald)' }}>{tenor} Tahun</span>
            </div>
            <input type="range" min={1} max={PRODUCTS[selectedProduct].tenor} value={tenor} onChange={e => setTenor(Number(e.target.value))}
              style={{ width: '100%', height: 6, borderRadius: 999, appearance: 'none', cursor: 'pointer' }} />
          </div>
          {/* Rate Chart */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 12 }}>Tren Suku Bunga KPR (6 bulan)</div>
            <MiniChart data={chartData} type="line" color="emerald" height={100} showAxis showGrid />
          </div>
        </div>

        {/* Result Card */}
        <div style={{ position: 'sticky', top: 100, background: 'white', borderRadius: 16, padding: 28, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: 'var(--color-slate)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Cicilan Per Bulan</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--color-navy)' }}>{formatCurrency(cicilan, true)}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: 'var(--color-slate)' }}>Pokok Pinjaman</span>
              <span style={{ fontWeight: 600 }}>{formatCurrency(price * (1 - dp / 100), true)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: 'var(--color-slate)' }}>Total Bunga</span>
              <span style={{ fontWeight: 600 }}>{formatCurrency(totalBunga, true)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderTop: '1px solid var(--color-border)', paddingTop: 10 }}>
              <span style={{ color: 'var(--color-navy)', fontWeight: 600 }}>Total Bayar</span>
              <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>{formatCurrency(totalBayar, true)}</span>
            </div>
          </div>
          <Button className="w-full gap-2 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white" size="lg" asChild>
            <a href="/financing/apply"><ArrowRight size={16} /> Ajukan Pembiayaan</a>
          </Button>
        </div>
      </div>

      {/* Bank Comparison */}
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: 'var(--color-navy)' }}>Perbandingan Bank Partner</h2>
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden', marginBottom: 40 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--color-bg-cool)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: 'var(--color-slate)', textTransform: 'uppercase' }}>Bank</th>
              <th style={{ padding: '12px 20px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: 'var(--color-slate)', textTransform: 'uppercase' }}>Suku Bunga</th>
              <th style={{ padding: '12px 20px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: 'var(--color-slate)', textTransform: 'uppercase' }}>Cicilan/Bulan</th>
              <th style={{ padding: '12px 20px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: 'var(--color-slate)', textTransform: 'uppercase' }}>Total Bayar</th>
              <th style={{ padding: '12px 20px', textAlign: 'center' }}></th>
            </tr>
          </thead>
          <tbody>
            {BANKS.sort((a, b) => a.rate - b.rate).map((bank, i) => {
              const c = calculateKPR(price, bank.rate, tenor, dp);
              const best = i === 0;
              return (
                <tr key={bank.name} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{bank.logo}</span> {bank.name}
                    {best && <span style={{ background: 'var(--color-emerald)', color: 'white', fontSize: 10, padding: '2px 8px', borderRadius: 99, fontWeight: 700 }}>Terbaik</span>}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 600, color: best ? 'var(--color-emerald)' : 'var(--color-navy)' }}>{bank.rate}%</td>
                  <td style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 600 }}>{formatCurrency(c, true)}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'center', color: 'var(--color-slate)' }}>{formatCurrency(c * tenor * 12, true)}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                    <Button variant="outline" size="sm">Pilih</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
