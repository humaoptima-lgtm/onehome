'use client';

import React from 'react';
import { FileQuestion, Search, Inbox, FolderOpen, Bell, MessageSquare, PlusCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ILLUSTRATIONS: Record<string, React.ReactNode> = {
  'no-properties': <FileQuestion size={64} strokeWidth={1} />,
  'no-vendors': <Search size={64} strokeWidth={1} />,
  'no-projects': <FolderOpen size={64} strokeWidth={1} />,
  'no-tenders': <Inbox size={64} strokeWidth={1} />,
  'no-notifications': <Bell size={64} strokeWidth={1} />,
  'no-messages': <MessageSquare size={64} strokeWidth={1} />,
  'no-documents': <Upload size={64} strokeWidth={1} />,
  'no-data': <Inbox size={64} strokeWidth={1} />,
  'no-results': <Search size={64} strokeWidth={1} />,
};

interface EmptyStateProps {
  type?: keyof typeof ILLUSTRATIONS;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({ type = 'no-data', icon, title, description, actionLabel, actionHref, onAction }: EmptyStateProps) {
  const illustration = icon || ILLUSTRATIONS[type] || ILLUSTRATIONS['no-data'];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 24px',
      textAlign: 'center',
      minHeight: 300,
    }}>
      <div style={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: 'var(--color-bg-cool)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        color: 'var(--color-slate-light)',
      }}>
        {illustration}
      </div>
      <h3 style={{
        fontSize: 18,
        fontWeight: 600,
        color: 'var(--color-navy)',
        marginBottom: 8,
        fontFamily: 'var(--font-body)',
      }}>
        {title}
      </h3>
      {description && (
        <p style={{
          fontSize: 14,
          color: 'var(--color-slate)',
          maxWidth: 400,
          marginBottom: actionLabel ? 24 : 0,
          lineHeight: 1.6,
        }}>
          {description}
        </p>
      )}
      {actionLabel && (
        actionHref ? (
          <a href={actionHref}>
            <Button className="gap-2 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white">
              <PlusCircle size={16} />
              {actionLabel}
            </Button>
          </a>
        ) : (
          <Button onClick={onAction} className="gap-2 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white">
            <PlusCircle size={16} />
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
}
