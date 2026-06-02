import { PageShell } from '@/components/layout/PageShell';
import { Timeline } from '@/components/shared/Timeline';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Shield, Clock, FileText, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const loan = {
  id: 'LN-2024-0831',
  status: 'review',
  product: 'KPR',
  bank: 'BCA',
  amount: 1_200_000_000,
  tenor: 20,
  rate: 8.25,
  cicilan: 10_450_000,
  submittedAt: '2024-12-15',
  property: 'Rumah Cluster Menteng, Jakarta Selatan',
};

const timelineItems = [
  { id: '1', title: 'Pengajuan Dikirim', description: 'Formulir dan dokumen lengkap diterima oleh sistem.', date: '15 Des 2024', status: 'completed' as const },
  { id: '2', title: 'Verifikasi Dokumen', description: 'Tim bank memeriksa kelengkapan dokumen KYC.', date: '16 Des 2024', status: 'completed' as const },
  { id: '3', title: 'SLIK / BI Checking', description: 'Pengecekan riwayat kredit via OJK.', date: '17 Des 2024', status: 'active' as const },
  { id: '4', title: 'Appraisal Properti', description: 'Penilaian properti oleh tim appraisal bank.', status: 'pending' as const },
  { id: '5', title: 'Keputusan Kredit', description: 'Approval/rejection oleh komite kredit.', status: 'pending' as const },
  { id: '6', title: 'Pencairan Dana', description: 'Dana dicairkan ke rekening escrow One Home.', status: 'pending' as const },
];

export default function LoanTrackingPage() {
  return (
    <PageShell title={`Tracking Pembiayaan — ${loan.id}`} subtitle={`Pantau status pengajuan ${loan.product} Anda secara real-time.`} backHref="/financing" backLabel="Kembali ke Pembiayaan">
      {/* Status Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--color-slate)', marginBottom: 4 }}>Status Pengajuan</div>
              <StatusBadge status={loan.status} size="md" />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: 'var(--color-slate)', marginBottom: 4 }}>Referensi</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-navy)' }}>{loan.id}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Produk', value: `${loan.product} ${loan.bank}` },
              { label: 'Jumlah Pinjaman', value: formatCurrency(loan.amount, true) },
              { label: 'Tenor', value: `${loan.tenor} Tahun` },
              { label: 'Suku Bunga', value: `${loan.rate}% p.a.` },
              { label: 'Cicilan/Bulan', value: formatCurrency(loan.cicilan, true) },
              { label: 'Tanggal Pengajuan', value: formatDate(loan.submittedAt) },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: 12, color: 'var(--color-slate)', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 4 }}>Properti</div>
          <div style={{ fontSize: 13, color: 'var(--color-slate)', marginBottom: 20 }}>{loan.property}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8, background: 'var(--color-emerald-light)' }}>
              <Shield size={18} style={{ color: 'var(--color-emerald)' }} />
              <div><div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-emerald)' }}>Escrow Protected</div><div style={{ fontSize: 11, color: 'var(--color-slate)' }}>Dana dilindungi One Home Escrow</div></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8, background: 'var(--color-info-light)' }}>
              <Clock size={18} style={{ color: 'var(--color-info)' }} />
              <div><div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-info)' }}>Estimasi Proses</div><div style={{ fontSize: 11, color: 'var(--color-slate)' }}>5–7 hari kerja tersisa</div></div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <Button variant="outline" size="sm" className="gap-1.5 flex-1"><FileText size={14} /> Lihat Dokumen</Button>
            <Button variant="outline" size="sm" className="gap-1.5 flex-1"><Phone size={14} /> Hubungi Bank</Button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: 'white', borderRadius: 12, padding: 32, border: '1px solid var(--color-border)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 24 }}>Status Timeline</h3>
        <Timeline items={timelineItems} />
      </div>
    </PageShell>
  );
}
