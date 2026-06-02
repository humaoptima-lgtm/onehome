import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { MediaAsset, MediaUploadResponse } from '@/types/media';

/* ============================================
   Media Domain API Hooks
   All files stored in Cloudflare R2
   ============================================ */

export function useMediaAssets(filters?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: ['media-assets', filters],
    queryFn: () => api.get<MediaAsset[]>('/media/assets', filters),
  });
}

export function useMediaAsset(assetId: string) {
  return useQuery({
    queryKey: ['media-assets', assetId],
    queryFn: () => api.get<MediaAsset>(`/media/assets/${assetId}`),
    enabled: !!assetId,
  });
}

export function useUploadMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { file_name: string; owner_type: string; owner_id: string; folder?: string; mime_type: string; size_bytes: number }) =>
      api.post<MediaUploadResponse>('/media/upload', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['media-assets'] });
    },
  });
}

export function useDeleteMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (assetId: string) => api.delete(`/media/assets/${assetId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['media-assets'] });
    },
  });
}
