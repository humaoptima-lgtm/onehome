'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Building2, Users, Gavel, Wallet, Sparkles, Calculator, MapPin, LayoutDashboard, Shield, Landmark, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useI18n } from '@/lib/i18n';

const megaMenuData = {
  propertiDesain: {
    label: 'Properti & Desain',
    items: [
      { icon: Building2, label: 'Beli Properti', desc: 'Listing terverifikasi', href: '/properties' },
      { icon: Sparkles, label: 'Smart Design Studio', desc: 'Arsitektur & Interior', href: '/design' },
      { icon: LayoutDashboard, label: 'Koleksi Furniture', desc: 'Kurasi furnitur eksklusif', href: '/furniture' },
    ],
  },
  konstruksi: {
    label: 'Konstruksi',
    items: [
      { icon: Users, label: 'Cari Vendor', desc: 'Kontraktor & spesialis', href: '/vendors' },
      { icon: Gavel, label: 'Buat Tender', desc: 'Sistem lelang transparan', href: '/tender/create' },
      { icon: Calculator, label: 'Kalkulator Biaya', desc: 'Estimasi RAB (Rule-Based)', href: '/calculator' },
    ],
  },
  finansialLayanan: {
    label: 'Finansial & Layanan',
    items: [
      { icon: Landmark, label: 'Pengajuan KPR', desc: 'Multi-bank comparison', href: '/financing/apply' },
      { icon: Shield, label: 'Asuransi Properti', desc: 'Proteksi aset Anda', href: '/insurance' },
      { icon: Wallet, label: 'Home Maintenance', desc: 'Layanan perawatan rutin', href: '/maintenance' },
    ],
  },
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => { setMobileMenuOpen(false); setActiveMega(null); };

  // Check if we're on homepage (transparent bg) or inner pages (white bg)
  const isHomePage = pathname === '/';
  const showWhiteBg = isScrolled || !isHomePage;

  return (
    <header
      className={cn(styles.navbar, showWhiteBg && styles.scrolled)}
      ref={megaRef}
      onMouseLeave={() => setActiveMega(null)}
    >
      <div className={cn('container', styles.navContainer)}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoIcon}>🏠</span>
          <span>One Home</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {Object.entries(megaMenuData).map(([key, menu]) => (
            <div
              key={key}
              className={styles.navDropdown}
              onMouseEnter={() => setActiveMega(key)}
            >
              <button className={cn(styles.navLink, activeMega === key && styles.active)}>
                {menu.label} <ChevronDown size={14} className={cn(styles.chevron, activeMega === key && styles.chevronUp)} />
              </button>
            </div>
          ))}
          <Link href="/inspiration" className={cn(styles.navLink, pathname === '/inspiration' && styles.active)}>
            Inspirasi
          </Link>
          <Link href="/dashboard" className={cn(styles.navLink, pathname.startsWith('/dashboard') && styles.active)}>
            Dashboard
          </Link>
        </nav>

        {/* Auth + Actions (Desktop) */}
        <div className={styles.authButtons}>
          <LanguageSwitcher />
          <Link href="/dashboard/notifications">
            <button className={styles.iconBtn} aria-label="Notifications">
              <Bell size={18} />
              <span className={styles.notifDot} />
            </button>
          </Link>
          <Button variant="ghost" size="sm">{t('nav.login')}</Button>
          <Button className="bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white" size="sm">{t('nav.signUp')}</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className={styles.mobileToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mega Menu Panel */}
      {activeMega && megaMenuData[activeMega as keyof typeof megaMenuData] && (
        <div className={styles.megaPanel}>
          <div className="container">
            <div className={styles.megaGrid}>
              {megaMenuData[activeMega as keyof typeof megaMenuData].items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.megaItem}
                    onClick={() => setActiveMega(null)}
                  >
                    <div className={styles.megaIcon}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className={styles.megaLabel}>{item.label}</div>
                      <div className={styles.megaDesc}>{item.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNavLinks}>
            {Object.entries(megaMenuData).map(([key, menu]) => (
              <div key={key} className={styles.mobileSection}>
                <div className={styles.mobileSectionLabel}>{menu.label}</div>
                {menu.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} className={styles.mobileNavLink} onClick={closeMenu}>
                      <Icon size={18} className={styles.mobileLinkIcon} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--color-slate-light)', marginTop: 2 }}>{item.desc}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
            <Link href="/inspiration" className={styles.mobileNavLink} onClick={closeMenu}>
              <Sparkles size={18} className={styles.mobileLinkIcon} />
              <div><div style={{ fontWeight: 600 }}>Inspirasi</div></div>
            </Link>
            <Link href="/dashboard" className={styles.mobileNavLink} onClick={closeMenu}>
              <LayoutDashboard size={18} className={styles.mobileLinkIcon} />
              <div><div style={{ fontWeight: 600 }}>Dashboard</div></div>
            </Link>
            <div className={styles.mobileAuth}>
              <LanguageSwitcher />
              <Button variant="outline" className="w-full" onClick={closeMenu}>{t('nav.login')}</Button>
              <Button className="w-full bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white" onClick={closeMenu}>{t('nav.signUp')}</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
