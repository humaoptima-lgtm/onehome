import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ENDPOINTS } from '@/lib/api-client';
import type { Project, Milestone, DailyReport, ProjectPhoto } from '@/types/project';

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...projectKeys.lists(), filters] as const,
  detail: (id: string) => [...projectKeys.all, 'detail', id] as const,
  milestones: (id: string) => [...projectKeys.all, 'milestones', id] as const,
  reports: (id: string) => [...projectKeys.all, 'reports', id] as const,
  photos: (id: string) => [...projectKeys.all, 'photos', id] as const,
};

export function useProjects(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: projectKeys.list(filters || {}),
    queryFn: () => api.get<Project[]>(ENDPOINTS.PROJECT.LIST, filters as Record<string, string>),
    placeholderData: [],
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => api.get<Project>(ENDPOINTS.PROJECT.DETAIL(id)),
    enabled: !!id,
  });
}

export function useMilestones(projectId: string) {
  return useQuery({
    queryKey: projectKeys.milestones(projectId),
    queryFn: () => api.get<Milestone[]>(ENDPOINTS.PROJECT.MILESTONES(projectId)),
    enabled: !!projectId,
  });
}

export function useDailyReports(projectId: string) {
  return useQuery({
    queryKey: projectKeys.reports(projectId),
    queryFn: () => api.get<DailyReport[]>(ENDPOINTS.PROJECT.REPORTS(projectId)),
    enabled: !!projectId,
  });
}

export function useProjectPhotos(projectId: string) {
  return useQuery({
    queryKey: projectKeys.photos(projectId),
    queryFn: () => api.get<ProjectPhoto[]>(ENDPOINTS.PROJECT.PHOTOS(projectId)),
    enabled: !!projectId,
  });
}

export function useCompleteMilestone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, milestoneId }: { projectId: string; milestoneId: string }) =>
      api.patch(`${ENDPOINTS.PROJECT.MILESTONES(projectId)}/${milestoneId}`, { status: 'completed' }),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.milestones(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
    },
  });
}
