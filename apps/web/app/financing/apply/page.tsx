'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, User, Briefcase, Building2, FileText, Upload, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 'personal', title: 'Data Pribadi', icon: User },
  { id: 'income', title: 'Pendapatan', icon: Briefcase },
  { id: 'employment', title: 'Pekerjaan', icon: Briefcase },
  { id: 'property', title: 'Properti', icon: Building2 },
  { id: 'project', title: 'Proyek', icon: Building2 },
  { id: 'documents', title: 'Dokumen', icon: Upload },
  { id: 'review', title: 'Review & Kirim', icon: FileText },
];

const formFields: Record<string, { label: string; type: string; placeholder: string }[]> = {
  personal: [
    { label: 'Nama Lengkap (sesuai KTP)', type: 'text', placeholder: 'Nama lengkap Anda' },
    { label: 'Nomor KTP', type: 'text', placeholder: '16 digit NIK' },
    { label: 'Tempat Lahir', type: 'text', placeholder: 'Kota/Kabupaten' },
    { label: 'Tanggal Lahir', type: 'date', placeholder: '' },
    { label: 'Email', type: 'email', placeholder: 'email@example.com' },
    { label: 'Nomor Telepon', type: 'tel', placeholder: '08xx-xxxx-xxxx' },
    { label: 'Status Pernikahan', type: 'select', placeholder: 'Belum Menikah|Menikah|Cerai' },
    { label: 'Jumlah Tanggungan', type: 'number', placeholder: '0' },
  ],
  income: [
    { label: 'Pendapatan Bulanan (Gaji)', type: 'text', placeholder: 'Rp 0' },
    { label: 'Pendapatan Tambahan', type: 'text', placeholder: 'Rp 0' },
    { label: 'Pengeluaran Bulanan', type: 'text', placeholder: 'Rp 0' },
    { label: 'Cicilan Lain (jika ada)', type: 'text', placeholder: 'Rp 0' },
    { label: 'NPWP', type: 'text', placeholder: 'Nomor NPWP' },
  ],
  employment: [
    { label: 'Jenis Pekerjaan', type: 'select', placeholder: 'Karyawan|Wiraswasta|Profesional|PNS' },
    { label: 'Nama Perusahaan', type: 'text', placeholder: 'PT ...' },
    { label: 'Jabatan', type: 'text', placeholder: 'Posisi/Jabatan' },
    { label: 'Lama Bekerja (tahun)', type: 'number', placeholder: '0' },
    { label: 'Alamat Kantor', type: 'text', placeholder: 'Alamat lengkap kantor' },
  ],
  property: [
    { label: 'Tipe Properti', type: 'select', placeholder: 'Rumah Tapak|Apartemen|Ruko|Villa' },
    { label: 'Harga Properti', type: 'text', placeholder: 'Rp 0' },
    { label: 'Lokasi Properti', type: 'text', placeholder: 'Kota/Kabupaten' },
    { label: 'Luas Tanah (m²)', type: 'number', placeholder: '0' },
    { label: 'Luas Bangunan (m²)', type: 'number', placeholder: '0' },
    { label: 'Status Sertifikat', type: 'select', placeholder: 'SHM|SHGB|Strata Title|HGB' },
  ],
  project: [
    { label: 'Tipe Proyek', type: 'select', placeholder: 'Renovasi|Bangun Baru|Interior|Furnitur' },
    { label: 'Estimasi Biaya Proyek', type: 'text', placeholder: 'Rp 0' },
    { label: 'Estimasi Durasi (bulan)', type: 'number', placeholder: '0' },
    { label: 'Deskripsi Proyek', type: 'text', placeholder: 'Deskripsi singkat proyek...' },
  ],
};

export default function FinancingApplyPage() {
  const [step, setStep] = useState(0);

  const renderFields = () => {
    const stepId = STEPS[step].id;
    if (stepId === 'documents') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {['KTP', 'NPWP', 'Kartu Keluarga (KK)', 'Slip Gaji (3 bulan terakhir)', 'Rekening Koran (3 bulan terakhir)', 'Surat Keterangan Kerja', 'Foto Properti'].map(doc => (
            <div key={doc} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderRadius: 8, border: '1px dashed var(--color-border)', background: 'var(--color-bg-cool)' }}>
              <Upload size={20} style={{ color: 'var(--color-slate)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-navy)' }}>{doc}</div>
                <div style={{ fontSize: 12, color: 'var(--color-slate)' }}>JPG, PNG, PDF — Maks 5MB</div>
              </div>
              <Button variant="outline" size="sm">Upload</Button>
            </div>
          ))}
        </div>
      );
    }
    if (stepId === 'review') {
      return (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--color-emerald-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--color-emerald)' }}>
            <CheckCircle2 size={36} />
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 8 }}>Data Anda sudah lengkap</h3>
          <p style={{ fontSize: 14, color: 'var(--color-slate)', maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>Silakan periksa kembali semua data yang telah Anda isi. Setelah diajukan, tim kami akan memproses dalam 1–3 hari kerja.</p>
        </div>
      );
    }
    const fields = formFields[stepId] || [];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {fields.map(f => (
          <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-navy)' }}>{f.label}</label>
            {f.type === 'select' ? (
              <select style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 13, background: 'white' }}>
                <option value="">Pilih...</option>
                {f.placeholder.split('|').map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input type={f.type} placeholder={f.placeholder} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 13 }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <PageShell title="Pengajuan Pembiayaan" subtitle="Lengkapi formulir di bawah untuk mengajukan pembiayaan properti." backHref="/financing" backLabel="Kembali ke Pembiayaan">
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32 }}>
        {/* Stepper sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <button key={s.id} onClick={() => setStep(i)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, cursor: 'pointer',
                background: active ? 'var(--color-emerald-light)' : 'transparent',
                border: 'none', textAlign: 'left', transition: 'all 150ms',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: done ? 'var(--color-emerald)' : active ? 'var(--color-emerald)' : 'var(--color-bg-cool)', color: done || active ? 'white' : 'var(--color-slate-light)' }}>
                  {done ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                </div>
                <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? 'var(--color-emerald)' : done ? 'var(--color-navy)' : 'var(--color-slate)' }}>{s.title}</span>
              </button>
            );
          })}
        </div>
        {/* Form */}
        <div style={{ background: 'white', borderRadius: 12, padding: 32, border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 24 }}>{STEPS[step].title}</h2>
          {renderFields()}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
            <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ChevronLeft size={16} /> Kembali</Button>
            <Button onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))} className="gap-2 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white">
              {step === STEPS.length - 1 ? 'Ajukan Pembiayaan' : 'Selanjutnya'} {step < STEPS.length - 1 && <ChevronRight size={16} />}
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
