'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './VendorCard.module.css';
import { Vendor } from '@/types/vendor';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2, Clock, MapPin, Briefcase } from 'lucide-react';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';

interface VendorCardProps {
  vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  const { t } = useI18n();
  
  // Format category to readable text or use translation if preferred
  const categoryLabel = vendor.category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <Link href={`/vendors/${vendor.slug}`} className={styles.card}>
      <div className={styles.coverImageContainer}>
        <Image
          src={vendor.coverImage}
          alt={`${vendor.companyName} cover`}
          fill
          className={styles.coverImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={styles.badges}>
          {vendor.featured && <Badge className="bg-[var(--color-gold)] text-white border-[var(--color-gold)]">{t('featuredProperties.featured')}</Badge>}
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.profileImageContainer}>
            <Image
              src={vendor.profileImage}
              alt={vendor.companyName}
              fill
              className={styles.profileImage}
            />
          </div>
          <div className={styles.titleInfo}>
            <div className={styles.nameRow}>
              <h3 className={styles.name}>{vendor.companyName}</h3>
              {vendor.verified && (
                <div title="Verified Professional" style={{display: 'flex'}}>
                  <CheckCircle2 size={16} className={styles.verifiedIcon} />
                </div>
              )}
            </div>
            <span className={styles.category}>{categoryLabel}</span>
          </div>
        </div>

        <div className={styles.ratingRow}>
          <Rating rating={vendor.rating} reviewCount={vendor.reviewCount} size="sm" />
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <Briefcase size={16} />
            <span>{vendor.projectsCompleted} {t('featuredVendors.projects')}</span>
          </div>
          <div className={styles.stat}>
            <MapPin size={16} />
            <span className={styles.truncate}>{vendor.serviceArea[0]} {vendor.serviceArea.length > 1 && `+${vendor.serviceArea.length - 1}`}</span>
          </div>
          <div className={styles.stat}>
            <Clock size={16} />
            <span>{vendor.yearsExperience} {t('featuredVendors.yearsExp')}</span>
          </div>
        </div>

        <div className={styles.specializations}>
          {vendor.specializations.slice(0, 3).map((spec, i) => (
            <span key={i} className={styles.specTag}>{spec}</span>
          ))}
          {vendor.specializations.length > 3 && (
             <span className={styles.specTag}>+{vendor.specializations.length - 3}</span>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.priceLabel}>{t('featuredVendors.from')}</span>
            <strong>{formatCurrency(vendor.startingPrice)}</strong>
          </div>
          <div className={styles.response}>
            <span>{t('featuredVendors.respondsIn')} {vendor.responseTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
