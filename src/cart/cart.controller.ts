import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CartService } from './cart.service';
import { Cart } from './cart.schema';
import { ErrorResponse } from 'src/class/error/entity';
import { SuccessResponse } from 'src/class/response/success';
import { CreateCartDto } from './cart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Get(':id')
	@ApiCreatedResponse({ type: Cart })
	async getSingleCart(@Param('id') id: string): Promise<SuccessResponse|ErrorResponse> {
		return this.cartService.getCartById(id);
	}

	@Get('')
	@ApiCreatedResponse({ type: Cart })
	async getCarts(): Promise<SuccessResponse | ErrorResponse> {
		return this.cartService.getCartList();
	}

	@Post()
	@ApiCreatedResponse({ type: Cart })
	async createNewCart(@Body() dto: CreateCartDto) {
		return this.cartService.createCart(dto);
	}

	@Post(':cardId/products/:productId')
	@ApiCreatedResponse({ type: Cart })
	async addProductToCart(@Param('cardId') cardId: string, @Param('productId') productId: string) {
		return this.cartService.addProductToCart(cardId, productId);
	}

	@Post(':cardId/calculate')
	@ApiCreatedResponse({ type: Cart })
	async calculateCartPrice(@Param('cardId') cardId: string,) {
		return this.cartService.calculatePrice(cardId);
	}
}
