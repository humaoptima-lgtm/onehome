'use client';

import React, { useState } from 'react';
import styles from './FAQ.module.css';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Apa itu One Home?', a: 'One Home adalah platform PropTech terintegrasi yang menghubungkan pemilik rumah dengan kontraktor, bank, dan layanan renovasi. Dari pencarian properti, estimasi biaya, tender vendor, hingga pembayaran — semua dalam satu platform.' },
  { q: 'Bagaimana sistem escrow bekerja?', a: 'Dana renovasi Anda disimpan di rekening escrow yang aman. Dana hanya direlease ke vendor setelah setiap milestone pekerjaan disetujui oleh Anda. Ini melindungi kedua belah pihak dan memastikan transparansi pembayaran.' },
  { q: 'Berapa biaya menggunakan One Home?', a: 'Pendaftaran dan penggunaan dasar platform gratis. Kami mengenakan platform fee 2.5% dari nilai proyek yang menggunakan fitur escrow dan tender. Tidak ada biaya tersembunyi.' },
  { q: 'Bagaimana proses tender bekerja?', a: 'Anda membuat spesifikasi proyek renovasi, lalu mengundang vendor yang terverifikasi untuk memberikan penawaran. Anda bisa membandingkan harga, portofolio, dan rating sebelum memilih vendor terbaik.' },
  { q: 'Apakah vendor sudah terverifikasi?', a: 'Ya, semua vendor di One Home melalui proses verifikasi ketat termasuk pengecekan legalitas (NIB, NPWP, SIUP), portofolio proyek, rekening bank, dan review dari klien sebelumnya.' },
  { q: 'Bisakah saya mengajukan KPR melalui One Home?', a: 'Ya, One Home terintegrasi dengan bank partner (BCA, BTN, Mandiri, CIMB) untuk simulasi KPR, perbandingan bunga, dan pengajuan langsung. Semua proses dari simulasi hingga pencairan bisa dilacak di dashboard.' },
  { q: 'Apa itu Smart Design Studio?', a: 'Smart Design Studio adalah fitur yang memungkinkan Anda mengunggah foto ruangan dan mendapatkan visualisasi desain baru menggunakan engine kami. Anda bisa memilih gaya (Japandi, Modern, Minimalis, dll) dan langsung melihat before/after.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Pertanyaan yang Sering Diajukan</h2>
          <p className={styles.subtitle}>Temukan jawaban untuk pertanyaan umum tentang One Home</p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div key={i} className={`${styles.faqItem} ${open === i ? styles.faqOpen : ''}`}>
              <button className={styles.faqQuestion} onClick={() => setOpen(open === i ? null : i)}>
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`${styles.faqChevron} ${open === i ? styles.faqChevronOpen : ''}`} />
              </button>
              <div className={`${styles.faqAnswer} ${open === i ? styles.faqAnswerOpen : ''}`}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
