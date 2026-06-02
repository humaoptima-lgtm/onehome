'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { toast } from 'sonner';
import {
  Home, Search, Heart, Star, Shield, Check, X, AlertTriangle,
  Info, ChevronRight, Loader2, Eye, Download, Upload, Trash2,
  Edit, Plus, MapPin, Bed, Bath, Maximize, ArrowUpRight,
  Bell, Settings, User, FileText, Wallet, Building2, Gavel,
  Palette, PaintBucket, BarChart3, PieChart, TrendingUp,
  Package, Inbox, FolderOpen, Calendar, CheckCircle2, Clock,
  ChevronDown, PanelLeftOpen, PanelRightOpen, Table
} from 'lucide-react';
import { formatCurrency, formatArea } from '@/lib/utils';

// ============================================
// Color Definitions
// ============================================
const BRAND_COLORS = [
  { name: 'Navy', var: '--color-navy', value: '#0B1D3A' },
  { name: 'Navy Light', var: '--color-navy-light', value: '#1A2E4F' },
  { name: 'Navy Muted', var: '--color-navy-muted', value: '#2A3F5F' },
  { name: 'Emerald', var: '--color-emerald', value: '#1B7A5A' },
  { name: 'Emerald Hover', var: '--color-emerald-hover', value: '#22956D' },
  { name: 'Emerald Light', var: '--color-emerald-light', value: '#E8F5EF' },
  { name: 'Gold', var: '--color-gold', value: '#C8A951' },
  { name: 'Gold Light', var: '--color-gold-light', value: '#F5EFD7' },
];

const NEUTRAL_COLORS = [
  { name: 'Beige', var: '--color-beige', value: '#F5F0EB' },
  { name: 'Beige Light', var: '--color-beige-light', value: '#FAF7F4' },
  { name: 'Slate', var: '--color-slate', value: '#64748B' },
  { name: 'Slate Light', var: '--color-slate-light', value: '#7C8DA4' },
  { name: 'Slate Dark', var: '--color-slate-dark', value: '#475569' },
  { name: 'Border', var: '--color-border', value: '#E2E8F0' },
  { name: 'BG Cool', var: '--color-bg-cool', value: '#F1F5F9' },
  { name: 'BG Warm', var: '--color-bg-warm', value: '#FAF7F4' },
];

const SEMANTIC_COLORS = [
  { name: 'Success', var: '--color-success', value: '#16A34A' },
  { name: 'Success Light', var: '--color-success-light', value: '#DCFCE7' },
  { name: 'Danger', var: '--color-danger', value: '#DC2626' },
  { name: 'Danger Light', var: '--color-danger-light', value: '#FEE2E2' },
  { name: 'Warning', var: '--color-warning', value: '#EAB308' },
  { name: 'Warning Light', var: '--color-warning-light', value: '#FEF9C3' },
  { name: 'Info', var: '--color-info', value: '#2563EB' },
  { name: 'Info Light', var: '--color-info-light', value: '#DBEAFE' },
];

// ============================================
// Typography Definitions
// ============================================
const TYPOGRAPHY = [
  { label: 'Display', size: '4.5rem', weight: 700, font: 'Playfair Display', sample: 'One Home' },
  { label: 'H1', size: '3rem', weight: 700, font: 'Playfair Display', sample: 'Temukan Rumah Impian Anda' },
  { label: 'H2', size: '2.25rem', weight: 700, font: 'Playfair Display', sample: 'Properti Unggulan' },
  { label: 'H3', size: '1.875rem', weight: 700, font: 'Playfair Display', sample: 'Kalkulator KPR' },
  { label: 'H4', size: '1.5rem', weight: 600, font: 'Inter', sample: 'Detail Properti' },
  { label: 'H5', size: '1.25rem', weight: 600, font: 'Inter', sample: 'Estimasi Biaya' },
  { label: 'Body LG', size: '1.125rem', weight: 400, font: 'Inter', sample: 'Rumah cluster premium di kawasan elit Menteng dengan desain modern minimalis.' },
  { label: 'Body', size: '1rem', weight: 400, font: 'Inter', sample: 'Dilengkapi taman belakang, carport 2 mobil, dan keamanan 24 jam.' },
  { label: 'Body SM', size: '0.875rem', weight: 400, font: 'Inter', sample: 'Lokasi strategis dekat pusat kota Jakarta.' },
  { label: 'Caption', size: '0.75rem', weight: 500, font: 'Inter', sample: 'Terakhir diperbarui 15/01/2024' },
];

