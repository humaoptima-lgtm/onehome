'use client';

import React from 'react';
import styles from './PartnerLogos.module.css';
import { useI18n } from '@/lib/i18n';

export function PartnerLogos() {
  const { t } = useI18n();
  
  const partners = [
    { name: 'Architectural Digest', logo: 'ARCHITECTURAL DIGEST' },
    { name: 'Elle Decor', logo: 'ELLE DECOR' },
    { name: 'Vogue Living', logo: 'VOGUE LIVING' },
    { name: 'Dwell', logo: 'dwell' },
    { name: 'The New York Times', logo: 'The New York Times' },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <p className={styles.title}>{t('partners.title')}</p>
        <div className={styles.logoRow}>
          {partners.map((partner, index) => (
            <div key={index} className={styles.logoWrapper}>
              <span className={styles.logoText}>{partner.logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
