import { ProductData } from '../products/products.types';

export interface Operation {
  _id: string;
  description: string;
  createdBy: string;
  products: ProductData[];
  intoStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export type OperationData = Pick<Operation, 'description' | 'createdBy' | 'products' | 'intoStock'>;
