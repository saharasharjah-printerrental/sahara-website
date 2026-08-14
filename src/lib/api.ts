const API_BASE = '/api';

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
    const data = await res.json();
    if (!res.ok) {
      return { data: null, error: data.error || `HTTP ${res.status}` };
    }
    return { data, error: null };
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return { data: null, error: String(error) };
  }
}

export async function getProducts() {
  return fetchAPI('/products');
}

export async function getProduct(id: string) {
  return fetchAPI(`/products?id=${id}`);
}

export async function getBrands() {
  return fetchAPI('/brands');
}

export async function getSupplies() {
  return fetchAPI('/supplies');
}

export async function getFAQs(pageSlug?: string) {
  const query = pageSlug ? `?pageSlug=${pageSlug}` : '';
  return fetchAPI(`/faqs${query}`);
}

export async function getBlogs() {
  return fetchAPI('/blogs');
}

export async function getBanners() {
  return fetchAPI('/banners');
}

export async function getInquiries() {
  return fetchAPI('/inquiries');
}

export async function getSettings(key?: string) {
  const query = key ? `?key=${key}` : '';
  return fetchAPI(`/settings${query}`);
}

// /api/settings is served with Cache-Control: private, no-store (it can carry
// an admin session's data), so the browser HTTP cache never dedupes it.
// Header and Footer both mount on every page and both used to fetch it
// independently, doubling this request site-wide. This module-scope promise
// cache collapses concurrent/rapid calls into one network request per tab.
let publicSettingsCache: { promise: Promise<Record<string, unknown>>; expires: number } | null = null;
const PUBLIC_SETTINGS_TTL_MS = 30_000;

export function fetchPublicSettings(): Promise<Record<string, unknown>> {
  if (publicSettingsCache && publicSettingsCache.expires > Date.now()) {
    return publicSettingsCache.promise;
  }
  const promise = fetch('/api/settings/')
    .then((res) => res.json())
    .then((data) => (data?.settings && typeof data.settings === 'object' ? data.settings : {}))
    .catch(() => ({}));
  publicSettingsCache = { promise, expires: Date.now() + PUBLIC_SETTINGS_TTL_MS };
  return promise;
}

export async function uploadFile(file: File): Promise<{ url: string; error: string | null }> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    
    if (data.success) {
      return { url: data.url, error: null };
    }
    return { url: '', error: data.error };
  } catch (error) {
    console.error('Upload Error:', error);
    return { url: '', error: String(error) };
  }
}

export async function saveProduct(product: any) {
  return fetchAPI('/products', {
    method: 'POST',
    body: JSON.stringify(product),
  });
}

export async function saveBrand(brand: any) {
  return fetchAPI('/brands', {
    method: 'POST',
    body: JSON.stringify(brand),
  });
}

export async function saveSupply(supply: any) {
  return fetchAPI('/supplies', {
    method: 'POST',
    body: JSON.stringify(supply),
  });
}

export async function saveFAQ(faq: any) {
  return fetchAPI('/faqs', {
    method: 'POST',
    body: JSON.stringify(faq),
  });
}

export async function saveBlog(blog: any) {
  return fetchAPI('/blogs', {
    method: 'POST',
    body: JSON.stringify(blog),
  });
}

export async function saveBanner(banner: any) {
  return fetchAPI('/banners', {
    method: 'POST',
    body: JSON.stringify(banner),
  });
}

export async function saveInquiry(inquiry: any) {
  return fetchAPI('/inquiries', {
    method: 'POST',
    body: JSON.stringify(inquiry),
  });
}

export async function saveSetting(key: string, value: string) {
  return fetchAPI('/settings', {
    method: 'POST',
    body: JSON.stringify({ key, value }),
  });
}