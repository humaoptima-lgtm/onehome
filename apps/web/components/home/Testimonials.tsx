'use client';

import React from 'react';
import styles from './Testimonials.module.css';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Budi Santoso',
    role: 'Pemilik Rumah, Jakarta',
    text: 'One Home membuat proses renovasi jadi jauh lebih mudah. Dari cari kontraktor sampai kelola pembayaran, semuanya transparan dan aman lewat escrow.',
    rating: 5,
    project: 'Renovasi Rumah 180m²',
    savings: '15%',
    avatar: 'BS',
    color: '#1B7A5A',
  },
  {
    name: 'Siti Rahayu',
    role: 'Interior Designer, Bandung',
    text: 'Sebagai vendor, platform ini membantu saya mendapatkan proyek yang sesuai. Sistem tender yang fair dan pembayaran tepat waktu lewat milestone.',
    rating: 5,
    project: 'Interior Apartemen',
    savings: 'On-time payment',
    avatar: 'SR',
    color: '#2563EB',
  },
  {
    name: 'Andi Wijaya',
    role: 'Pemilik Ruko, Surabaya',
    text: 'Fitur Smart Design Studio benar-benar membantu visualisasi renovasi sebelum mulai. Hasilnya sesuai ekspektasi dan budget terkontrol.',
    rating: 5,
    project: 'Renovasi Ruko 2 Lantai',
    savings: '20%',
    avatar: 'AW',
    color: '#C8A951',
  },
];

export function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Dipercaya Ribuan Pengguna</h2>
          <p className={styles.subtitle}>Cerita sukses dari pemilik rumah dan vendor di seluruh Indonesia</p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t) => (
            <div key={t.name} className={styles.card}>
              <Quote size={28} className={styles.quoteIcon} />
              <div className={styles.stars}>
                {Array.from({ length: t.rating }, (_, i) => (
                  <Star key={i} size={14} fill="#C8A951" color="#C8A951" />
                ))}
              </div>
              <p className={styles.text}>{t.text}</p>
              <div className={styles.meta}>
                <div className={styles.project}>{t.project}</div>
                {t.savings && <div className={styles.savings}>💰 Hemat {t.savings}</div>}
              </div>
              <div className={styles.author}>
                <div className={styles.avatar} style={{ background: `${t.color}20`, color: t.color }}>{t.avatar}</div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
