export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  tags: string[];
  gender: Category;
  categoryId: string;
  sizes: ProductSize[];
  images: string[];
}

export interface ProductSize {
  id: string;
  inStock: number;
  limitToBuy: number | null;
  sizeId: string;
}

export interface CartProduct {
  id: string;
  image: string;
  price: number;
  sizes: CartProductSize[];
  slug: string;
  title: string;
}

export interface CartProductSize extends ProductSize {
  quantity: number;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}

type Category = "men" | "women" | "kid" | "unisex";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
