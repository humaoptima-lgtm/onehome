'use client';

import React from 'react';
import styles from './CTABanner.module.css';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield } from 'lucide-react';
import Link from 'next/link';

export function CTABanner() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <Sparkles size={14} /> Mulai Sekarang
          </div>
          <h2 className={styles.title}>Siap Wujudkan Rumah Impian Anda?</h2>
          <p className={styles.subtitle}>
            Bergabung dengan ribuan pemilik rumah yang sudah menghemat rata-rata 15% biaya renovasi dengan One Home.
          </p>
          <div className={styles.actions}>
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 bg-white text-[var(--color-navy)] hover:bg-[var(--color-bg-cool)] font-semibold">
                Mulai Gratis <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/calculator">
              <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10 font-semibold">
                Hitung Estimasi Biaya
              </Button>
            </Link>
          </div>
          <div className={styles.trust}>
            <Shield size={14} />
            <span>Dana terlindungi dengan escrow — Gratis tanpa biaya pendaftaran</span>
          </div>
        </div>
      </div>
    </section>
  );
}
