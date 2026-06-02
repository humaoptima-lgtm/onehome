# ONE HOME — MASTER TASK TRACKER

> Home Lifecycle Platform — V10 Lean Enterprise Architecture
> Architecture: NestJS Modular Monolith + DDD + Event Driven + Outbox Pattern + CQRS Ready
> Design: Apple + Stripe + Vercel + Airbnb + Houzz + Williams Sonoma fusion
> Last Updated: 2026-06-01
> Estimated screen states: ~500-700 (80+ pages × Desktop/Tablet/Mobile × Loading/Empty/Error/Success)

---

## SYSTEM VISION

One Home adalah **Home Lifecycle Platform** yang menghubungkan dalam satu ekosistem:
- [ ] Property
- [ ] Architecture
- [ ] Interior Design
- [ ] Construction
- [ ] Furniture
- [ ] Financing
- [ ] Insurance
- [ ] Maintenance

---

## SYSTEM TOPOLOGY

```text
                    INTERNET
                         │
                         ▼

                  Cloudflare
       WAF + CDN + SSL + Cache

                         │
                         ▼

                 Load Balancer

                         │

        ┌─────────────────────────┐

        ▼                         ▼

     VPS APP 1                VPS APP 2
     Active                  Standby

        │

        ▼

    Docker Stack

        │

 ┌──────┼────────┬─────────┐

 ▼      ▼        ▼         ▼

Next   API    Smart      Nginx
JS     Nest   Engine
              Python

        │

        ▼

      Redis

        │

        ▼

  PostgreSQL Server

        │

        ▼

    Meilisearch

        │

        ▼

 Cloudflare R2
```

---

## INFRASTRUCTURE & HOSTING

### VPS APP
- [ ] Specification: 8 vCPU, 16 GB RAM, 200 GB NVMe
- [ ] Provider Options: Biznet Gio, IDCloudHost, Nevacloud, Dewaweb, Alibaba Jakarta

### VPS DATABASE
- [ ] Specification: 8 vCPU, 16 GB RAM, 500 GB NVMe
- [ ] Separate server (Database tidak boleh satu server dengan aplikasi)

---

## TECH STACK & ARCHITECTURE SUMMARY

### Frontend Architecture (Web App)
- [ ] Framework: Next.js 16, React 19, TypeScript
- [ ] Design System: TailwindCSS, Shadcn UI
- [ ] Animation: Framer Motion
- [ ] Form: React Hook Form, Zod
- [ ] Server State: Tanstack Query
- [ ] Client State: Zustand
- [ ] Map: Mapbox
- [ ] File Upload: Presigned URL, Cloudflare R2 (langsung upload ke R2, tidak lewat backend)
- [ ] Hosting: Cloudflare Pages (Rp 0 - Rp 200.000)

### Backend Architecture
- [ ] Framework: NestJS, TypeScript
- [ ] Pattern: DDD, Modular Monolith, Event Driven, Outbox Pattern, CQRS Ready
- [ ] ORM: Prisma
- [ ] Cache / Queue / Event Bus / OTP: Redis
- [ ] Storage: Cloudflare R2 (Folders: property/, vendors/, contracts/, inspection/, documents/, avatars/)
- [ ] Auth MVP: JWT, Refresh Token (Roles: Homeowner, Vendor, Inspector, Surveyor, Bank, Admin)
- [ ] Hosting: Docker VPS (Rp 300.000 - Rp 700.000)

### Mobile App (Flutter)
- [ ] Framework: Flutter
- [ ] App 1 (One Home): Homeowner, Vendor, Agent
- [ ] App 2 (One Home Field): Inspector, Surveyor
- [ ] Offline First: Hive (Storage), Local Queue, Background Sync

### Smart Engine (FastAPI)
> Tidak ada AI. Pure Rule-Based & Formula.
- [ ] Cost Estimation Formula: Volume × AHSP × Regional Index × Margin
- [ ] Vendor Match: Location 40%, Budget 30%, Rating 20%, SLA 10%
- [ ] Property Match: Price, Location, Yield, ROI
- [ ] ROI Engine: Cap Rate, Cash Flow, Payback Period

### Search
- [ ] Engine: Meilisearch
- [ ] Indexes: Properties, Vendors, Architects, Interior Designers, Projects

### Database (PostgreSQL 16)
- [ ] Dedicated Server (Rp 300.000 - Rp 700.000)
- [ ] Target MVP: 70 - 90 tabel

---

## 14 DATABASE SCHEMAS & DOMAINS

1. **identity**: users, roles, permissions, sessions (Auth, RBAC, KYC)
2. **property**: properties, property_media, property_documents, property_locations (Listing, Search)
3. **property_intelligence**: (Rule Based) ROI, Yield, Flood Risk, Market Score
4. **design**: designers, design_packages, design_projects (Architect, Interior, Landscape)
5. **vendors**: vendors, vendor_services, vendor_portfolios (Contractor, Furniture, MEP, Handyman)
6. **tender**: tenders, bids, bid_items (Tender, Bid, Award)
7. **project**: projects, milestones, reports (Project, Timeline)
8. **inspection**: inspections, checklists, defects (Checklist, Defect, Approval)
9. **surveyor**: progress_claims, boq, reports (BOQ, Claim, Validation)
10. **banking**: virtual_accounts, escrow_status, disbursement (VA, Escrow Tracking)
11. **finance**: loan_applications, loan_tracking (KPR, Renovation Loan, Construction Loan)
12. **legal**: contracts, signature_logs, emeterai_logs (Contract, Signature, eMeterai)
13. **insurance**: (CAR, Home Insurance)
14. **home_services**: (Cleaning, Painting, AC, Plumbing)

---

## WEB MODULES

### Public
- [ ] Homepage, Property, Architecture, Interior, Build, Furniture, Financing, Vendor Marketplace

### Homeowner
- [ ] Dashboard, My Property, My Projects, My Tenders, Documents, Escrow Status, Messages

### Vendor
- [ ] Dashboard, Projects, Bids, Invoices, Reviews, Portfolio

### Inspector
- [ ] Assigned Inspection, Checklist, Defect, Reports

### Surveyor
- [ ] BOQ, Progress, Claim, Approval

### Bank
- [ ] Escrow, Projects, Monitoring, Disbursement

### Admin
- [ ] User Management, Vendor Management, Property Management, Project Management, Audit

---

## FOLDER STRUCTURE & MONOREPO

```text
onehome/
├── apps/
│   ├── web/
│   ├── mobile/
│   ├── field-app/
│   ├── api/
│   │   └── src/
│   │       ├── modules/
│   │       ├── shared/
│   │       ├── infrastructure/
│   │       ├── config/
│   │       ├── database/
│   │       ├── events/
│   │       └── jobs/
│   └── smart-engine/
```

---

## API ARCHITECTURE & EVENTS

### API Style
- [ ] REST API, Version `/api/v1`

### Property API
- `GET /properties`
- `GET /properties/:id`
- `POST /properties`
- `PUT /properties/:id`

### Vendor API
- `GET /vendors`
- `GET /vendors/:id`
- `POST /vendors`

### Tender API
- `POST /tenders`
- `POST /tenders/:id/invite`
- `POST /tenders/:id/award`

### Project API
- `GET /projects/:id`
- `POST /projects/:id/milestone`

### Inspection API
- `POST /inspection`
- `POST /inspection/:id/approve`
- `POST /inspection/:id/reject`

### Bank API
- `POST /bank/webhook`
- `POST /bank/disbursement-request`

### Events (Redis Streams)
- [ ] TenderCreated, BidSubmitted, ProjectCreated, InspectionAssigned, InspectionApproved, QSApproved, EscrowReleased

---

## SECURITY, MONITORING & DEPLOYMENT

### Security
- [ ] Cloudflare: WAF, DDoS, Bot Protection
- [ ] Application: JWT, RBAC, Rate Limit
- [ ] Database: AES-256, Backup, Audit Log

### Monitoring
- [ ] Sentry: Application Error
- [ ] Grafana: Server Monitoring
- [ ] Uptime Kuma: Health Check

### Analytics
- [ ] MVP Analytics: PostHog
- [ ] Track: Property View, Tender Created, Vendor Contact, Loan Application

### Deployment (Docker)
- [ ] Containers: nginx, nextjs, nestjs, smart-engine, redis, meilisearch

### CI/CD
- [ ] Github → Github Actions → Lint → Test → Docker Build → Deploy VPS → Health Check

---

## ⚠️ GLOBAL UX MANDATE (applies to EVERY page)

For EVERY page and feature in this system, the following MUST be implemented:

**Responsive Variants:**
1. Desktop Screen (1440px+)
2. Laptop Screen (1280px)
3. Tablet Screen (1024px, 768px)
4. Mobile Screen (430px, 390px, 375px)

**UI States:**
5. Loading State (skeleton + shimmer)
6. Empty State (illustration + message + CTA)
7. Error State (explanation + retry/support CTA)
8. Success State (confirmation + next action)
9. Skeleton Screen (per component type)

**Interactive Elements:**
10. Modal Windows (relevant modals per page)
11. Slide Drawers (quick preview drawers)
12. Multi-Step Wizards (where applicable)
13. Toast Notifications (success/warning/error/info)
14. Confirmation Dialogs (destructive actions)
15. Context Menus (right-click actions where applicable)
16. Dropdown Menus (action menus)
17. Tooltips (complex terms, data explanations)
18. Inline Validation (all form fields)
19. Search States (searching, no results, results found)
20. Filter States (active filters, clear all, filter count badge)

**Advanced Variants:**
21. Role Variants (Homeowner, Vendor, Property Agent, Developer, Site Inspector, Quantity Surveyor, Bank Officer, One Home Operations, Admin — show/hide per role)
22. Real-Time Variants (Connected, Reconnecting, Offline, Synced, Outdated states)
23. Offline Variants (offline viewing, draft saving, sync status, conflict resolution)

**Engineering Handoff (per page):**
24. Component Inventory (list of all components used)
25. State Inventory (list of all states)
26. API Dependency Notes (endpoints consumed)
27. Data Requirements (data shapes needed)
28. Permission Requirements (RBAC rules)
29. Interaction Notes (hover, click, drag, scroll behaviors)
30. Animation Notes (motion types, durations)
31. Accessibility Notes (keyboard nav, screen reader, focus order)

> **No static mockups. Every page = production-ready interaction flows.**

---

## 🇮🇩 INDONESIA REGULATORY & MARKET CONTEXT LAYER

> This project is built for **Indonesia first**. All UI, UX, workflows, calculations, financing simulations, project estimations, vendor processes, legal flows, and operational assumptions MUST follow Indonesian regulations, market conditions, and industry standards. **Do NOT use US/Europe/generic international assumptions.**

### Property Market Standards
- [x] Property types follow Indonesian categories:
  - [x] Rumah Tapak, Rumah Cluster, Rumah Subsidi, Rumah Komersial, Rumah Second
  - [x] Ruko, Apartemen, Townhouse, Kavling, Villa, Shophouse
  - [x] Commercial Building, Warehouse, Industrial Property
- [x] Measurements: m², Meter, Hectare (NEVER Square Feet or Acres)

### Location Structure (Indonesian Administrative Hierarchy)
- [x] Province (Provinsi)
- [x] City / Kabupaten (Kota/Kabupaten)
- [x] District (Kecamatan)
- [x] Village (Kelurahan / Desa)
- [x] Postal Code (Kode Pos)

### Property Pricing (IDR Only)
- [x] Use IDR currency (Rp) — NEVER USD
- [x] Display format: Rp 150.000.000 (Indonesian dot separator)
- [x] Cost breakdown per property:
  - [x] Property Price (Harga Properti)
  - [x] Estimated BPHTB
  - [x] Estimated AJB Cost
  - [x] Estimated Notary Cost (Biaya Notaris)
  - [x] Estimated Mortgage Cost (Biaya KPR)
  - [x] Estimated Renovation Cost (Estimasi Renovasi)
  - [x] Estimated Monthly Installment (Cicilan Bulanan)

### Home Ownership Process
- [x] Support Indonesian ownership workflows:
  - [x] Developer Purchase (Pembelian dari Developer)
  - [x] Secondary Market Purchase (Pembelian Seken)
  - [x] KPR (Kredit Pemilikan Rumah)
  - [x] Cash Bertahap
  - [x] Cash Keras
  - [x] Property Transfer (Balik Nama)
- [x] Legal documents: AJB, SHM, SHGB, Strata Title, HGB
- [x] Indonesian legal terminology throughout

### Banking & Financing Standards (OJK Compliant)
- [x] Supported products:
  - [x] KPR (Kredit Pemilikan Rumah)
  - [x] KPR Take Over
  - [x] KPR Refinancing
  - [x] Renovation Loan (Kredit Renovasi)
  - [x] Furniture Financing
  - [x] Construction Financing
  - [x] Bridge Financing
- [x] Indonesian terms: DP, Tenor, BI Checking, SLIK OJK, Fixed Rate, Floating Rate, LTV
- [x] NEVER use US mortgage terminology (no "down payment", no "APR")

### Regulatory Compliance
- [x] OJK (Otoritas Jasa Keuangan) compliance
- [x] Bank Indonesia regulations
- [x] PPAT (Pejabat Pembuat Akta Tanah)
- [x] BPN (Badan Pertanahan Nasional)
- [ ] Developer regulations
- [ ] Anti Money Laundering (AML) requirements
- [x] KYC requirements
- [ ] Data privacy regulations (PDP)
- [ ] Consumer protection requirements
- [ ] PSrE (Penyelenggara Sertifikasi Elektronik)
- [ ] PERURI e-Meterai integration
- [ ] PBG (Persetujuan Bangunan Gedung) permit workflow
- [ ] SLF (Sertifikat Laik Fungsi) certification workflow
- [ ] AHSP (Analisis Harga Satuan Pekerjaan) standards
- [ ] HSPK (Harga Satuan Pokok Kegiatan) standards
- [ ] NIB (Nomor Induk Berusaha) vendor verification

### KYC Documents (Indonesian)
- [x] KTP (Kartu Tanda Penduduk)
- [x] NPWP (Nomor Pokok Wajib Pajak)
- [x] KK (Kartu Keluarga)
- [x] Bank Statement (Rekening Koran)
- [x] Salary Slip (Slip Gaji)
- [x] Employment Certificate (Surat Keterangan Kerja)
- [x] Property Documents

### Escrow & Project Fund Management
- [x] Escrow, Retention, Milestone Release
- [x] Dual Approval workflows
- [x] Audit Trail (full traceability)
- [x] Vendor Verification before fund release
- [x] Fund Traceability (every rupiah tracked)
- [x] Compliance with Indonesian banking/financial regulations

### Construction Industry Standards (Indonesian)
- [x] Construction categories:
  - [x] Pekerjaan Persiapan, Pondasi, Struktur
  - [x] Dinding, Atap, Plafon, Lantai
  - [x] Pintu dan Jendela, MEP, Sanitary
  - [x] Furniture, Interior, Landscape, Smart Home

