'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/stores/ui.store';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, FileCheck, Hammer, ChevronLeft, Menu
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/bank/dashboard', icon: LayoutDashboard },
  { label: 'Loan Review', href: '/bank/loans/LN-001', icon: FileCheck },
  { label: 'Project Monitoring', href: '/bank/projects/PRJ-001', icon: Hammer },
];

export default function BankPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
      <aside style={{
        position: 'fixed', left: 0, top: 'var(--nav-height)', bottom: 0,
        width: sidebarCollapsed ? 72 : 260,
        background: 'linear-gradient(180deg, #0B1D3A 0%, #162D50 100%)', color: 'white',
        transition: 'width 300ms cubic-bezier(0.4,0,0.2,1)',
        zIndex: 200, display: 'flex', flexDirection: 'column',
        overflowY: 'auto', overflowX: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'space-between', padding: '16px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {!sidebarCollapsed && <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>🏦 Bank Portal</span>}
          <Button variant="ghost" size="icon" onClick={toggleSidebarCollapse} className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10">
            {sidebarCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href.split('/').slice(0, 3).join('/'));
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: sidebarCollapsed ? '10px 0' : '10px 14px',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                borderRadius: 6, marginBottom: 2,
                fontSize: 13, fontWeight: active ? 600 : 400,
                color: active ? 'white' : 'rgba(255,255,255,0.55)',
                background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                textDecoration: 'none', transition: 'all 150ms',
              }}>
                <Icon size={17} />
                {!sidebarCollapsed && <span>{item.label}</span>}
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
