export interface Product {
  id: number;
  name: string;
  model: string;
  category: string;
  price: string;
  reward: string;
  rating: string;
  review_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
  variants: ProductVariant[];
  rentalOptions: RentalProviderOptions[];
}

export interface ProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

export interface ProductVariant {
  id: number;
  name: string;
  image_url: string;
  price: string;
}

export interface RentalProviderOptions {
  provider: string;
  options: RentalOption[];
}

export interface RentalOption {
  months: number;
  monthly_price: string;
  reward: string;
}