### Material Database (Indonesian Market)
- [x] Material categories:
  - [x] Semen, Pasir, Bata Ringan, Bata Merah, Besi Beton
  - [x] Keramik, Granit, Vinyl, SPC, Cat
  - [x] Gypsum, Kusen Aluminium, UPVC, Kayu, Plywood
  - [x] HPL, MDF, Lighting, Sanitary, Kitchen Set, Wardrobe
- [x] NEVER use US construction materials

### Cost Estimation Standards
- [x] Breakdown structure:
  - [x] Material Cost (Biaya Material)
  - [x] Labor Cost (Biaya Tukang)
  - [x] Subcontractor Cost (Biaya Sub-kon)
  - [x] Equipment Cost (Biaya Peralatan)
  - [x] Logistics Cost (Biaya Logistik)
  - [x] Contractor Margin (Margin Kontraktor)
  - [x] Contingency (Dana Cadangan)
  - [x] Tax (Pajak)
  - [x] Retention (Retensi)
  - [x] Project Total (Total Proyek)

### Labor Standards (Indonesian Construction)
- [x] Worker types:
  - [x] Mandor, Tukang Batu, Tukang Kayu, Tukang Besi
  - [x] Tukang Cat, Tukang Keramik, Tukang Gypsum
  - [x] Tukang Listrik, Tukang Plumbing, Interior Installer, Helper
- [x] Productivity calculations based on Indonesian norms (SNI)

### Regional Price Database
- [ ] Pricing varies by:
  - [ ] Province, City, Material Source, Labor Market, Project Scale, Vendor Tier
- [ ] Regional indexes for: Jakarta, Bandung, Semarang, Surabaya, Bali, Makassar, Medan, Yogyakarta
- [ ] No fixed national pricing assumptions

### Indonesian Tax Structure
- [x] PPN (Pajak Pertambahan Nilai)
- [x] PPh (Pajak Penghasilan)
- [x] Vendor Tax (PPh 23 / PPh Final)
- [x] Project Tax
- [x] Notary Fees (Biaya Notaris)
- [x] Property Transfer Fees (BPHTB)
- [x] Legal Costs (Biaya Hukum)
- [x] Transparent cost breakdown on all transactions

### Vendor Verification (Indonesian Business)
- [x] NIB (Nomor Induk Berusaha)
- [x] NPWP (Nomor Pokok Wajib Pajak)
- [x] SIUP (Surat Izin Usaha Perdagangan)
- [x] Company Deed (Akta Perusahaan)
- [x] Bank Account Verification
- [x] Portfolio Verification
- [x] Business Address Verification

### Document Management (Indonesian Property Documents)
- [x] SHM (Sertifikat Hak Milik)
- [x] SHGB (Sertifikat Hak Guna Bangunan)
- [x] AJB (Akta Jual Beli)
- [x] IMB (Izin Mendirikan Bangunan)
- [x] PBG (Persetujuan Bangunan Gedung)
- [x] SLF (Sertifikat Laik Fungsi)
- [x] Site Plan, Drawing, RAB, SPK, BAST, Warranty Letter
- [x] NEVER use foreign document assumptions

### Localization & Formatting
- [x] Primary language: Bahasa Indonesia
- [x] Secondary language: English
- [x] Bilingual mode support
- [x] Date format: DD/MM/YYYY
- [x] Currency: IDR (Rp)
- [x] Timezones: WIB (Jakarta), WITA (Makassar), WIT (Jayapura)
- [x] Number format: 1.000.000 (dot as thousands separator)

---

## PHASE 0: FRONTEND FOUNDATION (COMPLETED)

### Next.js 16 Scaffolding
- [x] Initialize Next.js 16 + TypeScript
- [x] Configure tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs
- [x] Install lucide-react
- [x] Configure fonts lib/fonts.ts (Inter, SF Pro Display)

### shadcn/ui (25+ components)
- [x] Init shadcn/ui (Radix/Nova preset)
- [x] accordion, alert-dialog, avatar, badge, breadcrumb, button, calendar, card, checkbox, command, dialog, dropdown-menu, input, input-group, label, pagination, popover, progress, radio-group, select, separator, sheet, skeleton, slider, sonner, switch, table, tabs, textarea, tooltip
- [x] @tanstack/react-query, react-hook-form, @hookform/resolvers, zod v4, zustand

### Custom UI Components
- [x] HeroTabs, Rating, RangeSlider, LanguageSwitcher, Stepper

### Design System Tokens
- [x] app/globals.css — tokens, variables, utilities
- [x] lib/utils.ts — cn, formatCurrency, etc.

### Layouts
- [x] Navbar + CSS, Footer + CSS
- [x] DashboardLayout, WizardLayout, ThreeColumnLayout

### Providers
- [x] providers.tsx (TanStack Query + Tooltip + Sonner + I18n)
- [x] Root layout.tsx, query-client.ts

### Types (20 files)
- [x] property, vendor, tender, user, common, finance, project, project-finance, bid, document, media, payment, escrow, banking, notification, outbox, ai, audit, ledger, index

### Mock Data + Services
- [x] data/properties.ts, data/vendors.ts
- [x] services/property, vendor, tender, finance

### API Hooks (12 files)
- [x] property, tender, finance, project, escrow, banking, document, media, notification, outbox, ai, admin + api-client.ts

### Validations (8 files)
- [x] tender, vendor, finance, project, common, escrow, banking, ai

### Zustand Stores
- [x] auth.store, ui.store, tender-form.store

### i18n
- [x] index.tsx, en.json, id.json

### Migrations + Images
- [x] shadcn component migration, casing fixes, Zod v4 fixes
- [x] hero-home.png, property-1 to property-5.png

### Build
- [x] npm run build passes — 13 routes

---

## PHASE 1: DESIGN SYSTEM + UI/UX FOUNDATION

### Page 0 — Design System (Internal Reference Page)
- [x] app/design-system/page.tsx (dev-only route)
- [x] Color Palette showcase (all colors + dark mode)
- [x] Typography showcase (all type scales + weights)
- [ ] Grid System demo (12-column + breakpoints)
- [x] Spacing System demo (all spacing tokens)
- [x] Icons library (Lucide — all used icons)
- [x] Buttons showcase (all variants, sizes, states: default/hover/active/disabled/loading)
- [x] Cards showcase (property, vendor, project, finance, stat, KPI, bento)
- [ ] Tables showcase (sortable, filterable, paginated, selectable)
- [x] Forms showcase (all input types + validation states)
- [x] Badges & Status Indicators (all FSM states with color coding)
- [ ] Charts showcase (bar, line, pie, area, donut)
- [x] Tabs showcase (horizontal, vertical, pill)
- [x] Accordions showcase
- [x] Timeline Components showcase
- [ ] Stepper Components showcase (horizontal + vertical)
- [x] Drawer Components showcase (left, right, bottom)
- [x] Modal Components showcase (sm, md, lg, full)
- [x] Toast Components showcase (success, warning, error, info)
- [x] Loading Components showcase (skeleton cards, shimmer, progress bar)
- [x] Empty States showcase (all 8 types with illustrations)
- [x] Error States showcase (all 6 types)
- [ ] Responsive Breakpoints demo (Desktop 1440+ / Laptop 1280 / Tablet 1024,768 / Mobile 430,390,375)

### Install Animation Libraries
- [x] Install framer-motion
- [x] Install @studio-freight/lenis (smooth scroll)
- [x] Configure AnimatePresence in layout

### Design Token System (NEVER hardcode values)
- [x] Color tokens (primitive + semantic + component-level)
- [x] Typography tokens (font family, size, weight, line-height, letter-spacing)
- [x] Spacing tokens (4px base scale)
- [x] Border Radius tokens (none, sm, md, lg, xl, full)
- [x] Shadow tokens (sm, md, lg, xl — elevation system)
- [x] Border tokens (width, style, color per context)
- [x] Motion tokens (duration: 200ms/300ms/500ms/800ms, easing curves)
- [x] Opacity tokens (0, 5, 10, 20, 40, 60, 80, 100)
- [x] Z-index tokens (dropdown: 100, sticky: 200, modal: 300, toast: 400, tooltip: 500)
- [ ] Theme support:
  - [ ] Light Mode (default)
  - [ ] Dark Mode
  - [ ] White Label Theme (customizable by partners)
  - [ ] Future Partner Branding tokens (overrideable color/font/logo slots)

### Component Governance (every component must have 7 states)
- [ ] All core components support these states: Default, Hover, Focus, Disabled, Loading, Error, Success
- [ ] Components that MUST follow governance:
  - [ ] Button, Input, Select, Card, Modal, Drawer, Table
  - [ ] Timeline, Chart, File Upload
  - [ ] PropertyCard, VendorCard, TenderCard, ProjectCard
  - [ ] NotificationCard, FinancialSummaryCard, KPICard
- [ ] No component redesign — all pages reuse from component library
- [ ] Component documentation in Storybook or Design System page

### Information Architecture (consistent navigation)
- [ ] Primary Navigation (persistent across all pages):
  - [ ] Home, Properties, Vendors, Projects, Financing, AI Studio, Dashboard
- [ ] Secondary Navigation:
  - [ ] Notifications, Messages, Documents, Support, Profile, Role Switcher
- [ ] No navigation restructuring between screens
- [ ] Role-based nav items (show/hide based on user role)

### Motion Design System
- [x] Motion durations: 200ms (micro), 300ms (default), 500ms (emphasis), 800ms (dramatic)
- [x] Motion types: Hover, Transition, Page Entry, Page Exit, Success, Error, Loading, Gesture, Drag
- [x] Use: Transform, Opacity, Scale, Translate
- [x] AVOID: Layout thrashing, heavy blur, large repaints
- [x] Target: 60 FPS at all times
- [x] Easing: ease-out for entrances, ease-in for exits, spring for interactions

### Financial Trust UX (bank-grade screens)
- [ ] All finance screens must display:
  - [ ] Bank Partner logo/name
  - [ ] Escrow Protection indicator (shield icon + "Protected by One Home Escrow")
  - [ ] Project Wallet status
  - [ ] Payment Security badges (encrypted, audited)
  - [ ] Retention Status (held amount + expected release)
  - [ ] Audit Status (last audited date)
  - [ ] Approval Status (who approved, when)
- [ ] Finance screens must NOT feel like generic forms — they must feel bank-grade
- [ ] Trust indicators visible on: Escrow page, Payment page, Ledger page, Financing page

### Enterprise Table System
- [ ] All data tables must support:
  - [ ] Sorting (click column header)
  - [ ] Filtering (column-level filters)
  - [ ] Search (global search bar)
  - [ ] Column Visibility toggle (show/hide columns)
  - [ ] Pagination (page size selector: 10/25/50/100)
  - [ ] Bulk Actions (select multiple rows → action)
  - [ ] Export CSV
  - [ ] Export Excel
  - [ ] Sticky Header (on scroll)
  - [ ] Sticky First Column (on horizontal scroll)
  - [ ] Responsive Collapse (stack on mobile)
- [ ] Used in: Ledger, Escrow, Users, Projects, Banks, Admin, Audit Logs

### Real-Time Experience (WebSocket)
- [ ] Connection states UI:
  - [ ] Connected (green dot indicator)
  - [ ] Reconnecting (amber pulsing indicator)
  - [ ] Offline (red indicator + banner)
  - [ ] Synced (checkmark)
  - [ ] Outdated (refresh prompt)
- [ ] Real-time update examples:
  - [ ] Bid Submitted notification
  - [ ] Milestone Approved status change
  - [ ] Payment Released counter update
  - [ ] Tender Awarded alert
- [ ] Timeline and counters must update live without page refresh

### AI UX System
- [ ] AI interaction patterns:
  - [ ] Progressive Loading (step-by-step progress indicators)
  - [ ] Step-by-Step Progress ("Analyzing Property..." → "Generating Design..." → "Calculating Cost...")
  - [ ] Confidence Scores (show AI confidence: High/Medium/Low with percentage)
  - [ ] Alternative Suggestions (show 2-3 alternatives)
  - [ ] Retry Flow ("Try Again" with different parameters)
  - [ ] Human Override (user can reject AI suggestion and input manually)
- [ ] Used in: AI Design Studio, Cost Calculator, Vendor Recommendations, Bid Analysis

### Offline First UX (Mobile)
- [ ] Offline viewing (cached data available when offline)
- [ ] Draft saving (forms save locally, sync when back online)
- [ ] Sync status indicator ("Last synced 5 min ago")
- [ ] Conflict resolution UI ("Your changes conflict with server — choose version")
- [ ] Last Synced indicator (timestamp in footer/header)
- [ ] Poor connection warning ("Slow connection — some features may be limited")

### Role-Based Experience
- [ ] Roles: Homeowner, Vendor, Agent, Developer, Bank Officer, Admin
- [ ] Role-specific dashboard layouts
- [ ] Role-specific navigation items (show/hide)
- [ ] Role-specific actions per page (e.g., only Admin sees moderation actions)
- [ ] Hide inaccessible actions completely (not greyed out — hidden)
- [ ] Never show restricted functionality
- [ ] Role Switcher component (for users with multiple roles, e.g., Admin testing as Homeowner)

### Color Palette (Premium)
- [ ] Deep Navy #0F172A (primary backgrounds)
- [ ] Emerald #10B981 (success, CTAs)
- [ ] Gold Accent #D4A373 (premium highlights)
- [ ] Ivory Background #FAFAF8 (light surfaces)
- [ ] Charcoal Text #1F2937 (body text)
- [ ] Semantic: success #10B981, warning #F59E0B, error #EF4444, info #3B82F6
- [ ] Dark mode variant tokens
- [ ] Gradient: Champagne Gold → Warm Charcoal (hero text)

### Typography
- [ ] Inter (body text — Google Fonts)
- [ ] SF Pro Display (headings — system font fallback)
- [ ] Type scale: h1(48/56) h2(36/44) h3(30/36) h4(24/32) h5(20/28) h6(18/24) body-lg(18) body(16) body-sm(14) caption(12) label(14 medium) overline(12 uppercase)
- [ ] Font weights: regular(400), medium(500), semibold(600), bold(700)

### Grid & Spacing
- [ ] 12-column grid
- [ ] 4px base spacing (4,8,12,16,20,24,32,40,48,64,80,96,128)
- [ ] Breakpoints: 375, 390, 430, 768, 1024, 1280, 1440+

### Scroll Reveal System (Global)
- [ ] useScrollReveal hook (Intersection Observer)
- [ ] Variants: fadeUp, fadeIn, slideLeft, slideRight, scaleIn
- [ ] Duration: 400-800ms, stagger children 50-100ms
- [ ] Every section below fold uses reveal animation
- [ ] 60 FPS target — no janky animations

