import { ProductStatus } from '../product.entity';

import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '../interface/product.interface';

export class UpdateProductCmd {
  constructor(data: IProduct) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.status = data.status;
  }
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() price: string;
  @ApiProperty() status: ProductStatus;
}
