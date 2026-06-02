'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Heart, Maximize2, Share2 } from 'lucide-react';

const CATEGORIES = ['Semua', 'Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Workspace', 'Outdoor'];

const INSPIRATIONS = Array.from({ length: 24 }, (_, i) => ({
  id: `insp-${i}`,
  title: ['Japandi Living', 'Modern Kitchen', 'Scandinavian Bed', 'Luxury Bath', 'Cozy Workspace', 'Tropical Garden'][i % 6],
  category: CATEGORIES[(i % 6) + 1],
  style: ['Japandi', 'Modern', 'Skandinavia', 'Luxury', 'Industrial', 'Tropical'][i % 6],
  colors: [
    ['#DDD5C7', '#8B7355', '#2C3E50'],
    ['#F5F5F5', '#333333', '#C8A951'],
    ['#E8E4DF', '#B8C4C2', '#5C6B73'],
    ['#1a1a2e', '#C8A951', '#F0E6D2'],
    ['#2D2D2D', '#C25B31', '#E8E0D5'],
    ['#1B7A5A', '#F5E6C8', '#8B4513'],
  ][i % 6],
  height: [240, 320, 280, 360, 240, 300][i % 6],
  saved: i % 4 === 0,
}));

export default function SmartDesignPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [saved, setSaved] = useState<Set<string>>(new Set(INSPIRATIONS.filter(i => i.saved).map(i => i.id)));

  const filtered = activeCategory === 0 ? INSPIRATIONS : INSPIRATIONS.filter(i => i.category === CATEGORIES[activeCategory]);

  return (
    <PageShell title="Smart Design Studio" subtitle="Eksplorasi portofolio nyata dari arsitek dan desainer interior terverifikasi kami. Dapatkan estimasi biaya (Rule-Based) transparan untuk setiap gaya.">
      {/* Category Pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {CATEGORIES.map((cat, i) => (
          <button key={cat} onClick={() => setActiveCategory(i)} style={{
            padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 500,
            border: `1.5px solid ${i === activeCategory ? 'var(--color-emerald)' : 'var(--color-border)'}`,
            background: i === activeCategory ? 'var(--color-emerald)' : 'white',
            color: i === activeCategory ? 'white' : 'var(--color-slate)',
            cursor: 'pointer', transition: 'all 150ms',
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div style={{ columns: '4 280px', columnGap: 16 }}>
        {filtered.map(item => (
          <div key={item.id} style={{
            breakInside: 'avoid', marginBottom: 16, borderRadius: 12,
            overflow: 'hidden', border: '1px solid var(--color-border)',
            background: 'white', transition: 'transform 200ms, box-shadow 200ms',
            cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            {/* Color placeholder for image */}
            <div style={{
              height: item.height,
              background: `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]} 50%, ${item.colors[2]} 100%)`,
              position: 'relative',
            }}>
              {/* Overlay actions */}
              <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6 }}>
                <button onClick={(e) => { e.stopPropagation(); setSaved(prev => { const n = new Set(prev); n.has(item.id) ? n.delete(item.id) : n.add(item.id); return n; }); }}
                  style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
                  <Heart size={14} fill={saved.has(item.id) ? '#DC2626' : 'none'} color={saved.has(item.id) ? '#DC2626' : '#64748B'} />
                </button>
              </div>
              {/* Style tag */}
              <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>
                {item.style}
              </div>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)', marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'var(--color-slate)' }}>{item.category}</div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
