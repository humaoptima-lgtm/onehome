'use client';
import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Hammer, ArrowRight, Calendar, Wallet } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const projects = [
  { name: 'Renovasi Rumah Menteng', client: 'Budi Santoso', progress: 65, budget: 620_000_000, status: 'in_progress', deadline: '15/03/2025' },
  { name: 'Interior Kamar Tamu', client: 'Siti Rahayu', progress: 45, budget: 180_000_000, status: 'in_progress', deadline: '28/02/2025' },
  { name: 'Renovasi Kantor', client: 'PT ABC Corp', progress: 20, budget: 450_000_000, status: 'in_progress', deadline: '30/04/2025' },
  { name: 'Kitchen Set Custom', client: 'Andi Wijaya', progress: 85, budget: 95_000_000, status: 'in_progress', deadline: '05/02/2025' },
  { name: 'Renovasi Apartemen 3BR', client: 'Maya Chen', progress: 100, budget: 350_000_000, status: 'completed', deadline: '15/12/2024' },
];

export default function VendorProjectsPage() {
  return (
    <PageShell title="Proyek Saya" subtitle="Kelola semua proyek yang sedang berjalan dan telah selesai.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {projects.map(p => (
          <div key={p.name} style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, background: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Hammer size={22} style={{ color: 'var(--color-gold)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-navy)' }}>{p.name}</span>
                <StatusBadge status={p.status} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-slate)', display: 'flex', gap: 16 }}>
                <span>Klien: {p.client}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Wallet size={12} /> {formatCurrency(p.budget, true)}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {p.deadline}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                <div style={{ flex: 1, maxWidth: 250, height: 6, borderRadius: 999, background: 'var(--color-bg-cool)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${p.progress}%`, background: p.progress === 100 ? 'var(--color-emerald)' : 'var(--color-gold)', borderRadius: 999 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: p.progress === 100 ? 'var(--color-emerald)' : 'var(--color-gold)' }}>{p.progress}%</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">Detail <ArrowRight size={14} /></Button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
