'use client';

import React from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = {
  emerald: '#1B7A5A',
  navy: '#0B1D3A',
  gold: '#C8A951',
  info: '#2563EB',
  danger: '#DC2626',
  warning: '#EAB308',
  slate: '#64748B',
};

const CHART_COLORS = ['#1B7A5A', '#2563EB', '#C8A951', '#DC2626', '#8B5CF6', '#EC4899'];

interface MiniChartProps {
  data: { name: string; value: number }[];
  type?: 'area' | 'bar' | 'line' | 'pie' | 'donut';
  color?: keyof typeof COLORS | string;
  height?: number;
  showAxis?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  label?: string;
}

export function MiniChart({ data, type = 'area', color = 'emerald', height = 120, showAxis = false, showGrid = false, showTooltip = true, label }: MiniChartProps) {
  const chartColor = COLORS[color as keyof typeof COLORS] || color;

  if (type === 'pie' || type === 'donut') {
    return (
      <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={type === 'donut' ? height * 0.25 : 0}
              outerRadius={height * 0.38}
              dataKey="value"
              stroke="white"
              strokeWidth={2}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            {showTooltip && <Tooltip formatter={(v) => new Intl.NumberFormat('id-ID').format(Number(v))} />}
          </PieChart>
        </ResponsiveContainer>
        {label && <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--color-slate)', marginTop: -8 }}>{label}</div>}
      </div>
    );
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'bar' ? (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />}
            {showAxis && <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />}
            {showAxis && <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} width={40} />}
            {showTooltip && <Tooltip formatter={(v) => new Intl.NumberFormat('id-ID').format(Number(v))} />}
            <Bar dataKey="value" fill={chartColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : type === 'line' ? (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />}
            {showAxis && <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />}
            {showAxis && <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} width={40} />}
            {showTooltip && <Tooltip formatter={(v) => new Intl.NumberFormat('id-ID').format(Number(v))} />}
            <Line type="monotone" dataKey="value" stroke={chartColor} strokeWidth={2} dot={false} />
          </LineChart>
        ) : (
          <AreaChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />}
            {showAxis && <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />}
            {showAxis && <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} width={40} />}
            {showTooltip && <Tooltip formatter={(v) => new Intl.NumberFormat('id-ID').format(Number(v))} />}
            <defs>
              <linearGradient id={`gradient-${chartColor.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={chartColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke={chartColor} strokeWidth={2} fill={`url(#gradient-${chartColor.replace('#', '')})`} />
          </AreaChart>
        )}
      </ResponsiveContainer>
      {label && <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--color-slate)', marginTop: 4 }}>{label}</div>}
    </div>
  );
}
