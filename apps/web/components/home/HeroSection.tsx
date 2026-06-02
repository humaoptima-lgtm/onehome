'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';
import { HeroTabs as Tabs } from '@/components/ui/HeroTabs';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Home, Ruler, Wallet, ChevronRight } from 'lucide-react';

const rotatingWords = [
  'Beli Properti',
  'Renovasi Rumah',
  'Desain Interior',
  'Cari Kontraktor',
  'Ajukan KPR',
  'Kelola Proyek',
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState('property');
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'property', label: 'Properti' },
    { id: 'vendor', label: 'Vendor' },
    { id: 'financing', label: 'Pembiayaan' },
  ];

  return (
    <section className={styles.hero}>
      {/* Background */}
      <div className={styles.backgroundContainer}>
        <Image src="/images/hero-home.png" alt="Luxury modern home" fill priority className={styles.backgroundImage} sizes="100vw" />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>
          {/* Text */}
          <div className={styles.textContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Platform PropTech & Konstruksi Terintegrasi
            </div>
            <h1 className={styles.title}>
              <span className={styles.titleLine}>
                <span className={`${styles.rotatingWord} ${isAnimating ? styles.slideOut : styles.slideIn}`}>
                  {rotatingWords[wordIndex]}
                </span>
              </span>
              <span className={styles.titleStatic}>Semua di Satu Ekosistem.</span>
            </h1>
            <p className={styles.subtitle}>
              Beli properti, bangun rumah, cari kontraktor, hingga ajukan KPR — 100% aman dengan perlindungan Bank Escrow dan Inspeksi Independen.
            </p>
            {/* Stats */}
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>2.480+</span>
                <span className={styles.heroStatLabel}>Pengguna</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>156</span>
                <span className={styles.heroStatLabel}>Vendor Terverifikasi</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>892</span>
                <span className={styles.heroStatLabel}>Properti</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>Rp 85M+</span>
                <span className={styles.heroStatLabel}>Escrow Protected</span>
              </div>
            </div>
          </div>

          {/* Search Console */}
          <div className={styles.searchCard}>
            <Tabs tabs={tabs} defaultTab="property" onChange={setActiveTab} variant="line" className={styles.tabs} />
            <div className={styles.searchForm}>
              {activeTab === 'property' && (
                <>
                  <div className={styles.filterGroup}>
                    <label><MapPin size={12} className={styles.filterIcon} /> Lokasi</label>
                    <input type="text" placeholder="Jakarta, Bandung, Bali..." />
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.filterGroup}>
                    <label><Home size={12} className={styles.filterIcon} /> Tipe Properti</label>
                    <select>
                      <option value="">Semua Tipe</option>
                      <option value="house">Rumah</option>
                      <option value="apartment">Apartemen</option>
                      <option value="villa">Villa</option>
                      <option value="ruko">Ruko</option>
                    </select>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.filterGroup}>
                    <label><Wallet size={12} className={styles.filterIcon} /> Budget</label>
                    <select>
                      <option value="">Semua Harga</option>
                      <option value="0-1b">Di bawah Rp 1 M</option>
                      <option value="1b-3b">Rp 1 M – 3 M</option>
                      <option value="3b+">Di atas Rp 3 M</option>
                    </select>
                  </div>
                  <Button size="lg" className={`${styles.searchBtn} bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white`}>
                    <Search size={18} /> Cari
                  </Button>
                </>
              )}
              {activeTab === 'vendor' && (
                <>
                  <div className={styles.filterGroup}>
                    <label>Jenis Layanan</label>
                    <select>
                      <option value="">Semua Layanan</option>
                      <option value="contractor">Kontraktor</option>
                      <option value="architect">Arsitek</option>
                      <option value="interior">Interior Designer</option>
                      <option value="mep">MEP Specialist</option>
                    </select>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.filterGroup}>
                    <label>Lokasi</label>
                    <input type="text" placeholder="Kota atau area..." />
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.filterGroup}>
                    <label>Rating</label>
                    <select>
                      <option value="">Semua Rating</option>
                      <option value="4.5+">⭐ 4.5+</option>
                      <option value="4.0+">⭐ 4.0+</option>
                    </select>
                  </div>
                  <Button size="lg" className={`${styles.searchBtn} bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white`}>
                    <Search size={18} /> Cari Vendor
                  </Button>
                </>
              )}
              {activeTab === 'financing' && (
                <>
                  <div className={styles.filterGroup}>
                    <label>Harga Properti</label>
                    <input type="text" placeholder="Rp 2.000.000.000" />
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.filterGroup}>
                    <label>DP (%)</label>
                    <select>
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                      <option value="20">20%</option>
                      <option value="30">30%</option>
                    </select>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.filterGroup}>
                    <label>Tenor</label>
                    <select>
                      <option value="10">10 Tahun</option>
                      <option value="15">15 Tahun</option>
                      <option value="20">20 Tahun</option>
                      <option value="25">25 Tahun</option>
                    </select>
                  </div>
                  <Button size="lg" className={`${styles.searchBtn} bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white`}>
                    <Search size={18} /> Simulasi
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
