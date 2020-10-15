import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Req } from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductCmd } from './cmd/create-product.cmd';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductCmd } from './cmd/update-product.cmd';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @ApiOperation({ summary: 'Add-product', description: 'Add Product. Returns a valid JWT.' })
    @ApiResponse({ description: 'Success!', status: HttpStatus.CREATED })
    @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
    public async signUp(@Body() product: CreateProductCmd): Promise<CreateProductDto> {
        return await this.productsService.create(new Product(product));
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetProductDto, isArray: true, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ summary: 'Get all product', description: 'Get a list of all product.' })
    async findAll(): Promise<GetProductDto[]> {
        const productList = (await this.productsService.findAll()).map(product => new GetProductDto(product));
        return Promise.resolve(productList);
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: GetProductDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ summary: 'Get product', description: 'Get product.' })
    async findOne(@Param('id') id: string): Promise<GetProductDto> {
        const product = await this.productsService.findOne({ id });
        return new GetProductDto(product);
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: DeleteProductDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ summary: 'Delete Product', description: 'Delete Product.' })
    async deleteOne(@Param('id') id: string): Promise<DeleteProductDto> {
        const deletedProduct = await this.productsService.delete({ id });
        return new DeleteProductDto(deletedProduct);
    }


    @Put(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UpdateProductDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error.' })
    @ApiOperation({ summary: 'Update product', description: 'Update product.' })
    async updateOne(@Param('id') id: string, @Body() product: UpdateProductCmd): Promise<UpdateProductDto> {
        const updatedProduct = await this.productsService.update(id, product);
        return new UpdateProductDto(updatedProduct);
    }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() product: UpdateProductDto) {
    //     return this.productsService.update(id, product);
    // }

}
