import React from 'react';
import { cn } from '@/lib/utils';

interface ThreeColumnLayoutProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
  leftWidth?: string;
  rightWidth?: string;
  className?: string;
  stickyPanels?: boolean;
}

export function ThreeColumnLayout({
  left,
  center,
  right,
  leftWidth = 'w-[280px]',
  rightWidth = 'w-[320px]',
  className,
  stickyPanels = true,
}: ThreeColumnLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-[var(--color-bg-cool)] pt-[var(--nav-height)]', className)}>
      <div className="container py-8">
        <div className="flex gap-6">
          {/* Left Panel */}
          <aside className={cn('flex-shrink-0 hidden lg:block', leftWidth)}>
            <div className={cn(stickyPanels && 'sticky top-[calc(var(--nav-height)+2rem)]')}>
              {left}
            </div>
          </aside>

          {/* Center Workspace */}
          <main className="flex-1 min-w-0">
            {center}
          </main>

          {/* Right Panel */}
          <aside className={cn('flex-shrink-0 hidden xl:block', rightWidth)}>
            <div className={cn(stickyPanels && 'sticky top-[calc(var(--nav-height)+2rem)]')}>
              {right}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
