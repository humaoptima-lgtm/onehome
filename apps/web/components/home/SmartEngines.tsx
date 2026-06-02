'use client';

import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import Image from 'next/image';
import styles from './SmartEngines.module.css';
import { RangeSlider } from '@/components/ui/RangeSlider';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeftRight, Sparkles, Calculator } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const STYLES = [
  { id: 'japandi', label: 'Japandi', before: '/images/before_room.png', after: '/images/after_room.png' }
];

export function SmartEngines() {
  const { t } = useI18n();
  
  // Slider State (Transformation)
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeData = STYLES[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  const handleInteractionStart = () => setIsDragging(true);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  // Calculator State
  const [propertyValue, setPropertyValue] = useState(500000000); // Rp 500 Juta
  const [downPayment, setDownPayment] = useState(100000000); // Rp 100 Juta
  const [renovationCost, setRenovationCost] = useState(150000000); // Rp 150 Juta

  // Cap DP if property value shrinks below it
  useEffect(() => {
    if (downPayment > propertyValue) {
      setDownPayment(propertyValue);
    }
  }, [propertyValue, downPayment]);

  const principal = (propertyValue - downPayment) + renovationCost;
  const rate = 0.08 / 12; // 8% annual interest
  const periods = 20 * 12; // 20 years tenor
  const monthlyTotal = principal > 0 
    ? (principal * rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1)
    : 0;

  return (
    <section className={styles.section}>
      <div className="container">
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.kicker}>MESIN PROPTECH EKSKLUSIF</div>
          <h2 className={styles.title}>Smart Rule-Based Engine & Visualisasi</h2>
          <p className={styles.subtitle}>
            Lewati proses desain yang memakan waktu. Gunakan simulator kami untuk visualisasi instan dan kalkulator untuk estimasi biaya konstruksi secara real-time berdasarkan AHSP lokal.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className={styles.grid}>
          
          {/* Left Card: Visual Style Renderings */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardKicker}>
                <Sparkles size={14} className={styles.kickerIcon} />
                SMART TRANSFORMASI RUANGAN
              </div>
              <h3 className={styles.cardTitle}>{t('transformationSlider.title')}</h3>
              <p className={styles.cardDesc}>
                {t('transformationSlider.desc')}
              </p>
            </div>

            <div className={styles.sliderWrapper}>
              <div 
                className={styles.sliderContainer}
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={handleInteractionStart}
                onTouchStart={handleInteractionStart}
              >
                {/* After Image (Right side underneath) */}
                <Image
                  src={activeData.after}
                  alt="Design after"
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className={styles.labelAfter}>SESUDAH</div>
                
                {/* Before Image (Left side on top, clipped) */}
                <div 
                  className={styles.beforeWrapper}
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <Image
                    src={activeData.before}
                    alt="Design before"
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className={styles.labelBefore}>SEBELUM</div>
                </div>

                {/* Handle */}
                <div 
                  className={styles.handle}
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className={styles.handleLine} />
                  <div className={styles.handleButton}>
                    <ArrowLeftRight size={14} />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <Button variant="outline" className={`styles.actionBtn w-full hover:bg-[var(--color-emerald)] hover:text-white transition-colors`}>
                MULAI SMART DESIGN STUDIO ✧
              </Button>
            </div>
          </div>

          {/* Right Card: Renovation Estimator */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardKicker}>
                <Calculator size={14} className={styles.kickerIcon} />
                ESTIMATOR RENOVASI TERPADU
              </div>
              <h3 className={styles.cardTitle}>{t('costCalculator.cardTitle')}</h3>
              <p className={styles.cardDesc}>
                {t('costCalculator.desc')}
              </p>
            </div>

            <div className={styles.calculatorBody}>
              <div className={styles.sliderGroup}>
                <div className={styles.sliderLabel}>
                  <span>{t('costCalculator.labelPropertyValue')}</span>
                  <strong>{formatCurrency(propertyValue)}</strong>
                </div>
                <RangeSlider 
                  min={50000000} max={100000000000} step={10000000} 
                  value={propertyValue} onChange={setPropertyValue} 
                  className={styles.darkSlider}
                />
              </div>
              
              <div className={styles.sliderGroup}>
                <div className={styles.sliderLabel}>
                  <span>{t('costCalculator.labelDownPayment')}</span>
                  <strong>{formatCurrency(downPayment)}</strong>
                </div>
                <RangeSlider 
                  min={0} max={propertyValue} step={10000000} 
                  value={downPayment} onChange={setDownPayment} 
                  className={styles.darkSlider}
                />
              </div>

              <div className={styles.sliderGroup}>
                <div className={styles.sliderLabel}>
                  <span>{t('costCalculator.labelRenovationBudget')}</span>
                  <strong>{formatCurrency(renovationCost)}</strong>
                </div>
                <RangeSlider 
                  min={0} max={10000000000} step={10000000} 
                  value={renovationCost} onChange={setRenovationCost} 
                  className={styles.darkSlider}
                />
              </div>

              <div className={styles.resultBox}>
                <div className={styles.resultLeft}>
                  <div className={styles.resultLabel}>ESTIMASI CICILAN PER BULAN</div>
                  <div className={styles.resultValue}>{formatCurrency(monthlyTotal)}</div>
                </div>
                <div className={styles.resultRight}>
                  <div className={styles.resultMeta}>Est. Waktu Pengerjaan: <strong>6-8 minggu</strong></div>
                  <div className={styles.resultMetaHighlight}>Rekomendasi Vendor: <strong>Premium Tier</strong></div>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <Button variant="outline" className={`styles.actionBtnDark w-full hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-colors`}>
                BUAT PROPOSAL LENGKAP &gt;
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
