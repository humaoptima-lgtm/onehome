'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './FeaturedProperties.module.css';
import { PropertyCard } from '../property/PropertyCard';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { Property } from '@/types/property';
import { motion } from 'framer-motion';

export function FeaturedProperties() {
  const { t } = useI18n();
  const [properties, setProperties] = useState<Property[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    // Dynamically import to avoid mixing server/client
    import('@/services/property.service').then(mod => {
      mod.getFeaturedProperties(8).then(setProperties);
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="section bg-warm">
      <div className="container overflow-visible">
        <div className={styles.header}>
          <div>
            <h2 className="section-header-title">{t('featuredProperties.title')}</h2>
            <p className="section-header-desc">
              {t('featuredProperties.desc')}
            </p>
          </div>
          
          <div className="hidden md:flex gap-4">
            <Button variant="outline" size="icon" onClick={scrollPrev} className={styles.navBtn}>
              <ArrowLeft size={18} />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} className={styles.navBtn}>
              <ArrowRight size={18} />
            </Button>
            <Button variant="outline" className={`${styles.viewAllBtn} gap-2 ml-2`}>
              {t('featuredProperties.viewAll')}
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.carouselWrapper}>
        <div 
          ref={carouselRef}
          className={`${styles.carousel} ${isDragging ? styles.dragging : ''}`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {properties.map((property, index) => (
            <motion.div 
              key={property.id}
              className={styles.carouselItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <PropertyCard property={property} featured={index < 2} />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="container">
        <div className={styles.mobileViewAll}>
          <Button variant="outline" className="w-full gap-2">
            {t('featuredProperties.viewAll')}
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