### Tooltip System (Global)
- [ ] Complex term tooltips: Escrow, Retention, LTV, Project Wallet, Tender
- [ ] Fast appear (150ms), soft fade, small shadow
- [ ] Not intrusive — hover only

### Loading Experience (Global)
- [ ] NEVER use spinners alone — always skeleton + shimmer
- [ ] Skeleton Property Card (image, price, address, button placeholders)
- [ ] Skeleton Vendor Card (avatar, name, rating, portfolio)
- [ ] Skeleton Dashboard (KPI cards, charts, tables)
- [ ] Skeleton Project Timeline (milestones, progress bar, photos)
- [ ] Skeleton Table rows
- [ ] Shimmer effect animation (CSS gradient sweep)

### Empty States (Global — with illustrations)
- [ ] No Properties Found (adjust filters CTA)
- [ ] No Vendors Available (try another category)
- [ ] Start Your First Project (create tender CTA)
- [ ] Apply For Financing (explore options CTA)
- [ ] You're All Caught Up (notifications)
- [ ] Upload Your First Document
- [ ] No Active Tenders
- [ ] No Messages

### Error States (Global — elegant)
- [ ] Network Error (Unable to Connect + Retry button)
- [ ] API Error (Something Went Wrong + Contact Support)
- [ ] Authorization Error (Access Denied + Login CTA)
- [ ] Financing Error (Unable to Process + Support CTA)
- [ ] Payment Error (Payment Failed + Retry button)
- [ ] Upload Error (Failed to Upload + Retry)

### Success States
- [ ] Tender Created Successfully (animation + reference number)
- [ ] Loan Application Submitted (progress indicator)
- [ ] Vendor Successfully Selected (confirmation)
- [ ] Project Completed (celebration animation)
- [ ] Payment Released (receipt summary)

### Toast System (Sonner — styled)
- [ ] Success: emerald, auto-dismiss 3s
- [ ] Warning: amber, persistent until dismissed
- [ ] Error: red, persistent with retry action
- [ ] Info: blue, auto-dismiss 5s

### Core Component Library
- [ ] Buttons: primary, secondary, ghost, destructive, outline, link + sizes (sm/md/lg) + magnetic hover + ripple click
- [ ] Cards: property, vendor, project, finance, stat, KPI, bento — all with hover elevation + glow
- [ ] Tables: sortable, filterable, paginated, selectable
- [ ] Forms: input, select, checkbox, radio, switch, textarea, date picker, file upload drag-drop — all with inline validation
- [ ] Badges & Status Indicators (all FSM states with color coding)
- [ ] Charts: bar, line, pie, area, donut (animated counters)
- [ ] Tabs: horizontal, vertical, pill — smooth morphing transition
- [ ] Accordions (smooth expand/collapse)
- [ ] Timeline Components (progressive fill animation)
- [ ] Stepper (horizontal + vertical)
- [ ] Drawer (left, right, bottom — slide + overlay)
- [ ] Modal (sm, md, lg, full — fade + scale)
- [ ] Confirmation Dialogs (destructive action confirmation with cancel/confirm)
- [ ] Context Menus (right-click action menus)
- [ ] Dropdown Menus (action menus with icons)
- [ ] Search States component (searching spinner, no results, results count)
- [ ] Filter States component (active filter chips, clear all button, filter count badge)
- [ ] Icons (Lucide — consistent sizing)

---

## PHASE 2: PUBLIC WEBSITE

### Page 1 — Homepage

#### Hero Section (Apple + Vercel + Stripe quality)
- [x] HeroSection.tsx basic structure
- [x] REBUILD: Full-screen immersive hero
- [x] Animated vertical text rotator (Framer Motion slot-machine effect):
  - "Buy Property" → "Renovate Home" → "Design Interior" → "Find Contractors" → "Finance Projects" → "Manage Construction"
  - Final: "All in One Platform."
- [x] Gradient text: Champagne Gold → Warm Charcoal
- [x] Large typography, centered layout, massive visual impact
- [x] Subtle parallax background

#### Smart Search Console (Floating below hero)
- [x] Frosted glass card (backdrop-blur, soft shadow, rounded corners)
- [x] Dynamic tabs: Property / Vendor / Financing
- [x] Tab switching morphs fields (Framer Motion layout transition, no page reload)
- [x] Property: Location, Budget, Type, Bedrooms
- [x] Vendor: Service, Location, Budget, Rating
- [x] Financing: Property Price, Down Payment, Tenor
- [x] Search button: magnetic hover + ripple click + scale animation

#### Ecosystem Bento Grid (Apple + Notion + Linear)
- [x] BentoGrid component with floating cards
- [x] Cards: AI Design Studio, Cost Calculator, Open Tender, Financing Center, Project Tracking, Escrow Protection
- [x] Hover: elevation, translateY, image zoom, gradient overlay, animated arrow, reveal CTA, subtle glow

#### Property Carousel (Airbnb Luxe)
- [x] FeaturedProperties basic structure
- [x] REBUILD: Luxury horizontal carousel
- [x] Desktop: custom "Drag" cursor, parallax movement, smooth scroll
- [x] Mobile: native swipe, snap scrolling
- [ ] Large images, price, location, installment, estimated renovation cost
- [x] Heart icon: scale + bounce micro-interaction + saved state

#### Vendor Showcase (Fiverr Pro quality)
- [x] FeaturedVendors basic structure
- [ ] UPGRADE: Profile image, portfolio cover, rating, projects, response time, verification badge
- [ ] Hover: card lift, image zoom, glow border, reveal "Invite to Tender" CTA
- [ ] Portfolio preview opens in modal

#### Remaining Homepage Sections
- [x] SmartEngines (Cost Calculator + Transformation Slider)
- [x] HowItWorks (5-step timeline)
- [x] InspirationGrid (masonry)
- [x] PartnerLogos (marquee)
- [ ] Featured Renovations section (before/after showcase cards)
- [ ] Home Transformation Gallery (immersive before/after gallery, drag comparison)
- [ ] AI Design Showcase section (interactive demo with sample room)
- [ ] Financing Showcase section (Wealthfront style — large numbers, confidence indicators, animated charts)
- [x] Testimonials section (animated cards with avatars, ratings, project photos)
- [x] Statistics section (animated counters — counting up on scroll reveal: projects completed, vendors, savings, users)
- [x] FAQ section (accordion with smooth expand/collapse)
- [ ] Generate all remaining images (hero, properties, renovations, interiors, vendors)
- [ ] All sections: scroll reveal (fadeUp, stagger children)
- [ ] Desktop (1440+) / Tablet (768-1024) / Mobile (375-430) responsive
- [ ] Skeleton loading state / Error state

### Mega Menu Navigation
- [x] Hover-activated multi-column mega menu (desktop)
- [x] Icons + illustrations + featured content + quick actions
- [x] Animation: fade in + slide down + layout transition (no click required)
- [x] Full-screen mobile nav: hamburger morph, overlay expansion, staggered menu animation

### Page 2 — Property Search
- [x] PropertyCard, PropertyGrid, FilterSidebar, MapView, page assembled
- [ ] Grid / List / Map view toggle
- [ ] SearchHeader (search bar + animated filter chips)
- [ ] Sort (price, date, relevance)
- [ ] ComparePanel (floating bottom tray)
- [ ] Saved Properties, RecentlyViewed
- [ ] Functional filtering + Pagination
- [ ] Skeleton cards / Empty state / Desktop-Tablet-Mobile

### Page 3 — Property Detail
- [x] Gallery, Overview, MortgageCalculator, RenovationEstimator, PackageSelector, CostDashboard, page assembled
- [ ] Floor Plan viewer, 360 Tour, Video player
- [ ] Interior + Furniture package selectors
- [ ] Total Cost breakdown
- [ ] CTAs: Open Tender, Schedule Visit, Chat Agent
- [ ] RecommendedVendors, Sticky Sidebar CTAs
- [ ] generateStaticParams for ISR
- [ ] Skeleton / Error / Desktop-Tablet-Mobile

### Page 4 — Property Compare
- [ ] app/properties/compare/page.tsx
- [ ] Side-by-side Property A / B / C columns
- [ ] Compare rows: Price, Area, Location, Installment, Renovation Cost, Total Ownership Cost
- [ ] Add/remove properties to compare (max 3)
- [ ] Highlight best value per row
- [ ] CTA: Open Tender for selected property
- [ ] Desktop / Tablet / Mobile responsive
- [ ] Empty state (Select properties to compare)

### Page 5 — Property Map Explorer
- [ ] app/properties/map/page.tsx
- [ ] Full screen interactive map
- [ ] Property pins with price tooltip on hover
- [ ] Heatmaps (price layer)
- [ ] Nearby amenities layer:
  - [ ] Schools
  - [ ] Hospitals
  - [ ] Transportation (MRT/bus stops)
- [ ] Map clustering for dense areas
- [ ] Property drawer on pin click
- [ ] Desktop / Tablet / Mobile responsive

---

## PHASE 3: VENDOR MARKETPLACE

### Page 6 — Vendor Search
- [x] VendorCard, page assembled
- [ ] 8 category pill tabs, search bar, filter sidebar, CompareVendors tray
- [ ] Hover: card lift, image zoom, glow border, reveal CTA
- [ ] Skeleton / Empty / Responsive

### Page 7 — Vendor Detail
- [x] VendorHero, PortfolioGallery, ServicePackages, page assembled
- [ ] Company Profile, Coverage Area map, Certifications
- [ ] ProjectTimeline (animate on scroll), MaterialsUsed, CustomerReviews (star distribution + cards)
- [ ] FAQ accordion, SimilarVendors scroll
- [ ] Sticky Sidebar CTAs, Hire Vendor CTA
- [ ] Skeleton / Error / Responsive

### Page 8 — Vendor Portfolio Detail
- [ ] Project gallery (before/after slider), Materials, Budget, Timeline, Reviews

---

## PHASE 4: TENDER SYSTEM

### Page 9 — Create Tender Wizard (8 steps)
- [x] Route + store exists
- [ ] Step 1-8: Property, Scope, Files, Budget, Timeline, Vendors, Review, Submit
- [ ] Wire store + validation + progress stepper + draft save
- [ ] Smooth step transitions (Framer Motion)

### Page 10 — Tender Detail
- [ ] Scope, Files, Requirements, Vendor responses, Status timeline (FSM viz)

### Page 11 — Bid Comparison
- [ ] app/tender/[id]/bids/page.tsx
- [ ] Vendor Comparison Matrix (side-by-side table)
- [ ] Compare rows: Pricing, Warranty, Timeline, Portfolio samples, Reviews/Rating
- [ ] AI Recommendation badge (best value, best quality, fastest)
- [ ] Award Vendor CTA (triggers Tender Modal)
- [ ] Reject Bid action
- [ ] Desktop / Tablet / Mobile responsive

### Tender Success
- [ ] Animated checkmark (Framer Motion)
- [ ] Tender reference number
- [ ] Recommended vendors list
- [ ] Expected bid count + estimated timeline

---

## PHASE 5: SMART ENGINE & COST CALCULATOR

> Rule-Based, bukan AI. GPU = 0, AI Cost = 0.

### Page 12 — Renovation Cost Calculator (Smart Engine)
- [ ] app/calculator/page.tsx
- [ ] Inputs:
  - [ ] Building Area (m²)
  - [ ] Location (province/city)
  - [ ] Condition (new/light reno/heavy reno/gut reno)
  - [ ] Style (minimalist/modern/classic/luxury)
  - [ ] Scope (full/partial — checkboxes per area)
  - [ ] Material Grade (economy/standard/premium/luxury)
- [ ] Smart Engine Formula:
  - [ ] Volume × AHSP × Regional Index × Vendor Margin
  - [ ] Based on Indonesian AHSP/HSPK data
- [ ] Outputs (real-time calculation):
  - [ ] Labor cost
  - [ ] Material cost
  - [ ] Tax
  - [ ] Margin
  - [ ] Contingency
  - [ ] Total estimated cost (RAB)
- [ ] Interactive sliders with animated values
- [ ] Desktop / Tablet / Mobile responsive

### Smart Engine: Vendor Match
- [ ] Rule-based weighted scoring:
  - [ ] Location Match = 40%
  - [ ] Budget Match = 30%
  - [ ] Rating Score = 20%
  - [ ] SLA Score = 10%
- [ ] SQL ranking query, no ML model
- [ ] Results displayed on vendor search + tender matching

### Smart Engine: Property Match
- [ ] Rule-based ranking:
  - [ ] Price match (budget range)
  - [ ] Location preference
  - [ ] Property type preference
  - [ ] Yield potential
  - [ ] ROI potential
- [ ] SQL query with weighted sort, no ML model

### Smart Engine: ROI Calculator
- [ ] Parametric calculation:
  - [ ] Rental Yield = (Annual Rent / Property Price) × 100%
  - [ ] Cap Rate = (NOI / Property Price) × 100%
  - [ ] Payback Period = Property Price / Annual Net Income
- [ ] No AI prediction, pure formula

### Page 13 — Design Inspiration
- [ ] app/inspiration/page.tsx
- [ ] Category tabs:
  - [ ] Living Room
  - [ ] Kitchen
  - [ ] Bedroom
  - [ ] Bathroom
  - [ ] Workspace
  - [ ] Outdoor
- [ ] Masonry gallery with hover zoom
- [ ] Moodboards (curated collections)
- [ ] Save to favorites
- [ ] Desktop / Tablet / Mobile responsive

---

## PHASE 6: FINANCE (Wealthfront / Revolut quality)

### Page 15 — Financing Center
- [ ] Large numbers, confidence indicators, animated charts
- [ ] Mortgage / Renovation / Furniture / Combined calculators
- [ ] Eligibility checker, installment simulation
- [ ] Hover tooltips, animated results

### Page 16 — Loan Application Wizard (7 steps)
- [ ] Personal, Income, Employment, Property, Project, Documents, Review

### Page 17 — Loan Tracking
- [ ] FSM: Submitted → Review → Approved → Disbursed | Rejected
- [ ] Timeline visualization

---

## PHASE 7: CUSTOMER PORTAL (Linear + Stripe + Notion dashboard)

### Dashboard Experience Rules
- [ ] NO old-fashioned admin panels
- [ ] Card-based layout, large KPI cards
- [ ] Smooth animated counters (count up on mount)
- [ ] Animated charts (draw-in on scroll)
- [ ] Activity timeline (progressive reveal)
- [ ] Quick actions, contextual recommendations

### Page 18 — Customer Dashboard
- [ ] app/dashboard/page.tsx
- [ ] Overview section with animated KPI cards
- [ ] Projects summary (active count, progress bars)
- [ ] Properties summary (owned, favorites)
- [ ] Financing summary (loan status, next payment)
- [ ] Tenders summary (active, pending bids)
- [ ] Notifications preview (recent 5)
- [ ] Documents quick access
- [ ] Skeleton dashboard loading state
- [ ] Desktop / Tablet / Mobile responsive

