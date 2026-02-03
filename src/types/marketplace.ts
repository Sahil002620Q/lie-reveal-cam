export type ProductCondition = 'new' | 'used' | 'broken' | 'for_parts';
export type ProductStatus = 'active' | 'sold' | 'pending';
export type SortOption = 'newest' | 'price_low' | 'price_high';

export interface Product {
  id: string;
  title: string;
  brand: string;
  model: string;
  category: string;
  condition: ProductCondition;
  price: number;
  location: string;
  description: string;
  image: string;
  status: ProductStatus;
  createdAt: string;
}

export interface FilterState {
  category: string;
  condition: string;
  search: string;
  sortBy: SortOption;
}
