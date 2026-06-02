'use client';
import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { User, Shield, FileCheck, Globe, Smartphone, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';

export default function ProfilePage() {
  return (
    <PageShell title="Profil Saya" subtitle="Kelola data pribadi, keamanan, verifikasi KYC, dan preferensi.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Personal Data */}
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><User size={18} /> Data Pribadi</h3>
          {[
            { label: 'Nama Lengkap', value: 'Budi Santoso' },
            { label: 'Email', value: 'budi@example.com' },
            { label: 'Telepon', value: '0812-3456-7890' },
            { label: 'Alamat', value: 'Jl. Menteng Raya No. 15, Jakarta Pusat' },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: 'var(--color-slate)', display: 'block', marginBottom: 4 }}>{f.label}</label>
              <input defaultValue={f.value} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 13 }} />
            </div>
          ))}
          <Button className="bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white">Simpan Perubahan</Button>
        </div>

        {/* Security */}
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><Shield size={18} /> Keamanan</h3>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: 'var(--color-slate)', display: 'block', marginBottom: 4 }}>Password</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="password" defaultValue="••••••••" style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 13 }} />
              <Button variant="outline">Ubah</Button>
            </div>
          </div>
          <div style={{ padding: 16, borderRadius: 8, border: '1px solid var(--color-border)', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>Two-Factor Authentication (MFA)</div>
                <div style={{ fontSize: 12, color: 'var(--color-slate)' }}>Tambahkan lapisan keamanan ekstra</div>
              </div>
              <StatusBadge status="active" label="Aktif" />
            </div>
          </div>
          <div style={{ padding: 16, borderRadius: 8, border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 8 }}>Perangkat Aktif</div>
            {['Chrome — Windows 11 · Jakarta', 'Safari — iPhone 15 · Jakarta'].map(d => (
              <div key={d} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--color-border-light)', fontSize: 13 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Smartphone size={14} /> {d}</span>
                <Button variant="ghost" size="sm" style={{ fontSize: 12, color: 'var(--color-danger)' }}>Logout</Button>
              </div>
            ))}
          </div>
        </div>

        {/* KYC */}
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><FileCheck size={18} /> Verifikasi KYC</h3>
          {[
            { label: 'KTP', status: 'verified' }, { label: 'NPWP', status: 'verified' },
            { label: 'Kartu Keluarga', status: 'verified' }, { label: 'Rekening Koran', status: 'pending' },
            { label: 'Slip Gaji', status: 'unverified' },
          ].map(doc => (
            <div key={doc.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--color-border-light)' }}>
              <span style={{ fontSize: 13, color: 'var(--color-navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
                {doc.status === 'verified' ? <CheckCircle2 size={14} style={{ color: 'var(--color-emerald)' }} /> : <AlertCircle size={14} style={{ color: 'var(--color-warning)' }} />}
                {doc.label}
              </span>
              <StatusBadge status={doc.status} />
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}><Globe size={18} /> Preferensi</h3>
          {[
            { label: 'Bahasa', options: ['Bahasa Indonesia', 'English'] },
            { label: 'Zona Waktu', options: ['WIB (Jakarta)', 'WITA (Makassar)', 'WIT (Jayapura)'] },
            { label: 'Mata Uang', options: ['IDR (Rupiah)'] },
          ].map(pref => (
            <div key={pref.label} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: 'var(--color-slate)', display: 'block', marginBottom: 4 }}>{pref.label}</label>
              <select style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 13, background: 'white' }}>
                {pref.options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div style={{ padding: 16, borderRadius: 8, border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 12 }}>Notifikasi</div>
            {['Email', 'WhatsApp', 'Push Notification'].map(ch => (
              <div key={ch} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                <span style={{ fontSize: 13 }}>{ch}</span>
                <label style={{ position: 'relative', width: 40, height: 22, background: 'var(--color-emerald)', borderRadius: 999, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ display: 'none' }} />
                  <span style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: 'white', transition: '0.2s' }} />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
