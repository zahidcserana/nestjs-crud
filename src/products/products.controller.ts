import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductCmd } from './cmd/create-product.cmd';
import { CreateProductDto } from './dto/create-product.dto';

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

}
