'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import idTranslations from './id.json';
import enTranslations from './en.json';

// ──────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────

export type Locale = 'id' | 'en';

export interface LocaleInfo {
  code: Locale;
  label: string;
  flag: string;
}

export const LOCALES: LocaleInfo[] = [
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

const translations: Record<Locale, Record<string, unknown>> = {
  id: idTranslations,
  en: enTranslations,
};

const DEFAULT_LOCALE: Locale = 'id';
const STORAGE_KEY = 'one-home-locale';

// ──────────────────────────────────────────────────────
// Context
// ──────────────────────────────────────────────────────

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

// ──────────────────────────────────────────────────────
// Deep-key getter  e.g. t('hero.title')
// ──────────────────────────────────────────────────────

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return path; // fallback: return the key itself
    }
    current = (current as Record<string, unknown>)[key];
  }

  return typeof current === 'string' ? current : path;
}

// ──────────────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────────────

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore saved preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && translations[saved]) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocaleState(saved);
      }
    } catch {
      // localStorage unavailable (SSR / privacy mode)
    }
    setIsHydrated(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // ignore
    }
    // Update document lang attribute
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(translations[locale] as Record<string, unknown>, key);
    },
    [locale]
  );

  // Prevent flicker: render children only after hydration
  if (!isHydrated) {
    return null;
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// ──────────────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────────────

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
