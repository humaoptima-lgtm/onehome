import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Notification } from '@/types/notification';
import type { PaginatedResponse } from '@/types/common';

/* ============================================
   Notification Domain API Hooks
   Channels: Resend (email) + WhatsApp Business + Firebase FCM + In-App
   ============================================ */

export function useNotifications(filters?: { unread_only?: boolean; type?: string; limit?: number }) {
  return useQuery({
    queryKey: ['notifications', filters],
    queryFn: () => api.get<PaginatedResponse<Notification>>('/api/notifications', filters),
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: () => api.get<{ count: number }>('/api/notifications/unread-count'),
    refetchInterval: 30000, // poll every 30s
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) =>
      api.patch(`/api/notifications/${notificationId}/read`, {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

export function useMarkAllRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.patch('/api/notifications/read-all', {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

export function useDeleteNotification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) =>
      api.delete(`/api/notifications/${notificationId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
