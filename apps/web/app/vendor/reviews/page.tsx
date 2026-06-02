'use client';
import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Star, ThumbsUp } from 'lucide-react';
import { MiniChart } from '@/components/shared/MiniChart';

const ratingDist = [
  { name: '5⭐', value: 28 }, { name: '4⭐', value: 12 }, { name: '3⭐', value: 3 }, { name: '2⭐', value: 1 }, { name: '1⭐', value: 0 },
];

const reviews = [
  { author: 'Budi Santoso', rating: 5, text: 'Kerja sangat rapi dan tepat waktu. Material berkualitas tinggi. Sangat puas dengan hasil renovasi.', date: '20/01/2025', project: 'Renovasi Rumah Menteng', avatar: 'BS' },
  { author: 'Maya Chen', rating: 5, text: 'Komunikasi sangat baik sepanjang proyek. Hasilnya melebihi ekspektasi kami.', date: '15/12/2024', project: 'Renovasi Apartemen 3BR', avatar: 'MC' },
  { author: 'Andi Wijaya', rating: 4, text: 'Kitchen set custom-nya bagus. Ada sedikit delay material tapi ditangani dengan baik.', date: '10/12/2024', project: 'Kitchen Set Custom', avatar: 'AW' },
  { author: 'Siti Rahayu', rating: 5, text: 'Vendor yang sangat profesional. Tim lapangan ramah dan responsif.', date: '05/12/2024', project: 'Interior Kamar Tamu', avatar: 'SR' },
  { author: 'Denny Pratama', rating: 4, text: 'Hasil bagus, garansi juga diberikan dengan jelas. Recommended!', date: '20/11/2024', project: 'Renovasi Kantor Lt.2', avatar: 'DP' },
];

export default function VendorReviewsPage() {
  return (
    <PageShell title="Review & Rating" subtitle="Lihat feedback dari klien dan tingkatkan kualitas layanan Anda.">
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, marginBottom: 32 }}>
        <div style={{ background: 'white', borderRadius: 12, padding: 32, border: '1px solid var(--color-border)', textAlign: 'center' }}>
          <div style={{ fontSize: 56, fontWeight: 800, color: 'var(--color-navy)', lineHeight: 1 }}>4.8</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 2, margin: '8px 0' }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={20} fill={i <= 4 ? '#C8A951' : 'none'} stroke={i <= 4 ? '#C8A951' : '#CBD5E1'} />)}
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-slate)' }}>44 review</div>
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, background: 'var(--color-emerald-light)' }}>
            <ThumbsUp size={16} style={{ color: 'var(--color-emerald)' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-emerald)' }}>95% Recommended</span>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 16 }}>Distribusi Rating</h3>
          <MiniChart data={ratingDist} type="bar" color="gold" height={180} showAxis />
        </div>
      </div>

      {/* Review Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {reviews.map((r, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--color-bg-cool)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: 'var(--color-navy)', flexShrink: 0 }}>{r.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>{r.author}</span>
                    <span style={{ fontSize: 12, color: 'var(--color-slate)', marginLeft: 8 }}>{r.project}</span>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--color-slate)' }}>{r.date}</span>
                </div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= r.rating ? '#C8A951' : 'none'} stroke={s <= r.rating ? '#C8A951' : '#CBD5E1'} />)}
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-slate)', lineHeight: 1.6 }}>{r.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
