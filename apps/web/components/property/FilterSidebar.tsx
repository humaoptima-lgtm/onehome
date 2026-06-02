'use client';

import React from 'react';
import styles from './FilterSidebar.module.css';
import { Button } from '@/components/ui/button';

export function FilterSidebar() {
  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filter</h2>
        <button className={styles.resetBtn}>Reset</button>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle}>Status</h3>
        <div className={styles.buttonGroup}>
          <button className={`${styles.filterBtn} ${styles.active}`}>Beli</button>
          <button className={styles.filterBtn}>Sewa</button>
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle}>Tipe Properti</h3>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" defaultChecked /> Rumah
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" defaultChecked /> Apartemen
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Vila
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Tanah
          </label>
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle}>Kondisi</h3>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Proyek Baru
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" defaultChecked /> Siap Huni
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" defaultChecked /> Perlu Renovasi
          </label>
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle}>Kamar Tidur</h3>
        <div className={styles.buttonGroup}>
          <button className={styles.filterBtn}>Any</button>
          <button className={styles.filterBtn}>1+</button>
          <button className={`${styles.filterBtn} ${styles.active}`}>2+</button>
          <button className={styles.filterBtn}>3+</button>
          <button className={styles.filterBtn}>4+</button>
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle}>Kamar Mandi</h3>
        <div className={styles.buttonGroup}>
          <button className={styles.filterBtn}>Any</button>
          <button className={`${styles.filterBtn} ${styles.active}`}>1+</button>
          <button className={styles.filterBtn}>2+</button>
          <button className={styles.filterBtn}>3+</button>
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle}>Bujet (Rp)</h3>
        <div className={styles.rangeInputs}>
          <input type="number" placeholder="Min" className={styles.input} />
          <span>-</span>
          <input type="number" placeholder="Max" className={styles.input} />
        </div>
      </div>
      
      <div className={styles.applyWrapper}>
        <Button className="w-full bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] text-white">Terapkan Filter</Button>
      </div>
    </div>
  );
}
