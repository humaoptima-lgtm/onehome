'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, Home, UploadCloud, FileText, CheckSquare, DollarSign, Calendar, Users, FileCheck } from 'lucide-react';

const STEPS = [
  { id: 'info', title: 'Informasi Properti', icon: Home },
  { id: 'photos', title: 'Foto Kondisi', icon: UploadCloud },
  { id: 'floorplan', title: 'Denah', icon: FileText },
  { id: 'scope', title: 'Lingkup Renovasi', icon: CheckSquare },
  { id: 'budget', title: 'Bujet', icon: DollarSign },
  { id: 'timeline', title: 'Jadwal', icon: Calendar },
  { id: 'vendors', title: 'Pilih Vendor', icon: Users },
  { id: 'review', title: 'Review', icon: FileCheck },
];

export default function CreateTenderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Simulate form submission and redirect
      router.push('/tender/TND-12345/success');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepContent = () => {
    // MVP implementation of steps
    switch (currentStep) {
      case 0:
        return (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Detail Properti Anda</h2>
            <div className={styles.formGroup}>
              <label className={styles.label}>Tipe Properti</label>
              <select className={styles.input}>
                <option>Rumah</option>
                <option>Apartemen</option>
                <option>Vila</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Luas Bangunan (m²)</label>
              <input type="number" className={styles.input} placeholder="Misal: 150" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Alamat Lengkap</label>
              <textarea className={styles.textarea} placeholder="Alamat lengkap properti..." />
            </div>
          </div>
        );
      case 1:
      case 2:
        return (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>{STEPS[currentStep].title}</h2>
            <div className={styles.uploadZone}>
              <UploadCloud size={48} className={styles.uploadIcon} />
              <p>Tarik & lepas file di sini, atau <strong>Pilih File</strong></p>
              <span className={styles.uploadHint}>Maksimal 10MB per file. JPG, PNG, PDF.</span>
            </div>
          </div>
        );
      case 7:
        return (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Review & Submit</h2>
            <p className={styles.reviewText}>Silakan periksa kembali semua informasi yang Anda masukkan sebelum mengirimkan tender ini ke vendor yang dipilih.</p>
            <div className={styles.reviewBox}>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Properti:</span>
                <span>Rumah, 150m² di Jakarta Selatan</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Lingkup:</span>
                <span>Renovasi Total, Interior</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Bujet:</span>
                <span>Rp 500 Juta - Rp 750 Juta</span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>{STEPS[currentStep].title}</h2>
            <p className={styles.placeholderText}>Modul ini sedang dikembangkan (MVP Phase).</p>
          </div>
        );
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Buat Tender Baru</h1>
          <p className={styles.subtitle}>Dapatkan penawaran terbaik dari profesional terverifikasi untuk proyek Anda.</p>
        </div>
      </div>

      <div className={`container ${styles.layout}`}>
        {/* Progress Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.progressNav}>
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isPast = index < currentStep;
              
              return (
                <div 
                  key={step.id} 
                  className={`${styles.stepItem} ${isActive ? styles.active : ''} ${isPast ? styles.past : ''}`}
                >
                  <div className={styles.stepIconWrapper}>
                    {isPast ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                  </div>
                  <span className={styles.stepName}>{step.title}</span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main Form Area */}
        <div className={styles.formArea}>
          <div className={styles.card}>
            {renderStepContent()}

            <div className={styles.footer}>
              <Button 
                variant="outline" 
                onClick={handlePrev} 
                disabled={currentStep === 0}
              >
                Kembali
              </Button>
              <Button 
                onClick={handleNext}
                className="gap-2 bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white"
              >
                {currentStep === STEPS.length - 1 ? 'Kirim Tender' : 'Selanjutnya'}
                {currentStep < STEPS.length - 1 && <ChevronRight size={16} />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
