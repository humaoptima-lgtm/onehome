import React from 'react';
import styles from './page.module.css';
import { getProperties } from '@/services/property.service';
import { FilterSidebar } from '@/components/property/FilterSidebar';
import { MapView } from '@/components/property/MapView';
import { PropertyGrid } from '@/components/property/PropertyGrid';

export const metadata = {
  title: 'Cari Properti | One Home',
  description: 'Temukan hunian impian Anda dengan platform proptech terlengkap.',
};

export default async function PropertySearchPage() {
  const properties = await getProperties();

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <FilterSidebar />
        </aside>

        {/* Main Results Area */}
        <div className={styles.mainContent}>
          <div className={styles.resultsHeader}>
            <div>
              <h1 className={styles.pageTitle}>Properti Tersedia</h1>
              <p className={styles.resultCount}>Menampilkan {properties.length} hasil</p>
            </div>
            
            <div className={styles.sortToggle}>
              <select className={styles.sortSelect} defaultValue="recommended">
                <option value="recommended">Rekomendasi</option>
                <option value="price_asc">Harga Terendah</option>
                <option value="price_desc">Harga Tertinggi</option>
                <option value="newest">Terbaru</option>
              </select>
            </div>
          </div>

          <PropertyGrid properties={properties} />
        </div>

        {/* Map View (Hidden on mobile by default) */}
        <div className={styles.mapContainer}>
          <MapView properties={properties} />
        </div>
      </div>
    </main>
  );
}
