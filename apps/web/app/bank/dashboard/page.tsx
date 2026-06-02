'use client';
import React from 'react';
import { PageShell, StatCard } from '@/components/layout/PageShell';
import { FileCheck, TrendingUp, AlertTriangle, Wallet, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { MiniChart } from '@/components/shared/MiniChart';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';

const pipelineData = [
  { name: 'Jan', value: 12 }, { name: 'Feb', value: 15 }, { name: 'Mar', value: 18 },
  { name: 'Apr', value: 14 }, { name: 'Mei', value: 22 }, { name: 'Jun', value: 19 },
];
const disbursementData = [
  { name: 'Jan', value: 45 }, { name: 'Feb', value: 62 }, { name: 'Mar', value: 78 },
  { name: 'Apr', value: 55 }, { name: 'Mei', value: 90 }, { name: 'Jun', value: 85 },
];

const applications = [
  { id: 'LN-001', applicant: 'Budi Santoso', product: 'KPR', amount: 1200000000, status: 'review', date: '15/12/2024', risk: 'Low' },
  { id: 'LN-002', applicant: 'Siti Rahayu', product: 'KPR Renovasi', amount: 350000000, status: 'approved', date: '10/12/2024', risk: 'Low' },
  { id: 'LN-003', applicant: 'Andi Wijaya', product: 'KPR', amount: 2100000000, status: 'review', date: '18/12/2024', risk: 'Medium' },
  { id: 'LN-004', applicant: 'Maya Chen', product: 'Kredit Renovasi', amount: 450000000, status: 'disbursed', date: '05/12/2024', risk: 'Low' },
  { id: 'LN-005', applicant: 'Denny P.', product: 'KPR', amount: 1800000000, status: 'rejected', date: '20/12/2024', risk: 'High' },
];

const columns: Column<typeof applications[0]>[] = [
  { key: 'id', label: 'ID', width: '90px' },
  { key: 'applicant', label: 'Pemohon', render: r => <span style={{ fontWeight: 600 }}>{r.applicant}</span> },
  { key: 'product', label: 'Produk' },
  { key: 'amount', label: 'Jumlah', render: r => formatCurrency(r.amount, true) },
  { key: 'risk', label: 'Risk', render: r => <span style={{ color: r.risk === 'High' ? 'var(--color-danger)' : r.risk === 'Medium' ? 'var(--color-warning)' : 'var(--color-emerald)', fontWeight: 600 }}>{r.risk}</span> },
  { key: 'date', label: 'Tanggal' },
  { key: 'status', label: 'Status', render: r => <StatusBadge status={r.status} /> },
];

export default function BankDashboardPage() {
  return (
    <PageShell title="Bank Dashboard" subtitle="Overview pipeline pengajuan, approval, dan disbursement." badge="Bank Portal" badgeColor="var(--color-info)">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Total Aplikasi" value="48" icon={<FileCheck size={22} style={{ color: 'var(--color-emerald)' }} />} trend="up" trendLabel="+12" />
        <StatCard label="Menunggu Review" value="8" icon={<Clock size={22} style={{ color: 'var(--color-emerald)' }} />} />
        <StatCard label="Approval Rate" value="78%" icon={<TrendingUp size={22} style={{ color: 'var(--color-emerald)' }} />} trend="up" trendLabel="+5%" />
        <StatCard label="Total Disbursed" value={formatCurrency(85_000_000_000, true)} icon={<Wallet size={22} style={{ color: 'var(--color-emerald)' }} />} />
        <StatCard label="NPL Rate" value="1.2%" icon={<AlertTriangle size={22} style={{ color: 'var(--color-emerald)' }} />} trend="down" trendLabel="-0.3%" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 16 }}>Pipeline Aplikasi</h3>
          <MiniChart data={pipelineData} type="bar" color="info" height={180} showAxis showGrid />
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 16 }}>Disbursement (Rp Miliar)</h3>
          <MiniChart data={disbursementData} type="area" color="emerald" height={180} showAxis showGrid />
        </div>
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 16 }}>Aplikasi Terbaru</h3>
      <DataTable columns={columns} data={applications} onExport={() => {}} />
    </PageShell>
  );
}
