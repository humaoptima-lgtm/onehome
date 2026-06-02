'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  // Tender FSM
  draft: { bg: '#F1F5F9', color: '#64748B', label: 'Draft' },
  open: { bg: '#DBEAFE', color: '#2563EB', label: 'Terbuka' },
  bidding: { bg: '#FEF9C3', color: '#CA8A04', label: 'Bidding' },
  evaluation: { bg: '#FDE68A', color: '#B45309', label: 'Evaluasi' },
  awarded: { bg: '#DCFCE7', color: '#16A34A', label: 'Awarded' },
  closed: { bg: '#F1F5F9', color: '#475569', label: 'Ditutup' },
  cancelled: { bg: '#FEE2E2', color: '#DC2626', label: 'Dibatalkan' },

  // Project FSM
  created: { bg: '#DBEAFE', color: '#2563EB', label: 'Dibuat' },
  in_progress: { bg: '#FEF9C3', color: '#CA8A04', label: 'Berjalan' },
  on_hold: { bg: '#FDE68A', color: '#B45309', label: 'Ditunda' },
  completed: { bg: '#DCFCE7', color: '#16A34A', label: 'Selesai' },

  // Milestone FSM
  pending: { bg: '#F1F5F9', color: '#64748B', label: 'Menunggu' },
  submitted: { bg: '#DBEAFE', color: '#2563EB', label: 'Diajukan' },
  approved: { bg: '#DCFCE7', color: '#16A34A', label: 'Disetujui' },
  rejected: { bg: '#FEE2E2', color: '#DC2626', label: 'Ditolak' },

  // Loan FSM
  review: { bg: '#FEF9C3', color: '#CA8A04', label: 'Review' },
  disbursed: { bg: '#DCFCE7', color: '#16A34A', label: 'Dicairkan' },

  // Escrow
  funded: { bg: '#DCFCE7', color: '#16A34A', label: 'Funded' },
  partial_release: { bg: '#FEF9C3', color: '#CA8A04', label: 'Partial Release' },
  full_release: { bg: '#DCFCE7', color: '#16A34A', label: 'Full Release' },
  dispute: { bg: '#FEE2E2', color: '#DC2626', label: 'Dispute' },

  // Vendor
  verified: { bg: '#DCFCE7', color: '#16A34A', label: 'Terverifikasi' },
  unverified: { bg: '#FEF9C3', color: '#CA8A04', label: 'Belum Terverifikasi' },

  // Generic
  active: { bg: '#DCFCE7', color: '#16A34A', label: 'Aktif' },
  inactive: { bg: '#F1F5F9', color: '#64748B', label: 'Nonaktif' },
  suspended: { bg: '#FEE2E2', color: '#DC2626', label: 'Ditangguhkan' },

  // Payment
  paid: { bg: '#DCFCE7', color: '#16A34A', label: 'Dibayar' },
  unpaid: { bg: '#FEE2E2', color: '#DC2626', label: 'Belum Dibayar' },
  overdue: { bg: '#FEE2E2', color: '#DC2626', label: 'Jatuh Tempo' },

  // Notifications
  read: { bg: '#F1F5F9', color: '#64748B', label: 'Dibaca' },
  unread: { bg: '#DBEAFE', color: '#2563EB', label: 'Belum Dibaca' },

  // Document
  uploaded: { bg: '#DCFCE7', color: '#16A34A', label: 'Terunggah' },
  processing: { bg: '#FEF9C3', color: '#CA8A04', label: 'Diproses' },
  failed: { bg: '#FEE2E2', color: '#DC2626', label: 'Gagal' },
};

interface StatusBadgeProps {
  status: string;
  label?: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, label, size = 'sm' }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] || { bg: '#F1F5F9', color: '#64748B', label: status };
  const displayLabel = label || style.label;

  return (
    <Badge
      style={{
        background: style.bg,
        color: style.color,
        border: 'none',
        fontSize: size === 'sm' ? 11 : 12,
        fontWeight: 600,
        padding: size === 'sm' ? '2px 8px' : '4px 12px',
        borderRadius: 999,
      }}
    >
      {displayLabel}
    </Badge>
  );
}
