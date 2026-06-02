'use client';
import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

const users = [
  { id: 'USR-001', name: 'Budi Santoso', email: 'budi@example.com', role: 'Buyer', status: 'active', joined: '15/10/2024', properties: 3 },
  { id: 'USR-002', name: 'Siti Rahayu', email: 'siti@example.com', role: 'Buyer', status: 'active', joined: '20/10/2024', properties: 1 },
  { id: 'USR-003', name: 'Andi Wijaya', email: 'andi@example.com', role: 'Buyer', status: 'active', joined: '01/11/2024', properties: 2 },
  { id: 'USR-004', name: 'Maya Chen', email: 'maya@example.com', role: 'Buyer', status: 'active', joined: '05/11/2024', properties: 1 },
  { id: 'USR-005', name: 'Denny Pratama', email: 'denny@example.com', role: 'Buyer', status: 'suspended', joined: '10/11/2024', properties: 0 },
  { id: 'USR-006', name: 'Lisa Permata', email: 'lisa@example.com', role: 'Admin', status: 'active', joined: '01/09/2024', properties: 0 },
  { id: 'USR-007', name: 'PT Karya Mandiri', email: 'info@karyamandiri.com', role: 'Vendor', status: 'verified', joined: '15/09/2024', properties: 0 },
  { id: 'USR-008', name: 'CV Bangun Jaya', email: 'info@bangunjaya.com', role: 'Vendor', status: 'verified', joined: '20/09/2024', properties: 0 },
];

const columns: Column<typeof users[0]>[] = [
  { key: 'id', label: 'ID', width: '90px' },
  { key: 'name', label: 'Nama', render: r => <span style={{ fontWeight: 600 }}>{r.name}</span> },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', render: r => <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: r.role === 'Admin' ? '#FEE2E2' : r.role === 'Vendor' ? '#FEF9C3' : '#DBEAFE', color: r.role === 'Admin' ? '#DC2626' : r.role === 'Vendor' ? '#CA8A04' : '#2563EB' }}>{r.role}</span> },
  { key: 'status', label: 'Status', render: r => <StatusBadge status={r.status} /> },
  { key: 'joined', label: 'Bergabung' },
  { key: 'properties', label: 'Properti', align: 'center' },
];

export default function AdminUsersPage() {
  return (
    <PageShell title="Manajemen Users" subtitle="Kelola semua pengguna platform One Home." actions={<Button size="sm" className="gap-1.5 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white"><UserPlus size={14} /> Tambah User</Button>}>
      <DataTable columns={columns} data={users} onExport={() => {}} searchPlaceholder="Cari user..." />
    </PageShell>
  );
}
