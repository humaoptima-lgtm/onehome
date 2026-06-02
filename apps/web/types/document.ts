/* ============================================
   Document Vault Types — Indonesia First
   ============================================ */

/**
 * Indonesian property & business document categories
 * NEVER use foreign document assumptions
 */
export type DocumentCategory =
  | 'sertifikat'     // SHM, SHGB, HGB, Strata Title
  | 'akta'           // AJB, PPJB
  | 'izin'           // IMB, PBG, SLF
  | 'kpr'            // KPR documents
  | 'kontrak'        // SPK, Kontrak Kerja
  | 'rab'            // RAB (Rencana Anggaran Biaya)
  | 'bast'           // BAST (Berita Acara Serah Terima)
  | 'pajak'          // PPN, PPh, BPHTB receipts
  | 'kyc'            // KTP, NPWP, KK, Slip Gaji
  | 'vendor'         // NIB, SIUP, Akta Perusahaan
  | 'gambar'         // Site Plan, Drawing
  | 'garansi'        // Warranty Letter
  | 'lainnya';       // Other

/**
 * Indonesian KYC document types
 */
export type KYCDocumentType =
  | 'ktp'                    // Kartu Tanda Penduduk
  | 'npwp'                   // Nomor Pokok Wajib Pajak
  | 'kk'                     // Kartu Keluarga
  | 'rekening-koran'         // Bank Statement
  | 'slip-gaji'              // Salary Slip
  | 'surat-keterangan-kerja' // Employment Certificate
  | 'dokumen-properti';      // Property Documents

/**
 * Indonesian property document types
 */
export type PropertyDocumentType =
  | 'shm'       // Sertifikat Hak Milik
  | 'shgb'      // Sertifikat Hak Guna Bangunan
  | 'ajb'       // Akta Jual Beli
  | 'ppjb'      // Perjanjian Pengikatan Jual Beli
  | 'imb'       // Izin Mendirikan Bangunan
  | 'pbg'       // Persetujuan Bangunan Gedung
  | 'slf'       // Sertifikat Laik Fungsi
  | 'site-plan' // Site Plan
  | 'drawing'   // Drawing / Gambar Kerja
  | 'rab'       // Rencana Anggaran Biaya
  | 'spk'       // Surat Perintah Kerja
  | 'bast'      // Berita Acara Serah Terima
  | 'garansi';  // Warranty Letter / Surat Garansi

export interface DocumentFolder {
  id: string;
  name: string;
  parent_id?: string;
  owner_id: string;
  category?: DocumentCategory;
  document_count: number;
  created_at: string;
}

export interface Document {
  id: string;
  folder_id: string;
  name: string;
  media_asset_id: string;
  url: string;
  mime_type: string;
  size_bytes: number;
  version: number;
  tags: string[];
  uploaded_by: string;
  shared_with: string[];
  versions: DocumentVersion[];
  created_at: string;
  updated_at: string;
}

export interface DocumentVersion {
  id: string;
  document_id: string;
  version: number;
  media_asset_id: string;
  url: string;
  size_bytes: number;
  uploaded_by: string;
  change_note?: string;
  created_at: string;
}

export interface DigitalSignature {
  id: string;
  document_id: string;
  signer_id: string;
  signer_name: string;
  status: 'pending' | 'signed' | 'rejected' | 'expired';
  signed_at?: string;
  ip_address?: string;
  created_at: string;
}
