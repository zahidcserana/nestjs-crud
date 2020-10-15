import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UpdateProductCmd } from './cmd/update-product.cmd';
import { UpdateProductDto } from './dto/update-product.dto';
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

    public async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    public async findOne(params: DeepPartial<Product>): Promise<Product> {
        let product: Product;
        try {
            product = await this.productRepository.findOne(params);
        } catch (error) { }
        if (!product) {
            throw new NotFoundException(`Product with ${JSON.stringify(params)} does not exist`);
        }
        return product;
    }


    public async delete(params: DeepPartial<Product>): Promise<Product> {
        const product = await this.findOne(params);
        try {
            await this.productRepository.remove(product);
            return product;
        } catch (error) {
            throw new NotFoundException(`Product with ${params.toString()} not found.`);
        }
    }

    public async update(id: string, product: UpdateProductCmd): Promise<Product> {
        console.log(product);
        try {
            return this.productRepository.save({ ...product, id: String(id) });
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    // update = async (id: string, product: UpdateProductDto) => {
    //     return this.productRepository.save({ ...product, id: String(id) });
    // };
}
