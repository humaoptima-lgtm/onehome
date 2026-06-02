import { z } from 'zod';

/* ============================================
   Common Validation Schemas
   ============================================ */

export const AddressSchema = z.object({
  street: z.string().min(5, 'Masukkan alamat jalan'),
  city: z.string().min(1, 'Pilih kota'),
  province: z.string().min(1, 'Pilih provinsi'),
  postal_code: z.string().min(5, 'Kode pos harus 5 digit').max(5),
  country: z.string().default('ID'),
});

export const FileUploadSchema = z.object({
  name: z.string(),
  size: z.number().max(10 * 1024 * 1024, 'Maksimal 10MB'),
  type: z.string().refine(
    (t) => ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(t),
    'Tipe file tidak didukung (JPG, PNG, WebP, PDF, DOC)'
  ),
});

export const DateRangeSchema = z.object({
  start_date: z.string().min(1, 'Pilih tanggal mulai'),
  end_date: z.string().min(1, 'Pilih tanggal selesai'),
}).refine(data => new Date(data.end_date) > new Date(data.start_date), {
  message: 'Tanggal selesai harus setelah tanggal mulai',
  path: ['end_date'],
});

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  per_page: z.number().min(1).max(100).default(20),
  sort_by: z.string().optional(),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  password: z.string().min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Harus mengandung huruf besar')
    .regex(/[0-9]/, 'Harus mengandung angka'),
  confirm_password: z.string(),
  role: z.enum(['homeowner', 'vendor']).default('homeowner'),
  agreed_to_terms: z.boolean().refine(v => v === true, 'Harus menyetujui syarat dan ketentuan'),
}).refine(data => data.password === data.confirm_password, {
  message: 'Password tidak cocok',
  path: ['confirm_password'],
});

export type AddressData = z.infer<typeof AddressSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type PaginationData = z.infer<typeof PaginationSchema>;
