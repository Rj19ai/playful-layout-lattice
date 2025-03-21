
// Product categories
export type ProductCategory = 'laptop' | 'grocery';

// Base product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: ProductCategory;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for laptop products
export interface Laptop extends Product {
  category: 'laptop';
  brand: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  graphics: string;
  prices: VendorPrice[];
}

// Interface for grocery products
export interface Grocery extends Product {
  category: 'grocery';
  brand: string;
  weight: string;
  nutritionInfo?: string;
  organic: boolean;
  prices: VendorPrice[];
}

// Vendor price interface
export interface VendorPrice {
  vendorId: string;
  vendorName: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  inStock: boolean;
  lastUpdated: Date;
  url: string;
}

// Price history point
export interface PriceHistoryPoint {
  date: Date;
  price: number;
  vendorId: string;
}

// Price alert interface
export interface PriceAlert {
  id: string;
  productId: string;
  userId: string;
  targetPrice: number;
  createdAt: Date;
  isActive: boolean;
  triggered: boolean;
  triggeredAt?: Date;
  vendorId?: string; // Optional: specific vendor to watch
}

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  preferences: UserPreferences;
}

// User preferences interface
export interface UserPreferences {
  preferredCategories: ProductCategory[];
  preferredVendors: string[];
  emailNotifications: boolean;
  pushNotifications: boolean;
}

// Search filters
export interface SearchFilters {
  category?: ProductCategory;
  priceMin?: number;
  priceMax?: number;
  brands?: string[];
  vendors?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'popularity';
}
