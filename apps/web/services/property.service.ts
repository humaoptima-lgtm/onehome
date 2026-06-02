import { Property, PropertyFilters } from '@/types/property';
import { properties } from '@/data/properties';

export async function getProperties(filters?: PropertyFilters): Promise<Property[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let result = [...properties];
  
  if (filters) {
    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.address.city.toLowerCase().includes(q)
      );
    }
    
    if (filters.listingType) {
      result = result.filter(p => p.listingType === filters.listingType);
    }
    
    if (filters.type && filters.type.length > 0) {
      result = result.filter(p => filters.type!.includes(p.type));
    }
    
    if (filters.minPrice) {
      result = result.filter(p => p.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= filters.maxPrice!);
    }
  }
  
  return result;
}

export async function getPropertyBySlug(slug: string): Promise<Property> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const property = properties.find(p => p.slug === slug);
  if (!property) throw new Error(`Property not found: ${slug}`);
  return property;
}

export async function getAllPropertySlugs(): Promise<string[]> {
  return properties.map(p => p.slug);
}

export async function getFeaturedProperties(limit: number = 6): Promise<Property[]> {
  await new Promise(resolve => setTimeout(resolve, 600));
  // Just return top sorted by score
  return [...properties]
    .sort((a, b) => (b.propertyScore || 0) - (a.propertyScore || 0))
    .slice(0, limit);
}

export async function getRecentlyViewed(limit: number = 4): Promise<Property[]> {
  await new Promise(resolve => setTimeout(resolve, 400));
  // Mock recently viewed by returning random subset
  return [...properties].sort(() => 0.5 - Math.random()).slice(0, limit);
}
