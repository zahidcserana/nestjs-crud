import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct } from './interface/product.interface';


export enum ProductStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

@Entity()
export class Product implements IProduct {
  constructor(data: IProduct) {
    if (!!data) {
      this.id = data.id;
      this.name = data.name;
      this.price = data.price;
      this.status = data.status;
    }
  }

  @PrimaryGeneratedColumn('uuid') public id: string;

  @Column() public name: string;

  @Column() public price: string;

  @Column({ default: true }) public status: ProductStatus;
}
