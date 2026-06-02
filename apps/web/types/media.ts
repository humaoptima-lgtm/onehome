/* ============================================
   Media Asset Types — Cloudflare R2 Storage
   ============================================ */

export type MediaOwnerType = 'property' | 'vendor' | 'tender' | 'project' | 'user' | 'design' | 'document';

export interface MediaAsset {
  id: string;
  file_name: string;
  bucket_url: string;
  thumbnail_url: string;
  mime_type: string;
  size_bytes: number;
  owner_type: MediaOwnerType;
  owner_id: string;
  created_at: string;
}

export interface MediaUploadRequest {
  file: File;
  owner_type: MediaOwnerType;
  owner_id: string;
  generate_thumbnail?: boolean;
}

export interface MediaUploadResponse {
  asset: MediaAsset;
  upload_url: string; // pre-signed URL for direct R2 upload
}
