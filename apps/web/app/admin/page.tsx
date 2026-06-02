'use client';
import React from 'react';
import { PageShell, StatCard } from '@/components/layout/PageShell';
import { Users, Building2, Gavel, Wallet, TrendingUp, ShieldCheck, BarChart3, Activity } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { MiniChart } from '@/components/shared/MiniChart';
import { Timeline } from '@/components/shared/Timeline';

const revenueData = [ { name: 'Jul', value: 2.1 }, { name: 'Agu', value: 2.4 }, { name: 'Sep', value: 2.8 }, { name: 'Okt', value: 3.2 }, { name: 'Nov', value: 3.5 }, { name: 'Des', value: 4.1 } ];
const usersData = [ { name: 'Jul', value: 1200 }, { name: 'Agu', value: 1450 }, { name: 'Sep', value: 1680 }, { name: 'Okt', value: 1920 }, { name: 'Nov', value: 2150 }, { name: 'Des', value: 2480 } ];
const gmvData = [ { name: 'Properti', value: 45 }, { name: 'Renovasi', value: 30 }, { name: 'Interior', value: 15 }, { name: 'KPR', value: 10 } ];

const activities = [
  { id: '1', title: 'User baru mendaftar: Maya Chen', date: '5 menit lalu', status: 'active' as const },
  { id: '2', title: 'Vendor PT Graha terverifikasi', date: '30 menit lalu', status: 'completed' as const },
  { id: '3', title: 'Escrow funded: Rp 350 Jt', date: '1 jam lalu', status: 'completed' as const },
  { id: '4', title: 'Tender TND-0165 dibuat', date: '2 jam lalu', status: 'completed' as const },
  { id: '5', title: 'Dispute raised: ESC-089', date: '3 jam lalu', status: 'error' as const },
];

export default function AdminDashboardPage() {
  return (
    <PageShell title="Admin Dashboard" subtitle="Overview platform One Home — metrik, revenue, dan aktivitas." badge="Super Admin" badgeColor="var(--color-danger)">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Total Users" value="2.480" icon={<Users size={22} style={{ color: 'var(--color-emerald)' }} />} trend="up" trendLabel="+330" />
        <StatCard label="Vendor Aktif" value="156" icon={<ShieldCheck size={22} style={{ color: 'var(--color-emerald)' }} />} trend="up" trendLabel="+12" />
        <StatCard label="GMV Bulan Ini" value={formatCurrency(4_100_000_000, true)} icon={<TrendingUp size={22} style={{ color: 'var(--color-emerald)' }} />} trend="up" trendLabel="+18%" />
        <StatCard label="Escrow Balance" value={formatCurrency(12_500_000_000, true)} icon={<Wallet size={22} style={{ color: 'var(--color-emerald)' }} />} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Properti Listed" value="892" icon={<Building2 size={22} style={{ color: 'var(--color-emerald)' }} />} />
        <StatCard label="Tender Aktif" value="34" icon={<Gavel size={22} style={{ color: 'var(--color-emerald)' }} />} />
        <StatCard label="Revenue (Fee)" value={formatCurrency(820_000_000, true)} icon={<BarChart3 size={22} style={{ color: 'var(--color-emerald)' }} />} />
        <StatCard label="Platform Health" value="99.8%" icon={<Activity size={22} style={{ color: 'var(--color-emerald)' }} />} trend="up" trendLabel="Healthy" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 340px', gap: 24 }}>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>GMV Trend (Rp Miliar)</h3>
          <MiniChart data={revenueData} type="area" color="emerald" height={180} showAxis showGrid />
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>User Growth</h3>
          <MiniChart data={usersData} type="line" color="info" height={180} showAxis showGrid />
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>GMV by Category</h3>
          <MiniChart data={gmvData} type="donut" height={180} />
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Live Feed</h3>
          <Timeline items={activities} />
        </div>
      </div>
    </PageShell>
  );
}
