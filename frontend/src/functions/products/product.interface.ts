export interface Product {
  id: string;
  name: string;
  number: number;
  price: number;
  discount?: number;
  composition: string[];
  size: string[];
  color: string[];
  year: number;
  description1: string;
  description2?: string;
  description3?: string;
  isActive: boolean;
  picture: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProduct {
  name?: string;
  number?: number;
  price?: number;
  discount?: number;
  composition?: string[];
  size?: string[];
  color?: string[];
  year?: number;
  description1?: string;
  description2?: string;
  description3?: string;
  isActive?: boolean;
  picture?: string[];
}
