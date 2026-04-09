export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  condition: string;
  priceSale: string;
  priceRental: string;
  specs: string;
  image: string;
  isActive: number;
  isFeatured: number;
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  isActive: number;
  sortOrder: number;
  createdAt: string;
}

export interface Supply {
  id: string;
  name: string;
  brand: string;
  category: string;
  compatibleModels: string;
  color: string;
  yield: string;
  price: string;
  stock: number;
  image: string;
  isActive: number;
  createdAt: string;
}

export interface FAQ {
  id: string;
  pageSlug: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: number;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  isActive: number;
  publishedAt: string;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  isActive: number;
  sortOrder: number;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface Setting {
  key: string;
  value: string;
}