import React from 'react';
import styles from './ServicePackages.module.css';
import { VendorPackage } from '@/types/vendor';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServicePackagesProps {
  packages: VendorPackage[];
}

export function ServicePackages({ packages }: ServicePackagesProps) {
  if (!packages || packages.length === 0) {
    return <div className={styles.empty}>Paket layanan belum tersedia.</div>;
  }

  // Define tier styling mapping
  const tierStyles: Record<string, { badge: string, highlight?: boolean }> = {
    'basic': { badge: styles.badgeBasic },
    'standard': { badge: styles.badgeStandard, highlight: true },
    'premium': { badge: styles.badgePremium },
    'luxury': { badge: styles.badgeLuxury }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {packages.map((pkg) => {
          const style = tierStyles[pkg.tier] || tierStyles['basic'];
          
          return (
            <div key={pkg.id} className={`${styles.card} ${style.highlight ? styles.highlighted : ''}`}>
              {style.highlight && <div className={styles.popularTag}>Paling Populer</div>}
              
              <div className={styles.header}>
                <span className={`${styles.tierBadge} ${style.badge}`}>
                  {pkg.tier.toUpperCase()}
                </span>
                <h3 className={styles.name}>{pkg.name}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.priceLabel}>Mulai dari</span>
                  <div className={styles.priceValue}>{formatCurrency(pkg.startingPrice)}</div>
                </div>
                <p className={styles.description}>{pkg.description}</p>
              </div>

              <div className={styles.features}>
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className={styles.metaInfo}>
                <div className={styles.metaRow}>
                  <span>Waktu Pengerjaan</span>
                  <strong>{pkg.deliveryTime}</strong>
                </div>
                <div className={styles.metaRow}>
                  <span>Revisi</span>
                  <strong>{pkg.revisions}x</strong>
                </div>
              </div>

              <div className={styles.action}>
                <Button variant={style.highlight ? 'default' : 'outline'} className={`w-full ${style.highlight ? 'bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white' : ''}`}>
                  Pilih Paket
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
