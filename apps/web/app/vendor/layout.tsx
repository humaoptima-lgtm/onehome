'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/stores/ui.store';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, Gavel, Hammer, Wallet, Star,
  UserPlus, ChevronLeft, Menu
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
  { label: 'Peluang Tender', href: '/vendor/tenders', icon: Gavel, badge: 3 },
  { label: 'Proyek Saya', href: '/vendor/projects', icon: Hammer },
  { label: 'Pembayaran', href: '/vendor/payments', icon: Wallet },
  { label: 'Review', href: '/vendor/reviews', icon: Star },
  { label: 'Onboarding', href: '/vendor/onboarding', icon: UserPlus },
];

export default function VendorPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
      <aside style={{
        position: 'fixed', left: 0, top: 'var(--nav-height)', bottom: 0,
        width: sidebarCollapsed ? 72 : 260,
        background: 'white', borderRight: '1px solid var(--color-border)',
        transition: 'width 300ms cubic-bezier(0.4,0,0.2,1)',
        zIndex: 200, display: 'flex', flexDirection: 'column',
        overflowY: 'auto', overflowX: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'space-between', padding: '16px 12px', borderBottom: '1px solid var(--color-border)' }}>
          {!sidebarCollapsed && <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.02em' }}>🏗️ Portal Vendor</span>}
          <Button variant="ghost" size="icon" onClick={toggleSidebarCollapse} className="h-8 w-8">
            {sidebarCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== '/vendor/dashboard' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: sidebarCollapsed ? '10px 0' : '10px 14px',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                borderRadius: 8, marginBottom: 2,
                fontSize: 13.5, fontWeight: active ? 600 : 400,
                color: active ? 'var(--color-gold)' : 'var(--color-slate)',
                background: active ? 'var(--color-gold-light)' : 'transparent',
                textDecoration: 'none', transition: 'all 150ms',
              }}>
                <Icon size={19} />
                {!sidebarCollapsed && (
                  <>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && <span style={{ background: 'var(--color-gold)', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 99 }}>{item.badge}</span>}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main style={{
        flex: 1,
        marginLeft: sidebarCollapsed ? 72 : 260,
        transition: 'margin-left 300ms cubic-bezier(0.4,0,0.2,1)',
        background: 'var(--color-bg-cool)', minHeight: '100%',
      }}>
        {children}
      </main>
    </div>
  );
}
