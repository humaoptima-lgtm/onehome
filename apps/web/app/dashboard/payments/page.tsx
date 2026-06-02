'use client';
import React from 'react';
import { PageShell, StatCard } from '@/components/layout/PageShell';
import { Shield, Wallet, Clock, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { MiniChart } from '@/components/shared/MiniChart';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';

const releasedData = [
  { name: 'Okt', value: 120 }, { name: 'Nov', value: 195 }, { name: 'Des', value: 280 },
  { name: 'Jan', value: 400 }, { name: 'Feb', value: 480 }, { name: 'Mar', value: 520 },
];

const payments = [
  { id: 'PAY-001', project: 'Renovasi Menteng', milestone: 'Persiapan', amount: 45000000, date: '15/12/2024', status: 'paid' },
  { id: 'PAY-002', project: 'Renovasi Menteng', milestone: 'Pondasi', amount: 120000000, date: '30/12/2024', status: 'paid' },
  { id: 'PAY-003', project: 'Renovasi Menteng', milestone: 'Dinding & Atap', amount: 115000000, date: '15/01/2025', status: 'paid' },
  { id: 'PAY-004', project: 'Renovasi Menteng', milestone: 'MEP', amount: 95000000, date: '25/01/2025', status: 'pending' },
  { id: 'PAY-005', project: 'Interior SCBD', milestone: 'Desain', amount: 50000000, date: '20/12/2024', status: 'paid' },
  { id: 'PAY-006', project: 'Interior SCBD', milestone: 'Material', amount: 85000000, date: '10/01/2025', status: 'pending' },
];

const columns: Column<typeof payments[0]>[] = [
  { key: 'id', label: 'ID', width: '100px' },
  { key: 'project', label: 'Proyek' },
  { key: 'milestone', label: 'Milestone' },
  { key: 'amount', label: 'Jumlah', render: (row) => <span style={{ fontWeight: 600 }}>{formatCurrency(row.amount, true)}</span> },
  { key: 'date', label: 'Tanggal' },
  { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
];

export default function PaymentsPage() {
  return (
    <PageShell title="Escrow & Pembayaran" subtitle="Kelola escrow, retensi, dan riwayat pembayaran Anda.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Escrow Balance" value={formatCurrency(850_000_000, true)} icon={<Shield size={22} style={{ color: 'var(--color-emerald)' }} />} trend="up" trendLabel="Protected" />
        <StatCard label="Dana Direlease" value={formatCurrency(520_000_000, true)} icon={<Wallet size={22} style={{ color: 'var(--color-emerald)' }} />} />
        <StatCard label="Retensi Ditahan" value={formatCurrency(26_000_000, true)} icon={<Clock size={22} style={{ color: 'var(--color-emerald)' }} />} trendLabel="5%" />
        <StatCard label="Pembayaran Pending" value={formatCurrency(180_000_000, true)} icon={<TrendingUp size={22} style={{ color: 'var(--color-emerald)' }} />} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 16 }}>Dana Direlease (Kumulatif, Rp Jt)</h3>
          <MiniChart data={releasedData} type="area" color="emerald" height={180} showAxis showGrid />
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 16 }}>Distribusi per Proyek</h3>
          <MiniChart data={[{ name: 'Renovasi Menteng', value: 620 }, { name: 'Interior SCBD', value: 350 }]} type="donut" height={180} />
        </div>
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 16 }}>Riwayat Pembayaran</h3>
      <DataTable columns={columns} data={payments} onExport={() => {}} />
    </PageShell>
  );
}
