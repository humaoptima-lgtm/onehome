import React from 'react';
import styles from './page.module.css';
import { getVendors } from '@/services/vendor.service';
import { VendorCard } from '@/components/vendor/VendorCard';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Cari Vendor & Profesional | One Home',
  description: 'Temukan kontraktor, desainer interior, dan profesional tepercaya untuk proyek rumah Anda.',
};

export default async function VendorMarketplacePage() {
  const vendors = await getVendors();

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'interior-designer', label: 'Desainer Interior' },
    { id: 'contractor', label: 'Kontraktor' },
    { id: 'architect', label: 'Arsitek' },
    { id: 'furniture-maker', label: 'Pembuat Furnitur' },
  ];

  return (
    <main className={styles.page}>
      {/* Header Search Section */}
      <section className={styles.headerSection}>
        <div className="container">
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Temukan Profesional Tepercaya</h1>
            <p className={styles.subtitle}>
              Dari desain interior hingga renovasi total, temukan ahlinya di sini.
            </p>
            <div className={styles.searchWrapper}>
              <div className={styles.searchInputWrapper}>
                <Search className={styles.searchIcon} size={20} />
                <input 
                  type="text" 
                  placeholder="Cari nama vendor atau spesialisasi..." 
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.locationInputWrapper}>
                <input 
                  type="text" 
                  placeholder="Lokasi" 
                  className={styles.locationInput}
                  defaultValue="Jakarta"
                />
              </div>
              <Button size="lg" className={`${styles.searchBtn} bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white`}>Cari</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainSection}>
        <div className={`container ${styles.layout}`}>
          
          {/* Sidebar Filters */}
          <aside className={styles.sidebar}>
            <div className={styles.filterWidget}>
              <h3 className={styles.widgetTitle}>Kategori</h3>
              <div className={styles.categoryList}>
                {categories.map((cat, i) => (
                  <label key={cat.id} className={styles.radioLabel}>
                    <input type="radio" name="category" defaultChecked={i === 0} />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterWidget}>
              <h3 className={styles.widgetTitle}>Rating Minimum</h3>
              <div className={styles.ratingList}>
                {[4.5, 4.0, 3.5].map(rating => (
                  <label key={rating} className={styles.radioLabel}>
                    <input type="radio" name="rating" />
                    <span>{rating} & ke atas</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterWidget}>
              <h3 className={styles.widgetTitle}>Tahun Pengalaman</h3>
              <div className={styles.checkboxList}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> 1-3 Tahun
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> 3-5 Tahun
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> 5+ Tahun
                </label>
              </div>
            </div>

            <div className={styles.filterWidget}>
              <h3 className={styles.widgetTitle}>Status</h3>
              <label className={styles.toggleLabel}>
                <input type="checkbox" className={styles.toggleInput} defaultChecked />
                <span>Hanya Vendor Terverifikasi</span>
              </label>
            </div>
          </aside>

          {/* Grid Results */}
          <div className={styles.resultsArea}>
            <div className={styles.resultsHeader}>
              <p className={styles.resultsCount}>Menampilkan {vendors.length} profesional</p>
              <select className={styles.sortSelect} defaultValue="recommended">
                <option value="recommended">Rekomendasi</option>
                <option value="rating_desc">Rating Tertinggi</option>
                <option value="projects_desc">Proyek Terbanyak</option>
              </select>
            </div>

            <div className={styles.vendorGrid}>
              {vendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>

            <div className={styles.pagination}>
              <Button variant="outline">Muat Lebih Banyak</Button>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
