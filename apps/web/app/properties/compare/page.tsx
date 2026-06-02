'use client';

import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { formatCurrency, formatArea } from '@/lib/utils';
import { Check, X, Star, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const properties = [
  {
    title: 'Cluster Menteng Residence', city: 'Jakarta Selatan', price: 2_850_000_000,
    buildingArea: 180, landArea: 200, bedrooms: 4, bathrooms: 3, floors: 2,
    certificate: 'SHM', condition: 'Siap Huni', parking: 2, year: 2022,
    installment: 18_500_000, renovation: 150_000_000,
    features: ['Taman', 'Club House', 'Kolam Renang', 'Security 24 Jam', 'Smart Home'],
    color: '#1B7A5A',
  },
  {
    title: 'Apartemen SCBD Tower', city: 'Jakarta Pusat', price: 3_200_000_000,
    buildingArea: 120, landArea: 0, bedrooms: 3, bathrooms: 2, floors: 1,
    certificate: 'Strata Title', condition: 'Semi Furnished', parking: 1, year: 2023,
    installment: 22_000_000, renovation: 85_000_000,
    features: ['Gym', 'Sky Lounge', 'Kolam Renang', 'Security 24 Jam', 'Concierge'],
    color: '#2563EB',
  },
  {
    title: 'Villa Ubud Harmony', city: 'Bali', price: 4_500_000_000,
    buildingArea: 250, landArea: 500, bedrooms: 5, bathrooms: 4, floors: 2,
    certificate: 'HGB', condition: 'Baru', parking: 3, year: 2024,
    installment: 28_000_000, renovation: 0,
    features: ['Private Pool', 'Taman Tropis', 'Security 24 Jam', 'Smart Home', 'Rooftop'],
    color: '#C8A951',
  },
];

const rows = [
  { label: 'Harga', key: 'price', format: (v: number) => formatCurrency(v, true), best: 'lowest' },
  { label: 'Luas Bangunan', key: 'buildingArea', format: (v: number) => formatArea(v), best: 'highest' },
  { label: 'Luas Tanah', key: 'landArea', format: (v: number) => v ? formatArea(v) : '—', best: 'highest' },
  { label: 'Kamar Tidur', key: 'bedrooms', format: (v: number) => `${v} KT`, best: 'highest' },
  { label: 'Kamar Mandi', key: 'bathrooms', format: (v: number) => `${v} KM`, best: 'highest' },
  { label: 'Lantai', key: 'floors', format: (v: number) => `${v}`, best: 'none' },
  { label: 'Sertifikat', key: 'certificate', format: (v: string) => v, best: 'none' },
  { label: 'Kondisi', key: 'condition', format: (v: string) => v, best: 'none' },
  { label: 'Parkir', key: 'parking', format: (v: number) => `${v} Mobil`, best: 'highest' },
  { label: 'Tahun Dibangun', key: 'year', format: (v: number) => `${v}`, best: 'highest' },
  { label: 'Cicilan/Bulan', key: 'installment', format: (v: number) => formatCurrency(v, true), best: 'lowest' },
  { label: 'Estimasi Renovasi', key: 'renovation', format: (v: number) => v ? formatCurrency(v, true) : 'Tidak Perlu ✨', best: 'lowest' },
] as const;

export default function PropertyComparePage() {
  return (
    <PageShell title="Bandingkan Properti" subtitle="Bandingkan spesifikasi, harga, dan biaya kepemilikan properti pilihan Anda." backHref="/properties" backLabel="Kembali ke Properti">
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: '20px 24px', textAlign: 'left', width: 180, background: 'var(--color-bg-cool)', fontSize: 13, fontWeight: 600, color: 'var(--color-slate)' }}>Spesifikasi</th>
              {properties.map(p => (
                <th key={p.title} style={{ padding: 20, textAlign: 'center', borderLeft: '1px solid var(--color-border)' }}>
                  <div style={{ width: '100%', height: 120, borderRadius: 8, background: `linear-gradient(135deg, ${p.color}20, ${p.color}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                    <div style={{ fontSize: 40 }}>🏠</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-slate)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><MapPin size={12} /> {p.city}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => {
              const values = properties.map(p => (p as Record<string, unknown>)[row.key] as number);
              const bestIdx = row.best === 'lowest' ? values.indexOf(Math.min(...values.filter(v => v > 0)))
                : row.best === 'highest' ? values.indexOf(Math.max(...values))
                  : -1;
              return (
                <tr key={row.label} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                  <td style={{ padding: '14px 24px', fontSize: 13, fontWeight: 600, color: 'var(--color-navy)', background: 'var(--color-bg-cool)' }}>{row.label}</td>
                  {properties.map((p, i) => (
                    <td key={p.title} style={{
                      padding: '14px 24px', textAlign: 'center', fontSize: 14,
                      fontWeight: i === bestIdx ? 700 : 400,
                      color: i === bestIdx ? 'var(--color-emerald)' : 'var(--color-navy)',
                      background: i === bestIdx ? 'var(--color-emerald-light)' : 'transparent',
                      borderLeft: '1px solid var(--color-border-light)',
                    }}>
                      {(row.format as (v: never) => string)((p as Record<string, unknown>)[row.key] as never)}
                      {i === bestIdx && <span style={{ marginLeft: 6, fontSize: 10 }}>✓ Best</span>}
                    </td>
                  ))}
                </tr>
              );
            })}
            {/* Features row */}
            <tr style={{ borderBottom: '1px solid var(--color-border-light)' }}>
              <td style={{ padding: '14px 24px', fontSize: 13, fontWeight: 600, color: 'var(--color-navy)', background: 'var(--color-bg-cool)', verticalAlign: 'top' }}>Fasilitas</td>
              {properties.map(p => (
                <td key={p.title} style={{ padding: '14px 24px', borderLeft: '1px solid var(--color-border-light)', verticalAlign: 'top' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {p.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-navy)' }}>
                        <Check size={12} style={{ color: 'var(--color-emerald)' }} /> {f}
                      </div>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
          <tfoot>
            <tr style={{ borderTop: '2px solid var(--color-border)' }}>
              <td style={{ padding: '16px 24px', background: 'var(--color-bg-cool)' }}></td>
              {properties.map(p => (
                <td key={p.title} style={{ padding: '16px 24px', textAlign: 'center', borderLeft: '1px solid var(--color-border)' }}>
                  <Button className="gap-2 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white" size="sm">
                    Buat Tender <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
                  </Button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </PageShell>
  );
}
