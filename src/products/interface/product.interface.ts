import { ProductStatus } from '../product.entity';

export interface IProduct {
  readonly id?: string;
  readonly name?: string;
  readonly price?: string;
  readonly status?: ProductStatus;
}
