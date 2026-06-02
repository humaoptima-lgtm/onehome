import { z } from 'zod';

/* ============================================
   Vendor Onboarding Validation Schema
   ============================================ */

export const VendorBusinessInfoSchema = z.object({
  company_name: z.string().min(3, 'Nama perusahaan minimal 3 karakter'),
  address: z.string().min(10, 'Masukkan alamat lengkap'),
  city: z.string().min(1, 'Pilih kota'),
  province: z.string().min(1, 'Pilih provinsi'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit').max(15),
  email: z.string().email('Email tidak valid'),
  website: z.string().url('URL website tidak valid').optional().or(z.literal('')),
});

export const VendorCoverageSchema = z.object({
  coverage_areas: z.array(z.string()).min(1, 'Pilih minimal 1 area layanan'),
});

export const VendorServiceSchema = z.object({
  service_categories: z.array(z.string()).min(1, 'Pilih minimal 1 kategori layanan'),
  specializations: z.array(z.string()).optional(),
});

export const VendorPortfolioSchema = z.object({
  portfolio_items: z.array(z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    before_photo: z.string().optional(),
    after_photo: z.string().optional(),
  })).min(1, 'Upload minimal 1 proyek portfolio'),
});

export const VendorLicenseSchema = z.object({
  licenses: z.array(z.object({
    type: z.string().min(1, 'Pilih jenis izin'),
    number: z.string().min(1, 'Masukkan nomor izin'),
    expiry_date: z.string().min(1, 'Masukkan tanggal kedaluwarsa'),
    document_url: z.string().optional(),
  })).optional(),
  certifications: z.array(z.string()).optional(),
});

export const VendorTaxSchema = z.object({
  npwp: z.string().min(15, 'NPWP harus 15 digit').max(20), // will be encrypted
  tax_registered: z.boolean().default(false),
});

export const VendorBankSchema = z.object({
  bank_code: z.string().min(1, 'Pilih bank'),
  account_number: z.string().min(8, 'Nomor rekening minimal 8 digit').max(20), // will be encrypted
  account_holder_name: z.string().min(3, 'Masukkan nama pemilik rekening'),
});

export type VendorBusinessInfoData = z.infer<typeof VendorBusinessInfoSchema>;
export type VendorCoverageData = z.infer<typeof VendorCoverageSchema>;
export type VendorServiceData = z.infer<typeof VendorServiceSchema>;
export type VendorPortfolioData = z.infer<typeof VendorPortfolioSchema>;
export type VendorLicenseData = z.infer<typeof VendorLicenseSchema>;
export type VendorTaxData = z.infer<typeof VendorTaxSchema>;
export type VendorBankData = z.infer<typeof VendorBankSchema>;
