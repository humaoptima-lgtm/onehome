'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  onExport?: () => void;
  actions?: React.ReactNode;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns, data, pageSize = 10, searchable = true, searchPlaceholder = 'Cari...', onExport, actions, emptyMessage = 'Tidak ada data'
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(row =>
      columns.some(col => {
        const val = row[col.key];
        return val != null && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
      {/* Toolbar */}
      {(searchable || onExport || actions) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
          {searchable && (
            <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: 360 }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-slate-light)' }} />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(0); }}
                placeholder={searchPlaceholder}
                style={{
                  width: '100%', padding: '8px 12px 8px 36px',
                  border: '1px solid var(--color-border)', borderRadius: 8,
                  fontSize: 13, outline: 'none', background: 'var(--color-bg-cool)',
                }}
              />
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            {actions}
            {onExport && (
              <Button variant="outline" size="sm" onClick={onExport} className="gap-1.5">
                <Download size={14} /> Export
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  style={{
                    padding: '12px 16px', textAlign: (col.align || 'left') as 'left' | 'center' | 'right',
                    fontWeight: 600, fontSize: 12, color: 'var(--color-slate)',
                    cursor: col.sortable !== false ? 'pointer' : 'default',
                    userSelect: 'none', whiteSpace: 'nowrap', width: col.width,
                    background: 'var(--color-bg-cool)',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {col.label}
                    {col.sortable !== false && (
                      sortKey === col.key
                        ? sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        : <ChevronsUpDown size={12} style={{ opacity: 0.3 }} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: 48, textAlign: 'center', color: 'var(--color-slate-light)' }}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid var(--color-border-light)',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-bg-cool)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {columns.map(col => (
                    <td key={col.key} style={{ padding: '12px 16px', textAlign: (col.align || 'left') as 'left' | 'center' | 'right', color: 'var(--color-navy)' }}>
                      {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 20px', borderTop: '1px solid var(--color-border)',
        fontSize: 13, color: 'var(--color-slate)',
      }}>
        <span>
          Menampilkan {sorted.length === 0 ? 0 : page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} dari {sorted.length}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
            <ChevronLeft size={16} />
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const p = totalPages <= 5 ? i : Math.max(0, Math.min(page - 2, totalPages - 5)) + i;
            return (
              <Button
                key={p}
                variant={p === page ? 'default' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setPage(p)}
                style={p === page ? { background: 'var(--color-emerald)', color: 'white' } : {}}
              >
                {p + 1}
              </Button>
            );
          })}
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
