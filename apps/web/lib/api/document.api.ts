import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ENDPOINTS } from '@/lib/api-client';
import type { MediaAsset, MediaUploadResponse } from '@/types/media';
import type { Document, DocumentFolder } from '@/types/document';

// Media hooks
export const mediaKeys = {
  all: ['media'] as const,
  assets: (ownerId: string) => [...mediaKeys.all, 'assets', ownerId] as const,
};

export function useMediaAssets(ownerId: string) {
  return useQuery({
    queryKey: mediaKeys.assets(ownerId),
    queryFn: () => api.get<MediaAsset[]>(ENDPOINTS.MEDIA.ASSETS, { owner_id: ownerId }),
    enabled: !!ownerId,
  });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'}${ENDPOINTS.MEDIA.UPLOAD}`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type — browser sets multipart/form-data boundary
      });
      if (!response.ok) throw new Error('Upload failed');
      return response.json() as Promise<MediaUploadResponse>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.all });
    },
  });
}

// Document hooks
export const documentKeys = {
  all: ['documents'] as const,
  folders: () => [...documentKeys.all, 'folders'] as const,
  files: (folderId: string) => [...documentKeys.all, 'files', folderId] as const,
  versions: (docId: string) => [...documentKeys.all, 'versions', docId] as const,
};

export function useFolders() {
  return useQuery({
    queryKey: documentKeys.folders(),
    queryFn: () => api.get<DocumentFolder[]>(ENDPOINTS.DOCUMENT.FOLDERS),
  });
}

export function useDocuments(folderId: string) {
  return useQuery({
    queryKey: documentKeys.files(folderId),
    queryFn: () => api.get<Document[]>(ENDPOINTS.DOCUMENT.FILES, { folder_id: folderId }),
    enabled: !!folderId,
  });
}

export function useDocumentVersions(docId: string) {
  return useQuery({
    queryKey: documentKeys.versions(docId),
    queryFn: () => api.get<Document[]>(ENDPOINTS.DOCUMENT.VERSIONS(docId)),
    enabled: !!docId,
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'}${ENDPOINTS.DOCUMENT.UPLOAD}`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKeys.all });
    },
  });
}
