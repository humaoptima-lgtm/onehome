import React from 'react';
import styles from './PropertyGrid.module.css';
import { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>Tidak ada properti ditemukan</h3>
        <p>Coba ubah kriteria pencarian Anda</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
