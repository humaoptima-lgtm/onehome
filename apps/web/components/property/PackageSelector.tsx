'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './PackageSelector.module.css';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2, Sparkles, Star, Crown, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PackageOption {
  id: string;
  tier: string;
  name: string;
  description: string;
  pricePerSqm: number;
  features: string[];
  image: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const INTERIOR_PACKAGES: PackageOption[] = [
  {
    id: 'basic',
    tier: 'Basic',
    name: 'Esensial',
    description: 'Desain fungsional dengan sentuhan modern minimalis.',
    pricePerSqm: 50,
    features: ['Cat dinding', 'Pencahayaan standar', 'Gorden basic', 'Konsultasi 1x'],
    image: '/images/property-4.png',
    icon: <Sparkles size={20} />,
  },
  {
    id: 'standard',
    tier: 'Standard',
    name: 'Harmoni',
    description: 'Keseimbangan estetika dan kenyamanan dengan material berkualitas.',
    pricePerSqm: 120,
    features: ['Desain custom', 'Lampu dekoratif', 'Wallpaper aksen', 'Furnitur utama', 'Konsultasi 3x'],
    image: '/images/property-2.png',
    icon: <Star size={20} />,
    highlight: true,
  },
  {
    id: 'premium',
    tier: 'Premium',
    name: 'Eksklusif',
    description: 'Interior high-end dengan material premium dan detail mewah.',
    pricePerSqm: 250,
    features: ['Full custom design', 'Smart lighting', 'Material premium', 'Furnitur lengkap', 'Art curation', 'Konsultasi unlimited'],
    image: '/images/property-1.png',
    icon: <Crown size={20} />,
  },
  {
    id: 'luxury',
    tier: 'Luxury',
    name: 'Maestro',
    description: 'Pengalaman bespoke dari arsitek interior kelas dunia.',
    pricePerSqm: 500,
    features: ['Bespoke everything', 'Imported materials', 'Smart home integration', 'Custom furniture', 'Art collection', 'Dedicated project manager', 'After-care 1 tahun'],
    image: '/images/property-5.png',
    icon: <Gem size={20} />,
  },
];

interface PackageSelectorProps {
  buildingArea: number;
}

export function PackageSelector({ buildingArea }: PackageSelectorProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>('standard');

  const selected = INTERIOR_PACKAGES.find(p => p.id === selectedPackage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Paket Desain Interior</h3>
          <p className={styles.subtitle}>Pilih tingkat finishing yang sesuai dengan gaya dan bujet Anda</p>
        </div>
      </div>

      <div className={styles.packagesGrid}>
        {INTERIOR_PACKAGES.map((pkg) => {
          const totalPrice = pkg.pricePerSqm * buildingArea;
          const isSelected = selectedPackage === pkg.id;

          return (
            <button
              key={pkg.id}
              className={`${styles.packageCard} ${isSelected ? styles.selectedCard : ''} ${pkg.highlight ? styles.popularCard : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.highlight && <span className={styles.popularBadge}>Paling Populer</span>}
              <div className={styles.cardImageWrap}>
                <Image src={pkg.image} alt={pkg.name} fill className={styles.cardImage} sizes="200px" />
                <div className={styles.cardImageOverlay}>
                  <span className={styles.tierIcon}>{pkg.icon}</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.tierLabel}>{pkg.tier}</span>
                <h4 className={styles.packageName}>{pkg.name}</h4>
                <p className={styles.packageDesc}>{pkg.description}</p>
                <div className={styles.priceSection}>
                  <span className={styles.packagePrice}>{formatCurrency(totalPrice)}</span>
                  <span className={styles.pricePerSqm}>{formatCurrency(pkg.pricePerSqm)} / m²</span>
                </div>
              </div>
              {isSelected && (
                <div className={styles.selectedIndicator}>
                  <CheckCircle2 size={20} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className={styles.detailSection}>
          <h4 className={styles.detailTitle}>Yang termasuk dalam paket {selected.name}:</h4>
          <div className={styles.featureList}>
            {selected.features.map((f, i) => (
              <div key={i} className={styles.featureItem}>
                <CheckCircle2 size={16} className={styles.featureCheck} />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <Button size="lg" className={`${styles.ctaButton} bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white`}>
            Pilih Paket {selected.name}
          </Button>
        </div>
      )}
    </div>
  );
}