// ============================================
// Spacing Definitions
// ============================================
const SPACING = [
  { name: '--space-1', value: '4px', px: 4 },
  { name: '--space-2', value: '8px', px: 8 },
  { name: '--space-3', value: '12px', px: 12 },
  { name: '--space-4', value: '16px', px: 16 },
  { name: '--space-5', value: '20px', px: 20 },
  { name: '--space-6', value: '24px', px: 24 },
  { name: '--space-8', value: '32px', px: 32 },
  { name: '--space-10', value: '40px', px: 40 },
  { name: '--space-12', value: '48px', px: 48 },
  { name: '--space-16', value: '64px', px: 64 },
  { name: '--space-20', value: '80px', px: 80 },
  { name: '--space-24', value: '96px', px: 96 },
];

const SHADOWS = [
  { name: 'xs', css: '0 1px 2px rgba(0,0,0,0.05)' },
  { name: 'sm', css: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)' },
  { name: 'md', css: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)' },
  { name: 'lg', css: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)' },
  { name: 'xl', css: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px rgba(0,0,0,0.04)' },
  { name: '2xl', css: '0 25px 50px -12px rgba(0,0,0,0.25)' },
];

const ICONS_USED = [
  { name: 'Home', icon: Home }, { name: 'Search', icon: Search },
  { name: 'Heart', icon: Heart }, { name: 'Star', icon: Star },
  { name: 'Shield', icon: Shield }, { name: 'Check', icon: Check },
  { name: 'X', icon: X }, { name: 'AlertTriangle', icon: AlertTriangle },
  { name: 'Info', icon: Info }, { name: 'ChevronRight', icon: ChevronRight },
  { name: 'Eye', icon: Eye }, { name: 'Download', icon: Download },
  { name: 'Upload', icon: Upload }, { name: 'Trash2', icon: Trash2 },
  { name: 'Edit', icon: Edit }, { name: 'Plus', icon: Plus },
  { name: 'MapPin', icon: MapPin }, { name: 'Bed', icon: Bed },
  { name: 'Bath', icon: Bath }, { name: 'Maximize', icon: Maximize },
  { name: 'ArrowUpRight', icon: ArrowUpRight }, { name: 'Bell', icon: Bell },
  { name: 'Settings', icon: Settings }, { name: 'User', icon: User },
  { name: 'FileText', icon: FileText }, { name: 'Wallet', icon: Wallet },
  { name: 'Building2', icon: Building2 }, { name: 'Gavel', icon: Gavel },
  { name: 'Palette', icon: Palette }, { name: 'PaintBucket', icon: PaintBucket },
  { name: 'BarChart3', icon: BarChart3 }, { name: 'PieChart', icon: PieChart },
  { name: 'TrendingUp', icon: TrendingUp }, { name: 'Calendar', icon: Calendar },
];

const FSM_STATES = [
  { label: 'Tersedia', color: '#16A34A' },
  { label: 'Pending', color: '#EAB308' },
  { label: 'Dalam Review', color: '#2563EB' },
  { label: 'Disetujui', color: '#1B7A5A' },
  { label: 'Ditolak', color: '#DC2626' },
  { label: 'Selesai', color: '#475569' },
  { label: 'Dibatalkan', color: '#64748B' },
  { label: 'Terjual', color: '#C8A951' },
  { label: 'Disewakan', color: '#7C3AED' },
  { label: 'Dalam Pembangunan', color: '#F97316' },
  { label: 'Escrow Aktif', color: '#0EA5E9' },
  { label: 'Dana Dirilis', color: '#059669' },
];

const NAV_SECTIONS = [
  'Warna', 'Tipografi', 'Spasi', 'Bayangan', 'Ikon', 'Tombol',
  'Badge', 'Kartu', 'Form', 'Tab', 'Akordion', 'Timeline', 'Toast', 'Modal', 'Drawer',
  'Loading', 'Kosong', 'Gerak', 'Mata Uang',
];

// ============================================
// Main Component
// ============================================
export default function DesignSystemPage() {
  const [loadingBtn, setLoadingBtn] = useState(false);

  return (
    <div className={styles.dsPage}>
      {/* Header */}
      <header className={styles.dsHeader}>
        <div className={styles.dsHeaderInner}>
          <h1 className={styles.dsTitle}>One Home Design System</h1>
          <p className={styles.dsSubtitle}>
            Token, komponen, dan pola UI — referensi internal untuk tim engineering.
          </p>
          <nav className={styles.dsNav}>
            {NAV_SECTIONS.map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className={styles.dsNavLink}>{s}</a>
            ))}
          </nav>
        </div>
      </header>

      <div className={styles.dsBody}>

        {/* ---- COLORS ---- */}
        <section className={styles.dsSection} id="warna">
          <h2 className={styles.dsSectionTitle}>🎨 Color Palette</h2>
          <p className={styles.dsSectionDesc}>Semua warna menggunakan CSS custom properties dari @theme. Tidak ada hardcoded hex.</p>

          <h4 style={{ marginBottom: 12, fontWeight: 600 }}>Brand Colors</h4>
          <div className={styles.colorGrid}>
            {BRAND_COLORS.map(c => (
              <div key={c.name} className={styles.colorSwatch}>
                <div className={styles.swatchColor} style={{ backgroundColor: c.value }} />
                <div className={styles.swatchInfo}>
                  <div className={styles.swatchName}>{c.name}</div>
                  <div className={styles.swatchValue}>{c.var}</div>
                  <div className={styles.swatchValue}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: 32, marginBottom: 12, fontWeight: 600 }}>Neutral Colors</h4>
          <div className={styles.colorGrid}>
            {NEUTRAL_COLORS.map(c => (
              <div key={c.name} className={styles.colorSwatch}>
                <div className={styles.swatchColor} style={{ backgroundColor: c.value }} />
                <div className={styles.swatchInfo}>
                  <div className={styles.swatchName}>{c.name}</div>
                  <div className={styles.swatchValue}>{c.var}</div>
                </div>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: 32, marginBottom: 12, fontWeight: 600 }}>Semantic Colors</h4>
          <div className={styles.colorGrid}>
            {SEMANTIC_COLORS.map(c => (
              <div key={c.name} className={styles.colorSwatch}>
                <div className={styles.swatchColor} style={{ backgroundColor: c.value }} />
                <div className={styles.swatchInfo}>
                  <div className={styles.swatchName}>{c.name}</div>
                  <div className={styles.swatchValue}>{c.var}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- TYPOGRAPHY ---- */}
        <section className={styles.dsSection} id="tipografi">
          <h2 className={styles.dsSectionTitle}>📝 Typography</h2>
          <p className={styles.dsSectionDesc}>Playfair Display untuk heading, Inter untuk body text. Semua ukuran menggunakan token.</p>
          {TYPOGRAPHY.map(t => (
            <div key={t.label} className={styles.typeRow}>
              <span className={styles.typeLabel}>{t.label}</span>
              <span className={styles.typeSample} style={{
                fontSize: t.size,
                fontWeight: t.weight,
                fontFamily: t.font === 'Playfair Display' ? 'var(--font-display)' : 'var(--font-body)',
              }}>
                {t.sample}
              </span>
              <span className={styles.typeMeta}>{t.size} / {t.weight}</span>
            </div>
          ))}
        </section>

        {/* ---- SPACING ---- */}
        <section className={styles.dsSection} id="spasi">
          <h2 className={styles.dsSectionTitle}>📏 Spacing System</h2>
          <p className={styles.dsSectionDesc}>Skala spasi berbasis 4px. Gunakan token, JANGAN hardcode pixel values.</p>
          {SPACING.map(s => (
            <div key={s.name} className={styles.spacingRow}>
              <span className={styles.spacingLabel}>{s.name}</span>
              <div className={styles.spacingBar} style={{ width: Math.min(s.px * 3, 400) }} />
              <span className={styles.spacingValue}>{s.value}</span>
            </div>
          ))}
        </section>

        {/* ---- SHADOWS ---- */}
        <section className={styles.dsSection} id="bayangan">
          <h2 className={styles.dsSectionTitle}>🌗 Shadow Elevation</h2>
          <p className={styles.dsSectionDesc}>Sistem elevasi 6 tingkat. Hover untuk melihat efek.</p>
          <div className={styles.shadowGrid}>
            {SHADOWS.map(s => (
              <div key={s.name} className={styles.shadowBox} style={{ boxShadow: s.css }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>☁️</div>
                <div className={styles.shadowLabel}>shadow-{s.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- ICONS ---- */}
        <section className={styles.dsSection} id="ikon">
          <h2 className={styles.dsSectionTitle}>🔷 Icons Library (Lucide)</h2>
          <p className={styles.dsSectionDesc}>Semua ikon menggunakan Lucide React. Konsisten 24px default size.</p>
          <div className={styles.colorGrid}>
            {ICONS_USED.map(({ name, icon: Icon }) => (
              <div key={name} className={styles.colorSwatch} style={{ textAlign: 'center', padding: '16px 8px' }}>
                <Icon size={28} style={{ margin: '0 auto 8px', color: 'var(--color-navy)' }} />
                <div className={styles.swatchName} style={{ fontSize: 12 }}>{name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- BUTTONS ---- */}
        <section className={styles.dsSection} id="tombol">
          <h2 className={styles.dsSectionTitle}>🔘 Buttons</h2>
          <p className={styles.dsSectionDesc}>7 states wajib: Default, Hover, Focus, Disabled, Loading, Error, Success</p>

          <div className={styles.buttonGroupLabel}>Variants</div>
          <div className={styles.buttonRow}>
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>

          <div className={styles.buttonGroupLabel}>Sizes</div>
          <div className={styles.buttonRow}>
            <Button size="sm">Kecil</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Besar</Button>
            <Button size="icon"><Plus size={18} /></Button>
          </div>

          <div className={styles.buttonGroupLabel}>States</div>
          <div className={styles.buttonRow}>
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button
              disabled={loadingBtn}
              onClick={() => { setLoadingBtn(true); setTimeout(() => setLoadingBtn(false), 2000); }}
            >
              {loadingBtn && <Loader2 size={16} className="animate-spin mr-2" />}
              {loadingBtn ? 'Memproses...' : 'Klik untuk Loading'}
            </Button>
            <Button className="bg-[var(--color-success)] hover:bg-[var(--color-success)]">
              <Check size={16} className="mr-1" /> Berhasil
            </Button>
            <Button variant="destructive">
              <X size={16} className="mr-1" /> Error
            </Button>
          </div>

          <div className={styles.buttonGroupLabel}>Indonesian Context</div>
          <div className={styles.buttonRow}>
            <Button className="bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)]">
              <Search size={16} className="mr-2" /> Cari Properti
            </Button>
            <Button variant="outline">
              <Heart size={16} className="mr-2" /> Simpan
            </Button>
            <Button className="bg-[var(--color-gold)] hover:bg-[var(--color-gold)] text-white">
              <Gavel size={16} className="mr-2" /> Buat Tender
            </Button>
            <Button variant="outline">
              <Wallet size={16} className="mr-2" /> Ajukan KPR
            </Button>
          </div>
        </section>

        {/* ---- BADGES ---- */}
        <section className={styles.dsSection} id="badge">
          <h2 className={styles.dsSectionTitle}>🏷️ Badges & Status Indicators</h2>
          <p className={styles.dsSectionDesc}>FSM states — setiap status di sistem punya warna unik.</p>

          <div className={styles.stateGrid}>
            {FSM_STATES.map(s => (
              <div key={s.label} className={styles.stateItem}>
                <div className={styles.stateDot} style={{ backgroundColor: s.color }} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.buttonGroupLabel}>Badge Variants</div>
          <div className={styles.badgeGrid}>
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge className="bg-[var(--color-emerald)] text-white border-[var(--color-emerald)]">Terverifikasi</Badge>
            <Badge className="bg-[var(--color-gold)] text-white border-[var(--color-gold)]">Unggulan</Badge>
            <Badge className="bg-[var(--color-info)] text-white border-[var(--color-info)]">KPR</Badge>
            <Badge className="bg-[var(--color-success)] text-white border-[var(--color-success)]">SHM</Badge>
          </div>
        </section>

        {/* ---- CARDS ---- */}
        <section className={styles.dsSection} id="kartu">
          <h2 className={styles.dsSectionTitle}>📦 Cards</h2>
          <p className={styles.dsSectionDesc}>Property, vendor, project, finance, stat, KPI, bento cards.</p>
          <div className={styles.cardGrid}>
            <div className={styles.demoCard}>
              <Badge className="bg-[var(--color-emerald)] text-white border-[var(--color-emerald)] mb-3">Rumah Cluster</Badge>
              <div className={styles.demoCardTitle}>Rumah Cluster Menteng</div>
              <div className={styles.demoCardDesc}>Jakarta Pusat • SHM • 180 m²</div>
              <div className={styles.demoCardFooter}>
                <span className={styles.demoCardPrice}>{formatCurrency(8_500_000_000, true)}</span>
                <div style={{ display: 'flex', gap: 12, color: 'var(--color-slate)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}><Bed size={14} /> 4</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}><Bath size={14} /> 3</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}><Maximize size={14} /> {formatArea(180)}</span>
                </div>
              </div>
            </div>

            <div className={styles.demoCard}>
              <Badge className="bg-[var(--color-gold)] text-white border-[var(--color-gold)] mb-3">Vendor Unggulan</Badge>
              <div className={styles.demoCardTitle}>PT Karya Griya Utama</div>
              <div className={styles.demoCardDesc}>Kontraktor • Jakarta • ⭐ 4.8 (125 review)</div>
              <div className={styles.demoCardFooter}>
                <span className={styles.demoCardPrice}>Mulai {formatCurrency(50_000_000, true)}</span>
                <Badge variant="outline">98 Proyek</Badge>
              </div>
            </div>

            <div className={styles.demoCard}>
              <Badge className="bg-[var(--color-info)] text-white border-[var(--color-info)] mb-3">KPR Aktif</Badge>
              <div className={styles.demoCardTitle}>Simulasi KPR — BCA</div>
              <div className={styles.demoCardDesc}>Fixed 3 Tahun • Tenor 20 Tahun • DP 20%</div>
              <div className={styles.demoCardFooter}>
                <span className={styles.demoCardPrice}>{formatCurrency(65_000_000)}/bln</span>
                <Badge className="bg-[var(--color-success)] text-white border-[var(--color-success)]">8.5% p.a.</Badge>
              </div>
            </div>

            <div className={styles.demoCard} style={{ background: 'var(--color-navy)', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Shield size={20} style={{ color: 'var(--color-emerald)' }} />
                <span style={{ fontSize: 13, color: 'var(--color-emerald-hover)' }}>Protected by One Home Escrow</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-slate-light)', marginBottom: 4 }}>Saldo Escrow</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'white' }}>{formatCurrency(2_500_000_000)}</div>
              <div className={styles.demoCardFooter} style={{ borderColor: 'var(--color-navy-muted)' }}>
                <span style={{ fontSize: 12, color: 'var(--color-slate-light)' }}>Milestone 3/5 • Retensi 5%</span>
                <Badge variant="outline" style={{ borderColor: 'var(--color-emerald)', color: 'var(--color-emerald)' }}>Aktif</Badge>
              </div>
            </div>

            <div className={styles.demoCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--color-emerald-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={24} style={{ color: 'var(--color-emerald)' }} />
                </div>
                <Badge className="bg-[var(--color-success-light)] text-[var(--color-success)] border-[var(--color-success-light)]">+12.5%</Badge>
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-slate)', marginBottom: 4 }}>Total Properti Dilihat</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-navy)' }}>12,450</div>
            </div>

            <div className={styles.demoCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={24} style={{ color: 'var(--color-gold)' }} />
                </div>
                <Badge className="bg-[var(--color-warning-light)] text-[var(--color-warning)] border-[var(--color-warning-light)]">5 Aktif</Badge>
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-slate)', marginBottom: 4 }}>Proyek Berjalan</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-navy)' }}>{formatCurrency(15_800_000_000, true)}</div>
            </div>
          </div>
        </section>

        {/* ---- FORMS ---- */}
        <section className={styles.dsSection} id="form">
          <h2 className={styles.dsSectionTitle}>📋 Forms</h2>
          <p className={styles.dsSectionDesc}>Input validation states: default, focus, error, success, disabled.</p>
          <div style={{ maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, marginBottom: 4, display: 'block', color: 'var(--color-navy)' }}>Nama Lengkap</label>
              <Input placeholder="Masukkan nama lengkap..." defaultValue="Budi Santoso" />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, marginBottom: 4, display: 'block', color: 'var(--color-navy)' }}>Email</label>
              <Input placeholder="email@contoh.com" type="email" />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, marginBottom: 4, display: 'block', color: 'var(--color-danger)' }}>Nomor KTP (Error)</label>
              <Input placeholder="16 digit NIK" style={{ borderColor: 'var(--color-danger)' }} defaultValue="31740102" />
              <p style={{ fontSize: 12, color: 'var(--color-danger)', marginTop: 4 }}>NIK harus 16 digit</p>
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, marginBottom: 4, display: 'block', color: 'var(--color-success)' }}>NPWP (Valid)</label>
              <Input placeholder="15 digit NPWP" style={{ borderColor: 'var(--color-success)' }} defaultValue="01.234.567.8-901.000" />
              <p style={{ fontSize: 12, color: 'var(--color-success)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Check size={14} /> NPWP valid
              </p>
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, marginBottom: 4, display: 'block', color: 'var(--color-slate)' }}>Disabled</label>
              <Input placeholder="Tidak dapat diedit" disabled defaultValue="Read-only value" />
            </div>
          </div>
        </section>

        {/* ---- LOADING ---- */}
        <section className={styles.dsSection} id="loading">
          <h2 className={styles.dsSectionTitle}>⏳ Loading States</h2>
          <p className={styles.dsSectionDesc}>Skeleton cards, shimmer effect, progress indicators.</p>
          <div className={styles.loadingGrid}>
            <div className={styles.skeletonCard}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonLine} style={{ width: '40%' }} />
              <div className={styles.skeletonLine} style={{ width: '80%' }} />
              <div className={styles.skeletonLine} style={{ width: '60%' }} />
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
            <div className={styles.skeletonCard}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div style={{ flex: 1 }}>
                  <div className={styles.skeletonLine} style={{ width: '60%' }} />
                  <div className={styles.skeletonLine} style={{ width: '40%' }} />
                </div>
              </div>
              <div className={styles.skeletonLine} />
              <div className={styles.skeletonLine} style={{ width: '90%' }} />
              <div className={styles.skeletonLine} style={{ width: '70%' }} />
            </div>
            <div className={styles.skeletonCard} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
              <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-emerald)', marginBottom: 12 }} />
              <p style={{ fontSize: 14, color: 'var(--color-slate)' }}>Memuat data properti...</p>
            </div>
          </div>
        </section>

        {/* ---- EMPTY STATES ---- */}
        <section className={styles.dsSection} id="kosong">
          <h2 className={styles.dsSectionTitle}>📭 Empty & Error States</h2>
          <p className={styles.dsSectionDesc}>Setiap page wajib punya empty state dan error state.</p>
          <div className={styles.cardGrid}>
            <div className={styles.emptyState}>
              <Package size={48} className={styles.emptyIcon} style={{ margin: '0 auto 16px' }} />
              <div className={styles.emptyTitle}>Belum Ada Properti</div>
              <div className={styles.emptyDesc}>Anda belum menyimpan properti favorit. Mulai jelajahi properti di halaman pencarian.</div>
              <Button className="bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] mt-4">
                <Search size={16} className="mr-2" /> Cari Properti
              </Button>
            </div>
            <div className={styles.emptyState}>
              <Inbox size={48} className={styles.emptyIcon} style={{ margin: '0 auto 16px' }} />
              <div className={styles.emptyTitle}>Tidak Ada Tender</div>
              <div className={styles.emptyDesc}>Belum ada tender yang dibuat. Buat tender pertama Anda untuk mendapatkan penawaran dari vendor.</div>
              <Button className="bg-[var(--color-gold)] hover:bg-[var(--color-gold)] text-white mt-4">
                <Plus size={16} className="mr-2" /> Buat Tender
              </Button>
            </div>
            <div className={styles.emptyState} style={{ borderColor: 'var(--color-danger-light)', background: 'var(--color-danger-light)' }}>
              <AlertTriangle size={48} style={{ color: 'var(--color-danger)', margin: '0 auto 16px' }} />
              <div className={styles.emptyTitle} style={{ color: 'var(--color-danger)' }}>Terjadi Kesalahan</div>
              <div className={styles.emptyDesc}>Gagal memuat data. Silakan coba lagi atau hubungi tim support.</div>
              <Button variant="destructive" className="mt-4">Coba Lagi</Button>
            </div>
          </div>
        </section>

        {/* ---- MOTION ---- */}
        <section className={styles.dsSection} id="gerak">
          <h2 className={styles.dsSectionTitle}>🎬 Motion Tokens</h2>
          <p className={styles.dsSectionDesc}>Durasi dan easing standar untuk semua animasi. Target: 60 FPS.</p>
          <div className={styles.motionGrid}>
            <div className={styles.motionBox} style={{ transition: 'transform 200ms ease-out' }} onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>⚡</div>
              <strong>Micro (200ms)</strong>
              <p style={{ fontSize: 12, color: 'var(--color-slate)', marginTop: 4 }}>Hover, toggle, tooltip</p>
            </div>
            <div className={styles.motionBox} style={{ transition: 'transform 300ms ease-out' }} onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-8px)')} onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🎯</div>
              <strong>Default (300ms)</strong>
              <p style={{ fontSize: 12, color: 'var(--color-slate)', marginTop: 4 }}>Card hover, fade</p>
            </div>
            <div className={styles.motionBox} style={{ transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>✨</div>
              <strong>Emphasis (500ms)</strong>
              <p style={{ fontSize: 12, color: 'var(--color-slate)', marginTop: 4 }}>Modal, drawer, page transition</p>
            </div>
            <div className={styles.motionBox} style={{ transition: 'all 800ms cubic-bezier(0.34, 1.56, 0.64, 1)' }} onMouseEnter={e => (e.currentTarget.style.transform = 'rotate(5deg) scale(1.1)')} onMouseLeave={e => (e.currentTarget.style.transform = 'rotate(0) scale(1)')}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🚀</div>
              <strong>Dramatic (800ms)</strong>
              <p style={{ fontSize: 12, color: 'var(--color-slate)', marginTop: 4 }}>Hero, success, celebration</p>
            </div>
          </div>
        </section>

        {/* ---- CURRENCY FORMAT ---- */}
        <section className={styles.dsSection} id="mata-uang">
          <h2 className={styles.dsSectionTitle}>💰 Indonesian Currency Formatting</h2>
          <p className={styles.dsSectionDesc}>Semua angka menggunakan format IDR. TIDAK ADA USD.</p>
          <div className={styles.cardGrid}>
            <div className={styles.demoCard}>
              <div className={styles.demoCardTitle}>Format Standar</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--color-slate)' }}>Rp 150 Juta</span>
                  <strong>{formatCurrency(150_000_000)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--color-slate)' }}>Rp 2.5 Miliar</span>
                  <strong>{formatCurrency(2_500_000_000)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--color-slate)' }}>Rp 8.5 Miliar</span>
                  <strong>{formatCurrency(8_500_000_000)}</strong>
                </div>
              </div>
            </div>
            <div className={styles.demoCard}>
              <div className={styles.demoCardTitle}>Format Compact</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--color-slate)' }}>150 Juta</span>
                  <strong>{formatCurrency(150_000_000, true)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--color-slate)' }}>2.5 Miliar</span>
                  <strong>{formatCurrency(2_500_000_000, true)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--color-slate)' }}>15 Miliar</span>
                  <strong>{formatCurrency(15_000_000_000, true)}</strong>
                </div>
              </div>
            </div>
            <div className={styles.demoCard}>
              <div className={styles.demoCardTitle}>Format Area (m²)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--color-slate)' }}>Luas Tanah</span>
                  <strong>{formatArea(250)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--color-slate)' }}>Luas Bangunan</span>
                  <strong>{formatArea(180)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--color-slate)' }}>Kavling</span>
                  <strong>{formatArea(5000)}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- TABS ---- */}
        <section className={styles.dsSection} id="tab">
          <h2 className={styles.dsSectionTitle}>🗂️ Tabs</h2>
          <p className={styles.dsSectionDesc}>Horizontal tabs untuk navigasi konten. Digunakan di Property Detail, Dashboard, dll.</p>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Ringkasan</TabsTrigger>
              <TabsTrigger value="specs">Spesifikasi</TabsTrigger>
              <TabsTrigger value="location">Lokasi</TabsTrigger>
              <TabsTrigger value="finance">Pembiayaan</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className={styles.demoCard}>
                <div className={styles.demoCardTitle}>Tab Ringkasan</div>
                <div className={styles.demoCardDesc}>Konten ringkasan properti. Deskripsi, fitur utama, dan highlight properti.</div>
              </div>
            </TabsContent>
            <TabsContent value="specs" className="mt-4">
              <div className={styles.demoCard}>
                <div className={styles.demoCardTitle}>Tab Spesifikasi</div>
                <div className={styles.demoCardDesc}>Luas tanah: 250 m² • Luas bangunan: 180 m² • 4 KT • 3 KM • SHM</div>
              </div>
            </TabsContent>
            <TabsContent value="location" className="mt-4">
              <div className={styles.demoCard}>
                <div className={styles.demoCardTitle}>Tab Lokasi</div>
                <div className={styles.demoCardDesc}>Menteng, Jakarta Pusat. Dekat MRT Bundaran HI.</div>
              </div>
            </TabsContent>
            <TabsContent value="finance" className="mt-4">
              <div className={styles.demoCard}>
                <div className={styles.demoCardTitle}>Tab Pembiayaan</div>
                <div className={styles.demoCardDesc}>KPR BCA: 8.5% p.a. • DP 20% • Tenor 20 tahun • Cicilan {formatCurrency(65_000_000)}/bulan</div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* ---- ACCORDION ---- */}
        <section className={styles.dsSection} id="akordion">
          <h2 className={styles.dsSectionTitle}>🪗 Accordion</h2>
          <p className={styles.dsSectionDesc}>FAQ, detail properti, dan informasi yang bisa di-collapse.</p>
          <div style={{ maxWidth: 600 }}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Apa itu One Home Escrow?</AccordionTrigger>
                <AccordionContent>
                  One Home Escrow adalah sistem perlindungan dana yang menyimpan pembayaran proyek secara aman. Dana hanya dirilis kepada vendor setelah milestone disetujui.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Bagaimana proses pengajuan KPR?</AccordionTrigger>
                <AccordionContent>
                  Unggah dokumen KYC → Pilih bank partner → Simulasi cicilan → Submit aplikasi → Review → Approval → Akad kredit → Pencairan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Berapa minimum DP untuk KPR?</AccordionTrigger>
                <AccordionContent>
                  Minimum DP mengikuti regulasi OJK. Untuk rumah pertama, minimum DP 0% (rumah subsidi) hingga 10-20%.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Sertifikat properti apa yang diterima?</AccordionTrigger>
                <AccordionContent>
                  SHM, SHGB, HGB, Strata Title (apartemen), AJB, dan PPJB.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* ---- TIMELINE ---- */}
        <section className={styles.dsSection} id="timeline">
          <h2 className={styles.dsSectionTitle}>📅 Timeline</h2>
          <p className={styles.dsSectionDesc}>Project tracking, milestone progress, dan riwayat transaksi.</p>
          <div style={{ maxWidth: 600 }}>
            {[
              { label: 'Tender Dibuat', date: '15/01/2024', status: 'done' as const, desc: 'Tender renovasi rumah telah dipublikasi' },
              { label: 'Bid Diterima', date: '20/01/2024', status: 'done' as const, desc: '5 vendor mengajukan penawaran' },
              { label: 'Vendor Dipilih', date: '25/01/2024', status: 'done' as const, desc: 'PT Karya Griya Utama terpilih' },
              { label: 'Escrow Aktif', date: '01/02/2024', status: 'active' as const, desc: 'Dana Rp 350 Juta di-escrow' },
              { label: 'Milestone 1', date: '15/02/2024', status: 'pending' as const, desc: 'Dalam pengerjaan' },
              { label: 'Selesai', date: 'Est. 30/04/2024', status: 'pending' as const, desc: 'Target penyelesaian' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 24 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: item.status === 'done' ? 'var(--color-success)' : item.status === 'active' ? 'var(--color-info)' : 'var(--color-border)',
                    color: item.status === 'pending' ? 'var(--color-slate)' : 'white', flexShrink: 0,
                  }}>
                    {item.status === 'done' ? <Check size={14} /> : item.status === 'active' ? <Clock size={14} /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-slate-light)' }} />}
                  </div>
                  {i < 5 && <div style={{ width: 2, height: 40, background: item.status === 'done' ? 'var(--color-success)' : 'var(--color-border)' }} />}
                </div>
                <div style={{ paddingBottom: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-navy)' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-slate)' }}>{item.date} — {item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- TOAST ---- */}
        <section className={styles.dsSection} id="toast">
          <h2 className={styles.dsSectionTitle}>🔔 Toast Notifications</h2>
          <p className={styles.dsSectionDesc}>Notifikasi non-blocking menggunakan Sonner. 4 varian.</p>
          <div className={styles.buttonRow}>
            <Button className="bg-[var(--color-success)] hover:bg-[var(--color-success)]" onClick={() => toast.success('Properti berhasil disimpan!')}>
              <Check size={16} className="mr-2" /> Success
            </Button>
            <Button className="bg-[var(--color-warning)] hover:bg-[var(--color-warning)] text-black" onClick={() => toast.warning('Saldo escrow hampir habis.')}>
              <AlertTriangle size={16} className="mr-2" /> Warning
            </Button>
            <Button variant="destructive" onClick={() => toast.error('Gagal memproses pembayaran.')}>
              <X size={16} className="mr-2" /> Error
            </Button>
            <Button className="bg-[var(--color-info)] hover:bg-[var(--color-info)]" onClick={() => toast.info('Tender baru tersedia.')}>
              <Info size={16} className="mr-2" /> Info
            </Button>
          </div>
        </section>

        {/* ---- MODAL ---- */}
        <section className={styles.dsSection} id="modal">
          <h2 className={styles.dsSectionTitle}>💬 Modal / Dialog</h2>
          <p className={styles.dsSectionDesc}>Konfirmasi, detail view, dan formulir overlay.</p>
          <div className={styles.buttonRow}>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Konfirmasi Pembayaran</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Konfirmasi Pembayaran Milestone</DialogTitle>
                  <DialogDescription>
                    Rilis dana escrow {formatCurrency(150_000_000)} untuk Milestone 2.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Batal</Button>
                  <Button className="bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)]">Konfirmasi</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Hapus Properti</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Hapus Properti?</DialogTitle>
                  <DialogDescription>Data akan dihapus permanen.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Batal</Button>
                  <Button variant="destructive"><Trash2 size={16} className="mr-2" /> Hapus</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* ---- DRAWER ---- */}
        <section className={styles.dsSection} id="drawer">
          <h2 className={styles.dsSectionTitle}>📐 Drawer / Sheet</h2>
          <p className={styles.dsSectionDesc}>Side panel untuk filter, detail, dan formulir.</p>
          <div className={styles.buttonRow}>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline"><PanelRightOpen size={16} className="mr-2" /> Drawer Kanan</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Properti</SheetTitle>
                  <SheetDescription>Atur filter pencarian</SheetDescription>
                </SheetHeader>
                <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Input placeholder="Tipe Properti" />
                  <Input placeholder="Harga Minimum" />
                  <Input placeholder="Lokasi" />
                  <Button className="bg-[var(--color-emerald)] hover:bg-[var(--color-emerald-hover)] w-full">Terapkan</Button>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline"><PanelLeftOpen size={16} className="mr-2" /> Drawer Kiri</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Navigasi</SheetTitle>
                  <SheetDescription>Menu utama One Home</SheetDescription>
                </SheetHeader>
                <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {['Beranda', 'Properti', 'Vendor', 'Tender', 'Pembiayaan', 'Dashboard'].map(item => (
                    <div key={item} style={{ padding: '10px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{item}</div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </section>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-slate)', fontSize: 13 }}>
          One Home Design System v1.0 — Internal Reference Only
        </div>
      </div>
    </div>
  );
}
