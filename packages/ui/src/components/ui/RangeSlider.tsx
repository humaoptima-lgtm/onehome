'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  formatLabel?: (value: number) => string;
  className?: string;
}

export function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  formatLabel,
  className,
}: RangeSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const calculateValueFromPosition = React.useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const rawValue = min + percent * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.min(Math.max(steppedValue, min), max);
  }, [min, max, step]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    const newValue = calculateValueFromPosition(e.clientX);
    if (newValue !== undefined) onChange(newValue);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      const newValue = calculateValueFromPosition(e.clientX);
      if (newValue !== undefined) onChange(newValue);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, min, max, step, onChange, calculateValueFromPosition]);

  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  return (
    <div className={cn('w-full py-2', className)}>
      <div
        className="relative h-6 cursor-pointer flex items-center"
        ref={trackRef}
        onPointerDown={handlePointerDown}
      >
        {/* Rail */}
        <div className="absolute w-full h-1.5 rounded-full bg-[var(--color-bg-cool)]" />
        {/* Fill */}
        <div
          className="absolute h-1.5 rounded-full bg-[var(--color-emerald)] transition-[width] duration-75"
          style={{ width: `${percentage}%` }}
        />
        {/* Thumb */}
        <div
          className={cn(
            'absolute w-5 h-5 -translate-x-1/2 rounded-full bg-white border-2 border-[var(--color-emerald)] shadow-md transition-shadow',
            isDragging && 'scale-110 shadow-lg ring-4 ring-[var(--color-emerald-light)]'
          )}
          style={{ left: `${percentage}%` }}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          tabIndex={0}
        />
      </div>
      {formatLabel && (
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-xs text-[var(--color-slate-light)]">{formatLabel(min)}</span>
          <span className="text-sm font-semibold text-[var(--color-emerald)]">{formatLabel(value)}</span>
          <span className="text-xs text-[var(--color-slate-light)]">{formatLabel(max)}</span>
        </div>
      )}
    </div>
  );
}
