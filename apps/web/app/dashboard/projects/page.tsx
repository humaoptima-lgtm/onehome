'use client';
import React, { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Hammer, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const tabs = ['Aktif', 'Selesai', 'Dibatalkan'];
const allProjects = [
  { id: 'PRJ-001', name: 'Renovasi Rumah Menteng', vendor: 'PT Karya Mandiri', progress: 65, status: 'in_progress', budget: 'Rp 620 Jt', milestones: '4/7', tab: 'Aktif', color: '#1B7A5A' },
  { id: 'PRJ-002', name: 'Interior Apartemen SCBD', vendor: 'PT Interior Pro', progress: 30, status: 'in_progress', budget: 'Rp 350 Jt', milestones: '2/5', tab: 'Aktif', color: '#2563EB' },
  { id: 'PRJ-003', name: 'Renovasi Dapur Villa Ubud', vendor: 'CV Bangun Jaya', progress: 100, status: 'completed', budget: 'Rp 185 Jt', milestones: '5/5', tab: 'Selesai', color: '#C8A951' },
  { id: 'PRJ-004', name: 'Cat Ulang Ruko Gading', vendor: 'UD Maju Bersama', progress: 0, status: 'cancelled', budget: 'Rp 45 Jt', milestones: '0/3', tab: 'Dibatalkan', color: '#DC2626' },
];

export default function DashboardProjectsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const filtered = allProjects.filter(p => p.tab === tabs[activeTab]);

  return (
    <PageShell title="Proyek Saya" subtitle="Kelola semua proyek renovasi dan konstruksi Anda.">
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--color-bg-cool)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)} style={{ padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: i === activeTab ? 'white' : 'transparent', color: i === activeTab ? 'var(--color-navy)' : 'var(--color-slate)', border: 'none', cursor: 'pointer', boxShadow: i === activeTab ? 'var(--shadow-sm)' : 'none', transition: 'all 150ms' }}>
            {t} ({allProjects.filter(p => p.tab === t).length})
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 20, transition: 'all 150ms' }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: `${p.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Hammer size={24} style={{ color: p.color }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-navy)' }}>{p.name}</span>
                <StatusBadge status={p.status} />
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-slate)', marginBottom: 8 }}>{p.vendor} · Budget: {p.budget} · Milestone: {p.milestones}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, maxWidth: 300, height: 8, borderRadius: 999, background: 'var(--color-bg-cool)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${p.progress}%`, background: p.status === 'completed' ? 'var(--color-emerald)' : p.status === 'cancelled' ? 'var(--color-danger)' : 'var(--color-emerald)', borderRadius: 999 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-emerald)' }}>{p.progress}%</span>
              </div>
            </div>
            <Link href={`/dashboard/projects/${p.id}`}><Button variant="outline" size="sm" className="gap-1.5">Detail <ArrowRight size={14} /></Button></Link>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