### Page 19 — My Properties
- [ ] app/dashboard/properties/page.tsx
- [ ] Tabs: Owned Properties / Favorites / History
- [ ] Property cards with status badges
- [ ] Empty state: "Browse properties to get started"
- [ ] Desktop / Tablet / Mobile responsive

### Page 20 — My Projects
- [ ] app/dashboard/projects/page.tsx
- [ ] Tabs: Active / Completed / Cancelled
- [ ] Project cards with progress percentage + milestone count
- [ ] Empty state: "Start Your First Project"
- [ ] Desktop / Tablet / Mobile responsive

### Page 21 — Project Detail
- [ ] app/dashboard/projects/[id]/page.tsx
- [ ] Timeline (vertical, progressive fill animation)
- [ ] Milestones (cards with FSM status badges)
- [ ] Photos (gallery grid)
- [ ] Reports (list with download)
- [ ] Invoices (table with status)
- [ ] Documents (categorized list)
- [ ] Payments (timeline with amounts)
- [ ] Chat (real-time messaging with vendor)
- [ ] Desktop / Tablet / Mobile responsive

### Page 22 — Project Progress
- [ ] app/dashboard/projects/[id]/progress/page.tsx
- [ ] Daily Updates feed (reverse chronological)
- [ ] Milestones tracker (animate on completion)
- [ ] Progress Photos (gallery with date stamps)
- [ ] Issues list (open/resolved filter)
- [ ] Change Orders (pending approval / approved / rejected)
- [ ] Desktop / Tablet / Mobile responsive

### Page 23 — Escrow & Payment Tracking
- [ ] app/dashboard/payments/page.tsx
- [ ] Escrow Balance (large number, animated counter)
- [ ] Released funds (cumulative chart)
- [ ] Retention held (with expected release dates)
- [ ] Pending payments (upcoming schedule)
- [ ] Payment History (table with filters)
- [ ] Desktop / Tablet / Mobile responsive

### Page 24 — Documents Vault
- [ ] app/dashboard/documents/page.tsx
- [ ] Categories: Contracts, Invoices, Permits, Warranty, Loan Documents
- [ ] Upload (drag-drop to Cloudflare R2)
- [ ] Preview (inline viewer)
- [ ] Download action
- [ ] Empty state: "Upload Your First Document"
- [ ] Desktop / Tablet / Mobile responsive

### Page 25 — Notifications Center
- [ ] app/dashboard/notifications/page.tsx
- [ ] Tabs: All Notifications / Email / WhatsApp / Push
- [ ] Read / Unread filter
- [ ] Mark as read (individual + batch)
- [ ] Empty state: "You're All Caught Up"
- [ ] Desktop / Tablet / Mobile responsive

### Page 26 — Messaging Center
- [ ] app/dashboard/messages/page.tsx
- [ ] Vendor Chat (per-project threads)
- [ ] Agent Chat (property agent)
- [ ] Support Chat (One Home support)
- [ ] Unread badge counts
- [ ] Real-time messaging UI
- [ ] Empty state: "No Messages"
- [ ] Desktop / Tablet / Mobile responsive

### Page 27 — User Profile
- [ ] app/dashboard/profile/page.tsx
- [ ] Personal Data (name, email, phone, address)
- [ ] Security (password change, MFA setup/manage)
- [ ] KYC (verification status, document upload)
- [ ] Preferences (language, notifications, currency)
- [ ] Devices (active sessions, device management)
- [ ] Desktop / Tablet / Mobile responsive

---

## PHASE 8: VENDOR PORTAL

### Page 28 — Vendor Dashboard
- [ ] app/vendor/dashboard/page.tsx
- [ ] Revenue KPI cards (animated counters)
- [ ] Projects overview (active, completed count)
- [ ] Tenders overview (invitations, active bids)
- [ ] Payments summary (pending, released)
- [ ] Ratings overview (average, trend chart)
- [ ] Animated charts (draw-in on mount)
- [ ] Skeleton loading / Desktop-Tablet-Mobile

### Page 29 — Tender Opportunities
- [ ] app/vendor/tenders/page.tsx
- [ ] Browse available tenders (card list)
- [ ] Filter: category, budget range, location, deadline
- [ ] Apply action (express interest)
- [ ] Bid action (submit detailed bid)
- [ ] Empty state: "No tender opportunities right now"

### Page 30 — Bid Submission
- [ ] app/vendor/tenders/[id]/bid/page.tsx
- [ ] Proposal (rich text description)
- [ ] Price breakdown (itemized)
- [ ] Materials list (with brands/grades)
- [ ] Timeline (gantt or milestone view)
- [ ] Warranty terms
- [ ] Form validation + draft save

### Page 31 — Vendor Projects
- [ ] app/vendor/projects/page.tsx
- [ ] Tabs: Current Projects / Completed / Pipeline
- [ ] Project cards with progress + milestone status
- [ ] Quick actions: update progress, upload photos

### Page 32 — Vendor Payment Center
- [ ] app/vendor/payments/page.tsx
- [ ] Receivables (upcoming payments)
- [ ] Released funds (with dates)
- [ ] Retention held (with expected release)
- [ ] Payment History (filterable table)
- [ ] Desktop / Tablet / Mobile responsive

### Page 33 — Vendor Reviews
- [ ] app/vendor/reviews/page.tsx
- [ ] Overall Ratings (star distribution chart)
- [ ] Review cards (with project reference, date, client avatar)
- [ ] Performance metrics (on-time %, budget adherence, communication)

### Vendor Onboarding Wizard (8 steps)
- [ ] app/vendor/onboarding/page.tsx
- [ ] Step 1: Company info (name, description, logo)
- [ ] Step 2: Services (categories, specializations)
- [ ] Step 3: Coverage area (map/region selection)
- [ ] Step 4: Portfolio (upload projects with before/after)
- [ ] Step 5: Bank account (for payments)
- [ ] Step 6: Tax info (NPWP, tax documents)
- [ ] Step 7: Documents (licenses, certifications, insurance)
- [ ] Step 8: Review & Submit

---

## PHASE 9: BANK PORTAL

### Page 34 — Bank Dashboard
- [ ] app/bank/dashboard/page.tsx
- [ ] Applications count + pipeline
- [ ] Approvals (recent, pending)
- [ ] Disbursements (total, recent)
- [ ] Risk metrics (default rate, exposure)
- [ ] Animated charts + KPI cards

### Page 35 — Loan Review
- [ ] app/bank/loans/[id]/page.tsx
- [ ] Applicant details (personal, income, employment)
- [ ] Property details (valuation, location, specs)
- [ ] Project details (scope, vendor, timeline)
- [ ] Financial Data (debt ratio, affordability)
- [ ] Documents (verification status per document)
- [ ] Approve / Reject / Request Info actions

### Page 36 — Project Monitoring
- [ ] app/bank/projects/[id]/page.tsx
- [ ] Milestones (completion status, timeline)
- [ ] Photos (progress evidence)
- [ ] Escrow status (funded, released amounts)
- [ ] Retention status (held, scheduled release)

---

## PHASE 10: ADMIN PORTAL

### Page 37 — Admin Dashboard
- [ ] app/admin/page.tsx
- [ ] KPI cards: GMV, Revenue, Users, Projects, Loans, Escrow totals
- [ ] Charts: revenue trend (line), user growth (area), GMV (bar)
- [ ] Recent activity feed
- [ ] Animated counters + draw-in charts

### Page 38 — User Management
- [ ] app/admin/users/page.tsx
- [ ] Tabs: Homeowners / Vendors / Agents / Bank Users / Admins
- [ ] Roles & Permissions editor
- [ ] Suspensions (suspend/unsuspend with reason)
- [ ] Verification status (pending, verified, rejected)
- [ ] Activity Logs per user
- [ ] Search + filter + pagination

### Page 39 — Vendor Verification
- [ ] app/admin/vendors/verification/page.tsx
- [ ] KYC document review (side-by-side viewer)
- [ ] Documents checklist (license, insurance, tax)
- [ ] Approval action (with notes)
- [ ] Rejection action (with reason)
- [ ] Verification queue with priorities

### Page 40 — Property Moderation
- [ ] app/admin/properties/page.tsx
- [ ] New Listings queue
- [ ] Approval / Rejection actions
- [ ] Fraud Detection flags (duplicate, suspicious pricing)
- [ ] Moderation history log

### Page 41 — Tender Moderation
- [ ] app/admin/tenders/page.tsx
- [ ] Active tenders monitoring
- [ ] Disputes (flagged tenders)
- [ ] Escalations (require admin intervention)
- [ ] Resolution actions

### Page 42 — Escrow Management
- [ ] app/admin/escrow/page.tsx
- [ ] Funds overview (total held, total released)
- [ ] Release approvals (DUAL APPROVAL WORKFLOW — two admins required)
- [ ] Retention management (held amounts, scheduled releases)
- [ ] Disputes (fund freeze, resolution)

### Page 43 — Finance Ledger
- [ ] app/admin/ledger/page.tsx
- [ ] Ledger Accounts (Chart of Accounts tree view)
- [ ] Transactions list (IMMUTABLE — no edit/delete, filterable, exportable)
- [ ] Journal Entries (DOUBLE-ENTRY view: debit column + credit column, always balanced)
- [ ] Reconciliation dashboard (matched, unmatched, discrepancies)

### Page 44 — Bank Integration Center
- [ ] app/admin/banking/page.tsx
- [ ] Webhooks management (registered endpoints, last received)
- [ ] Disbursements tracking (pending, completed, failed)
- [ ] Failures log (with retry actions)
- [ ] Integration logs (raw request/response)

### Page 45 — Notification Management
- [ ] app/admin/notifications/page.tsx
- [ ] Email Templates (Resend — preview + edit)
- [ ] WhatsApp Templates (WhatsApp Business API — preview + edit)
- [ ] Push Templates (Firebase FCM — preview + edit)
- [ ] Send history + delivery status

### Page 46 — Analytics
- [ ] app/admin/analytics/page.tsx
- [ ] Users analytics (registrations, active, retention, cohorts)
- [ ] Revenue analytics (MRR, ARR, growth rate)
- [ ] Conversion funnel (visit → register → tender → project → payment)
- [ ] GMV tracking (monthly, cumulative)
- [ ] Projects analytics (started, completed, average duration)

### Page 47 — Audit Logs
- [ ] app/admin/audit/page.tsx
- [ ] User Activity logs (login, profile changes, actions)
- [ ] Financial Activity logs (payments, escrow, ledger entries)
- [ ] System Activity logs (deployments, config changes, errors)
- [ ] IMMUTABLE — no edit/delete
- [ ] Filterable + searchable + EXPORTABLE (CSV/JSON)

### Page 48 — Security Center
- [ ] app/admin/security/page.tsx
- [ ] Roles editor (create, edit roles)
- [ ] Permissions matrix (role × permission grid)
- [ ] MFA management (enforce, reset for users)
- [ ] Device Management (active sessions, force logout)

### Page 49 — System Configuration
- [ ] app/admin/settings/page.tsx
- [ ] Feature Flags (toggle features on/off per environment)
- [ ] Environment variables viewer
- [ ] System Settings (platform name, currency, timezone, etc.)

### Page 50 — Help & Support Center
- [ ] app/admin/support/page.tsx
- [ ] Support Tickets (open, in-progress, resolved)
- [ ] Knowledge Base (articles, categories, search)
- [ ] Chat Support interface (admin side)

### Outbox Engineering Dashboard (Admin)
- [ ] app/admin/outbox/page.tsx
- [ ] Failed Events table + Pending Events table
- [ ] Avg Processing Time, Consumer Health
- [ ] Dead Letter Queue viewer + retry/reprocess
- [ ] Gauges: Pending Count, Dead Letter Count
- [ ] Charts: Publish Rate, Failure Rate, Consumer Lag

---

## PHASE 11: GLOBAL UX COMPONENTS

### Modals
- [ ] Auth (Login, Register, Forgot Password, Reset, Verify Email, MFA)
- [ ] Financing (Apply, Eligibility, Summary, Approval)
- [ ] Tender (Invite Vendor, Award, Reject Bid, Close, Success)
- [ ] Project (Approve/Reject Milestone, Open/Close Dispute, Upload Progress, Change Order)
- [ ] Escrow (Release, Hold, Retention Release, Refund)
- [ ] Confirmation (Delete, Archive, Deactivate, Suspend, Approve, Reject)

### Drawers
- [ ] Property Drawer (quick preview, images, price, location, save, compare, Open Detail CTA)
- [ ] Vendor Drawer (quick profile, rating, projects, services, Invite To Tender CTA)
- [ ] Tender Drawer (quick overview, budget, timeline, vendor count, status badge)
- [ ] Notification Drawer (unread/read tabs, categories: system/financial/project/tender)
- [ ] Message Drawer (vendor messages, support messages, agent messages)

### Wizards
- [ ] Create Tender Wizard (8 steps: Property, Scope, Photos, Documents, Budget, Timeline, Vendors, Review)
- [ ] Loan Application Wizard (7 steps: Personal, Income, Employment, Property, Project, Documents, Review)
- [ ] Vendor Onboarding Wizard (8 steps: Company, Services, Coverage, Portfolio, Bank Account, Tax, Documents, Review)
- [ ] Property Listing Wizard (7 steps: Basic Info, Location, Photos, Pricing, Features, Documents, Review)

### Admin Special States
- [ ] User Management states:
  - [ ] Loading (skeleton table rows)
  - [ ] No Users (empty state with invite CTA)
  - [ ] Suspended Users view (filtered list)
  - [ ] Verification Pending queue
- [ ] Escrow Management states:
  - [ ] Pending Release (awaiting dual approval)
  - [ ] Dispute (frozen funds, mediation UI)
  - [ ] Refund (processing, completed)
  - [ ] Retention (held, scheduled release countdown)
- [ ] Ledger Management states:
  - [ ] Transaction Details (immutable detail modal)
  - [ ] Reconciliation Error (mismatch highlight, discrepancy detail)
  - [ ] Audit Trail (chronological event log per transaction)

---

## PHASE 12: BACKEND — NestJS MODULAR MONOLITH

### Setup
- [ ] NestJS + TypeScript strict
- [ ] Prisma ORM + PostgreSQL 16 (self-hosted on VPS)
- [ ] DDD module structure
- [ ] Swagger docs
- [ ] class-validator
- [ ] Target: 70-90 tables MVP

### Domain: Identity
- [ ] NestJS JWT + Refresh Token (bukan Clerk — lebih murah untuk MVP)
- [ ] Alternative: Keycloak atau Supabase Auth
- [ ] User profiles, RBAC, MFA, KYC, Devices, Sessions

### Domain: Property
- [ ] CRUD, Meilisearch integration, R2 image upload, favorites, comparison, moderation
- [ ] Tables: properties, property_details, property_media, property_documents, property_locations, saved_properties, property_views, property_inquiries

