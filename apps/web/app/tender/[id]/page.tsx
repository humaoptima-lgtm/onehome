import { PageShell } from '@/components/layout/PageShell';
import { Timeline } from '@/components/shared/Timeline';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { FileText, Users, Calendar, Wallet, MapPin, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tender = {
  id: 'TND-2024-0156',
  title: 'Renovasi Total Rumah Menteng',
  status: 'bidding',
  property: 'Cluster Menteng Residence, Jakarta Selatan',
  area: 180,
  scope: ['Struktur', 'Dinding & Plafon', 'Lantai', 'MEP', 'Dapur', 'Kamar Mandi'],
  budget: { min: 500_000_000, max: 750_000_000 },
  deadline: '2025-01-15',
  createdAt: '2024-12-10',
  bidsCount: 5,
  invitedVendors: 8,
  description: 'Renovasi total rumah 2 lantai seluas 180m² di area Menteng, Jakarta Selatan. Meliputi pekerjaan struktur, finishing, MEP, dan interior dapur serta kamar mandi.',
};

const bids = [
  { vendor: 'PT Karya Mandiri', rating: 4.8, price: 620_000_000, duration: '4 bulan', status: 'submitted' },
  { vendor: 'CV Bangun Jaya', rating: 4.5, price: 580_000_000, duration: '5 bulan', status: 'submitted' },
  { vendor: 'PT Graha Konstruksi', rating: 4.9, price: 695_000_000, duration: '3.5 bulan', status: 'submitted' },
  { vendor: 'UD Maju Bersama', rating: 4.2, price: 545_000_000, duration: '6 bulan', status: 'submitted' },
  { vendor: 'PT Interior Pro', rating: 4.7, price: 650_000_000, duration: '4 bulan', status: 'submitted' },
];

const timeline = [
  { id: '1', title: 'Tender Dibuat', date: '10 Des 2024', status: 'completed' as const },
  { id: '2', title: 'Undangan Terkirim', description: '8 vendor diundang', date: '10 Des 2024', status: 'completed' as const },
  { id: '3', title: 'Periode Bidding', description: '5 penawaran masuk', date: '10–31 Des 2024', status: 'active' as const },
  { id: '4', title: 'Evaluasi', description: 'Analisis & perbandingan penawaran', status: 'pending' as const },
  { id: '5', title: 'Awarding', description: 'Pemilihan vendor terbaik', status: 'pending' as const },
  { id: '6', title: 'Proyek Dimulai', status: 'pending' as const },
];

export default function TenderDetailPage() {
  return (
    <PageShell title={tender.title} subtitle={`Referensi: ${tender.id}`} backHref="/dashboard/projects" backLabel="Kembali"
      actions={<><Button variant="outline" size="sm" className="gap-1.5"><Download size={14} /> Export</Button><Button size="sm" className="gap-1.5 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white" asChild><a href={`/tender/${tender.id}/bids`}><Users size={14} /> Lihat Penawaran ({bids.length})</a></Button></>}
    >
      {/* Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <div style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 12, color: 'var(--color-slate)', marginBottom: 8 }}>Status</div>
          <StatusBadge status={tender.status} size="md" />
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 12, color: 'var(--color-slate)', marginBottom: 4 }}>Budget</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)' }}>{formatCurrency(tender.budget.min, true)} – {formatCurrency(tender.budget.max, true)}</div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 12, color: 'var(--color-slate)', marginBottom: 4 }}>Penawaran Masuk</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-emerald)' }}>{bids.length} <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--color-slate)' }}>dari {tender.invitedVendors} undangan</span></div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 20, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 12, color: 'var(--color-slate)', marginBottom: 4 }}>Batas Waktu</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)' }}>{formatDate(tender.deadline)}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Description */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 12 }}>Deskripsi Proyek</h3>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>{tender.description}</p>
            <div style={{ display: 'flex', gap: 16, marginTop: 16, color: 'var(--color-slate)', fontSize: 13 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> {tender.property}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={14} /> Dibuat: {formatDate(tender.createdAt)}</span>
            </div>
          </div>

          {/* Scope */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 12 }}>Lingkup Pekerjaan</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tender.scope.map(s => (
                <span key={s} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--color-emerald-light)', color: 'var(--color-emerald)', fontSize: 13, fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Bids Preview */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 16 }}>Penawaran ({bids.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {bids.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderRadius: 8, border: '1px solid var(--color-border)', transition: 'all 150ms' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-bg-cool)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: 'var(--color-navy)' }}>{b.vendor.charAt(0)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>{b.vendor}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-slate)' }}>⭐ {b.rating} · {b.duration}</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-emerald)' }}>{formatCurrency(b.price, true)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Timeline */}
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)', position: 'sticky', top: 100 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 20 }}>Timeline</h3>
          <Timeline items={timeline} />
        </div>
      </div>
    </PageShell>
  );
}
