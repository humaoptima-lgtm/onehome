import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Stepper({ steps, currentStep, onStepClick, className, orientation = 'vertical' }: StepperProps) {
  if (orientation === 'horizontal') {
    return (
      <div className={cn('flex items-center w-full', className)}>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;
          const isClickable = isPast && onStepClick;

          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  'flex flex-col items-center gap-1.5 flex-shrink-0',
                  isClickable && 'cursor-pointer'
                )}
                onClick={() => isClickable && onStepClick(index)}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300',
                    isPast
                      ? 'bg-[var(--color-emerald)] text-white'
                      : isActive
                      ? 'bg-[var(--color-navy)] text-white ring-4 ring-[var(--color-emerald-light)]'
                      : 'bg-[var(--color-bg-cool)] text-[var(--color-slate-light)] border border-[var(--color-border)]'
                  )}
                >
                  {isPast ? <Check size={14} /> : index + 1}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium text-center max-w-[80px] leading-tight',
                    isActive ? 'text-[var(--color-navy)]' : isPast ? 'text-[var(--color-emerald)]' : 'text-[var(--color-slate-light)]'
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 transition-colors duration-300',
                    index < currentStep ? 'bg-[var(--color-emerald)]' : 'bg-[var(--color-border)]'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // Vertical orientation
  return (
    <div className={cn('flex flex-col', className)}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isPast = index < currentStep;
        const isClickable = isPast && onStepClick;

        return (
          <div key={step.id} className="flex gap-3">
            {/* Left column: circle + line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 flex-shrink-0',
                  isClickable && 'cursor-pointer',
                  isPast
                    ? 'bg-[var(--color-emerald)] text-white'
                    : isActive
                    ? 'bg-[var(--color-navy)] text-white ring-4 ring-[var(--color-emerald-light)]'
                    : 'bg-[var(--color-bg-cool)] text-[var(--color-slate-light)] border border-[var(--color-border)]'
                )}
                onClick={() => isClickable && onStepClick(index)}
              >
                {isPast ? <Check size={14} /> : step.icon || index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 flex-1 min-h-[24px] transition-colors duration-300',
                    index < currentStep ? 'bg-[var(--color-emerald)]' : 'bg-[var(--color-border)]'
                  )}
                />
              )}
            </div>

            {/* Right column: text */}
            <div
              className={cn('pb-6', isClickable && 'cursor-pointer')}
              onClick={() => isClickable && onStepClick(index)}
            >
              <span
                className={cn(
                  'text-sm font-medium leading-8 transition-colors',
                  isActive ? 'text-[var(--color-navy)]' : isPast ? 'text-[var(--color-emerald)]' : 'text-[var(--color-slate-light)]'
                )}
              >
                {step.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