### Domain: Vendor
- [ ] Registration, onboarding, profile, portfolio, KYC FSM, Meilisearch, reviews, packages
- [ ] Categories: Contractor, Interior Designer, Architect, Furniture Vendor, MEP Specialist, Landscape Vendor, Handyman
- [ ] Tables: vendors, vendor_profiles, vendor_services, vendor_portfolios, vendor_certifications, vendor_regions, vendor_reviews

### Domain: Tender
- [ ] FSM: Draft→Open→Bidding→Evaluation→Awarded→Closed
- [ ] File upload (R2), bids, comparison, invitation, award
- [ ] Tables: tenders, tender_items, tender_documents, tender_vendors, bids, bid_items, bid_comparisons
- [ ] Outbox: TenderCreated, BidSubmitted, VendorSelected

### Domain: Project Delivery
- [ ] Milestone FSM: Pending→InProgress→Submitted→Approved|Rejected
- [ ] Progress updates, change orders, issues, completion, warranty
- [ ] Daily Reports (vendor submits daily progress, photos, issues)
- [ ] Tables: projects, project_milestones, daily_reports, variation_orders, project_documents, project_photos, project_timelines
- [ ] Outbox: ProjectCreated, MilestoneSubmitted, MilestoneApproved, ProjectCompleted, WarrantyExpired

### Domain: Project Finance
- [ ] Budget, invoices, cost tracking, Project Wallet, payment schedule
- [ ] Financing simulation, loan tracking
- [ ] Tables: project_budgets, cost_estimates, loan_applications, loan_tracking, funding_plans

### Domain: Ledger & Audit (DOUBLE-ENTRY)
> Not a banking ledger. Tracks One Home's own financial position.
- [ ] Chart of Accounts (asset, liability, equity, revenue, expense)
- [ ] IMMUTABLE transactions (no UPDATE/DELETE — reversals only)
- [ ] Journal entries (debit = credit always)
- [ ] Raw SQL (NOT Prisma ORM)
- [ ] Reconciliation engine, balance calc, financial reports, audit trail
- [ ] Tracks: Project Value, Vendor Payables, Retention Value, Platform Revenue, Inspection Revenue, Financing Revenue
- [ ] Tables: ledger_accounts, ledger_transactions, journal_entries, audit_logs, event_logs
- [ ] Rules: Double Entry, Immutable, Append Only, Idempotent

### Domain: Banking Integration
> Host-to-host integration with Indonesian banks. One Home sends disbursement instructions, bank disburses.
- [ ] Bank Partner Integrations:
  - [ ] BCA API
  - [ ] Mandiri Kopra
  - [ ] BRIAPI
  - [ ] BNI Direct
  - [ ] Permata API
  - [ ] Future: BTN, CIMB, Danamon
- [ ] Features: Virtual Account, Escrow Status, Fund Tracking, Disbursement Request, Webhook Processing
- [ ] Loan FSM: Submitted→Review→Approved→Disbursed|Rejected
- [ ] Tables: bank_partners, bank_accounts, virtual_accounts, bank_webhooks, bank_transactions, bank_disbursement_requests, bank_disbursement_status
- [ ] Outbox: LoanApproved, LoanDisbursed

### Domain: Escrow Orchestration
> Track escrow state **without holding funds**. All funds remain in banking escrow accounts.
- [ ] Escrow Monitoring (track state per project)
- [ ] Approval Workflow (multi-party approval before release request)
- [ ] Fund Release Requests (One Home instructs bank to release)
- [ ] Retention Tracking (hold percentage, release schedule via QStash)
- [ ] Refund, dispute FSM: Opened→UnderReview→Resolved|Escalated
- [ ] Release Conditions:
  - [ ] Inspection Approved
  - [ ] QS Approved
  - [ ] Homeowner Approved
  - [ ] No Active Defects
  - [ ] No Active Disputes
- [ ] Tables: escrow_accounts, escrow_milestones, escrow_release_requests, escrow_approvals, retention_accounts, escrow_status_logs
- [ ] Outbox: EscrowFunded, PaymentReleased, RetentionHeld, RetentionReleased, RefundIssued, DisputeOpened, DisputeResolved

### Domain: Smart Engine (bukan AI)
> Rule-based, no GPU, no ML. FastAPI lightweight container.
- [ ] FastAPI (Python, lightweight — NO GPU, NO ML libraries)
- [ ] Services:
  - [ ] Cost Estimator (Volume × AHSP × Regional Index × Vendor Margin → RAB)
  - [ ] Vendor Match (weighted: Location 40%, Budget 30%, Rating 20%, SLA 10%)
  - [ ] Property Match (rule-based ranking: price, location, type, yield, ROI)
  - [ ] ROI Calculator (Rental Yield, Cap Rate, Payback Period)
  - [ ] Property Score (rule-based: price score, location score, flood risk)
  - [ ] Vendor Score (rule-based: quality, delay, dispute, response, completion)
- [ ] Async via Redis Streams (for heavy calculations only)

### Domain: Notification
- [ ] Resend (email), WhatsApp Business API, Firebase FCM
- [ ] Templates, preferences, history
- [ ] Consumer: listens all Outbox events → dispatch

### Domain: Admin
- [ ] User CRUD, moderation, vendor verification, analytics, audit queries, feature flags

### Meilisearch
- [ ] Instance setup, Property index, Vendor index, search API, index rebuild

### Cloudflare R2
- [ ] Bucket config, presigned URLs, image processing, document storage, access control

---

## PHASE 13: OUTBOX PATTERN (RULE 8)

### Database
- [ ] outbox_events: id(UUID), event_name, aggregate_type, aggregate_id(UUID), payload(JSONB), status, retry_count, published_at, created_at
- [ ] Status: PENDING → PUBLISHED | FAILED → DEAD_LETTER
- [ ] Indexes on (status, created_at)
- [ ] Dead letter table: reason, payload, stack_trace, retry_count, created_at

### Transaction Flow (MANDATORY)
- [ ] BEGIN → Business Logic → Create Outbox Event → COMMIT
- [ ] NEVER publish directly — only Outbox table
- [ ] Enforced for: Finance, Ledger, Escrow, Banking, Payment, Project

### Sweeper Worker
- [ ] Cloud Run dedicated worker (always-on)
- [ ] Poll every 1s, read PENDING, publish to Redis Streams
- [ ] Success → PUBLISHED + published_at
- [ ] Failure → retry_count++ → retry later
- [ ] Max retry → DEAD_LETTER → alert engineering

### Redis Streams (Upstash)
- [ ] Stream per domain, consumer groups, acknowledgment, trimming

### Idempotent Consumers
- [ ] Store processed event IDs, ignore duplicates

### 28 Events
- [ ] TenderCreated, BidSubmitted, VendorSelected, ProjectCreated, MilestoneSubmitted, MilestoneApproved, LoanApproved, LoanDisbursed, EscrowFunded, PaymentReleased, RetentionHeld, RetentionReleased, RefundIssued, DisputeOpened, DisputeResolved, ProjectCompleted, WarrantyExpired
- [ ] InspectionAssigned, InspectionCompleted, DefectLogged, SurveyorApproved, TaxCalculated, ContractGenerated, ContractSigned, InsuranceIssued, VendorScoreUpdated, FraudDetected, WarrantyStarted

### 9 Consumer Domains
- [ ] Notification, Analytics, Project, Finance, AI
- [ ] Inspection, Quantity Surveyor, Insurance, Legal & Compliance

### 12 QStash Scheduled Jobs
- [ ] 00:00 Retention Release Check
- [ ] 01:00 Warranty Expiration Check
- [ ] 02:00 Escrow Reconciliation
- [ ] 03:00 Ledger Reconciliation
- [ ] 04:00 Bank Settlement Validation
- [ ] 05:00 Failed Event Retry
- [ ] 06:00 Notification Cleanup
- [ ] 07:00 SLA Breach Report
- [ ] 08:00 Insurance Policy Expiry Check
- [ ] 09:00 Vendor Score Batch Recalculation
- [ ] Monthly: Tax Report Generation (1st of each month)
- [ ] Weekly: Data Warehouse Full Sync (Sunday 02:00)

### Observability
- [ ] Grafana: Pending Count, Publish Rate, Failure Rate, Consumer Lag, Dead Letter Count
- [ ] Alerts: Slack, WhatsApp, Email

---

## PHASE 14: VPS INFRASTRUCTURE & DEVOPS (MVP)

### 1. VPS Architecture
- [ ] VPS 1 (Application Server): 4 vCPU, 8 GB RAM
  - [ ] Nginx (Reverse Proxy, SSL Termination)
  - [ ] Next.js (Web Frontend SSR)
  - [ ] NestJS (API Backend)
  - [ ] FastAPI (Smart Engine)
- [ ] VPS 2 (Database Server): 4 vCPU, 8 GB RAM
  - [ ] PostgreSQL 16 (Primary DB)
  - [ ] Redis (Cache, Streams, Outbox)
  - [ ] Meilisearch (Search Engine)

### 2. Networking
- [ ] Cloudflare DNS, CDN edge caching, VPS IP whitelisting
- [ ] Cloudflare WAF, SSL Full Strict, Rate Limiting

### 3. Docker Infrastructure
- [ ] docker-compose.yml untuk Application Server
- [ ] docker-compose.yml untuk Database Server
- [ ] Persistent volumes untuk PostgreSQL, Redis, Meilisearch

### 4. Database Setup
- [ ] PostgreSQL 16 installation
- [ ] Connection pooling (PgBouncer)
- [ ] Prisma Migrate integration
- [ ] Daily automated backups (cron job → R2)

### 5. Redis Setup
- [ ] Upstash alternative: Self-hosted Redis
- [ ] Streams per domain, consumer groups, eviction policies

### 6. Monitoring & Logging
- [ ] Sentry (Error tracking)
- [ ] Uptime Kuma (Uptime monitoring, self-hosted)
- [ ] Grafana + Prometheus (Basic VPS metrics)

### 7. Security Architecture
- [ ] Cloudflare WAF + DDoS
- [ ] MFA (JWT-based, bukan Clerk)
- [ ] RBAC, AES-256, TLS 1.3, audit logging, idempotency keys, CORS, security headers

### 8. Secrets Management
- [ ] .env files with strictly controlled permissions
- [ ] Local environment variables, manual rotation

### 9. CI/CD Design
- [ ] GitHub Actions: docker build → push image → deploy script via SSH to VPS
- [ ] frontend.yml, backend.yml, smart-engine.yml

### 10. Backup & Recovery
- [ ] Daily DB backups to Cloudflare R2
- [ ] R2 versioning
- [ ] Disaster recovery runbook

### 11. Runbooks
- [ ] App Down, DB Failover, Outbox Failure, Payment Failure, Ledger Mismatch, Redis Failure, DDoS Response, Data Breach, Certificate Expiry

---

## PHASE 15: FINANCIAL REQUIREMENTS (FinTech-Grade)

### Double-Entry Accounting
- [ ] Chart of Accounts, balanced journal entries, immutable log, raw SQL, balance sheet, income statement, trial balance

### Escrow Orchestration
> One Home does NOT hold funds. All funds remain in banking escrow accounts.
- [ ] Track escrow state per project (monitoring, not holding)
- [ ] Fund release requests (One Home instructs bank to release)
- [ ] Multi-party approval workflow before release request
- [ ] Milestone-based schedule, real-time tracking, daily reconciliation

### Project Wallet
- [ ] Virtual wallet per project, budget allocation, spending tracking, balance, statement

### Retention
- [ ] Hold percentage per milestone, daily release check (QStash 00:00), release after warranty, approval workflow

### Dispute Resolution
- [ ] FSM: Opened→UnderReview→Mediation→Resolved|Escalated, evidence upload, admin mediation, fund freeze, resolution payment

### Banking Integration (Host-to-Host)
- [ ] Bank Partner APIs: BCA, Mandiri Kopra, BRIAPI, BNI Direct, Permata (Future: BTN, CIMB, Danamon)
- [ ] Virtual Account management, Disbursement Request/Response, Webhooks, Settlement Validation, Failed Retry

### Reconciliation Engine
- [ ] Ledger (03:00), Escrow (02:00), Bank (04:00), discrepancy alerts, manual reconciliation UI

### Idempotency
- [ ] Keys on all payment/escrow endpoints, duplicate detection, same response guarantee

---

## PHASE 16: ENGINEERING STANDARDS

### Finite State Machines
- [ ] Tender: Draft→Open→Bidding→Evaluation→Awarded→Closed|Cancelled
- [ ] Bid: Draft→Submitted→UnderReview→Accepted|Rejected|Withdrawn
- [ ] Project: Created→InProgress→OnHold→Completed|Cancelled
- [ ] Milestone: Pending→InProgress→Submitted→Approved|Rejected
- [ ] Loan: Submitted→Review→Approved→Disbursed|Rejected
- [ ] Escrow: Created→Funded→PartialRelease→FullRelease|Dispute
- [ ] Dispute: Opened→UnderReview→Mediation→Resolved|Escalated
- [ ] Vendor: Pending→Review→Approved|Rejected
- [ ] Inspection: Assigned→InProgress→Completed→Verified|Failed
- [ ] Defect: Logged→Assigned→InProgress→Resolved→Verified
- [ ] Insurance: Quoted→Issued→Active→Claimed→Settled|Expired
- [ ] Contract: Created→Sent→Viewed→Signed→Completed|Expired|Rejected
- [ ] ProgressClaim: Submitted→InspectorVerified→QSReviewed→Approved→Paid|Rejected
- [ ] VariationOrder: Submitted→QSReviewed→HomeownerApproved→Approved|Rejected
- [ ] SLA: Active→Warning→Breached→Escalated→Resolved
- [ ] All enforced in backend domain services

### Event Store
- [ ] Permanent event storage, replay capability, versioning, schema registry

### CQRS
- [ ] Command handlers (write), Query handlers (read), separate read models, eventually consistent via events

---

## PHASE 17: MOBILE APPS (Flutter)

### Flutter Tech Stack
- [ ] Flutter (latest stable)
- [ ] Riverpod (state management)
- [ ] Go Router (navigation)
- [ ] Hive (local storage)
- [ ] Offline First architecture
- [ ] Firebase (push notifications, analytics, crashlytics)

### APP 1: One Home App
- [ ] Target Users: Homeowner, Vendor, Property Agent
- [ ] Homeowner: property search, project tracking, payments
- [ ] Vendor: tender opportunities, project execution, payments
- [ ] Property Agent: property listings, client management, inquiries
- [ ] Role-based bottom navigation, Role switcher

### APP 2: One Home Field App
- [ ] Target Users: Inspector, Surveyor
- [ ] Offline First strict requirements (sync when online)
- [ ] Inspector: inspection assignments, checklist execution, photo/video capture with GPS
- [ ] Surveyor: progress claims review, BOQ comparison, payout recommendation

