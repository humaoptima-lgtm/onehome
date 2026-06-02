'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './StatsSection.module.css';

const stats = [
  { value: 2480, suffix: '+', label: 'Pengguna Terdaftar', icon: '👥' },
  { value: 156, suffix: '', label: 'Vendor Terverifikasi', icon: '✅' },
  { value: 892, suffix: '', label: 'Properti Listed', icon: '🏠' },
  { value: 85, suffix: 'M+', prefix: 'Rp ', label: 'Escrow Protected', icon: '🛡️' },
  { value: 340, suffix: '+', label: 'Proyek Selesai', icon: '🔨' },
  { value: 15, suffix: '%', label: 'Rata-rata Penghematan', icon: '💰' },
];

function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className={styles.statValue}>
      {prefix}{count.toLocaleString('id-ID')}{suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.statIcon}>{s.icon}</div>
              <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
