import { Params, Id, NullableId } from '@feathersjs/feathers';
import { Unprocessable } from '@feathersjs/errors';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { ProductData } from '../products/products.types';
import { Operation } from './operations.types';

export class Operations extends Service<Operation> {
  private app: Application;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(data: Operation, params: Params): Promise<Operation>;
  async create(data: Operation[], params: Params): Promise<Operation[]>;
  async create(data: Operation & Operation[], params: Params): Promise<Operation | Operation[]> {
    await this.app.service('products').updateStock(data.products, data.intoStock);

    return await super.create(data, params);
  }

  private async updateProductsInStock(
    oldProducts: ProductData[],
    newProducts: ProductData[],
    intoStock: boolean,
  ) {
    // Remove products from the old operation
    await this.app.service('products').updateStock(oldProducts, !oldProducts);
    // Add products from the updated operation
    await this.app.service('products').updateStock(newProducts, intoStock);
  }

  async update(id: Id, data: Operation, params: Params): Promise<Operation> {
    const oldOperation = await this.get(id);

    await this.updateProductsInStock(oldOperation.products, data.products, data.intoStock);

    return await super.update(id, data, params);
  }

  patch(id: Id, data: Partial<Operation>, params?: Params): Promise<Operation>;
  patch(id: null, data: Partial<Operation>, params?: Params): Promise<Operation[]>;
  async patch(
    id: NullableId,
    data: Partial<Operation>,
    params?: Params,
  ): Promise<Operation | Operation[]> {
    if (id && typeof data.products !== 'undefined') {
      const oldOperation = await this.get(id);

      await this.updateProductsInStock(oldOperation.products, data.products, data.intoStock || true);
    }

    return await super.patch(id, data, params);
  }

  remove(id: Id, params?: Params): Promise<Operation>;
  remove(id: null, params?: Params): Promise<Operation[]>;
  async remove(id: NullableId, params?: Params): Promise<Operation | Operation[]> {
    if (id) {
      const operationToRemove = await this.get(id);

      await this.app.service('products').updateStock(
        operationToRemove.products,
        !operationToRemove.intoStock,
      );
    }

    return await super.remove(id, params);
  }
}
