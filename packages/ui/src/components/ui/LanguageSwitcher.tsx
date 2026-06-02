'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useI18n, LOCALES, type Locale } from '@/lib/i18n';
import { Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = LOCALES.find(l => l.code === locale) || LOCALES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-slate)] hover:bg-[var(--color-bg-cool)] hover:text-[var(--color-navy)] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe size={16} />
        <span>{currentLocale.flag}</span>
        <span>{currentLocale.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-[var(--color-border)] rounded-xl shadow-lg py-1 min-w-[180px] z-[var(--z-dropdown)] animate-scale-in" style={{ animationDuration: '0.15s' }}>
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              className={cn(
                'flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left transition-colors',
                locale === loc.code
                  ? 'text-[var(--color-emerald)] font-medium bg-[var(--color-emerald-light)]'
                  : 'text-[var(--color-navy)] hover:bg-[var(--color-bg-cool)]'
              )}
              onClick={() => {
                setLocale(loc.code as Locale);
                setIsOpen(false);
              }}
            >
              <span className="text-base">{loc.flag}</span>
              <span className="flex-1">{loc.label}</span>
              {locale === loc.code && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