> Note: Developer, Bank Officer, One Home Operations, and Admin are Web-Only for MVP.

### Mobile Inspector
- [ ] Inspection queue (assignments with SLA countdown)
- [ ] Checklist execution (offline capable)
- [ ] Camera: photo capture with GPS tagging
- [ ] Camera: video capture (max 2 min)
- [ ] Defect logging (severity, photo, description)
- [ ] Submit inspection report
- [ ] Offline sync (auto-upload when back online)

### Mobile Surveyor
- [ ] Claims review queue (with SLA countdown)
- [ ] BOQ comparison view (planned vs actual)
- [ ] Photo evidence review (from inspector)
- [ ] Approve / Reject / Request Revision
- [ ] Payout recommendation

### Mobile Navigation
- [ ] Bottom nav: Home, Properties, Projects, Vendors, Profile
- [ ] Floating Action Button: Create Tender

### Mobile Dashboard
- [ ] Property Summary (owned count, favorites, recent views)
- [ ] Project Progress (active project with milestone progress bar)
- [ ] Loan Status (current application status badge)
- [ ] Notifications (unread count + recent 3)

### Mobile Property
- [ ] Property Search (map/list toggle, filters sheet)
- [ ] Property Detail (swipeable gallery, collapsible sections)
- [ ] Property Compare (horizontal scroll comparison)

### Mobile Vendor
- [ ] Vendor Search (category chips, search bar)
- [ ] Vendor Detail (portfolio carousel, reviews)

### Mobile Tender
- [ ] Create Tender (step-by-step, camera for photos)
- [ ] Upload Photos (camera + gallery picker)
- [ ] Compare Bids (swipeable vendor cards)

### Mobile Project Tracking
- [ ] Milestones (vertical timeline with status badges)
- [ ] Photos (gallery with upload from camera)
- [ ] Payments (payment schedule + history)
- [ ] Chat (real-time messaging with vendor)

### Mobile Escrow Tracking
- [ ] Released Funds (amount + date)
- [ ] Retention (held amount + expected release date)
- [ ] Pending Funds (upcoming releases)

### Mobile Settings
- [ ] Notifications settings
- [ ] Profile & KYC
- [ ] Security (MFA, devices)
- [ ] Language preference

---

## PHASE 18: POLISH & VERIFICATION

### Frontend
- [ ] Scroll animations across all 50 pages
- [ ] Page transitions, hover effects, micro-animations
- [ ] Navigation consistency
- [ ] Responsive: 1440+, 1280, 1024, 768, 430, 390, 375
- [ ] Performance: lazy loading, code splitting, bundle analysis
- [ ] SEO: meta tags, Open Graph, structured data, sitemap

### Accessibility (WCAG 2.1 AA)
- [ ] Keyboard Navigation (all interactive elements reachable via Tab/Enter/Escape)
- [ ] Focus Rings (visible focus indicators on all interactive elements)
- [ ] Screen Reader Friendly (ARIA labels, roles, live regions)
- [ ] High Contrast Mode support
- [ ] 44x44px minimum tap targets (mobile)
- [ ] Accessible Charts (alt text, data tables fallback)
- [ ] Accessible Tables (proper th/td, scope, caption)
- [ ] Color contrast ratios: 4.5:1 text, 3:1 large text
- [ ] Skip navigation link
- [ ] Form error announcements (aria-live)

### Backend
- [ ] Swagger docs complete
- [ ] Unit tests (domain services)
- [ ] Integration tests (API endpoints)
- [ ] E2E tests (critical flows)
- [ ] Load test (1000 concurrent users)

### Build
- [ ] Frontend: npm run build clean
- [ ] Backend: NestJS compiles
- [ ] Docker: all images build
- [ ] CI/CD: all pipelines green

### Cross-Browser
- [ ] Chrome, Safari, Firefox, Edge, iOS Safari, Android Chrome

### Security
- [ ] Penetration testing plan
- [ ] OWASP Top 10 checklist
- [ ] Dependency vulnerability scan
- [ ] Secret leak detection

---

## PHASE 19: INSPECTOR PORTAL

> Site Inspector bertugas melakukan verifikasi independen di lapangan sebelum escrow release.
> SLA: 48 jam dari assignment hingga completion.

### Page 51 — Inspector Dashboard
- [ ] app/inspector/dashboard/page.tsx
- [ ] KPI cards: Inspections Today, Pending, Completed, Overdue
- [ ] Assignment queue (sorted by SLA deadline)
- [ ] Calendar view (upcoming inspections)
- [ ] Map view (inspection locations with GPS pins)
- [ ] Performance metrics (completion rate, on-time %, defect detection rate)
- [ ] Animated counters + draw-in charts
- [ ] Skeleton loading / Desktop-Tablet-Mobile

### Page 52 — Inspection Assignment Detail
- [ ] app/inspector/inspections/[id]/page.tsx
- [ ] Project info (property address, vendor, milestone being inspected)
- [ ] Checklist items (loaded from inspection_templates)
- [ ] Required evidence list (photo count, video required, GPS checkpoints)
- [ ] SLA countdown timer (48 hours, with warning at 75%)
- [ ] Previous inspection history for this project
- [ ] Accept / Decline assignment actions
- [ ] Desktop / Tablet / Mobile responsive

### Page 53 — Inspection Execution
- [ ] app/inspector/inspections/[id]/execute/page.tsx
- [ ] Interactive checklist (check/fail each item, add notes per item)
- [ ] Photo capture per checklist item (camera integration, multiple photos)
- [ ] Video capture (progress video recording, max 2 min)
- [ ] GPS verification (auto-capture current location, compare with project site coordinates)
- [ ] Defect logging:
  - [ ] Severity: Minor / Major / Critical
  - [ ] Photo evidence (mandatory for Major/Critical)
  - [ ] Description + recommendation
  - [ ] Assigned vendor for correction
- [ ] Material quality check (grade verification against BOQ specs)
- [ ] Measurement verification (dimensions, quantities vs BOQ)
- [ ] Offline support (save progress locally, sync when back online)
- [ ] Submit inspection report (triggers QS review)
- [ ] Desktop / Tablet / Mobile responsive

### Page 54 — Inspection Report
- [ ] app/inspector/inspections/[id]/report/page.tsx
- [ ] Summary: Pass / Fail / Conditional Pass
- [ ] Checklist results (all items with pass/fail status + notes)
- [ ] Photo evidence gallery (organized by checklist item)
- [ ] Video evidence player
- [ ] Defect list (with severity badges, photos, descriptions)
- [ ] GPS verification map (actual vs expected location)
- [ ] Inspector notes (free text)
- [ ] Digital signature (inspector sign-off)
- [ ] PDF export (formatted report with all evidence)
- [ ] Status: Submit to QS → Awaiting QS Review
- [ ] Desktop / Tablet / Mobile responsive

### Page 55 — Defect Management
- [ ] app/inspector/defects/page.tsx
- [ ] Tabs: Active Defects / Resolved / All
- [ ] Filter by: project, severity, vendor, status
- [ ] Defect detail (photos, description, vendor response, timeline)
- [ ] Defect resolution tracking FSM: Logged → Assigned → InProgress → Resolved → Verified
- [ ] Re-inspection scheduling (after vendor fixes defect)
- [ ] Defect analytics (defect rate by vendor, by category)
- [ ] Desktop / Tablet / Mobile responsive

### Backend: Inspection & QA Domain
- [ ] Tables: inspections, inspection_media, inspection_checklists, defect_logs, inspection_templates, inspection_assignments, inspection_sla
- [ ] Inspection FSM: Assigned → InProgress → Completed → Verified | Failed
- [ ] Defect FSM: Logged → Assigned → InProgress → Resolved → Verified
- [ ] APIs: POST /inspections/assign, GET /inspections/:id, POST /inspections/:id/execute, POST /inspections/:id/submit
- [ ] Media upload to R2: photos, videos with GPS metadata
- [ ] GPS verification service (haversine distance check)
- [ ] Template management (configurable checklists per project type)
- [ ] SLA enforcement (48h countdown, escalation triggers)
- [ ] Outbox: InspectionAssigned, InspectionCompleted, DefectLogged

---

## PHASE 20: SURVEYOR PORTAL

> Quantity Surveyor bertugas memvalidasi kuantitas, biaya, dan merekomendasikan pembayaran.
> SLA: 24 jam dari inspection completion hingga QS review selesai.

### Page 56 — Surveyor Dashboard
- [ ] app/surveyor/dashboard/page.tsx
- [ ] KPI cards: Reviews Today, Pending Claims, Approved, Rejected, Total Recommended Value
- [ ] Progress claims queue (sorted by SLA — 24 hours)
- [ ] Projects overview (active projects, total project value)
- [ ] Financial summary (total reviewed this month, total recommended payouts)
- [ ] Accuracy metrics (variance %, rejected claims rate)
- [ ] Animated counters + charts
- [ ] Skeleton loading / Desktop-Tablet-Mobile

### Page 57 — BOQ Management
- [ ] app/surveyor/projects/[id]/boq/page.tsx
- [ ] BOQ Plan table (original scope, quantities, unit prices, total)
- [ ] BOQ Actual table (actual quantities, actual costs)
- [ ] Variance analysis (planned vs actual, % deviation per item)
- [ ] Color-coded variance (green: within budget, amber: 5-10% over, red: >10% over)
- [ ] Variation orders list (pending / approved / rejected)
- [ ] Variation order detail (scope change, cost impact, schedule impact)
- [ ] Total project cost reconciliation (budget vs actual vs forecast)
- [ ] Desktop / Tablet / Mobile responsive

### Page 58 — Progress Claim Review
- [ ] app/surveyor/claims/[id]/page.tsx
- [ ] Vendor submitted claim details (milestone, amount, supporting docs)
- [ ] Work completed percentage (item-by-item from inspection report)
- [ ] Inspection report reference (link to Inspection Report page)
- [ ] Photo evidence review (from inspector)
- [ ] Quantity verification (claimed vs measured vs BOQ)
- [ ] Cost verification (materials, labor, equipment — line item review)
- [ ] Tax calculation preview (PPh, PPN auto-calculated)
- [ ] Recommended payout amount (calculated: approved qty × unit price - tax - retention)
- [ ] Approve / Reject / Request Revision actions
- [ ] SLA countdown (24 hours from inspection completion)
- [ ] Notes field (QS comments for homeowner)
- [ ] Desktop / Tablet / Mobile responsive

### Page 59 — Variation Order Review
- [ ] app/surveyor/variations/[id]/page.tsx
- [ ] Original scope description
- [ ] Requested change description (vendor submission)
- [ ] Cost impact analysis (additional cost breakdown)
- [ ] Schedule impact analysis (additional days)
- [ ] Supporting documents (photos, specs, quotes)
- [ ] QS assessment (justified / overpriced / unnecessary)
- [ ] Recommend: Approve / Reject / Modify
- [ ] Homeowner notification trigger (after QS recommendation)
- [ ] Desktop / Tablet / Mobile responsive

### Page 60 — Surveyor Reports
- [ ] app/surveyor/reports/page.tsx
- [ ] Project cost reports (by project, cumulative cost curve)
- [ ] Monthly valuations (work done vs claimed vs paid)
- [ ] Final accounts (project completion financial summary)
- [ ] Retention calculations (held amounts, release schedule)
- [ ] Export: PDF, Excel
- [ ] Desktop / Tablet / Mobile responsive

### Backend: Quantity Surveyor Domain
- [ ] Tables: surveyor_reports, boq_plans, boq_actuals, variation_orders, progress_claims
- [ ] Progress Claim FSM: Submitted → InspectorVerified → QSReviewed → Approved → Paid | Rejected
- [ ] Variation Order FSM: Submitted → QSReviewed → HomeownerApproved → Approved | Rejected
- [ ] APIs: GET /claims/:id, POST /claims/:id/review, POST /variations/:id/review
- [ ] Payout recommendation engine (qty × price - tax - retention)
- [ ] BOQ comparison service (plan vs actual variance calculation)
- [ ] SLA enforcement (24h countdown)
- [ ] Outbox: SurveyorApproved

---

## PHASE 21: PROPERTY INTELLIGENCE

> Transform One Home from a property marketplace into a **property intelligence platform**.
> Users should not only find a property — they should understand:
> Is it worth buying? Is it overpriced? Is the location safe? What is the investment potential?
> What is the renovation opportunity? What is the future appreciation potential?

### Property Intelligence Engine (Rule-Based Core)
- [ ] Dedicated domain: Property Intelligence Domain
- [ ] Responsibilities: Market Analysis, Location Analysis, Investment Analysis, Risk Analysis, Property Benchmarking
- [ ] Rule-Based Scoring (bukan AI): Price Score, Location Score, School Score, Hospital Score, Flood Risk, Yield Score
- [ ] All scores 0-100 with animated radial gauges
- [ ] All data cached in Redis (TTL 24h, invalidate on new data)
- [ ] All scores recalculated on data change (event-driven via Outbox)

---

### Page 61 — Property Intelligence Dashboard
- [ ] app/properties/[id]/intelligence/page.tsx (tab in property detail)
- [ ] Investment Score Card (overall 0-100, animated radial gauge, classification badge)
- [ ] Rental Yield Widget (gross/net yield %, payback period)
- [ ] ROI Projection Widget (5/10/15 year chart with 3 scenarios)
- [ ] Flood Risk Widget (risk level badge + heatmap mini)
- [ ] School Accessibility Widget (nearest schools, distance, rating stars)
- [ ] Hospital Accessibility Widget (nearest hospitals, distance, type)
- [ ] Market Trend Chart (area price trend over 5 years, interactive)
- [ ] Price Benchmark Chart (property price vs market average, position indicator)
- [ ] Neighborhood Heatmap (interactive map with score overlays)
- [ ] Rule-Based Investment Recommendation (Buy / Hold / Negotiate — based on yield and market price)
- [ ] Print / PDF Export (full intelligence report)
- [ ] Desktop / Tablet / Mobile responsive
- [ ] Skeleton loading state (per widget)

### Page 62 — Location Intelligence Detail
- [ ] app/properties/[id]/intelligence/location/page.tsx
- [ ] Location Score breakdown (each as expandable card with detail):
  - [ ] Neighborhood Score (safety, amenities, parks, malls, pasar, community vibe)
  - [ ] Walkability Score (daily needs within walking distance: minimarket, ATM, pharmacy)
  - [ ] Accessibility Score (public transport options, road access, commute time to CBD)
  - [ ] Livability Score (noise level, air quality, green space, population density)
  - [ ] Investment Score (price appreciation trend, development plans, demand growth)
  - [ ] Family Score (schools, playgrounds, safety, healthcare, community)
- [ ] Interactive map with toggle overlays per score
- [ ] Score comparison with other kelurahan/kecamatan (side-by-side)
- [ ] Nearby POI list (filterable: schools, hospitals, transport, shopping, worship)
- [ ] Desktop / Tablet / Mobile responsive

