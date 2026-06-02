'use client';

import React, { useState } from 'react';
import { MapPin, Search, SlidersHorizontal, Building2, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const properties = Array.from({ length: 12 }, (_, i) => ({
  id: `prop-${i}`,
  title: ['Cluster Menteng', 'Apartemen SCBD', 'Villa Ubud', 'Ruko Gading', 'Rumah Bintaro', 'Townhouse BSD'][i % 6],
  city: ['Jakarta Selatan', 'Jakarta Pusat', 'Bali', 'Jakarta Utara', 'Tangerang Selatan', 'Tangerang'][i % 6],
  price: [2_850_000_000, 3_200_000_000, 4_500_000_000, 1_800_000_000, 1_500_000_000, 2_200_000_000][i % 6],
  type: ['Rumah', 'Apartemen', 'Villa', 'Ruko', 'Rumah', 'Townhouse'][i % 6],
  lat: -6.2 + (i * 0.02),
  lng: 106.8 + (i * 0.015),
  color: ['#1B7A5A', '#2563EB', '#C8A951', '#DC2626', '#8B5CF6', '#EC4899'][i % 6],
}));

export default function PropertyMapPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - var(--nav-height))', marginTop: 'var(--nav-height)', position: 'relative' }}>
      {/* Sidebar */}
      <div style={{ width: 420, background: 'white', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Search */}
        <div style={{ padding: 16, borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-slate-light)' }} />
            <input type="text" placeholder="Cari lokasi, properti..." style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 13 }} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Button variant="outline" size="sm" className="gap-1.5"><SlidersHorizontal size={14} /> Filter</Button>
            <Button variant="outline" size="sm">Rumah</Button>
            <Button variant="outline" size="sm">Apartemen</Button>
            <Button variant="outline" size="sm">Villa</Button>
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {properties.map(p => (
            <div key={p.id} onClick={() => setSelected(p.id)}
              style={{
                padding: 16, borderBottom: '1px solid var(--color-border-light)', cursor: 'pointer',
                background: selected === p.id ? 'var(--color-emerald-light)' : 'transparent',
                transition: 'background 150ms',
              }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 80, height: 60, borderRadius: 8, background: `linear-gradient(135deg, ${p.color}30, ${p.color}60)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={20} style={{ color: p.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 2 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-slate)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                    <MapPin size={11} /> {p.city}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-emerald)' }}>{formatCurrency(p.price, true)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div style={{ flex: 1, background: '#E8E4DF', position: 'relative' }}>
        {/* Grid lines to simulate map */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Simulated map labels */}
        <div style={{ position: 'absolute', top: '10%', left: '20%', fontSize: 11, color: 'var(--color-slate-light)', fontWeight: 500 }}>Menteng</div>
        <div style={{ position: 'absolute', top: '30%', left: '50%', fontSize: 11, color: 'var(--color-slate-light)', fontWeight: 500 }}>SCBD</div>
        <div style={{ position: 'absolute', top: '60%', left: '30%', fontSize: 11, color: 'var(--color-slate-light)', fontWeight: 500 }}>Kemang</div>
        <div style={{ position: 'absolute', top: '45%', left: '70%', fontSize: 11, color: 'var(--color-slate-light)', fontWeight: 500 }}>Kuningan</div>

        {/* Property pins */}
        {properties.map((p, i) => (
          <button key={p.id} onClick={() => setSelected(p.id)}
            style={{
              position: 'absolute',
              top: `${15 + (i * 6) % 70}%`,
              left: `${10 + (i * 8) % 80}%`,
              transform: 'translate(-50%, -100%)',
              background: selected === p.id ? 'var(--color-navy)' : 'white',
              color: selected === p.id ? 'white' : 'var(--color-navy)',
              padding: '4px 10px', borderRadius: 20,
              fontSize: 12, fontWeight: 700, border: `2px solid ${selected === p.id ? 'var(--color-navy)' : 'var(--color-border)'}`,
              cursor: 'pointer', boxShadow: 'var(--shadow-md)',
              transition: 'all 200ms', zIndex: selected === p.id ? 10 : 1,
              whiteSpace: 'nowrap',
            }}>
            {formatCurrency(p.price, true)}
          </button>
        ))}

        {/* Selected property popup */}
        {selected && (() => {
          const p = properties.find(pp => pp.id === selected)!;
          const idx = properties.indexOf(p);
          return (
            <div style={{
              position: 'absolute',
              top: `${15 + (idx * 6) % 70 + 3}%`,
              left: `${10 + (idx * 8) % 80}%`,
              transform: 'translateX(-50%)',
              background: 'white', borderRadius: 12, padding: 16,
              boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-border)',
              width: 260, zIndex: 20,
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: 'var(--color-slate)', marginBottom: 8 }}>{p.city} — {p.type}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-emerald)', marginBottom: 12 }}>{formatCurrency(p.price, true)}</div>
              <Link href={`/properties/${p.id}`}>
                <Button size="sm" className="w-full gap-2 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white">
                  Lihat Detail <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          );
        })()}

        {/* Map controls */}
        <div style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <button style={{ width: 40, height: 40, borderRadius: 8, background: 'white', border: '1px solid var(--color-border)', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          <button style={{ width: 40, height: 40, borderRadius: 8, background: 'white', border: '1px solid var(--color-border)', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
        </div>
      </div>
    </div>
  );
}
