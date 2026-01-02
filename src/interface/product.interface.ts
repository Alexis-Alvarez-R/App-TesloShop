import type { User } from "./user";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: User;
}

export type Size = "L" | "M" | "S" | "XL" | "XS" | "XXL";
export type Gender = "men" | "women" | "kid" | "unisex";
