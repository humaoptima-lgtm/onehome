'use client';

import React from 'react';
import Link from 'next/link';
import styles from './QuickAccess.module.css';
import {
  Building2, Hammer, Sparkles, Calculator, Users, Wallet,
  Gavel, MapPin, LayoutDashboard, Shield, Heart,
  FileText, Star, ClipboardList, Landmark, Settings
} from 'lucide-react';

const services = [
  {
    icon: Building2,
    label: 'Properti',
    desc: 'Cari rumah',
    href: '/properties',
    color: '#1B7A5A',
    bg: '#E8F5EF',
  },
  {
    icon: Calculator,
    label: 'Kalkulator',
    desc: 'Estimasi biaya',
    href: '/calculator',
    color: '#2563EB',
    bg: '#DBEAFE',
  },
  {
    icon: Sparkles,
    label: 'Smart Design',
    desc: 'Studio desain',
    href: '/ai-design',
    color: '#9333EA',
    bg: '#F3E8FF',
  },
  {
    icon: Gavel,
    label: 'Tender',
    desc: 'Buat tender',
    href: '/tender/create',
    color: '#DC2626',
    bg: '#FEE2E2',
  },
  {
    icon: Users,
    label: 'Vendor',
    desc: 'Cari kontraktor',
    href: '/vendors',
    color: '#EA580C',
    bg: '#FFEDD5',
  },
  {
    icon: Wallet,
    label: 'KPR',
    desc: 'Simulasi cicilan',
    href: '/financing',
    color: '#0891B2',
    bg: '#CFFAFE',
  },
  {
    icon: Heart,
    label: 'Inspirasi',
    desc: 'Desain rumah',
    href: '/inspiration',
    color: '#DB2777',
    bg: '#FCE7F3',
  },
  {
    icon: MapPin,
    label: 'Peta',
    desc: 'Peta properti',
    href: '/properties/map',
    color: '#16A34A',
    bg: '#DCFCE7',
  },
  {
    icon: Shield,
    label: 'Escrow',
    desc: 'Dana aman',
    href: '/dashboard/payments',
    color: '#0F766E',
    bg: '#CCFBF1',
  },
  {
    icon: FileText,
    label: 'Dokumen',
    desc: 'Kelola file',
    href: '/dashboard/documents',
    color: '#7C3AED',
    bg: '#EDE9FE',
  },
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    desc: 'Kelola semua',
    href: '/dashboard',
    color: '#0B1D3A',
    bg: '#E2E8F0',
  },
  {
    icon: Star,
    label: 'Bandingkan',
    desc: 'Compare properti',
    href: '/properties/compare',
    color: '#C8A951',
    bg: '#F5EFD7',
  },
];

const portalLinks = [
  { label: '🏠 Customer Dashboard', href: '/dashboard', color: 'var(--color-emerald)' },
  { label: '🔧 Vendor Portal', href: '/vendor/dashboard', color: 'var(--color-gold)' },
  { label: '🏦 Bank Portal', href: '/bank/dashboard', color: 'var(--color-info)' },
  { label: '⚙️ Admin Portal', href: '/admin', color: 'var(--color-danger)' },
];

export function QuickAccess() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Layanan One Home</h2>
          <p className={styles.subtitle}>Akses cepat ke semua fitur platform kami</p>
        </div>

        {/* Icon Grid */}
        <div className={styles.grid}>
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.label} href={s.href} className={styles.item}>
                <div className={styles.iconWrapper} style={{ background: s.bg }}>
                  <Icon size={26} style={{ color: s.color }} strokeWidth={1.8} />
                </div>
                <div className={styles.itemLabel}>{s.label}</div>
                <div className={styles.itemDesc}>{s.desc}</div>
              </Link>
            );
          })}
        </div>

        {/* Portal Quick Links */}
        <div className={styles.portalRow}>
          {portalLinks.map((p) => (
            <Link key={p.label} href={p.href} className={styles.portalLink}>
              <span>{p.label}</span>
              <span className={styles.portalArrow}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
