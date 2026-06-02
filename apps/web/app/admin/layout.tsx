'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/stores/ui.store';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, Users, ShieldCheck, Building2, Gavel,
  Shield, BookOpen, Landmark, Bell, BarChart3, FileSearch,
  Lock, Settings, HelpCircle, Database, ChevronLeft, Menu
} from 'lucide-react';

const navSections = [
  {
    title: 'Utama',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { label: 'Users', href: '/admin/users', icon: Users },
      { label: 'Vendor Verifikasi', href: '/admin/vendors/verification', icon: ShieldCheck },
      { label: 'Properti', href: '/admin/properties', icon: Building2 },
      { label: 'Tender', href: '/admin/tenders', icon: Gavel },
    ],
  },
  {
    title: 'Keuangan',
    items: [
      { label: 'Escrow', href: '/admin/escrow', icon: Shield },
      { label: 'Ledger', href: '/admin/ledger', icon: BookOpen },
      { label: 'Banking', href: '/admin/banking', icon: Landmark },
    ],
  },
  {
    title: 'Sistem',
    items: [
      { label: 'Notifikasi', href: '/admin/notifications', icon: Bell },
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      { label: 'Audit Logs', href: '/admin/audit', icon: FileSearch },
      { label: 'Security', href: '/admin/security', icon: Lock },
      { label: 'Settings', href: '/admin/settings', icon: Settings },
      { label: 'Support', href: '/admin/support', icon: HelpCircle },
      { label: 'Outbox', href: '/admin/outbox', icon: Database },
    ],
  },
];

export default function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
      <aside style={{
        position: 'fixed', left: 0, top: 'var(--nav-height)', bottom: 0,
        width: sidebarCollapsed ? 72 : 260,
        background: 'var(--color-navy)', color: 'white',
        transition: 'width 300ms cubic-bezier(0.4,0,0.2,1)',
        zIndex: 200, display: 'flex', flexDirection: 'column',
        overflowY: 'auto', overflowX: 'hidden',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'space-between', padding: '16px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {!sidebarCollapsed && <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Admin Panel</span>}
          <Button variant="ghost" size="icon" onClick={toggleSidebarCollapse} className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10">
            {sidebarCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        {/* Nav sections */}
        <nav style={{ flex: 1, padding: '8px' }}>
          {navSections.map(section => (
            <div key={section.title} style={{ marginBottom: 20 }}>
              {!sidebarCollapsed && (
                <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 14px', marginBottom: 4 }}>
                  {section.title}
                </div>
              )}
              {section.items.map(item => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href + '/'));
                return (
                  <Link key={item.href} href={item.href} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: sidebarCollapsed ? '9px 0' : '9px 14px',
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    borderRadius: 6, marginBottom: 1,
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
            </div>
          ))}
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
