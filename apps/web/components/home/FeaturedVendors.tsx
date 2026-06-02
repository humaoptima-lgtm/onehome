'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './FeaturedVendors.module.css';
import { VendorCard } from '../vendor/VendorCard';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { Vendor } from '@/types/vendor';

export function FeaturedVendors() {
  const { t } = useI18n();
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    import('@/services/vendor.service').then(mod => {
      mod.getFeaturedVendors(4).then(setVendors);
    });
  }, []);

  return (
    <section className="section bg-white">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.introCol}>
            <h2 className="section-header-title">{t('featuredVendors.title')}</h2>
            <p className="section-header-desc">
              {t('featuredVendors.desc')}
            </p>
            
            <div className={styles.categories}>
              <Link href="/vendors?category=interior-design" className={styles.categoryLink}>
                {t('featuredVendors.interiorDesigners')} <ArrowRight size={16} />
              </Link>
              <Link href="/vendors?category=contractor" className={styles.categoryLink}>
                {t('featuredVendors.generalContractors')} <ArrowRight size={16} />
              </Link>
              <Link href="/vendors?category=architect" className={styles.categoryLink}>
                {t('featuredVendors.architects')} <ArrowRight size={16} />
              </Link>
              <Link href="/vendors?category=furniture" className={styles.categoryLink}>
                {t('featuredVendors.customFurniture')} <ArrowRight size={16} />
              </Link>
            </div>
            
            <Button variant="outline" size="lg" className={`${styles.searchBtn} gap-2`}>
              <Search size={18} />
              {t('featuredVendors.browseDirectory')}
            </Button>
          </div>
          
          <div className={styles.gridCol}>
            <div className={styles.grid}>
              {vendors.map((vendor, index) => (
                <div key={vendor.id} className={`animate-fade-in-up delay-${(index % 4) + 1}`}>
                  <VendorCard vendor={vendor} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
