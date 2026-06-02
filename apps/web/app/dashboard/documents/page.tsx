'use client';
import React, { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Upload, FileText, Download, Eye, FolderOpen, Image, File } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ['Semua', 'Kontrak', 'Invoice', 'Izin', 'Garansi', 'KPR'];
const docs = [
  { name: 'SPK Renovasi Menteng.pdf', category: 'Kontrak', size: '2.4 MB', date: '10/12/2024', type: 'pdf' },
  { name: 'RAB Detail v3.xlsx', category: 'Kontrak', size: '1.1 MB', date: '10/12/2024', type: 'excel' },
  { name: 'Invoice Milestone 1.pdf', category: 'Invoice', size: '450 KB', date: '15/12/2024', type: 'pdf' },
  { name: 'Invoice Milestone 2.pdf', category: 'Invoice', size: '520 KB', date: '30/12/2024', type: 'pdf' },
  { name: 'IMB Menteng.pdf', category: 'Izin', size: '3.2 MB', date: '05/12/2024', type: 'pdf' },
  { name: 'PBG Menteng.pdf', category: 'Izin', size: '2.8 MB', date: '05/12/2024', type: 'pdf' },
  { name: 'Surat Garansi Struktur.pdf', category: 'Garansi', size: '180 KB', date: '15/01/2025', type: 'pdf' },
  { name: 'Akad KPR BCA.pdf', category: 'KPR', size: '5.1 MB', date: '01/12/2024', type: 'pdf' },
  { name: 'Sertifikat SHM.pdf', category: 'KPR', size: '1.8 MB', date: '01/12/2024', type: 'pdf' },
  { name: 'Foto Progress Minggu 3.zip', category: 'Kontrak', size: '45 MB', date: '22/01/2025', type: 'zip' },
];

export default function DocumentsPage() {
  const [activeCat, setActiveCat] = useState(0);
  const filtered = activeCat === 0 ? docs : docs.filter(d => d.category === categories[activeCat]);

  return (
    <PageShell title="Dokumen" subtitle="Kelola semua dokumen kontrak, invoice, izin, garansi, dan KPR.">
      {/* Upload Zone */}
      <div style={{ border: '2px dashed var(--color-border)', borderRadius: 12, padding: '32px 40px', textAlign: 'center', background: 'white', marginBottom: 24, cursor: 'pointer' }}>
        <Upload size={28} style={{ color: 'var(--color-slate-light)', marginBottom: 8 }} />
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 4 }}>Unggah Dokumen</div>
        <div style={{ fontSize: 12, color: 'var(--color-slate)' }}>Tarik & lepas file di sini, atau klik untuk memilih — PDF, JPG, PNG, ZIP</div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--color-bg-cool)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
        {categories.map((c, i) => (
          <button key={c} onClick={() => setActiveCat(i)} style={{ padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: i === activeCat ? 'white' : 'transparent', color: i === activeCat ? 'var(--color-navy)' : 'var(--color-slate)', border: 'none', cursor: 'pointer', boxShadow: i === activeCat ? 'var(--shadow-sm)' : 'none' }}>
            {c}
          </button>
        ))}
      </div>

      {/* File List */}
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        {filtered.map((doc, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderBottom: i < filtered.length - 1 ? '1px solid var(--color-border-light)' : 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: doc.type === 'pdf' ? '#FEE2E2' : doc.type === 'excel' ? '#DCFCE7' : '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FileText size={18} style={{ color: doc.type === 'pdf' ? '#DC2626' : doc.type === 'excel' ? '#16A34A' : '#2563EB' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>{doc.name}</div>
              <div style={{ fontSize: 12, color: 'var(--color-slate)' }}>{doc.category} · {doc.size} · {doc.date}</div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Eye size={14} /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Download size={14} /></Button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
