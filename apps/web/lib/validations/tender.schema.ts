import { z } from 'zod';

/* ============================================
   Tender Wizard — Zod Schemas per Step
   ============================================ */

// Step 1: Property Selection
export const PropertyStepSchema = z.object({
  property_id: z.string().min(1, 'Pilih properti'),
  property_address: z.string().min(1, 'Alamat properti diperlukan'),
  property_type: z.string().min(1, 'Pilih tipe properti'),
  property_size: z.number().min(1, 'Masukkan luas properti'),
  property_condition: z.enum(['new', 'good', 'needs_repair', 'renovation_required'], {
    error: 'Pilih kondisi properti',
  }),
});

// Step 2: Project Scope
export const ScopeStepSchema = z.object({
  project_name: z.string().min(3, 'Nama proyek minimal 3 karakter').max(100),
  description: z.string().min(20, 'Deskripsi minimal 20 karakter').max(2000),
  categories: z.array(z.string()).min(1, 'Pilih minimal 1 kategori'),
  sub_specifications: z.record(z.string(), z.array(z.string())).optional(),
});

// Step 3: File Upload
export const FilesStepSchema = z.object({
  photos: z.array(z.object({
    name: z.string(),
    size: z.number().max(10 * 1024 * 1024, 'Maks 10MB per file'),
    type: z.string(),
  })).optional(),
  floor_plans: z.array(z.object({
    name: z.string(),
    size: z.number().max(10 * 1024 * 1024),
    type: z.string(),
  })).optional(),
  reference_designs: z.array(z.object({
    name: z.string(),
    size: z.number().max(10 * 1024 * 1024),
    type: z.string(),
  })).optional(),
});

// Step 4: Budget & Timeline (base)
const BudgetStepBaseSchema = z.object({
  budget_min: z.number().min(1_000_000, 'Budget minimum Rp 1 juta'),
  budget_max: z.number().min(1_000_000, 'Budget maksimum Rp 1 juta'),
  start_date: z.string().min(1, 'Pilih tanggal mulai'),
  target_completion_date: z.string().min(1, 'Pilih tanggal target selesai'),
  priority: z.enum(['normal', 'urgent', 'critical']).default('normal'),
});

export const BudgetStepSchema = BudgetStepBaseSchema.refine(data => data.budget_max > data.budget_min, {
  message: 'Budget maksimum harus lebih besar dari minimum',
  path: ['budget_max'],
});

// Step 5: Vendor Selection (base)
const VendorStepBaseSchema = z.object({
  selected_vendor_ids: z.array(z.string()).optional(),
  open_to_marketplace: z.boolean().default(false),
});

export const VendorStepSchema = VendorStepBaseSchema.refine(data => (data.selected_vendor_ids && data.selected_vendor_ids.length > 0) || data.open_to_marketplace, {
  message: 'Pilih minimal 1 vendor atau buka ke marketplace',
  path: ['selected_vendor_ids'],
});

// Step 6: Review (no additional validation, just read-only)
export const ReviewStepSchema = z.object({
  confirmed: z.boolean().refine(v => v === true, 'Konfirmasi data sudah benar'),
});

// Full form schema (composite) — uses base schemas to avoid .innerType()
export const CreateTenderSchema = PropertyStepSchema
  .merge(ScopeStepSchema)
  .merge(FilesStepSchema)
  .merge(BudgetStepBaseSchema)
  .merge(VendorStepBaseSchema);

export type CreateTenderFormData = z.infer<typeof CreateTenderSchema>;
export type PropertyStepData = z.infer<typeof PropertyStepSchema>;
export type ScopeStepData = z.infer<typeof ScopeStepSchema>;
export type FilesStepData = z.infer<typeof FilesStepSchema>;
export type BudgetStepData = z.infer<typeof BudgetStepBaseSchema>;
export type VendorStepData = z.infer<typeof VendorStepBaseSchema>;
