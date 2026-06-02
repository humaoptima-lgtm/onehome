/* ============================================
   Notification Types
   ============================================ */

export type NotificationType = 
  | 'bid_received'
  | 'bid_accepted' 
  | 'bid_rejected'
  | 'tender_update'
  | 'project_update'
  | 'milestone_completed'
  | 'payment_due'
  | 'payment_received'
  | 'disbursement_completed'
  | 'message_received'
  | 'document_shared'
  | 'verification_update'
  | 'system';

export type NotificationChannel = 'in_app' | 'email' | 'whatsapp' | 'push';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  channels: NotificationChannel[];
  is_read: boolean;
  action_url?: string; // deep link to relevant page
  metadata?: Record<string, unknown>;
  created_at: string;
  read_at?: string;
}

/* --- Channel-Specific Logs --- */

export interface NotificationLog {
  id: string;
  notification_id: string;
  channel: NotificationChannel;
  status: 'queued' | 'sent' | 'delivered' | 'failed' | 'bounced';
  error_message?: string;
  sent_at?: string;
  delivered_at?: string;
  created_at: string;
}

export interface EmailLog extends NotificationLog {
  channel: 'email';
  provider: 'resend';
  to_email: string;
  subject: string;
  resend_id?: string;
  opened_at?: string;
  clicked_at?: string;
}

export interface WhatsAppLog extends NotificationLog {
  channel: 'whatsapp';
  provider: 'meta';
  to_phone: string;
  template_name?: string;
  waba_message_id?: string;
  read_at?: string;
}

export interface PushLog extends NotificationLog {
  channel: 'push';
  provider: 'firebase';
  device_token: string;
  fcm_message_id?: string;
  platform: 'web' | 'android' | 'ios';
}
