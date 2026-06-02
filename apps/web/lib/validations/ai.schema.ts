import { z } from 'zod';

/* ============================================
   AI Domain Validation Schemas
   ============================================ */

export const AIDesignRequestSchema = z.object({
  room_type: z.enum(['living_room', 'bedroom', 'kitchen', 'bathroom', 'dining_room', 'home_office', 'balcony', 'outdoor'], {
    error: 'Pilih tipe ruangan',
  }),
  style: z.enum(['minimalist', 'japandi', 'scandinavian', 'industrial', 'modern_luxury', 'tropical', 'contemporary', 'classic'], {
    error: 'Pilih gaya desain',
  }),
  intensity: z.number().min(0).max(100).default(50),
  source_image_url: z.string().min(1, 'Upload foto ruangan'),
  source_media_asset_id: z.string().min(1),
  reference_image_urls: z.array(z.string()).optional(),
  additional_instructions: z.string().max(500).optional(),
});

export const AICostEstimationSchema = z.object({
  location: z.string().min(1, 'Pilih lokasi'),
  area_sqm: z.number().min(1, 'Masukkan luas area').max(10000),
  property_age: z.number().min(0, 'Umur properti tidak valid').max(100),
  condition: z.enum(['new', 'good', 'needs_repair', 'renovation_required'], {
    error: 'Pilih kondisi properti',
  }),
  design_style: z.enum(['minimalist', 'japandi', 'scandinavian', 'industrial', 'modern_luxury', 'tropical', 'contemporary', 'classic'], {
    error: 'Pilih gaya desain',
  }),
  scopes: z.array(z.object({
    category: z.string().min(1, 'Pilih kategori'),
    area_sqm: z.number().min(1, 'Masukkan luas area'),
    material_grade: z.enum(['economy', 'standard', 'premium', 'luxury']),
  })).min(1, 'Pilih minimal 1 scope renovasi'),
});

export type AIDesignRequestFormData = z.infer<typeof AIDesignRequestSchema>;
export type AICostEstimationFormData = z.infer<typeof AICostEstimationSchema>;
