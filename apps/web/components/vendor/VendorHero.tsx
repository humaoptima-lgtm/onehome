import React from 'react';
import Image from 'next/image';
import styles from './VendorHero.module.css';
import { Vendor } from '@/types/vendor';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/Rating';
import { ShieldCheck, MapPin, Briefcase, Award } from 'lucide-react';

interface VendorHeroProps {
  vendor: Vendor;
}

export function VendorHero({ vendor }: VendorHeroProps) {
  const categoryLabels: Record<string, string> = {
    'contractor': 'Kontraktor',
    'interior-designer': 'Desainer Interior',
    'architect': 'Arsitek',
    'furniture-maker': 'Pembuat Furnitur',
    'kitchen-specialist': 'Spesialis Dapur',
    'landscape-specialist': 'Taman & Lanskap',
    'smart-home-installer': 'Smart Home',
    'handyman': 'Handyman'
  };

  return (
    <div className={styles.heroSection}>
      {/* Cover Image Background */}
      <div className={styles.coverWrapper}>
        <Image
          src={vendor.coverImage || '/images/property-4.png'}
          alt={`${vendor.companyName} Cover`}
          fill
          priority
          className={styles.coverImage}
          sizes="100vw"
        />
        <div className={styles.overlay} />
      </div>

      {/* Content Container positioned over cover */}
      <div className={`container ${styles.contentContainer}`}>
        <div className={styles.profileBox}>
          
          <div className={styles.headerArea}>
            <div className={styles.avatarWrapper}>
              <Image
                src={vendor.profileImage || '/images/dev-placeholder.png'}
                alt={vendor.companyName}
                fill
                className={styles.avatar}
                sizes="120px"
              />
            </div>
            
            <div className={styles.titleInfo}>
              <div className={styles.badges}>
                <Badge variant="outline">{categoryLabels[vendor.category] || vendor.category}</Badge>
                {vendor.verified && (
                  <Badge variant="default" className={styles.verifiedBadge}>
                    <ShieldCheck size={14} className="mr-1" /> Verified
                  </Badge>
                )}
                {vendor.featured && <Badge className="bg-[var(--color-gold)] text-white border-[var(--color-gold)]">Top Rated</Badge>}
              </div>
              
              <h1 className={styles.companyName}>{vendor.companyName}</h1>
              
              <div className={styles.locationRow}>
                <MapPin size={16} />
                <span>{vendor.serviceArea.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className={styles.statsDivider} />

          <div className={styles.statsArea}>
            <div className={styles.statBox}>
              <span className={styles.statValue}>
                <Rating rating={vendor.rating} showCount={false} size="md" />
                <span className="ml-1">{vendor.rating}</span>
              </span>
              <span className={styles.statLabel}>{vendor.reviewCount} Ulasan</span>
            </div>
            
            <div className={styles.statBox}>
              <span className={styles.statValue}>
                <Briefcase size={20} className={styles.statIcon} />
                {vendor.projectsCompleted}
              </span>
              <span className={styles.statLabel}>Proyek Selesai</span>
            </div>
            
            <div className={styles.statBox}>
              <span className={styles.statValue}>
                <Award size={20} className={styles.statIcon} />
                {vendor.yearsExperience} Thn
              </span>
              <span className={styles.statLabel}>Pengalaman</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
