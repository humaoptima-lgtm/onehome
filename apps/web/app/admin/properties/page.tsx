'use client';
import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatCurrency } from '@/lib/utils';

const data = [
  { id: 'PROP-001', title: 'Cluster Menteng Residence', city: 'Jakarta Selatan', price: 2850000000, type: 'Rumah', status: 'active', owner: 'Developer A', views: 1250 },
  { id: 'PROP-002', title: 'Apartemen SCBD Tower', city: 'Jakarta Pusat', price: 3200000000, type: 'Apartemen', status: 'active', owner: 'Developer B', views: 890 },
  { id: 'PROP-003', title: 'Villa Ubud Harmony', city: 'Bali', price: 4500000000, type: 'Villa', status: 'active', owner: 'Developer C', views: 2100 },
  { id: 'PROP-004', title: 'Ruko Gading Serpong', city: 'Tangerang', price: 1800000000, type: 'Ruko', status: 'inactive', owner: 'Developer D', views: 340 },
  { id: 'PROP-005', title: 'Rumah Bintaro Jaya', city: 'Tangerang Selatan', price: 1500000000, type: 'Rumah', status: 'active', owner: 'Developer E', views: 780 },
];

const columns: Column<typeof data[0]>[] = [
  { key: 'id', label: 'ID', width: '90px' },
  { key: 'title', label: 'Properti', render: r => <span style={{ fontWeight: 600 }}>{r.title}</span> },
  { key: 'city', label: 'Kota' },
  { key: 'type', label: 'Tipe' },
  { key: 'price', label: 'Harga', render: r => formatCurrency(r.price, true) },
  { key: 'views', label: 'Views', align: 'center' },
  { key: 'status', label: 'Status', render: r => <StatusBadge status={r.status} /> },
];

export default function AdminPropertiesPage() {
  return (
    <PageShell title="Manajemen Properti" subtitle="Kelola listing properti di platform.">
      <DataTable columns={columns} data={data} onExport={() => {}} searchPlaceholder="Cari properti..." />
    </PageShell>
  );
}
