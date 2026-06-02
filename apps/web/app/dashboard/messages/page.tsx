'use client';
import React, { useState } from 'react';
import { Send, Paperclip, Phone, Video, MoreVertical, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const contacts = [
  { name: 'PT Karya Mandiri', project: 'Renovasi Menteng', avatar: 'KM', lastMsg: 'Material sudah tiba di lokasi.', time: '10:30', unread: 2, color: '#1B7A5A' },
  { name: 'PT Interior Pro', project: 'Interior SCBD', avatar: 'IP', lastMsg: 'Desain final sudah saya kirim.', time: 'Kemarin', unread: 0, color: '#2563EB' },
  { name: 'Agen BCA', project: 'KPR BCA', avatar: 'BC', lastMsg: 'Dokumen appraisal sedang diproses.', time: 'Kemarin', unread: 1, color: '#C8A951' },
  { name: 'One Home Support', project: 'Support', avatar: 'OH', lastMsg: 'Ada yang bisa kami bantu?', time: '2 hari lalu', unread: 0, color: '#64748B' },
];

const messages = [
  { from: 'vendor', text: 'Selamat pagi Pak, material bata ringan dan semen sudah tiba di lokasi proyek.', time: '10:25' },
  { from: 'vendor', text: 'Kami akan mulai pekerjaan dinding hari ini.', time: '10:26' },
  { from: 'user', text: 'Bagus, terima kasih updatenya. Tolong kirim foto progress ya.', time: '10:28' },
  { from: 'vendor', text: '📷 3 foto progress dikirim', time: '10:30' },
  { from: 'vendor', text: 'Material sudah tiba di lokasi.', time: '10:30' },
];

export default function MessagesPage() {
  const [activeContact, setActiveContact] = useState(0);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - var(--nav-height) - 0px)', background: 'white', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden', margin: '24px 32px' }}>
      {/* Sidebar */}
      <div style={{ width: 320, borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 16, borderBottom: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 12 }}>Pesan</h3>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-slate-light)' }} />
            <input type="text" placeholder="Cari percakapan..." style={{ width: '100%', padding: '8px 10px 8px 32px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 13 }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {contacts.map((c, i) => (
            <div key={c.name} onClick={() => setActiveContact(i)} style={{
              padding: '14px 16px', cursor: 'pointer', display: 'flex', gap: 12,
              background: i === activeContact ? 'var(--color-emerald-light)' : 'transparent',
              borderBottom: '1px solid var(--color-border-light)', transition: 'background 100ms',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: c.color, flexShrink: 0 }}>{c.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-navy)' }}>{c.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--color-slate-light)' }}>{c.time}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-slate)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.lastMsg}</div>
              </div>
              {c.unread > 0 && <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-emerald)', color: 'white', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, alignSelf: 'center' }}>{c.unread}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${contacts[activeContact].color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: contacts[activeContact].color }}>{contacts[activeContact].avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>{contacts[activeContact].name}</div>
            <div style={{ fontSize: 11, color: 'var(--color-emerald)' }}>● Online</div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Phone size={16} /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Video size={16} /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical size={16} /></Button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--color-bg-cool)' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '70%', padding: '10px 14px', borderRadius: 12,
                background: m.from === 'user' ? 'var(--color-emerald)' : 'white',
                color: m.from === 'user' ? 'white' : 'var(--color-navy)',
                fontSize: 13, lineHeight: 1.5,
                borderBottomRightRadius: m.from === 'user' ? 4 : 12,
                borderBottomLeftRadius: m.from === 'user' ? 12 : 4,
                boxShadow: 'var(--shadow-xs)',
              }}>
                {m.text}
                <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, textAlign: 'right' }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 8 }}>
          <Button variant="ghost" size="icon" className="h-10 w-10"><Paperclip size={18} /></Button>
          <input type="text" placeholder="Tulis pesan..." style={{ flex: 1, padding: '8px 14px', border: '1px solid var(--color-border)', borderRadius: 999, fontSize: 13 }} />
          <Button size="icon" className="h-10 w-10 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white rounded-full"><Send size={16} /></Button>
        </div>
      </div>
    </div>
  );
}
