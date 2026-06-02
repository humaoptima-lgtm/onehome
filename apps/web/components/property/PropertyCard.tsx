'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PropertyCard.module.css';
import { Property } from '@/types/property';
import { formatCurrency, formatArea } from '@/lib/utils';
import { Bed, Bath, Maximize, MapPin, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const mainImage = property.media.find(m => m.sortOrder === 1)?.url || property.media[0]?.url;
  const { t } = useI18n();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaved(!isSaved);
  };

  return (
    <Link href={`/properties/${property.slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {mainImage && (
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className={styles.overlay}>
          <div className={styles.badges}>
            {featured && <Badge className="bg-[var(--color-gold)] text-white border-[var(--color-gold)]">{t('featuredProperties.featured')}</Badge>}
            <Badge variant="default" className={styles.statusBadge}>
              {property.condition === 'baru' ? t('featuredProperties.newProject') : t('featuredProperties.resale')}
            </Badge>
          </div>
          <button className={`${styles.saveBtn} ${isSaved ? styles.saveBtnActive : ''}`} aria-label={t('featuredProperties.saveProperty')} onClick={handleSave}>
            <motion.div
              whileTap={{ scale: 0.8 }}
              animate={isSaved ? { scale: [1, 1.3, 1] } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Heart 
                size={20} 
                className={isSaved ? styles.heartSaved : ''} 
                fill={isSaved ? "currentColor" : "none"} 
              />
            </motion.div>
          </button>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.priceRow}>
          <h3 className={styles.price}>{formatCurrency(property.price)}</h3>
          {property.listingType === 'disewakan' && <span className={styles.rentPeriod}>{t('common.perMonth')}</span>}
        </div>
        
        <h4 className={styles.title}>{property.title}</h4>
        
        <div className={styles.location}>
          <MapPin size={16} />
          <span>{property.address.district}, {property.address.city}</span>
        </div>
        
        <div className={styles.features}>
          <div className={styles.feature} title={t('featuredProperties.bedrooms')}>
            <Bed size={18} />
            <span>{property.bedrooms}</span>
          </div>
          <div className={styles.feature} title={t('featuredProperties.bathrooms')}>
            <Bath size={18} />
            <span>{property.bathrooms}</span>
          </div>
          <div className={styles.feature} title={t('featuredProperties.buildingArea')}>
            <Maximize size={18} />
            <span>{formatArea(property.buildingArea)}</span>
          </div>
        </div>
        
        <div className={styles.footer}>
          <div className={styles.agentInfo}>
            <div className={styles.agentAvatar}>
              {property.agent.name.charAt(0)}
            </div>
            <span className={styles.agentName}>{property.agent.name}</span>
          </div>
          {property.propertyScore && (
            <div className={styles.score}>
              <span>{t('featuredProperties.score')}</span>
              <strong>{property.propertyScore}</strong>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
