'use client';

import React from 'react';
import Image from 'next/image';
import styles from './InspirationGrid.module.css';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export function InspirationGrid() {
  const { t } = useI18n();
  
  const items = [
    { id: 1, title: 'Modern Japandi', category: 'Interior', image: '/images/property-5.png', span: 'large' },
    { id: 2, title: 'Scandinavian Minimalist', category: 'Living Room', image: '/images/property-1.png', span: 'small' },
    { id: 3, title: 'Luxury Kitchen', category: 'Kitchen', image: '/images/property-3.png', span: 'small' },
    { id: 4, title: 'Contemporary Exterior', category: 'Architecture', image: '/images/hero-home.png', span: 'medium' },
    { id: 5, title: 'Warm Neutrals', category: 'Bedroom', image: '/images/property-2.png', span: 'medium' },
  ];

  return (
    <section className="section bg-white" id="inspiration">
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-header-title">{t('inspiration.title')}</h2>
          <p className="section-header-desc">
            {t('inspiration.desc')}
          </p>
        </div>

        <div className={styles.grid}>
          {items.map((item) => (
            <Link 
              href={`/inspiration/${item.id}`} 
              key={item.id} 
              className={`${styles.card} ${styles[item.span]}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className={styles.overlay}>
                <div className={styles.content}>
                  <span className={styles.category}>{item.category}</span>
                  <h3 className={styles.title}>{item.title}</h3>
                </div>
                <div className={styles.iconWrapper}>
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
