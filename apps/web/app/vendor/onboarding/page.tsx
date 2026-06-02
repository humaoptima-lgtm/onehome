'use client';
import React, { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { CheckCircle2, Upload, ChevronLeft, ChevronRight, Building2, FileText, Shield, Users, Award, FileCheck, Camera, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STEPS = [
  { id: 'company', title: 'Data Perusahaan', icon: Building2 },
  { id: 'legal', title: 'Legalitas', icon: FileText },
  { id: 'portfolio', title: 'Portofolio', icon: Camera },
  { id: 'team', title: 'Tim & SDM', icon: Users },
  { id: 'financial', title: 'Keuangan', icon: Banknote },
  { id: 'certification', title: 'Sertifikasi', icon: Award },
  { id: 'insurance', title: 'Asuransi & Garansi', icon: Shield },
  { id: 'review', title: 'Review & Kirim', icon: FileCheck },
];

export default function VendorOnboardingPage() {
  const [step, setStep] = useState(0);

  return (
    <PageShell title="Pendaftaran Vendor" subtitle="Lengkapi proses onboarding untuk menjadi vendor terverifikasi di One Home." badge="Onboarding" badgeColor="var(--color-gold)">
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 }}>
        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <button key={s.id} onClick={() => setStep(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, cursor: 'pointer', background: active ? 'var(--color-gold-light)' : 'transparent', border: 'none', textAlign: 'left' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: done ? 'var(--color-emerald)' : active ? 'var(--color-gold)' : 'var(--color-bg-cool)', color: done || active ? 'white' : 'var(--color-slate-light)' }}>
                  {done ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                </div>
                <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? 'var(--color-gold)' : done ? 'var(--color-navy)' : 'var(--color-slate)' }}>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div style={{ background: 'white', borderRadius: 12, padding: 32, border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 24 }}>{STEPS[step].title}</h2>
          {step === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { label: 'Nama Perusahaan', ph: 'PT / CV ...' },
                { label: 'Bentuk Badan Usaha', ph: 'PT|CV|UD|Perorangan' },
                { label: 'NPWP Perusahaan', ph: '00.000.000.0-000.000' },
                { label: 'Tahun Berdiri', ph: '2015' },
                { label: 'Alamat Kantor', ph: 'Alamat lengkap' },
                { label: 'Kota / Kabupaten', ph: 'Jakarta Selatan' },
                { label: 'Nomor Telepon Kantor', ph: '021-xxxxxxx' },
                { label: 'Email Perusahaan', ph: 'info@company.com' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--color-navy)' }}>{f.label}</label>
                  {f.ph.includes('|') ? (
                    <select style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 13, background: 'white' }}>
                      {f.ph.split('|').map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input placeholder={f.ph} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 13 }} />
                  )}
                </div>
              ))}
            </div>
          )}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['Akta Pendirian Perusahaan', 'SK Kemenkumham', 'SIUP / NIB', 'TDP (jika ada)', 'NPWP Perusahaan', 'Rekening Koran 3 bulan terakhir'].map(doc => (
                <div key={doc} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderRadius: 8, border: '1px dashed var(--color-border)', background: 'var(--color-bg-cool)' }}>
                  <Upload size={20} style={{ color: 'var(--color-slate)', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-navy)' }}>{doc}</div><div style={{ fontSize: 12, color: 'var(--color-slate)' }}>PDF — Maks 10MB</div></div>
                  <Button variant="outline" size="sm">Upload</Button>
                </div>
              ))}
            </div>
          )}
          {step >= 2 && step <= 6 && (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{['📸', '👷', '💰', '🏅', '🛡️'][step - 2]}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 8 }}>{STEPS[step].title}</h3>
              <p style={{ fontSize: 14, color: 'var(--color-slate)' }}>Lengkapi informasi {STEPS[step].title.toLowerCase()} perusahaan Anda.</p>
            </div>
          )}
          {step === 7 && (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <CheckCircle2 size={56} style={{ color: 'var(--color-emerald)', marginBottom: 16 }} />
              <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 8 }}>Data Siap Dikirim</h3>
              <p style={{ fontSize: 14, color: 'var(--color-slate)', marginBottom: 24 }}>Tim One Home akan memverifikasi dalam 3–5 hari kerja.</p>
              <Button size="lg" className="gap-2 bg-[var(--color-gold)] hover:opacity-90 text-white">Kirim Pendaftaran</Button>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, borderTop: '1px solid var(--color-border)', paddingTop: 20 }}>
            <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ChevronLeft size={16} /> Kembali</Button>
            <Button onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))} className="gap-2 bg-[var(--color-gold)] hover:opacity-90 text-white" disabled={step === STEPS.length - 1}>Selanjutnya <ChevronRight size={16} /></Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
