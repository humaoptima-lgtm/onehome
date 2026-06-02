'use client';

import React from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status: 'completed' | 'active' | 'pending' | 'error';
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  direction?: 'vertical' | 'horizontal';
}

const statusIcons = {
  completed: <CheckCircle2 size={18} />,
  active: <Clock size={18} />,
  pending: <Circle size={18} />,
  error: <AlertCircle size={18} />,
};

const statusColors = {
  completed: { bg: 'var(--color-emerald)', color: 'white', line: 'var(--color-emerald)' },
  active: { bg: 'var(--color-info)', color: 'white', line: 'var(--color-border)' },
  pending: { bg: 'var(--color-bg-cool)', color: 'var(--color-slate-light)', line: 'var(--color-border)' },
  error: { bg: 'var(--color-danger)', color: 'white', line: 'var(--color-border)' },
};

export function Timeline({ items, direction = 'vertical' }: TimelineProps) {
  if (direction === 'horizontal') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, overflowX: 'auto', padding: '16px 0' }}>
        {items.map((item, index) => {
          const colors = statusColors[item.status];
          return (
            <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', flex: '1 1 0', minWidth: 120 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: colors.bg, color: colors.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 8, flexShrink: 0,
                  transition: 'all 300ms',
                }}>
                  {item.icon || statusIcons[item.status]}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: item.status === 'pending' ? 'var(--color-slate-light)' : 'var(--color-navy)', marginBottom: 2 }}>{item.title}</div>
                  {item.date && <div style={{ fontSize: 11, color: 'var(--color-slate)' }}>{item.date}</div>}
                </div>
              </div>
              {index < items.length - 1 && (
                <div style={{
                  height: 2, flex: '0 0 40px', alignSelf: 'center',
                  background: items[index + 1].status === 'completed' || item.status === 'completed' ? 'var(--color-emerald)' : 'var(--color-border)',
                  marginTop: -20, transition: 'background 300ms',
                }} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {items.map((item, index) => {
        const colors = statusColors[item.status];
        const isLast = index === items.length - 1;
        return (
          <div key={item.id} style={{ display: 'flex', gap: 16, position: 'relative' }}>
            {/* Line + Dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 36, flexShrink: 0 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: colors.bg, color: colors.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, zIndex: 1,
                boxShadow: item.status === 'active' ? '0 0 0 4px rgba(37,99,235,0.15)' : 'none',
                transition: 'all 300ms',
              }}>
                {item.icon || statusIcons[item.status]}
              </div>
              {!isLast && (
                <div style={{
                  width: 2, flex: 1, minHeight: 24,
                  background: item.status === 'completed' ? colors.line : 'var(--color-border)',
                  transition: 'background 300ms',
                }} />
              )}
            </div>
            {/* Content */}
            <div style={{ paddingBottom: isLast ? 0 : 24, flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: item.status === 'pending' ? 'var(--color-slate-light)' : 'var(--color-navy)', marginBottom: 2 }}>
                {item.title}
              </div>
              {item.description && (
                <div style={{ fontSize: 13, color: 'var(--color-slate)', lineHeight: 1.5, marginBottom: 4 }}>
                  {item.description}
                </div>
              )}
              {item.date && (
                <div style={{ fontSize: 12, color: 'var(--color-slate-light)' }}>{item.date}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
