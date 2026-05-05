'use server';

import fs from 'fs';
import path from 'path';
import { Product, Brand, Supply, FAQ, Banner, Inquiry } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readJsonFile<T>(filePath: string): T | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

function getFilesInDir(dir: string, ext: string): string[] {
  try {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter(f => f.endsWith(ext))
      .map(f => path.join(dir, f));
  } catch {
    return [];
  }
}

function isActive(item: any): boolean {
  return item.isActive === 1 || item.isActive === true || item.isActive === 'true';
}

export async function getProducts(): Promise<Product[]> {
  try {
    const dir = path.join(CONTENT_DIR, 'products');
    const files = getFilesInDir(dir, '.json');
    const products = files.map(f => readJsonFile<Product>(f)).filter((p): p is Product => p !== null && isActive(p));
    return products.sort((a, b) => ((b.isFeatured as number) || 0) - ((a.isFeatured as number) || 0));
  } catch {
    return [];
  }
}

export async function getProductByBrand(brand: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => (p.brand as string)?.toLowerCase() === brand.toLowerCase());
}

export async function getBrands(): Promise<Brand[]> {
  try {
    const dir = path.join(CONTENT_DIR, 'brands');
    const files = getFilesInDir(dir, '.json');
    const brands = files.map(f => readJsonFile<Brand>(f)).filter((b): b is Brand => b !== null && isActive(b));
    return brands.sort((a, b) => ((a.sortOrder as number) || 0) - ((b.sortOrder as number) || 0));
  } catch {
    return [];
  }
}

export async function getBrandBySlug(slug: string): Promise<Brand | undefined> {
  const brands = await getBrands();
  return brands.find(b => b.slug === slug);
}

export async function getSupplies(): Promise<Supply[]> {
  try {
    const dir = path.join(CONTENT_DIR, 'supplies');
    const files = getFilesInDir(dir, '.json');
    const supplies = files.map(f => readJsonFile<Supply>(f)).filter((s): s is Supply => s !== null && isActive(s));
    return supplies;
  } catch {
    return [];
  }
}

export async function getSuppliesByBrand(brand: string): Promise<Supply[]> {
  const supplies = await getSupplies();
  return supplies.filter(s => (s.brand as string)?.toLowerCase() === brand.toLowerCase());
}

export async function getFAQs(pageSlug?: string): Promise<FAQ[]> {
  try {
    const dir = path.join(CONTENT_DIR, 'faqs');
    const files = getFilesInDir(dir, '.json');
    const faqs = files.map(f => readJsonFile<FAQ>(f)).filter((f): f is FAQ => f !== null && isActive(f) && (!pageSlug || (f.pageSlug as string) === pageSlug));
    return faqs.sort((a, b) => ((a.sortOrder as number) || 0) - ((b.sortOrder as number) || 0));
  } catch {
    return [];
  }
}

export async function getBanners(): Promise<Banner[]> {
  try {
    const dir = path.join(CONTENT_DIR, 'banners');
    const files = getFilesInDir(dir, '.json');
    const banners = files.map(f => readJsonFile<Banner>(f)).filter((b): b is Banner => b !== null && isActive(b));
    return banners.sort((a, b) => ((a.sortOrder as number) || 0) - ((b.sortOrder as number) || 0));
  } catch {
    return [];
  }
}

export async function getTestimonials(): Promise<any[]> {
  try {
    const dir = path.join(CONTENT_DIR, 'testimonials');
    const files = getFilesInDir(dir, '.json');
    return files.map(f => readJsonFile<any>(f)).filter((t): t is any => t !== null && (t.is_active === 1 || t.is_active === true || t.is_active === 'true'));
  } catch {
    return [];
  }
}

export async function getLogos(): Promise<any[]> {
  try {
    const dir = path.join(CONTENT_DIR, 'logos');
    const files = getFilesInDir(dir, '.json');
    return files.map(f => readJsonFile<any>(f)).filter((l): l is any => l !== null && (l.isActive === 1 || l.isActive === true || l.isActive === 'true'));
  } catch {
    return [];
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  try {
    const dir = path.join(CONTENT_DIR, 'inquiries');
    const files = getFilesInDir(dir, '.json');
    return files.map(f => readJsonFile<Inquiry>(f)).filter((i): i is Inquiry => i !== null);
  } catch {
    return [];
  }
}

export async function getSettings(): Promise<Record<string, string>> {
  try {
    const dir = path.join(CONTENT_DIR, 'settings');
    const files = getFilesInDir(dir, '.json');
    const settings: Record<string, string> = {};
    files.forEach(f => {
      const s = readJsonFile<any>(f);
      if (s?.key) settings[s.key as string] = s.value as string;
    });
    return settings;
  } catch {
    return {};
  }
}