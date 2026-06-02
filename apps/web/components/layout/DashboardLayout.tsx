'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/ui.store';
import { 
  LayoutDashboard, Building2, Briefcase, Wallet, FileText, 
  Heart, FolderOpen, MessageSquare, Settings, Bell, Search,
  ChevronLeft, Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems?: NavItem[];
  title?: string;
}

const defaultNavItems: NavItem[] = [
  { label: 'Ringkasan', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Properti Saya', href: '/dashboard/properties', icon: <Building2 size={20} /> },
  { label: 'Proyek', href: '/dashboard/projects', icon: <Briefcase size={20} /> },
  { label: 'Pembiayaan', href: '/dashboard/financing', icon: <Wallet size={20} /> },
  { label: 'Tender', href: '/dashboard/tenders', icon: <FileText size={20} /> },
  { label: 'Tersimpan', href: '/dashboard/saved', icon: <Heart size={20} /> },
  { label: 'Dokumen', href: '/documents', icon: <FolderOpen size={20} /> },
  { label: 'Pesan', href: '/dashboard/messages', icon: <MessageSquare size={20} />, badge: 3 },
  { label: 'Pengaturan', href: '/dashboard/settings', icon: <Settings size={20} /> },
];

export function DashboardLayout({ children, navItems = defaultNavItems, title }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore();

  return (
    <div className="min-h-screen bg-[var(--color-bg-cool)] pt-[var(--nav-height)]">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-[var(--nav-height)] bottom-0 bg-white border-r border-[var(--color-border)] transition-all duration-300 z-[var(--z-sticky)] flex flex-col',
          sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'
        )}
      >
        {/* Collapse toggle */}
        <div className="flex items-center justify-end p-3 border-b border-[var(--color-border)]">
          <Button variant="ghost" size="icon" onClick={toggleSidebarCollapse} className="h-8 w-8">
            {sidebarCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--color-emerald-light)] text-[var(--color-emerald)]'
                    : 'text-[var(--color-slate)] hover:bg-[var(--color-bg-cool)] hover:text-[var(--color-navy)]',
                  sidebarCollapsed && 'justify-center px-0'
                )}
                title={sidebarCollapsed ? item.label : undefined}
              >
                {item.icon}
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-[var(--color-emerald)] text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'
        )}
      >
        {/* Top bar */}
        <div className="sticky top-[var(--nav-height)] z-[var(--z-sticky)] bg-white border-b border-[var(--color-border)] px-8 py-4 flex items-center justify-between">
          <div>
            {title && <h1 className="text-xl font-semibold text-[var(--color-navy)] font-[var(--font-body)]">{title}</h1>}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Search size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--color-danger)] text-white text-[10px] rounded-full flex items-center justify-center">
                5
              </span>
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/images/avatar-placeholder.png" />
              <AvatarFallback>OH</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Page content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
