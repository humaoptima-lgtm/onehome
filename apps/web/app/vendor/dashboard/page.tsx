'use client';
import React from 'react';
import { PageShell, StatCard } from '@/components/layout/PageShell';
import { TrendingUp, Hammer, Gavel, Star, Wallet } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { MiniChart } from '@/components/shared/MiniChart';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Timeline } from '@/components/shared/Timeline';

const revenueData = [
  { name: 'Jul', value: 85 }, { name: 'Agu', value: 92 }, { name: 'Sep', value: 78 },
  { name: 'Okt', value: 110 }, { name: 'Nov', value: 105 }, { name: 'Des', value: 125 },
];
const projectData = [
  { name: 'Aktif', value: 5 }, { name: 'Selesai', value: 12 }, { name: 'Pipeline', value: 3 },
];
const activities = [
  { id: '1', title: 'Undangan tender baru diterima', description: 'Renovasi Dapur — Budget Rp 200–300 Jt', date: '1 jam lalu', status: 'active' as const },
  { id: '2', title: 'Milestone "MEP" menunggu approval', description: 'Proyek Renovasi Menteng', date: '3 jam lalu', status: 'active' as const },
  { id: '3', title: 'Review baru dari klien', description: '⭐ 5.0 — "Kerja sangat rapi dan tepat waktu"', date: 'Kemarin', status: 'completed' as const },
  { id: '4', title: 'Dana Rp 115 Jt direlease', description: 'Milestone "Dinding & Atap" — Proyek Menteng', date: 'Kemarin', status: 'completed' as const },
];

export default function VendorDashboardPage() {
  return (
    <PageShell title="Dashboard Vendor" subtitle="Ringkasan pendapatan, proyek, tender, dan performa Anda." badge="Vendor" badgeColor="var(--color-gold)">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Pendapatan Bulan Ini" value={formatCurrency(125_000_000, true)} icon={<TrendingUp size={22} style={{ color: 'var(--color-emerald)' }} />} trend="up" trendLabel="+18%" />
        <StatCard label="Proyek Aktif" value="5" icon={<Hammer size={22} style={{ color: 'var(--color-emerald)' }} />} />
        <StatCard label="Tender Terbuka" value="3" icon={<Gavel size={22} style={{ color: 'var(--color-emerald)' }} />} trendLabel="Undangan" />
        <StatCard label="Rating" value="4.8 ⭐" icon={<Star size={22} style={{ color: 'var(--color-emerald)' }} />} trend="up" trendLabel="+0.2" />
        <StatCard label="Pending Payment" value={formatCurrency(95_000_000, true)} icon={<Wallet size={22} style={{ color: 'var(--color-emerald)' }} />} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 340px', gap: 24 }}>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 16 }}>Pendapatan Bulanan (Rp Jt)</div>
          <MiniChart data={revenueData} type="bar" color="gold" height={200} showAxis showGrid />
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 16 }}>Distribusi Proyek</div>
          <MiniChart data={projectData} type="donut" height={200} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
            {projectData.map((d, i) => (
              <span key={d.name} style={{ fontSize: 12, color: 'var(--color-slate)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: ['#1B7A5A', '#2563EB', '#C8A951'][i] }} />
                {d.name} ({d.value})
              </span>
            ))}
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 16 }}>Aktivitas Terbaru</h3>
          <Timeline items={activities} />
        </div>
      </div>
    </PageShell>
  );
}
