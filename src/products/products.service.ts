import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) { }

    public async create(product: Product): Promise<Product> {
        try {
            return await this.productRepository.save(product);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
