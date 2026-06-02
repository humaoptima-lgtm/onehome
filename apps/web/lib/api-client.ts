/* ============================================
   API Client — Base Configuration
   Ready for NestJS backend
   ============================================ */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

interface ApiRequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Build URL with query params
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  // Add default headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  // Add auth token if available (from Clerk/Supabase in production)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('one-home-token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  // Add idempotency key for mutation requests (Rule 8: prevent duplicate processing)
  const method = fetchOptions.method?.toUpperCase();
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    if (!headers['X-Idempotency-Key']) {
      headers['X-Idempotency-Key'] = crypto.randomUUID();
    }
  }

  const response = await fetch(url.toString(), {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      errorData?.message || `API Error: ${response.statusText}`,
      errorData
    );
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

// Convenience methods
export const api = {
  get: <T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>) =>
    apiRequest<T>(endpoint, { method: 'GET', params }),

  post: <T>(endpoint: string, body?: unknown) =>
    apiRequest<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),

  put: <T>(endpoint: string, body?: unknown) =>
    apiRequest<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),

  patch: <T>(endpoint: string, body?: unknown) =>
    apiRequest<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),

  delete: <T>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),
};

// API endpoint constants organized by NestJS module
export const ENDPOINTS = {
  // Auth Module
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  // Property Module
  PROPERTY: {
    LIST: '/properties',
    DETAIL: (id: string) => `/properties/${id}`,
    SEARCH: '/properties/search',
    FEATURED: '/properties/featured',
  },
  // Vendor Module
  VENDOR: {
    LIST: '/vendors',
    DETAIL: (id: string) => `/vendors/${id}`,
    FEATURED: '/vendors/featured',
    ONBOARD: '/vendors/onboard',
  },
  // Tender Module
  TENDER: {
    LIST: '/tenders',
    DETAIL: (id: string) => `/tenders/${id}`,
    CREATE: '/tenders',
    BIDS: (tenderId: string) => `/tenders/${tenderId}/bids`,
    COMPARE: (tenderId: string) => `/tenders/${tenderId}/compare`,
    AWARD: (tenderId: string) => `/tenders/${tenderId}/award`,
  },
  // Project Module
  PROJECT: {
    LIST: '/projects',
    DETAIL: (id: string) => `/projects/${id}`,
    MILESTONES: (projectId: string) => `/projects/${projectId}/milestones`,
    REPORTS: (projectId: string) => `/projects/${projectId}/reports`,
    PHOTOS: (projectId: string) => `/projects/${projectId}/photos`,
  },
  // Finance Module
  FINANCE: {
    LEDGER: '/finance/ledger',
    WALLET: (projectId: string) => `/finance/wallets/${projectId}`,
    LOANS: '/finance/loans',
    ELIGIBILITY: '/finance/eligibility',
    CALCULATOR: '/finance/calculator',
  },
  // Payment Module
  PAYMENT: {
    CREATE: '/payments',
    STATUS: (id: string) => `/payments/${id}`,
    ESCROW: (projectId: string) => `/payments/escrow/${projectId}`,
    DISBURSE: '/payments/disburse',
  },
  // Media Module
  MEDIA: {
    UPLOAD: '/media/upload',
    ASSETS: '/media/assets',
    DETAIL: (id: string) => `/media/assets/${id}`,
  },
  // Document Module
  DOCUMENT: {
    FOLDERS: '/documents/folders',
    FILES: '/documents/files',
    UPLOAD: '/documents/upload',
    VERSIONS: (docId: string) => `/documents/${docId}/versions`,
  },
  // Notification Module
  NOTIFICATION: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
  },
  // Admin Module
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    AUDIT_LOGS: '/admin/audit-logs',
    ANALYTICS: '/admin/analytics',
    KPI: '/admin/kpi',
  },
} as const;

export { ApiError };
