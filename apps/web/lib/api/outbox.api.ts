import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { OutboxEvent, OutboxMetrics, DeadLetterEntry, EventConsumerStatus, SchedulerJob } from '@/types/outbox';

/* ============================================
   Outbox & Event System API Hooks (Admin Only)
   Rule 8 — Outbox Pattern Monitoring
   ============================================ */

// --- Outbox Events ---
export function useOutboxEvents(filters?: { status?: string; event_name?: string; limit?: number }) {
  return useQuery({
    queryKey: ['outbox-events', filters],
    queryFn: () => api.get<OutboxEvent[]>('/api/admin/outbox/events', filters),
    refetchInterval: 5000, // poll every 5s for live monitoring
  });
}

// --- Outbox Metrics ---
export function useOutboxMetrics() {
  return useQuery({
    queryKey: ['outbox-metrics'],
    queryFn: () => api.get<OutboxMetrics>('/api/admin/outbox/metrics'),
    refetchInterval: 10000, // poll every 10s
  });
}

// --- Dead Letter Queue ---
export function useDeadLetterQueue(filters?: { event_name?: string; limit?: number }) {
  return useQuery({
    queryKey: ['dead-letter-queue', filters],
    queryFn: () => api.get<DeadLetterEntry[]>('/api/admin/outbox/dead-letter', filters),
    refetchInterval: 15000,
  });
}

export function useRetryDeadLetter() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (entryId: string) =>
      api.post(`/api/admin/outbox/dead-letter/${entryId}/retry`, {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dead-letter-queue'] });
      qc.invalidateQueries({ queryKey: ['outbox-metrics'] });
    },
  });
}

export function usePurgeDeadLetter() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (entryId: string) =>
      api.delete(`/api/admin/outbox/dead-letter/${entryId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dead-letter-queue'] });
      qc.invalidateQueries({ queryKey: ['outbox-metrics'] });
    },
  });
}

// --- Event Consumers ---
export function useEventConsumers() {
  return useQuery({
    queryKey: ['event-consumers'],
    queryFn: () => api.get<EventConsumerStatus[]>('/api/admin/outbox/consumers'),
    refetchInterval: 10000,
  });
}

// --- QStash Schedulers ---
export function useSchedulerJobs() {
  return useQuery({
    queryKey: ['scheduler-jobs'],
    queryFn: () => api.get<SchedulerJob[]>('/api/admin/schedulers'),
  });
}

export function useToggleSchedulerJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, active }: { jobId: string; active: boolean }) =>
      api.patch(`/api/admin/schedulers/${jobId}`, { is_active: active }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['scheduler-jobs'] });
    },
  });
}

export function useTriggerSchedulerJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (jobId: string) =>
      api.post(`/api/admin/schedulers/${jobId}/trigger`, {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['scheduler-jobs'] });
    },
  });
}
