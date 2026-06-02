import { z } from 'zod';

/* ============================================
   Project Validation Schemas
   ============================================ */

export const DailyReportSchema = z.object({
  project_id: z.string().min(1),
  milestone_id: z.string().min(1, 'Pilih milestone'),
  date: z.string().min(1, 'Pilih tanggal'),
  summary: z.string().min(10, 'Ringkasan minimal 10 karakter').max(500),
  tasks_completed: z.array(z.string()).min(1, 'Masukkan minimal 1 tugas selesai'),
  tasks_planned: z.array(z.string()).optional(),
  issues: z.array(z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
  })).optional(),
  worker_count: z.number().min(0, 'Jumlah pekerja tidak boleh negatif'),
  weather: z.string().optional(),
});

export const MilestoneUpdateSchema = z.object({
  milestone_id: z.string().min(1),
  status: z.enum(['pending', 'active', 'completed', 'delayed', 'disputed']),
  progress_percentage: z.number().min(0).max(100),
  notes: z.string().optional(),
});

export type DailyReportData = z.infer<typeof DailyReportSchema>;
export type MilestoneUpdateData = z.infer<typeof MilestoneUpdateSchema>;
