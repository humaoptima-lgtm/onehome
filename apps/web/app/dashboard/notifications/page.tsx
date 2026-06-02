'use client';
import React, { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Bell, CheckCircle2, Gavel, Wallet, Hammer, Shield, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tabs = ['Semua', 'Email', 'WhatsApp', 'Push'];
const notifications = [
  { title: 'Milestone "Dinding & Atap" disetujui', desc: 'Dana Rp 115 Jt telah direlease ke vendor.', time: '2 jam lalu', type: 'project', read: false, channel: 'Push' },
  { title: 'Penawaran baru dari PT Graha Konstruksi', desc: 'Tender Renovasi Dapur — Harga Rp 695 Jt, durasi 3.5 bulan.', time: '5 jam lalu', type: 'tender', read: false, channel: 'Email' },
  { title: 'Cicilan KPR bulan Desember berhasil', desc: 'KPR BCA — Rp 10.450.000 telah dibayarkan.', time: 'Kemarin', type: 'payment', read: false, channel: 'WhatsApp' },
  { title: 'Dokumen KPR diverifikasi', desc: 'SLIK/BI Checking selesai. Menunggu appraisal properti.', time: 'Kemarin', type: 'finance', read: true, channel: 'Email' },
  { title: 'Vendor PT Karya Mandiri mengirim update progress', desc: '3 foto baru ditambahkan ke proyek Renovasi Menteng.', time: '2 hari lalu', type: 'project', read: true, channel: 'Push' },
  { title: 'Escrow funded untuk proyek Interior SCBD', desc: 'Dana Rp 350 Jt telah masuk ke rekening escrow.', time: '3 hari lalu', type: 'escrow', read: true, channel: 'WhatsApp' },
  { title: 'Tender Renovasi Dapur mendapat 3 penawaran', desc: 'Silakan review dan bandingkan penawaran dari vendor.', time: '4 hari lalu', type: 'tender', read: true, channel: 'Email' },
  { title: 'Pengingat: Cicilan KPR Januari', desc: 'Jatuh tempo 25 Januari 2025 — Rp 10.450.000.', time: '5 hari lalu', type: 'payment', read: true, channel: 'Push' },
];

const typeIcons: Record<string, React.ReactNode> = {
  project: <Hammer size={16} />, tender: <Gavel size={16} />, payment: <Wallet size={16} />,
  finance: <Shield size={16} />, escrow: <Shield size={16} />,
};
const typeColors: Record<string, string> = {
  project: 'var(--color-emerald)', tender: 'var(--color-info)', payment: 'var(--color-gold)',
  finance: 'var(--color-info)', escrow: 'var(--color-emerald)',
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [readState, setReadState] = useState(new Set(notifications.filter(n => n.read).map((_, i) => i)));
  const filtered = activeTab === 0 ? notifications : notifications.filter(n => n.channel === tabs[activeTab]);

  return (
    <PageShell title="Notifikasi" subtitle="Semua pemberitahuan terkait proyek, tender, pembayaran, dan pembiayaan." actions={<Button variant="outline" size="sm" onClick={() => setReadState(new Set(notifications.map((_, i) => i)))}>Tandai Semua Dibaca</Button>}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--color-bg-cool)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
        {tabs.map((t, i) => {
          const icon = i === 1 ? <Mail size={13} /> : i === 2 ? <MessageSquare size={13} /> : i === 3 ? <Smartphone size={13} /> : <Bell size={13} />;
          return (
            <button key={t} onClick={() => setActiveTab(i)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: i === activeTab ? 'white' : 'transparent', color: i === activeTab ? 'var(--color-navy)' : 'var(--color-slate)', border: 'none', cursor: 'pointer', boxShadow: i === activeTab ? 'var(--shadow-sm)' : 'none' }}>
              {icon} {t}
            </button>
          );
        })}
      </div>

      <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        {filtered.map((n, i) => {
          const origIdx = notifications.indexOf(n);
          const isRead = readState.has(origIdx);
          return (
            <div key={i} onClick={() => setReadState(prev => new Set([...prev, origIdx]))}
              style={{ display: 'flex', gap: 16, padding: '16px 20px', borderBottom: i < filtered.length - 1 ? '1px solid var(--color-border-light)' : 'none', background: isRead ? 'transparent' : 'var(--color-info-light)', cursor: 'pointer', transition: 'background 150ms' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${typeColors[n.type]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: typeColors[n.type] }}>
                {typeIcons[n.type]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: isRead ? 400 : 600, color: 'var(--color-navy)', marginBottom: 2 }}>{n.title}</div>
                <div style={{ fontSize: 13, color: 'var(--color-slate)', marginBottom: 4 }}>{n.desc}</div>
                <div style={{ fontSize: 11, color: 'var(--color-slate-light)' }}>{n.time} · {n.channel}</div>
              </div>
              {!isRead && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-info)', flexShrink: 0, marginTop: 6 }} />}
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