### Page 63 — Market Analysis
- [ ] app/intelligence/market/page.tsx
- [ ] City-level price trends (line chart by kecamatan/kelurahan)
- [ ] Property type comparison (price per m² by type: rumah, apartemen, ruko)
- [ ] Supply vs demand indicators (listings vs searches, demand heatmap)
- [ ] Transaction volume chart (monthly transactions by area)
- [ ] Infrastructure impact zones (properties near new MRT stations, toll exits)
- [ ] Emerging area recommendations (Rule-based: based on transaction volume growth)
- [ ] Regional comparison (Jakarta vs Bandung vs Surabaya vs Bali)
- [ ] Economic indicators overlay (GDP growth, inflation, BI rate)
- [ ] Desktop / Tablet / Mobile responsive

### Page 64 — Property Price Benchmark
- [ ] app/properties/[id]/intelligence/benchmark/page.tsx
- [ ] Property Price vs Market Price comparison:
  - [ ] Below Market (green badge — opportunity)
  - [ ] Fair Market (blue badge — correctly priced)
  - [ ] Above Market (amber badge — negotiate)
  - [ ] Premium Market (red badge — overpriced risk)
- [ ] Estimated Fair Value (Calculated average from recent nearby transactions)
- [ ] Price History chart (this property + area average, 5 year trend)
- [ ] Market Comparison table (similar properties: size, location, price, price/m²)
- [ ] Nearby Transactions list (recent sales within 2km, price, date, size)
- [ ] Price per m² ranking (within kelurahan/kecamatan)
- [ ] Desktop / Tablet / Mobile responsive

### Page 65 — Rental Yield Analysis
- [ ] app/properties/[id]/intelligence/rental/page.tsx
- [ ] Gross Rental Yield calculation (annual rental / property price × 100%)
- [ ] Net Rental Yield calculation (deduct: maintenance, tax, vacancy, management fee)
- [ ] Monthly Rental Estimate (Rule-based comparable analysis)
- [ ] Annual Rental Estimate (monthly × occupancy rate)
- [ ] Occupancy Risk score (area demand, seasonal variation, competition)
- [ ] Display:
  - [ ] Yield % (animated counter)
  - [ ] Payback Period (years to recover investment from rental)
  - [ ] Rental Demand Score (0-100, based on area search volume + listing speed)
- [ ] Rental comparison table (similar rentals in area)
- [ ] Desktop / Tablet / Mobile responsive

### Page 66 — ROI Projection
- [ ] app/properties/[id]/intelligence/roi/page.tsx
- [ ] ROI Calculation components:
  - [ ] Property Appreciation (historical trend + forecast)
  - [ ] Rental Income (projected annual rental)
  - [ ] Renovation ROI (estimated value add from renovation)
  - [ ] Total Projected ROI
- [ ] Projection timelines: 5 Year / 10 Year / 15 Year (tab toggle)
- [ ] Three scenarios chart (line chart, interactive):
  - [ ] Conservative (pessimistic market, minimal appreciation)
  - [ ] Moderate (market average growth, standard rental)
  - [ ] Aggressive (optimistic market, premium rental, renovation boost)
- [ ] Assumptions panel (adjustable: appreciation rate, rental growth, vacancy rate)
- [ ] Comparison with alternative investments (deposito, reksadana, emas, IHSG)
- [ ] Desktop / Tablet / Mobile responsive

---

### Education Intelligence
- [ ] Nearby Schools widget (in Location Intelligence):
  - [ ] School list (name, type: SD/SMP/SMA/International, distance, rating)
  - [ ] School Ratings (from government data / community reviews)
  - [ ] Distance calculation (straight-line + driving/walking time)
  - [ ] Travel Time estimation (Google Maps API or Mapbox)
  - [ ] Education Index (composite score: school density × rating × variety)
  - [ ] School Zone Heatmap (overlay on map showing school coverage)
  - [ ] Filter: public/private, level, distance radius

### Healthcare Intelligence
- [ ] Nearby Healthcare widget (in Location Intelligence):
  - [ ] Hospitals list (name, type: RS Umum/RS Khusus/Klinik/Puskesmas, distance)
  - [ ] Clinics list (24hr clinics, specialist clinics)
  - [ ] Emergency Services (nearest IGD, ambulance response estimation)
  - [ ] Travel Time estimation (to nearest hospital by car)
  - [ ] Healthcare Score (0-100: hospital density × accreditation level × distance)
  - [ ] Filter: type, accreditation, distance radius

### Flood Risk Engine
- [ ] Flood Risk widget (in Property Intelligence Dashboard):
  - [ ] Flood Risk Score (0-100)
  - [ ] Flood History (historical flood events in area, frequency, severity)
  - [ ] Elevation Data (property elevation vs area average, flood plain analysis)
  - [ ] Drainage Analysis (infrastructure quality, waterway proximity)
  - [ ] Risk Classification badge:
    - [ ] Low (score 0-25, green)
    - [ ] Moderate (score 26-50, amber)
    - [ ] High (score 51-75, orange)
    - [ ] Very High (score 76-100, red)
  - [ ] Mitigation recommendations (if high risk)
  - [ ] Data sources: BMKG, BNPB, local government

### Transportation Intelligence
- [ ] Transport Score widget (in Location Intelligence):
  - [ ] Road Access (nearest major road, distance, traffic congestion level)
  - [ ] Public Transport (MRT/KRL/TransJakarta/Angkot within 1km, routes, frequency)
  - [ ] Toll Road Access (nearest toll gate, distance, connectivity)
  - [ ] Airport Access (nearest airport, travel time)
  - [ ] Transit Score (0-100: transport density × frequency × variety)
  - [ ] Travel Time Estimation matrix:
    - [ ] To CBD (Jakarta: Sudirman/Thamrin)
    - [ ] To nearest mall
    - [ ] To nearest hospital
    - [ ] To nearest school
  - [ ] Commute time comparison (vs area average)

### Infrastructure Intelligence
- [ ] Infrastructure Score widget (in Location Intelligence):
  - [ ] Future Infrastructure projects list:
    - [ ] Road Projects (new roads, widening, flyover)
    - [ ] Transit Projects (new MRT line, LRT, KRL extension)
    - [ ] Commercial Developments (new malls, office buildings, mixed-use)
    - [ ] Government Projects (new government buildings, industrial zones)
  - [ ] Project details (name, status, estimated completion, distance from property)
  - [ ] Projected Impact analysis:
    - [ ] Expected price appreciation (%)
    - [ ] Expected demand increase
    - [ ] Construction disruption period
  - [ ] Infrastructure timeline (visual timeline of upcoming projects)

---

### Property Risk Engine
- [ ] Risk Assessment widget (in Property Intelligence Dashboard):
  - [ ] Legal Risk (certificate clarity, land dispute history, zoning compliance)
  - [ ] Flood Risk (from Flood Risk Engine above)
  - [ ] Market Risk (market volatility, oversupply risk, economic indicators)
  - [ ] Financing Risk (LTV ratio, interest rate sensitivity, affordability index)
  - [ ] Construction Risk (renovation complexity, vendor availability, material cost volatility)
  - [ ] Overall Risk Score (0-100, weighted composite)
  - [ ] Risk classification: Low / Moderate / High / Very High
  - [ ] Risk mitigation suggestions (per risk type)

### Property Opportunity Engine
- [ ] AI-powered opportunity identification:
  - [ ] Undervalued Properties (price < estimated fair value by >10%)
  - [ ] High Yield Properties (rental yield > area average by >2%)
  - [ ] High Appreciation Areas (infrastructure projects within 3km, price trend upward)
  - [ ] Renovation Opportunities (older properties in premium locations, high renovation ROI)
  - [ ] Bank Preferred Areas (high approval rate, low default risk)
  - [ ] Investment Hotspots (combination of all factors, AI-ranked)
- [ ] Opportunity alerts (email/push notification when matching properties appear)
- [ ] Personalized recommendations (based on user profile, budget, preferences)
- [ ] Opportunity feed page: app/intelligence/opportunities/page.tsx
- [ ] Desktop / Tablet / Mobile responsive

---

### Backend: Property Intelligence Domain

#### Database Tables
- [ ] property_market_scores (property_id, market_score, price_trend, demand_trend, supply_trend, transaction_volume, neighborhood_growth, infrastructure_dev, economic_indicators, calculated_at)
- [ ] property_price_history (property_id, date, price, price_per_sqm, source, transaction_type)
- [ ] property_valuations (property_id, estimated_value, confidence_interval, methodology, comparable_properties, valuated_at)
- [ ] property_roi_projections (property_id, scenario, year, appreciation, rental_income, renovation_roi, total_roi, assumptions)
- [ ] rental_yield_data (property_id, gross_yield, net_yield, monthly_estimate, annual_estimate, occupancy_risk, demand_score, calculated_at)
- [ ] location_scores (location_id, neighborhood_score, walkability_score, accessibility_score, livability_score, investment_score, family_score, calculated_at)
- [ ] school_scores (location_id, school_name, school_type, level, rating, distance_km, travel_time_min, accreditation)
- [ ] hospital_scores (location_id, hospital_name, hospital_type, accreditation, distance_km, travel_time_min, has_igd)
- [ ] flood_risk_data (location_id, flood_score, flood_history_count, elevation_m, drainage_quality, risk_classification, last_flood_date)
- [ ] transport_scores (location_id, transit_score, nearest_mrt_km, nearest_toll_km, nearest_airport_km, public_transport_count, commute_cbd_min)
- [ ] infrastructure_projects (project_id, name, type, status, distance_km, estimated_completion, projected_price_impact_pct, location_id)
- [ ] property_risk_scores (property_id, legal_risk, flood_risk, market_risk, financing_risk, construction_risk, overall_risk, classification, calculated_at)
- [ ] property_opportunity_scores (property_id, opportunity_type, score, reason, recommended_action, detected_at)

#### APIs
- [ ] GET /properties/:id/intelligence — Full intelligence report
- [ ] GET /properties/:id/scores — All scores summary
- [ ] GET /properties/:id/benchmark — Price benchmark analysis
- [ ] GET /properties/:id/rental-yield — Rental yield calculation
- [ ] GET /properties/:id/roi — ROI projection (query: scenario, years)
- [ ] GET /properties/:id/risk — Risk assessment
- [ ] GET /properties/:id/location — Location intelligence
- [ ] GET /market/trends — Market trends (query: city, kecamatan, property_type)
- [ ] GET /market/analysis — Market analysis (query: region, period)
- [ ] GET /intelligence/opportunities — AI opportunity feed (query: user preferences)

#### Score Calculation Engine
- [ ] Weighted multi-factor algorithm per score type
- [ ] Configurable weights (admin adjustable)
- [ ] Normalization layer (0-100 scale)
- [ ] Confidence interval calculation
- [ ] Score versioning (track algorithm changes)

#### Data Ingestion Pipeline
- [ ] BPS (Badan Pusat Statistik) — economic indicators, demographics
- [ ] BMKG — weather, flood history, climate data
- [ ] Kemendikbud — school data, ratings
- [ ] Kemenkes — hospital data, accreditation
- [ ] BPN — land certificate data, transaction records
- [ ] Government open data portals — infrastructure projects
- [ ] Mapbox / Google Maps — distance, travel time calculations
- [ ] Internal data — transaction history, user search patterns, listing data

#### Machine Learning Models
- [ ] Price prediction model (retrained monthly, features: location, size, type, condition, market)
- [ ] Rental yield prediction model (features: location, size, type, furnishing, area demand)
- [ ] Flood risk model (features: elevation, drainage, historical events, rainfall)
- [ ] Opportunity detection model (features: price gap, yield spread, infrastructure proximity)

#### Cache Strategy
- [ ] Redis cache per property (TTL 24h)
- [ ] Location scores cache (TTL 7 days — less volatile)
- [ ] Market trends cache (TTL 1h — more dynamic)
- [ ] Invalidation on: new transaction, new listing, score recalculation
- [ ] Warm cache on property view (pre-calculate if expired)

---

## PHASE 22: VENDOR INTELLIGENCE

> Objective reputation system for vendor trust & quality.

### Vendor Intelligence Metrics
- [ ] Quality Score (from inspection pass rate, defect rate, rework frequency)
- [ ] Trust Score (composite 0-100, weighted algorithm)
- [ ] Defect Rate (defects per project, trend over time)
- [ ] Delay Rate (% projects delayed, average delay days)
- [ ] Budget Accuracy (cost variance from BOQ, change order frequency)
- [ ] Completion Rate (% projects completed on-time)
- [ ] Dispute Rate (dispute frequency, resolution rate, escalation rate)
- [ ] Response Time (average time to respond to inquiries, bids, messages)
- [ ] Customer Satisfaction (from homeowner reviews, post-project surveys)
- [ ] Compliance Score (document completeness, tax compliance, insurance validity)
- [ ] Communication Score (update frequency, platform engagement)

### Vendor Trust Score Algorithm (composite 0-100)
- [ ] Weighted multi-factor algorithm:
  - [ ] Quality Score weight (configurable, default 25%)
  - [ ] Timeliness Score weight (configurable, default 20%)
  - [ ] Budget Score weight (configurable, default 15%)
  - [ ] Dispute Score weight (configurable, default 15%)
  - [ ] Compliance Score weight (configurable, default 10%)
  - [ ] Communication Score weight (configurable, default 10%)
  - [ ] Customer Satisfaction weight (configurable, default 5%)
- [ ] Score recalculation triggers: project completion, inspection result, dispute resolution, review submitted

### Badge System
- [ ] Verified (basic KYC + document verification complete)
- [ ] Gold (Trust Score ≥70, 5+ completed projects, 0 active disputes)
- [ ] Platinum (Trust Score ≥85, 15+ completed projects, <2% dispute rate)
- [ ] Elite (Trust Score ≥95, 30+ completed projects, 0 disputes, <3% defect rate)
- [ ] Bank Preferred (approved by ≥2 partner banks for construction financing)
- [ ] One Home Certified (passed internal certification program + site audit)

### Vendor Intelligence Frontend
- [ ] Vendor Profile: badge display (prominent badge icon + trust score)
- [ ] Vendor Detail: Intelligence tab (score breakdown radar chart, trend over time)
- [ ] Vendor Search: filter by badge level, sort by trust score
- [ ] Admin: Vendor Intelligence Dashboard:
  - [ ] Score distribution histogram
  - [ ] Flagged vendors (score drop >10 points)
  - [ ] Badge progression tracking
  - [ ] Bottom performers list (action required)
- [ ] Desktop / Tablet / Mobile responsive

### Backend: Vendor Intelligence Domain
- [ ] Tables: vendor_scores, vendor_metrics, vendor_badges, vendor_rankings, vendor_trust_history
- [ ] Score calculation engine (weighted multi-factor, configurable weights)
- [ ] Badge assignment service (automatic upgrade/downgrade based on thresholds)
- [ ] Batch recalculation (QStash 09:00 daily)
- [ ] Outbox: VendorScoreUpdated

