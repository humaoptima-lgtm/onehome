'use client';
import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { DataTable, Column } from '@/components/shared/DataTable';

const data = [
  { id: 'AUD-001', actor: 'Lisa Permata', action: 'Approve Vendor', target: 'PT Graha Konstruksi', ip: '103.xx.xx.45', timestamp: '25/01/2025 10:30:15' },
  { id: 'AUD-002', actor: 'System', action: 'Escrow Release', target: 'ESC-001 — Rp 115 Jt', ip: '—', timestamp: '25/01/2025 10:28:00' },
  { id: 'AUD-003', actor: 'Budi Santoso', action: 'Login', target: 'Dashboard', ip: '182.xx.xx.12', timestamp: '25/01/2025 09:45:00' },
  { id: 'AUD-004', actor: 'Lisa Permata', action: 'Update Settings', target: 'Fee Rate → 2.5%', ip: '103.xx.xx.45', timestamp: '24/01/2025 16:20:00' },
  { id: 'AUD-005', actor: 'System', action: 'Auto-Reject', target: 'LN-005 — High Risk', ip: '—', timestamp: '24/01/2025 14:00:00' },
  { id: 'AUD-006', actor: 'PT Karya Mandiri', action: 'Submit Milestone', target: 'PRJ-001 — MEP', ip: '36.xx.xx.89', timestamp: '24/01/2025 11:30:00' },
  { id: 'AUD-007', actor: 'System', action: 'Cron: Backup DB', target: 'one_home_prod', ip: '—', timestamp: '24/01/2025 02:00:00' },
];

const columns: Column<typeof data[0]>[] = [
  { key: 'id', label: 'ID', width: '90px' },
  { key: 'timestamp', label: 'Waktu' },
  { key: 'actor', label: 'Aktor', render: r => <span style={{ fontWeight: r.actor === 'System' ? 400 : 600, fontStyle: r.actor === 'System' ? 'italic' : 'normal' }}>{r.actor}</span> },
  { key: 'action', label: 'Aksi', render: r => <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: 'var(--color-bg-cool)' }}>{r.action}</span> },
  { key: 'target', label: 'Target' },
  { key: 'ip', label: 'IP Address' },
];

export default function AdminAuditPage() {
  return (
    <PageShell title="Audit Logs" subtitle="Riwayat semua aktivitas penting di platform.">
      <DataTable columns={columns} data={data} onExport={() => { }} searchPlaceholder="Cari log..." />
    </PageShell>
  );
}
