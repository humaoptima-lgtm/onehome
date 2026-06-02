'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatCurrency, formatArea } from '@/lib/utils';
import { MapPin, Heart, Clock, Building2 } from 'lucide-react';

const tabs = ['Dimiliki', 'Favorit', 'Riwayat'];

const properties = {
  Dimiliki: [
    { title: 'Cluster Menteng Residence', city: 'Jakarta Selatan', price: 2_850_000_000, area: 180, status: 'active', type: 'Rumah', color: '#1B7A5A' },
    { title: 'Apartemen SCBD Tower', city: 'Jakarta Pusat', price: 3_200_000_000, area: 120, status: 'active', type: 'Apartemen', color: '#2563EB' },
    { title: 'Villa Ubud Harmony', city: 'Bali', price: 4_500_000_000, area: 250, status: 'active', type: 'Villa', color: '#C8A951' },
  ],
  Favorit: [
    { title: 'Rumah Bintaro Jaya', city: 'Tangerang Selatan', price: 1_500_000_000, area: 150, status: 'active', type: 'Rumah', color: '#8B5CF6' },
    { title: 'Townhouse BSD', city: 'Tangerang', price: 2_200_000_000, area: 160, status: 'active', type: 'Townhouse', color: '#EC4899' },
  ],
  Riwayat: [
    { title: 'Ruko Gading Serpong', city: 'Tangerang', price: 1_800_000_000, area: 90, status: 'closed', type: 'Ruko', color: '#DC2626' },
  ],
};

export default function DashboardPropertiesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const items = properties[tabs[activeTab] as keyof typeof properties];

  return (
    <PageShell title="Properti Saya" subtitle="Kelola properti yang Anda miliki, simpan, dan riwayat.">
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--color-bg-cool)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)} style={{
            padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            background: i === activeTab ? 'white' : 'transparent',
            color: i === activeTab ? 'var(--color-navy)' : 'var(--color-slate)',
            border: 'none', cursor: 'pointer', boxShadow: i === activeTab ? 'var(--shadow-sm)' : 'none',
            transition: 'all 150ms',
          }}>
            {t} ({properties[t as keyof typeof properties].length})
          </button>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {items.map(p => (
          <div key={p.title} style={{ background: 'white', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden', transition: 'all 200ms', cursor: 'pointer' }}>
            <div style={{ height: 160, background: `linear-gradient(135deg, ${p.color}20, ${p.color}50)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Building2 size={40} style={{ color: p.color, opacity: 0.5 }} />
              <div style={{ position: 'absolute', top: 12, right: 12 }}><StatusBadge status={p.status} /></div>
              {activeTab === 1 && <div style={{ position: 'absolute', top: 12, left: 12, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Heart size={14} fill="#DC2626" color="#DC2626" /></div>}
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: 'var(--color-slate)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}><MapPin size={13} /> {p.city} · {p.type}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-emerald)' }}>{formatCurrency(p.price, true)}</div>
                <div style={{ fontSize: 12, color: 'var(--color-slate)' }}>{formatArea(p.area)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
