import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './cart.schema';
import { Product, ProductSchema } from 'src/product/product.schema';

@Module({
	imports: [MongooseModule.forFeature([
		{
			name: Cart.name,
			schema: CartSchema
		},
		{
			name: Product.name,
			schema: ProductSchema
		}
	])],
	controllers: [CartController],
	providers: [CartService]
})
export class CartModule { }
