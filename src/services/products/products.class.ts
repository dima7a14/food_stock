import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Product, ProductData } from './products.types';

export class Products extends Service<Product> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async updateStock(data: ProductData[], intoStock: boolean): Promise<void> {
    for (const productData of data) {
      const existedProducts = await this.find({
        query: {
          title: productData.title,
          unit: productData.unit || '',
        },
      });

      if (existedProducts.data.length > 0) {
        const existedProduct = existedProducts.data[0];

        const diff = intoStock
          ? existedProduct.amount + productData.amount
          : existedProduct.amount - productData.amount;

        if (diff <= 0) {
          await this.remove(existedProduct._id);
        } else {
          await this.patch(existedProduct._id, { amount: diff });
        }
      } else {
        if (intoStock) {
          await this.create(productData);
        }
      }
    }
  }
}
