import React from 'react';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { getVendorBySlug } from '@/services/vendor.service';
import { VendorHero } from '@/components/vendor/VendorHero';
import { PortfolioGallery } from '@/components/vendor/PortfolioGallery';
import { ServicePackages } from '@/components/vendor/ServicePackages';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

interface VendorProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: VendorProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const vendor = await getVendorBySlug(slug);
    if (!vendor) return { title: 'Vendor Tidak Ditemukan | One Home' };
    return {
      title: `${vendor.companyName} | One Home Vendors`,
      description: vendor.description,
    };
  } catch {
    return { title: 'Vendor Tidak Ditemukan | One Home' };
  }
}

export default async function VendorProfilePage({ params }: VendorProfilePageProps) {
  const { slug } = await params;

  let vendor;
  try {
    vendor = await getVendorBySlug(slug);
  } catch {
    notFound();
  }

  if (!vendor) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <VendorHero vendor={vendor} />

      <div className={`container ${styles.layout}`}>
        {/* Left Content Column */}
        <div className={styles.mainContent}>
          
          {/* Overview Section */}
          <section className={styles.section} id="overview">
            <h2 className={styles.sectionTitle}>Tentang Kami</h2>
            <p className={styles.description}>{vendor.story || vendor.description}</p>
            
            <div className={styles.overviewGrid}>
              <div className={styles.overviewItem}>
                <MapPin className={styles.overviewIcon} />
                <div>
                  <span className={styles.overviewLabel}>Area Layanan</span>
                  <span className={styles.overviewValue}>{vendor.serviceArea.join(', ')}</span>
                </div>
              </div>
              <div className={styles.overviewItem}>
                <Users className={styles.overviewIcon} />
                <div>
                  <span className={styles.overviewLabel}>Ukuran Tim</span>
                  <span className={styles.overviewValue}>{vendor.teamSize ? `${vendor.teamSize} orang` : 'Tersedia'}</span>
                </div>
              </div>
              <div className={styles.overviewItem}>
                <Calendar className={styles.overviewIcon} />
                <div>
                  <span className={styles.overviewLabel}>Pengalaman</span>
                  <span className={styles.overviewValue}>{vendor.yearsExperience} Tahun</span>
                </div>
              </div>
            </div>

            <div className={styles.specializations}>
              <h3 className={styles.subsectionTitle}>Spesialisasi</h3>
              <div className={styles.tags}>
                {vendor.specializations.map((spec, i) => (
                  <span key={i} className={styles.tag}>{spec}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section className={styles.section} id="portfolio">
            <h2 className={styles.sectionTitle}>Portofolio Proyek</h2>
            <PortfolioGallery portfolio={vendor.portfolio} />
          </section>

          {/* Service Packages Section */}
          <section className={styles.section} id="packages">
            <h2 className={styles.sectionTitle}>Paket Layanan</h2>
            <ServicePackages packages={vendor.packages} />
          </section>

          {/* Reviews Placeholder */}
          <section className={styles.section} id="reviews">
            <h2 className={styles.sectionTitle}>Ulasan Klien</h2>
            <div className={styles.placeholderBox}>
              Modul Ulasan Sedang Dikembangkan
            </div>
          </section>

          {/* FAQ Placeholder */}
          {vendor.faq && vendor.faq.length > 0 && (
            <section className={styles.section} id="faq">
              <h2 className={styles.sectionTitle}>Tanya Jawab (FAQ)</h2>
              <div className={styles.placeholderBox}>
                Modul FAQ Sedang Dikembangkan
              </div>
            </section>
          )}

        </div>

        {/* Right Sticky Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.actionWidget}>
            <h3 className={styles.widgetTitle}>Tertarik dengan layanan {vendor.companyName}?</h3>
            <p className={styles.widgetDesc}>Waktu respons rata-rata: <strong>{vendor.responseTime}</strong></p>
            
            <div className={styles.actionButtons}>
              <Button size="lg" className="w-full bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white">Minta Penawaran</Button>
              <Button variant="outline" size="default" className="w-full">Undang ke Tender</Button>
              <Button variant="ghost" size="default" className="w-full">Kirim Pesan</Button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
