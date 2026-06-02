import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* ============================================
   Tender Form Store — Multi-Step Wizard State
   Persists draft to localStorage
   ============================================ */

interface TenderFormState {
  // Current step
  currentStep: number;
  
  // Step 1: Property
  property_id: string;
  property_address: string;
  property_type: string;
  property_size: number;
  property_condition: string;
  
  // Step 2: Scope
  project_name: string;
  description: string;
  categories: string[];
  sub_specifications: Record<string, string[]>;
  
  // Step 3: Files (we store metadata, not actual files)
  photo_count: number;
  floor_plan_count: number;
  reference_count: number;
  
  // Step 4: Budget & Timeline
  budget_min: number;
  budget_max: number;
  start_date: string;
  target_completion_date: string;
  priority: 'normal' | 'urgent' | 'critical';
  
  // Step 5: Vendors
  selected_vendor_ids: string[];
  open_to_marketplace: boolean;
  
  // Step 6: Review
  confirmed: boolean;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateField: <K extends keyof TenderFormState>(key: K, value: TenderFormState[K]) => void;
  updateFields: (fields: Partial<TenderFormState>) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  property_id: '',
  property_address: '',
  property_type: '',
  property_size: 0,
  property_condition: '',
  project_name: '',
  description: '',
  categories: [] as string[],
  sub_specifications: {} as Record<string, string[]>,
  photo_count: 0,
  floor_plan_count: 0,
  reference_count: 0,
  budget_min: 0,
  budget_max: 0,
  start_date: '',
  target_completion_date: '',
  priority: 'normal' as const,
  selected_vendor_ids: [] as string[],
  open_to_marketplace: false,
  confirmed: false,
};

export const useTenderFormStore = create<TenderFormState>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 5) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),
      
      updateField: (key, value) => set({ [key]: value } as Partial<TenderFormState>),
      updateFields: (fields) => set(fields),
      
      reset: () => set(initialState),
    }),
    {
      name: 'one-home-tender-draft',
    }
  )
);
