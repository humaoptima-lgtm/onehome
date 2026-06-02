import React from 'react';
import Image from 'next/image';
import styles from './PortfolioGallery.module.css';
import { PortfolioProject } from '@/types/vendor';

interface PortfolioGalleryProps {
  portfolio: PortfolioProject[];
}

export function PortfolioGallery({ portfolio }: PortfolioGalleryProps) {
  if (!portfolio || portfolio.length === 0) {
    return <div className={styles.empty}>Belum ada portofolio.</div>;
  }

  return (
    <div className={styles.grid}>
      {portfolio.map((project) => (
        <div key={project.id} className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src={project.images[0] || '/images/property-1.png'}
              alt={project.title}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {project.beforeImage && (
              <div className={styles.badge}>Before/After</div>
            )}
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Gaya:</span>
              <span className={styles.metaValue}>{project.style}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Durasi:</span>
              <span className={styles.metaValue}>{project.duration}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
