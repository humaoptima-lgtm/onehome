/* ============================================
   User & Auth Types
   ============================================ */

export type UserRole = 
  | 'homeowner' 
  | 'vendor' 
  | 'agent' 
  | 'developer' 
  | 'bank_officer' 
  | 'admin' 
  | 'super_admin';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfile extends User {
  address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  nik_encrypted?: string;   // AES-256 encrypted
  npwp_encrypted?: string;  // AES-256 encrypted
}

export interface Permission {
  id: string;
  role: UserRole;
  resource: string; // 'tender', 'project', 'escrow', 'admin', etc.
  action: 'create' | 'read' | 'update' | 'delete' | 'approve' | 'reject';
  conditions?: Record<string, unknown>; // e.g., { own_only: true }
}

export interface Session {
  id: string;
  user_id: string;
  device_id: string;
  ip_address: string;
  user_agent: string;
  is_active: boolean;
  last_activity_at: string;
  expires_at: string;
  created_at: string;
}

export interface Device {
  id: string;
  user_id: string;
  device_type: 'web' | 'mobile' | 'tablet';
  device_name: string;
  os: string;
  browser?: string;
  push_token?: string; // Firebase FCM token
  is_trusted: boolean;
  last_used_at: string;
  created_at: string;
}
