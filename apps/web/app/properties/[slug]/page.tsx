import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPropertyBySlug, getAllPropertySlugs } from '@/services/property.service';
import styles from './page.module.css';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { PropertyOverview } from '@/components/property/PropertyOverview';
import { MortgageCalculator } from '@/components/property/MortgageCalculator';
import { RenovationEstimator } from '@/components/property/RenovationEstimator';
import { PackageSelector } from '@/components/property/PackageSelector';
import { CostDashboard } from '@/components/property/CostDashboard';
import type { Metadata } from 'next';

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const property = await getPropertyBySlug(slug);
    return {
      title: `${property.title} | One Home`,
      description: property.description.slice(0, 160),
      openGraph: {
        title: property.title,
        description: property.description.slice(0, 160),
        images: property.media.length > 0 ? [property.media[0].url] : [],
      },
    };
  } catch {
    return { title: 'Properti Tidak Ditemukan | One Home' };
  }
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;

  let property;
  try {
    property = await getPropertyBySlug(slug);
  } catch {
    notFound();
  }

  if (!property) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Beranda</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/properties">Properti</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href={`/properties?city=${property.address.city}`}>{property.address.city}</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{property.title}</span>
        </nav>

        {/* Photo Gallery */}
        <PropertyGallery media={property.media} />

        {/* Main Content Layout: Left (content) + Right (sticky sidebar) */}
        <div className={styles.layout}>
          {/* Left Column */}
          <div className={styles.mainContent}>
            <PropertyOverview property={property} />
            <MortgageCalculator propertyPrice={property.price} />
            <RenovationEstimator
              buildingArea={property.buildingArea}
              currentCondition={property.condition}
            />
            <PackageSelector buildingArea={property.buildingArea} />
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <aside className={styles.sidebar}>
            <CostDashboard
              propertyPrice={property.price}
              renovationCost={property.estimatedRenovation || 0}
              interiorCost={property.buildingArea * 120}
              furnitureCost={25000}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
