import { Vendor } from '@/types/vendor';
import { vendors } from '@/data/vendors';

export async function getVendors(category?: string, query?: string): Promise<Vendor[]> {
  await new Promise(resolve => setTimeout(resolve, 800));
  let result = [...vendors];
  
  if (category) {
    result = result.filter(v => v.category === category);
  }
  
  if (query) {
    const q = query.toLowerCase();
    result = result.filter(v => 
      v.companyName.toLowerCase().includes(q) || 
      v.description.toLowerCase().includes(q)
    );
  }
  
  return result;
}

export async function getVendorBySlug(slug: string): Promise<Vendor | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return vendors.find(v => v.slug === slug) || null;
}

export async function getFeaturedVendors(limit: number = 5): Promise<Vendor[]> {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [...vendors]
    .filter(v => v.featured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
