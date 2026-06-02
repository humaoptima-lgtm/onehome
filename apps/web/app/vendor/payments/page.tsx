'use client';
import React from 'react';
import { PageShell, StatCard } from '@/components/layout/PageShell';
import { Wallet, Clock, Shield, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { MiniChart } from '@/components/shared/MiniChart';

const incomeData = [
  { name: 'Jul', value: 85 }, { name: 'Agu', value: 92 }, { name: 'Sep', value: 78 },
  { name: 'Okt', value: 110 }, { name: 'Nov', value: 105 }, { name: 'Des', value: 125 },
];

const payments = [
  { id: 'RCV-001', project: 'Renovasi Menteng', milestone: 'Persiapan', amount: 31000000, date: '15/12/2024', status: 'paid', retensi: 1550000 },
  { id: 'RCV-002', project: 'Renovasi Menteng', milestone: 'Pondasi', amount: 93000000, date: '30/12/2024', status: 'paid', retensi: 4650000 },
  { id: 'RCV-003', project: 'Renovasi Menteng', milestone: 'Dinding', amount: 86000000, date: '15/01/2025', status: 'paid', retensi: 4300000 },
  { id: 'RCV-004', project: 'Renovasi Menteng', milestone: 'MEP', amount: 71000000, date: '—', status: 'pending', retensi: 0 },
  { id: 'RCV-005', project: 'Kitchen Set Custom', milestone: 'Material', amount: 45000000, date: '20/01/2025', status: 'paid', retensi: 2250000 },
];

const columns: Column<typeof payments[0]>[] = [
  { key: 'id', label: 'ID', width: '100px' },
  { key: 'project', label: 'Proyek' },
  { key: 'milestone', label: 'Milestone' },
  { key: 'amount', label: 'Jumlah (setelah PPh)', render: r => <span style={{ fontWeight: 600 }}>{formatCurrency(r.amount, true)}</span> },
  { key: 'retensi', label: 'Retensi 5%', render: r => r.retensi ? formatCurrency(r.retensi) : '—' },
  { key: 'date', label: 'Tanggal' },
  { key: 'status', label: 'Status', render: r => <StatusBadge status={r.status} /> },
];

export default function VendorPaymentsPage() {
  return (
    <PageShell title="Pembayaran" subtitle="Kelola receivable, retensi, dan riwayat pembayaran Anda.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Total Diterima" value={formatCurrency(326_000_000, true)} icon={<Wallet size={22} style={{ color: 'var(--color-emerald)' }} />} trend="up" trendLabel="+15%" />
        <StatCard label="Pending" value={formatCurrency(71_000_000, true)} icon={<Clock size={22} style={{ color: 'var(--color-emerald)' }} />} />
        <StatCard label="Retensi Ditahan" value={formatCurrency(12_750_000, true)} icon={<Shield size={22} style={{ color: 'var(--color-emerald)' }} />} trendLabel="5%" />
        <StatCard label="Rata-rata/Bulan" value={formatCurrency(109_000_000, true)} icon={<TrendingUp size={22} style={{ color: 'var(--color-emerald)' }} />} />
      </div>
      <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)', marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 16 }}>Pendapatan Bulanan (Rp Jt)</h3>
        <MiniChart data={incomeData} type="bar" color="gold" height={160} showAxis showGrid />
      </div>
      <DataTable columns={columns} data={payments} onExport={() => {}} />
    </PageShell>
  );
}
