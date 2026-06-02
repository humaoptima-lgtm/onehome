import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { getStarRating, cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 14,
  md: 16,
  lg: 20,
};

export function Rating({ rating, reviewCount, size = 'md', showCount = true, className }: RatingProps) {
  const { full, half, empty } = getStarRating(rating);
  const iconSize = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`full-${i}`} size={iconSize} className="fill-[var(--color-gold)] text-[var(--color-gold)]" />
        ))}
        {half && <StarHalf size={iconSize} className="fill-[var(--color-gold)] text-[var(--color-gold)]" />}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`empty-${i}`} size={iconSize} className="text-[var(--color-border)]" />
        ))}
      </div>
      <span className={cn(
        'font-semibold text-[var(--color-navy)]',
        size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
      )}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className={cn(
          'text-[var(--color-slate-light)]',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
