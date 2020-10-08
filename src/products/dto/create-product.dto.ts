
import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '../interface/product.interface';

export class CreateProductDto implements IProduct {
  constructor(data: IProduct) {
    this.name = data.name;
    this.price = data.price;
  }
  @ApiProperty() name: string;
  @ApiProperty() price: string;
}