---

## PHASE 23: LEGAL & COMPLIANCE — DIGITAL SIGNATURES

> Integrasi tanda tangan digital dan e-Meterai sesuai regulasi Indonesia (UU ITE, PP 71/2019).

### Digital Signature Integrations
- [ ] Privy integration (PSrE Level 4 certified — legally binding)
- [ ] Vida integration (alternative PSrE provider)
- [ ] Mekari Sign integration (business document workflow)
- [ ] PERURI e-Meterai integration (electronic stamp duty Rp 10.000)

### Contract Management Pages
- [ ] app/dashboard/contracts/page.tsx — Contract list
  - [ ] Filter by: project, status, type
  - [ ] Status badges: Draft, Pending Signature, Partially Signed, Completed, Expired
- [ ] Contract detail page:
  - [ ] Document viewer (inline PDF)
  - [ ] Version history (immutable, with diff highlights)
  - [ ] Signature status per party (signed / pending / expired)
  - [ ] e-Meterai status (applied / pending)
  - [ ] Audit trail (all actions logged with timestamp)
- [ ] Contract signing flow:
  - [ ] Step 1: Review document (scroll-through with checkboxes)
  - [ ] Step 2: Verify identity (OTP / biometric via PSrE)
  - [ ] Step 3: Apply digital signature (PSrE provider)
  - [ ] Step 4: Apply e-Meterai (PERURI — Rp 10.000 auto-charged)
  - [ ] Step 5: Confirmation (download signed copy)
- [ ] Admin: Contract template management (create, edit, version templates)
- [ ] Admin: Signature request management (pending, completed, expired)
- [ ] Desktop / Tablet / Mobile responsive

### Document Types Requiring Digital Signature
- [ ] SPK (Surat Perintah Kerja) — Work Order
- [ ] Kontrak Kerja Konstruksi — Construction Contract
- [ ] Addendum Kontrak — Contract Amendment
- [ ] BAST (Berita Acara Serah Terima) — Handover Certificate
- [ ] Berita Acara Pembayaran — Payment Certificate
- [ ] Surat Jaminan — Guarantee Letter
- [ ] Warranty Certificate

### Backend: Legal & Compliance Domain
- [ ] Tables: legal_documents, contract_templates, contract_versions, digital_signatures, signature_requests, emeterai_transactions, legal_audit_logs
- [ ] Contract FSM: Created → Sent → Viewed → Signed → Completed | Expired | Rejected
- [ ] PSrE API integration (Privy REST API)
- [ ] e-Meterai API integration (PERURI stamp API)
- [ ] Contract version control (immutable — new version on any edit)
- [ ] Signature verification service (validate certificate chain)
- [ ] Outbox: ContractGenerated, ContractSigned
- [ ] Audit trail (every view, sign, download logged)

---

## PHASE 24: INSURANCE DOMAIN

> Asuransi konstruksi untuk proteksi proyek dan stakeholder.

### Insurance Types (Indonesian Construction)
- [ ] CAR — Contractor All Risk (kerusakan selama masa konstruksi)
- [ ] TPL — Third Party Liability (kerusakan kepada pihak ketiga)
- [ ] Jaminan Kecelakaan Kerja (BPJS Ketenagakerjaan + additional coverage)
- [ ] Property Damage Insurance (kerusakan properti existing selama renovasi)
- [ ] Delay in Start-Up (DSU) Insurance (kerugian akibat keterlambatan)

### Insurance Pages
- [ ] app/dashboard/projects/[id]/insurance/page.tsx — Project insurance overview
  - [ ] Active policies list (type, provider, coverage, premium, validity period)
  - [ ] Coverage summary (total insured value)
  - [ ] Policy documents (download PDF)
- [ ] Policy detail page:
  - [ ] Coverage details (what's covered, exclusions, limits)
  - [ ] Premium payment status
  - [ ] Claim history
  - [ ] Validity period (start/end, days remaining)
- [ ] Claim submission form:
  - [ ] Incident date, description, estimated loss
  - [ ] Photo/video evidence upload
  - [ ] Supporting documents
  - [ ] Witness information
- [ ] Claim tracking FSM: Submitted → Under Review → Assessment → Approved → Settled | Rejected
- [ ] Admin: Insurance provider management (add/edit providers, rates, terms)
- [ ] Admin: Insurance policy oversight (all active policies, expiring soon, claims)
- [ ] Desktop / Tablet / Mobile responsive

### Backend: Insurance Domain
- [ ] Tables: insurance_providers, insurance_policies, insurance_claims, insurance_events, insurance_documents
- [ ] Insurance Policy FSM: Quoted → Issued → Active → Claimed → Settled | Expired
- [ ] Insurance Claim FSM: Submitted → UnderReview → Assessment → Approved → Settled | Rejected
- [ ] Premium calculation engine (based on project value, type, duration, risk)
- [ ] Provider integration (API or manual workflow)
- [ ] Policy expiry monitoring (QStash daily check)
- [ ] Outbox: InsuranceIssued
- [ ] Document storage (R2)

---

## PHASE 25: TAX ENGINE

> Perhitungan pajak otomatis sesuai regulasi perpajakan Indonesia untuk jasa konstruksi.

### Tax Rules (Indonesian Construction Tax)
- [ ] PPh Final Jasa Konstruksi:
  - [ ] 1.75% — Kontraktor kecil (kualifikasi kecil, SBU)
  - [ ] 2.65% — Kontraktor menengah/besar dengan SBU
  - [ ] 4% — Kontraktor tanpa SBU / tidak berkualifikasi
- [ ] PPN 11% (tarif berlaku, adjustable when rate changes)
- [ ] PPh 23 — 2% untuk jasa (non-konstruksi services)
- [ ] Withholding Tax automation (platform withholds, reports to DJP)
- [ ] Tax-exempt handling (for Vendor with specific SKB)

### Tax Engine Pages
- [ ] Admin: Tax Rules Configuration
  - [ ] app/admin/tax/rules/page.tsx
  - [ ] Tax rate table (editable by admin, effective date, expiry)
  - [ ] Vendor qualification categories (maps to tax rate)
  - [ ] Special rules (exemptions, reduced rates)
- [ ] Admin: Tax Reports Dashboard
  - [ ] app/admin/tax/reports/page.tsx
  - [ ] Monthly tax summary (total PPh withheld, total PPN collected)
  - [ ] Per-vendor tax report (NPWP, total payments, total tax withheld)
  - [ ] Tax filing preparation (export format for DJP e-filing)
  - [ ] Bukti Potong generation (PPh 4(2) / PPh 23)
- [ ] Project: Tax Summary (integrated in project finance page)
  - [ ] Tax breakdown per milestone payment
  - [ ] Cumulative tax for project
- [ ] Vendor: Tax Withholding Summary (integrated in vendor payment page)
  - [ ] Monthly tax withheld
  - [ ] Annual tax summary
  - [ ] Bukti Potong download
- [ ] Invoice: Auto-calculate tax on each payment
  - [ ] Pre-tax amount
  - [ ] PPh calculation
  - [ ] PPN calculation
  - [ ] Net payable amount

### Backend: Tax Engine Domain
- [ ] Tables: tax_rules, tax_profiles, tax_transactions, tax_calculations, tax_reports, tax_withholdings
- [ ] Tax calculation service:
  - [ ] Input: vendor_id, amount, service_type
  - [ ] Output: pph_amount, ppn_amount, net_amount, effective_rate
- [ ] Vendor tax profile management (NPWP, SBU qualification, applicable rate)
- [ ] Bukti Potong generation service (PDF with official format)
- [ ] Tax report generation (monthly, annual, per-vendor)
- [ ] Outbox: TaxCalculated
- [ ] Integration with Ledger domain (tax journal entries: debit tax payable, credit bank)

---

## PHASE 26: SLA ENGINE

> Time-bound workflow enforcement untuk semua proses kritis di platform.

### SLA Rules Configuration
- [ ] Inspection SLA: 48 Hours (from assignment to completion)
- [ ] QS Review SLA: 24 Hours (from inspection completion to QS review)
- [ ] Homeowner Review SLA: 72 Hours (from QS approval to homeowner decision)
- [ ] Dispute Response SLA: 24 Hours (from dispute creation to first response)
- [ ] Retention Release SLA: 30 Days (from warranty end to fund release)
- [ ] Bid Response SLA: 7 Days (from tender publication to bid deadline)
- [ ] Vendor Onboarding SLA: 5 Business Days (from submission to verification complete)
- [ ] Bank Loan Review SLA: 14 Days (from application to decision)
- [ ] Escrow Release SLA: 3 Business Days (after dual approval)

### SLA Engine Implementation
- [ ] SLA configuration table: entity_type, action, duration_hours, warning_threshold_%, escalation_rules (JSONB)
- [ ] SLA tracking service:
  - [ ] Start SLA timer (on trigger event)
  - [ ] Check SLA status (active, warning, breached)
  - [ ] Cancel SLA (on completion or cancellation)
- [ ] SLA countdown (Redis TTL for fast lookup + QStash for escalation triggers)
- [ ] Escalation chain:
  - [ ] Level 1: Warning notification to assignee (75% time elapsed)
  - [ ] Level 2: Notification to supervisor/admin (100% time elapsed — SLA breached)
  - [ ] Level 3: Auto-escalation to next-level admin (125% time elapsed)
  - [ ] Level 4: System alert + auto-action option (150% time elapsed)
- [ ] Business hours calculation (exclude weekends, Indonesian public holidays)

### SLA Dashboard (Admin)
- [ ] app/admin/sla/page.tsx
- [ ] SLA compliance rate (% on-time, by type)
- [ ] Active SLAs (countdown timers, status badges)
- [ ] Breached SLAs list (with details, assignee, elapsed time)
- [ ] Average resolution time (by SLA type)
- [ ] Trend charts (monthly compliance trend, breach trend)
- [ ] Escalation log (all escalations with resolution)
- [ ] SLA configuration editor (admin can adjust durations)
- [ ] Desktop / Tablet / Mobile responsive

### SLA Indicators (Integrated into existing pages)
- [ ] Countdown timer badge on inspection assignments
- [ ] Countdown timer badge on QS review queue
- [ ] Countdown timer badge on homeowner approval pending
- [ ] Warning banner when SLA at 75%
- [ ] Red alert banner when SLA breached

---

## PHASE 27: DATA WAREHOUSE & BI (MVP)

> Create a lean analytics platform for MVP operational monitoring and metrics.
> Belum perlu BigQuery. Gunakan PostgreSQL Materialized Views + Metabase + PostHog.

### Architecture (PostgreSQL → Materialized Views → Metabase)
- [ ] Operational Systems (PostgreSQL OLTP)
- [ ] ↓ PostgreSQL Materialized Views (Scheduled Refresh)
- [ ] ↓ Metabase (Self-hosted BI Dashboards)

### Analytics Stack
- [ ] PostHog: Funnels, User Journey, Product Analytics (SaaS free tier)
- [ ] Metabase: Executive Reporting, GMV, Escrow Tracking (Self-hosted on VPS)

### MVP Dashboards (Metabase)
- [ ] Executive: GMV, Active Users, Active Vendors, Revenue
- [ ] Finance: Escrow Balance, Platform Fees, Outstanding Payables
- [ ] Operational: Inspection Pass Rate, Dispute Count, SLA Breaches

---

### Data Governance
- [ ] Role Based Access (dashboard access per role: CEO, CFO, COO, Admin, Analyst)
- [ ] Audit Logging (all data access logged with user, timestamp, query)
- [ ] Data Retention (raw: 7 years, aggregated: indefinite, PII: per PDP Law)
- [ ] Data Lineage (trace data from source → transformation → dashboard)
- [ ] PII Protection (mask/hash sensitive fields: KTP, NPWP, phone, email)
- [ ] Data Encryption (at rest: AES-256, in transit: TLS 1.3)
- [ ] Regulatory Compliance:
  - [ ] OJK Ready (financial reporting standards)
  - [ ] PDP Law Ready (Indonesian Personal Data Protection)
  - [ ] Enterprise Reporting Ready (auditor-friendly exports)

### Future Goal
- [ ] One Home should evolve into: Indonesia's largest property intelligence, construction intelligence, and construction finance data platform
- [ ] The marketplace becomes the acquisition engine
- [ ] The data platform becomes the moat

---

## PHASE 28: OBSERVABILITY & MONITORING (MVP)

> Lean observability stack for MVP reliability.

### Error & Uptime Tracking
- [ ] Sentry (Error tracking for Next.js & NestJS)
- [ ] Uptime Kuma (Self-hosted uptime monitoring)

### Metrics & Dashboards
- [ ] Grafana (Basic VPS metrics: CPU, Memory, Disk, Network)
- [ ] Basic Postgres & Redis monitoring
- [ ] Dashboard for Outbox processing health

### Alerting
- [ ] Alert channels: Slack (engineering), WhatsApp (on-call)
- [ ] Simple threshold alerts (e.g. CPU > 80%, Error Rate > 5%)
- [ ] Incident management workflow (detect → triage → resolve)

---

## COMPETITIVE MOAT

> The marketplace acquires users.
> The intelligence platform creates defensibility.
> The bank integration creates trust.
> The inspection network creates quality assurance.
> Together they form One Home's long-term moat.

### Moat Components
- [ ] Property Intelligence (Rule-based property insights no competitor has)
- [ ] Construction Intelligence (Rule-based vendor scoring, project analytics)
- [ ] Inspection Network (Independent QA creates trust for all parties)
- [ ] Vendor Trust Score (Objective reputation system banks can rely on)
- [ ] Bank Escrow Integration (Host-to-host with major Indonesian banks)
- [ ] Indonesia Cost Intelligence (AHSP/HSPK-based pricing engine)

### MVP Execution Advantage
- [ ] Speed to Market: Launch in 6-9 months
- [ ] Lean Infrastructure: < Rp 2.000.000 / bulan
- [ ] Positive Unit Economics from Day 1

### Strategic Evolution
- [ ] Phase 1: Marketplace (acquire users, properties, vendors)
- [ ] Phase 2: Intelligence (differentiate with data insights)
- [ ] Phase 3: Finance (construction finance with bank partnerships)
- [ ] Phase 4: Data Platform (become the industry standard for property + construction data)

---

## ESTIMATED MONTHLY COST

### Infrastructure MVP
- [ ] Cloudflare: Rp 0
- [ ] Frontend: Rp 0
- [ ] App VPS: Rp 400.000
- [ ] DB VPS: Rp 400.000
- [ ] Cloudflare R2: Rp 50.000
- [ ] Monitoring: Rp 0
- [ ] PostHog: Rp 0

### Total Cost
- [ ] **Rp 850.000 - Rp 1.500.000 / bulan**
