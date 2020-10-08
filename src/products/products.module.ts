import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtMiddleware } from 'src/auth/middlewares/jwt.middleware';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/products', '/products/:id');
  }
}