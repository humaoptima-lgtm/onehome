'use client';

import React from 'react';
import { PageShell, StatCard } from '@/components/layout/PageShell';
import { Building2, Gavel, Wallet, Hammer, Bell, FileText, Shield, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { MiniChart } from '@/components/shared/MiniChart';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Timeline } from '@/components/shared/Timeline';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const projectChartData = [
  { name: 'Min 1', value: 15 }, { name: 'Min 2', value: 28 }, { name: 'Min 3', value: 35 },
  { name: 'Min 4', value: 42 }, { name: 'Min 5', value: 55 }, { name: 'Min 6', value: 65 },
];

const revenueData = [
  { name: 'Jul', value: 12 }, { name: 'Agu', value: 18 }, { name: 'Sep', value: 15 },
  { name: 'Okt', value: 22 }, { name: 'Nov', value: 28 }, { name: 'Des', value: 35 },
];

const activities = [
  { id: '1', title: 'Milestone "Struktur" disetujui', description: 'Proyek Renovasi Menteng — Dana Rp 120 Jt direlease', date: '2 jam lalu', status: 'completed' as const },
  { id: '2', title: 'Penawaran baru dari PT Graha Konstruksi', description: 'Tender Renovasi Dapur — Rp 695 Jt', date: '5 jam lalu', status: 'active' as const },
  { id: '3', title: 'Dokumen KPR diverifikasi', description: 'KPR BCA — SLIK/BI Checking selesai', date: 'Kemarin', status: 'completed' as const },
  { id: '4', title: 'Cicilan KPR bulan Desember dibayar', description: 'BCA — Rp 10.450.000', date: '2 hari lalu', status: 'completed' as const },
];

const projects = [
  { name: 'Renovasi Rumah Menteng', vendor: 'PT Karya Mandiri', progress: 65, status: 'in_progress' },
  { name: 'Interior Apartemen SCBD', vendor: 'PT Interior Pro', progress: 30, status: 'in_progress' },
];

export default function DashboardPage() {
  return (
    <PageShell title="Dashboard" subtitle="Selamat datang kembali. Berikut ringkasan aktivitas Anda.">
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Properti Saya" value="3" icon={<Building2 size={22} style={{ color: 'var(--color-emerald)' }} />} trend="up" trendLabel="+1 baru" />
        <StatCard label="Proyek Aktif" value="2" icon={<Hammer size={22} style={{ color: 'var(--color-emerald)' }} />} trend="neutral" trendLabel="Berjalan" />
        <StatCard label="Tender Aktif" value="1" icon={<Gavel size={22} style={{ color: 'var(--color-emerald)' }} />} trendLabel="3 penawaran" />
        <StatCard label="Escrow Balance" value={formatCurrency(850_000_000, true)} icon={<Shield size={22} style={{ color: 'var(--color-emerald)' }} />} trend="up" trendLabel="Protected" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Active Projects */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)' }}>Proyek Aktif</h3>
              <Link href="/dashboard/projects"><Button variant="ghost" size="sm">Lihat Semua</Button></Link>
            </div>
            {projects.map(p => (
              <div key={p.name} style={{ padding: 16, borderRadius: 8, border: '1px solid var(--color-border)', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-slate)' }}>{p.vendor}</div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'var(--color-bg-cool)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${p.progress}%`, background: 'var(--color-emerald)', borderRadius: 999, transition: 'width 500ms' }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-emerald)' }}>{p.progress}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 16 }}>Progress Proyek</div>
              <MiniChart data={projectChartData} type="area" color="emerald" height={140} showAxis />
            </div>
            <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 16 }}>Pengeluaran (Jt)</div>
              <MiniChart data={revenueData} type="bar" color="info" height={140} showAxis />
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Buat Tender', href: '/tender/create', icon: '📋' },
              { label: 'Cari Properti', href: '/properties', icon: '🏠' },
              { label: 'Simulasi KPR', href: '/financing', icon: '💰' },
            ].map(a => (
              <Link key={a.label} href={a.href} style={{
                padding: 20, borderRadius: 12, background: 'white', border: '1px solid var(--color-border)',
                textAlign: 'center', textDecoration: 'none', transition: 'all 150ms',
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{a.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-navy)' }}>{a.label}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Activity Timeline */}
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)', position: 'sticky', top: 100 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)' }}>Aktivitas Terbaru</h3>
            <span style={{ background: 'var(--color-danger)', color: 'white', fontSize: 10, padding: '2px 8px', borderRadius: 99, fontWeight: 700 }}>5 baru</span>
          </div>
          <Timeline items={activities} />
        </div>
      </div>
    </PageShell>
  );
}
