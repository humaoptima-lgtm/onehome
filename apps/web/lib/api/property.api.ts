import { useQuery } from '@tanstack/react-query';
import { api, ENDPOINTS } from '@/lib/api-client';
import type { Property } from '@/types/property';
import { getProperties, getFeaturedProperties, getPropertyBySlug } from '@/services/property.service';

// Query key factory
export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...propertyKeys.lists(), filters] as const,
  details: () => [...propertyKeys.all, 'detail'] as const,
  detail: (slug: string) => [...propertyKeys.details(), slug] as const,
  featured: () => [...propertyKeys.all, 'featured'] as const,
  search: (query: string) => [...propertyKeys.all, 'search', query] as const,
};

/**
 * Fetch all properties with optional filters
 * Uses mock data layer until NestJS backend is ready
 */
export function useProperties(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: propertyKeys.list(filters || {}),
    queryFn: () => {
      // Mock: use local service
      return getProperties();
      // Production: return api.get<Property[]>(ENDPOINTS.PROPERTY.LIST, filters);
    },
  });
}

/**
 * Fetch single property by slug
 */
export function useProperty(slug: string) {
  return useQuery({
    queryKey: propertyKeys.detail(slug),
    queryFn: () => {
      // Mock: use local service
      return getPropertyBySlug(slug);
      // Production: return api.get<Property>(ENDPOINTS.PROPERTY.DETAIL(slug));
    },
    enabled: !!slug,
  });
}

/**
 * Fetch featured properties for homepage
 */
export function useFeaturedProperties() {
  return useQuery({
    queryKey: propertyKeys.featured(),
    queryFn: () => {
      // Mock: use local service
      return getFeaturedProperties();
      // Production: return api.get<Property[]>(ENDPOINTS.PROPERTY.FEATURED);
    },
  });
}

/**
 * Search properties
 */
export function usePropertySearch(query: string) {
  return useQuery({
    queryKey: propertyKeys.search(query),
    queryFn: () => {
      // Mock: filter local data
      return getProperties().then(all => 
        all.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      );
      // Production: return api.get<Property[]>(ENDPOINTS.PROPERTY.SEARCH, { q: query });
    },
    enabled: query.length >= 2,
  });
}
