import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ENDPOINTS } from '@/lib/api-client';
import type { Notification } from '@/types/notification';
import type { AuditLog, DashboardMetrics, AnalyticsReport } from '@/types/audit';
import type { User } from '@/types/user';

// Notification hooks
export const notificationKeys = {
  all: ['notifications'] as const,
  list: () => [...notificationKeys.all, 'list'] as const,
};

export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: () => api.get<Notification[]>(ENDPOINTS.NOTIFICATION.LIST),
    placeholderData: [],
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(ENDPOINTS.NOTIFICATION.MARK_READ(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
    },
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.patch(ENDPOINTS.NOTIFICATION.MARK_ALL_READ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
    },
  });
}

// Admin hooks
export const adminKeys = {
  all: ['admin'] as const,
  dashboard: () => [...adminKeys.all, 'dashboard'] as const,
  users: (filters: Record<string, unknown>) => [...adminKeys.all, 'users', filters] as const,
  auditLogs: (filters: Record<string, unknown>) => [...adminKeys.all, 'audit-logs', filters] as const,
  analytics: (period: string) => [...adminKeys.all, 'analytics', period] as const,
  kpi: () => [...adminKeys.all, 'kpi'] as const,
};

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: () => api.get<DashboardMetrics>(ENDPOINTS.ADMIN.DASHBOARD),
  });
}

export function useAdminUsers(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: adminKeys.users(filters || {}),
    queryFn: () => api.get<User[]>(ENDPOINTS.ADMIN.USERS, filters as Record<string, string>),
    placeholderData: [],
  });
}

export function useAuditLogs(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: adminKeys.auditLogs(filters || {}),
    queryFn: () => api.get<AuditLog[]>(ENDPOINTS.ADMIN.AUDIT_LOGS, filters as Record<string, string>),
    placeholderData: [],
  });
}

export function useAnalytics(period: string = 'monthly') {
  return useQuery({
    queryKey: adminKeys.analytics(period),
    queryFn: () => api.get<AnalyticsReport>(ENDPOINTS.ADMIN.ANALYTICS, { period }),
  });
}

export function useKPIs() {
  return useQuery({
    queryKey: adminKeys.kpi(),
    queryFn: () => api.get<DashboardMetrics>(ENDPOINTS.ADMIN.KPI),
  });
}
