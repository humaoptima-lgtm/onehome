import { Tender, TenderFormData } from '@/types/tender';

// Mock DB for created tenders
const createdTenders: Tender[] = [];

export async function createTender(data: TenderFormData): Promise<Tender> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const newTender: Tender = {
    id: `tender-${Date.now()}`,
    referenceNumber: `TR-${Math.floor(Math.random() * 1000000)}`,
    customerId: 'user-001',
    title: `Renovation for ${data.propertyType} at ${data.propertyAddress}`,
    description: data.scopeDescription,
    propertyInfo: {
      address: data.propertyAddress,
      type: data.propertyType,
      size: data.propertySize,
      condition: data.propertyCondition
    },
    photos: [], // Upload logic handled separately
    floorPlans: [],
    scope: {
      categories: data.scopeCategories,
      description: data.scopeDescription,
      specificRequirements: data.specificRequirements
    },
    budgetMin: data.budgetMin,
    budgetMax: data.budgetMax,
    timeline: {
      startDate: data.startDate,
      duration: data.duration,
      urgency: data.urgency
    },
    selectedVendorIds: data.selectedVendorIds,
    status: 'reviewing',
    bids: [],
    bidCount: 0,
    createdAt: new Date().toISOString(),
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  };
  
  createdTenders.push(newTender);
  return newTender;
}

export async function getTenderById(id: string): Promise<Tender | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return createdTenders.find(t => t.id === id) || null;
}
