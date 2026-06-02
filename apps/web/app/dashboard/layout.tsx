'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Building2, Hammer, Wallet, FileText,
  Bell, MessageSquare, User, FolderOpen, ChevronLeft, Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/stores/ui.store';

const navItems = [
  { label: 'Ringkasan', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Properti Saya', href: '/dashboard/properties', icon: Building2 },
  { label: 'Proyek', href: '/dashboard/projects', icon: Hammer },
  { label: 'Pembayaran', href: '/dashboard/payments', icon: Wallet },
  { label: 'Dokumen', href: '/dashboard/documents', icon: FolderOpen },
  { label: 'Notifikasi', href: '/dashboard/notifications', icon: Bell },
  { label: 'Pesan', href: '/dashboard/messages', icon: MessageSquare, badge: 3 },
  { label: 'Profil', href: '/dashboard/profile', icon: User },
];

export default function DashboardPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
      {/* Sidebar */}
      <aside style={{
        position: 'fixed', left: 0, top: 'var(--nav-height)', bottom: 0,
        width: sidebarCollapsed ? 72 : 260,
        background: 'white', borderRight: '1px solid var(--color-border)',
        transition: 'width 300ms cubic-bezier(0.4,0,0.2,1)',
        zIndex: 200, display: 'flex', flexDirection: 'column',
        overflowY: 'auto', overflowX: 'hidden',
      }}>
        {/* Collapse toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'flex-end', padding: 12, borderBottom: '1px solid var(--color-border)' }}>
          <Button variant="ghost" size="icon" onClick={toggleSidebarCollapse} className="h-8 w-8">
            {sidebarCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'));
            const isExact = pathname === item.href;
            const active = isActive || isExact;
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: sidebarCollapsed ? '10px 0' : '10px 14px',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                borderRadius: 8, marginBottom: 2,
                fontSize: 13.5, fontWeight: active ? 600 : 400,
                color: active ? 'var(--color-emerald)' : 'var(--color-slate)',
                background: active ? 'var(--color-emerald-light)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 150ms',
              }}>
                <Icon size={19} />
                {!sidebarCollapsed && (
                  <>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span style={{
                        background: 'var(--color-emerald)', color: 'white',
                        fontSize: 10, fontWeight: 700, padding: '1px 7px',
                        borderRadius: 99,
                      }}>{item.badge}</span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main style={{
        flex: 1,
        marginLeft: sidebarCollapsed ? 72 : 260,
        transition: 'margin-left 300ms cubic-bezier(0.4,0,0.2,1)',
        background: 'var(--color-bg-cool)',
        minHeight: '100%',
      }}>
        {children}
      </main>
    </div>
  );
}
