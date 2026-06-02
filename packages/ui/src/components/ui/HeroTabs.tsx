'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
}

interface HeroTabsProps {
  tabs: TabItem[];
  defaultTab: string;
  onChange: (tabId: string) => void;
  variant?: 'line' | 'pill';
  className?: string;
}

/**
 * Simple tab switcher for Hero section and similar components.
 * For full-featured tabbed content, use shadcn Tabs instead.
 */
export function HeroTabs({
  tabs,
  defaultTab,
  onChange,
  variant = 'line',
  className,
}: HeroTabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  const handleClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange(tabId);
  };

  return (
    <div
      className={cn(
        'flex',
        variant === 'line' && 'border-b border-[var(--color-border)] gap-0',
        variant === 'pill' && 'gap-2 bg-[var(--color-bg-cool)] rounded-lg p-1',
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleClick(tab.id)}
          className={cn(
            'relative text-sm font-medium transition-colors px-4 py-2.5 whitespace-nowrap',
            variant === 'line' && [
              activeTab === tab.id
                ? 'text-[var(--color-emerald)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-emerald)] after:rounded-full'
                : 'text-[var(--color-slate)] hover:text-[var(--color-navy)]',
            ],
            variant === 'pill' && [
              activeTab === tab.id
                ? 'bg-white text-[var(--color-navy)] rounded-md shadow-sm'
                : 'text-[var(--color-slate)] hover:text-[var(--color-navy)]',
            ]
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
