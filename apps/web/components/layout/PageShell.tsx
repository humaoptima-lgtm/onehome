'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PageShellProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Shared page shell for consistent layout across all pages.
 * Provides: header with title/subtitle/badge, optional back nav, action buttons, and content area.
 */
export function PageShell({ title, subtitle, badge, badgeColor = 'var(--color-emerald)', backHref, backLabel, actions, children }: PageShellProps) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-cool)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 80px' }}>
        {/* Back nav */}
        {backHref && (
          <div style={{ paddingTop: 24 }}>
            <Link href={backHref} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--color-slate)', textDecoration: 'none' }}>
              <ArrowLeft size={16} /> {backLabel || 'Kembali'}
            </Link>
          </div>
        )}

        {/* Header */}
        <header style={{ paddingTop: backHref ? 16 : 48, paddingBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-navy)', margin: 0 }}>{title}</h1>
              {badge && <Badge style={{ background: badgeColor, color: 'white', border: 'none' }}>{badge}</Badge>}
            </div>
            {subtitle && <p style={{ fontSize: 15, color: 'var(--color-slate)', margin: 0 }}>{subtitle}</p>}
          </div>
          {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
        </header>

        {/* Content */}
        <main style={{ paddingBottom: 80 }}>
          {children}
        </main>
      </div>
    </div>
  );
}

/**
 * Placeholder content for pages under construction.
 * Shows a professional "Coming Soon" card with feature list.
 */
export function PagePlaceholder({ features }: { features: string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
      {features.map((f, i) => (
        <div key={i} style={{
          background: 'white', borderRadius: 12, padding: 24,
          border: '1px solid var(--color-border)',
          opacity: 0.7,
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div style={{ fontSize: 13, color: 'var(--color-slate)', paddingTop: 8, borderTop: '1px solid var(--color-border)' }}>
            {f}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * KPI stat card for dashboard pages.
 */
export function StatCard({ label, value, icon, trend, trendLabel }: {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
}) {
  const trendColor = trend === 'up' ? 'var(--color-success)' : trend === 'down' ? 'var(--color-danger)' : 'var(--color-slate)';
  return (
    <div style={{
      background: 'white', borderRadius: 12, padding: 24,
      border: '1px solid var(--color-border)',
      transition: 'box-shadow 200ms, transform 200ms',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--color-emerald-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        {trendLabel && <Badge style={{ background: trend === 'up' ? 'var(--color-success-light)' : 'var(--color-danger-light)', color: trendColor, border: 'none', fontSize: 12 }}>{trendLabel}</Badge>}
      </div>
      <div style={{ fontSize: 13, color: 'var(--color-slate)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-navy)' }}>{value}</div>
    </div>
  );
}
