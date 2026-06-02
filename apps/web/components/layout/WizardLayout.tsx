'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Stepper } from '@/components/ui/Stepper';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WizardStep {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface WizardLayoutProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  nextLabel?: string;
  prevLabel?: string;
  submitLabel?: string;
  className?: string;
}

export function WizardLayout({
  steps,
  currentStep,
  onStepClick,
  onNext,
  onPrev,
  onSubmit,
  isSubmitting = false,
  children,
  title,
  subtitle,
  nextLabel = 'Selanjutnya',
  prevLabel = 'Kembali',
  submitLabel = 'Kirim',
  className,
}: WizardLayoutProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className={cn('min-h-screen bg-[var(--color-bg-cool)] pt-[var(--nav-height)]', className)}>
      {/* Header */}
      <div className="bg-white border-b border-[var(--color-border)]">
        <div className="container py-6">
          <h1 className="text-2xl font-bold text-[var(--color-navy)] font-[var(--font-body)]">{title}</h1>
          {subtitle && <p className="text-[var(--color-slate)] mt-1">{subtitle}</p>}
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Step Sidebar */}
          <aside className="w-[240px] flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 sticky top-[calc(var(--nav-height)+2rem)]">
              <Stepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={onStepClick}
                orientation="vertical"
              />
            </div>
          </aside>

          {/* Mobile step indicator */}
          <div className="lg:hidden w-full mb-4">
            <div className="bg-white rounded-xl border border-[var(--color-border)] p-4">
              <Stepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={onStepClick}
                orientation="horizontal"
              />
            </div>
          </div>

          {/* Main Form Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm">
              {/* Step content */}
              <div className="p-8">
                {children}
              </div>

              {/* Footer navigation */}
              <div className="flex items-center justify-between p-6 border-t border-[var(--color-border)] bg-[var(--color-bg-cool)] rounded-b-xl">
                <Button
                  variant="outline"
                  onClick={onPrev}
                  disabled={isFirstStep}
                  className="gap-2"
                >
                  <ChevronLeft size={16} />
                  {prevLabel}
                </Button>

                <div className="text-sm text-[var(--color-slate)]">
                  Langkah {currentStep + 1} dari {steps.length}
                </div>

                {isLastStep ? (
                  <Button
                    onClick={onSubmit || onNext}
                    disabled={isSubmitting}
                    className="gap-2 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white"
                  >
                    {isSubmitting ? 'Mengirim...' : submitLabel}
                  </Button>
                ) : (
                  <Button
                    onClick={onNext}
                    className="gap-2 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white"
                  >
                    {nextLabel}
                    <ChevronRight size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
