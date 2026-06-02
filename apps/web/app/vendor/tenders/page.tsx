'use client';
import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { formatCurrency } from '@/lib/utils';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { MapPin, Calendar, ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const tenders = [
  { id: 'TND-0160', title: 'Renovasi Dapur Modern', city: 'Jakarta Selatan', budget: { min: 200_000_000, max: 350_000_000 }, deadline: '05/02/2025', scope: ['Dapur', 'Plumbing', 'Lantai'], bidCount: 2, status: 'open' },
  { id: 'TND-0162', title: 'Interior Apartemen 2BR', city: 'Jakarta Pusat', budget: { min: 150_000_000, max: 250_000_000 }, deadline: '10/02/2025', scope: ['Interior', 'Furnitur', 'MEP'], bidCount: 0, status: 'open' },
  { id: 'TND-0165', title: 'Renovasi Kamar Mandi Luxury', city: 'Bali', budget: { min: 80_000_000, max: 150_000_000 }, deadline: '15/02/2025', scope: ['Kamar Mandi', 'Plumbing', 'Lantai'], bidCount: 4, status: 'open' },
  { id: 'TND-0155', title: 'Cat Ulang & Finishing 2 Lantai', city: 'Tangerang', budget: { min: 50_000_000, max: 80_000_000 }, deadline: '01/02/2025', scope: ['Cat', 'Plafon', 'Finishing'], bidCount: 6, status: 'bidding' },
  { id: 'TND-0148', title: 'Pembangunan Carport & Taman', city: 'Surabaya', budget: { min: 100_000_000, max: 180_000_000 }, deadline: '28/01/2025', scope: ['Struktur', 'Landscaping'], bidCount: 3, status: 'evaluation' },
];

export default function VendorTendersPage() {
  return (
    <PageShell title="Peluang Tender" subtitle="Jelajahi tender terbuka yang sesuai dengan keahlian Anda." actions={
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-slate-light)' }} />
          <input placeholder="Cari tender..." style={{ padding: '7px 10px 7px 30px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 13, width: 200 }} />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5"><SlidersHorizontal size={14} /> Filter</Button>
      </div>
    }>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {tenders.map(t => (
          <div key={t.id} style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)', transition: 'all 150ms' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)' }}>{t.title}</span>
                  <StatusBadge status={t.status} />
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-slate)', display: 'flex', gap: 16 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={13} /> {t.city}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={13} /> Deadline: {t.deadline}</span>
                  <span>Penawaran: {t.bidCount}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'var(--color-slate)' }}>Budget</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-emerald)' }}>{formatCurrency(t.budget.min, true)} – {formatCurrency(t.budget.max, true)}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {t.scope.map(s => (
                  <span key={s} style={{ padding: '3px 10px', borderRadius: 999, background: 'var(--color-bg-cool)', fontSize: 12, color: 'var(--color-slate)' }}>{s}</span>
                ))}
              </div>
              <Link href={`/vendor/tenders/${t.id}/bid`}>
                <Button size="sm" className="gap-1.5 bg-[var(--color-gold)] hover:opacity-90 text-white">Ajukan Penawaran <ArrowRight size={14} /></Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
