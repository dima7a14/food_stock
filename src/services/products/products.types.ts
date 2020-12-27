export interface Product {
  _id: string;
  title: string;
  description?: string;
  amount: number;
  unit?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductData = Pick<Product, 'title' | 'description' | 'amount' | 'unit'>;