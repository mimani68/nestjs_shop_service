import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cart } from './cart.schema';
import { SuccessResponse } from 'src/class/response/success';
import { ErrorResponse } from 'src/class/error/entity';
import { CreateCartDto } from './cart.dto';
import { Product } from 'src/product/product.schema';
import { ProductCostCalculator } from 'src/class/cost/calculator';

@Injectable()
export class CartService {
	constructor(
		private readonly configService: ConfigService,
		@InjectModel(Cart.name)
		private readonly cartModel: Model<Cart>,
		@InjectModel(Product.name)
		private readonly productModel: Model<Product>
	) { }

	/**
	 * Get list of all carts
	 * @param id
	 */
	async getCartById(id: string): Promise<SuccessResponse | ErrorResponse> {
		try {
			const cart = await this.cartModel.findOne({ _id: id }).exec();
			if (!cart) {
				return new ErrorResponse('The cart is empty', Cart.name)
			}
			return new SuccessResponse(cart)
		} catch (error) {
			return new ErrorResponse('The cart is empty', Cart.name)
		}
	}

	/**
	 * Get list of all carts
	 */
	async getCartList(): Promise<SuccessResponse | ErrorResponse> {
		try {
			const carts = await this.cartModel.find().exec();
			if (!carts) {
				return new ErrorResponse('The cart list is empty', Cart.name)
			}
			return new SuccessResponse(carts)
		} catch (error) {
			return new ErrorResponse('The cart list is empty', Cart.name)
		}
	}

	/**
	 * Create cart
	 * @param newCart
	 */
	async createCart(newCart: CreateCartDto): Promise<SuccessResponse | ErrorResponse> {
		try {
			const newCartObject = new Cart()
			newCartObject.description = newCart.description
			newCartObject.items = newCart.items
			newCartObject.status = "active"
			newCartObject.createdAt = new Date().toISOString()
			let data = await this.cartModel.create(newCart)
			return new SuccessResponse(data)
		} catch (error) {
			return new ErrorResponse('Unable to create cart', Cart.name)
		}
	}

	/**
	 * Add product to card
	 * @param cartId
	 * @param productId
	 */
	async addProductToCart(cartId: string, productId: string): Promise<SuccessResponse | ErrorResponse> {
		try {
			let product = await this.productModel.findOne({ _id: productId })
			if (!product) {
				return new ErrorResponse('Product is not exists.')
			}
			let cart = await this.cartModel.findOne({ _id: cartId })
			if (!cart) {
				return new ErrorResponse('Cart is not exists.')
			}
			let items = cart.items.push(product.id)
			let data = await this.cartModel.updateOne({ _id: cartId }, { items })
			return new SuccessResponse(data)
		} catch (error) {
			return new ErrorResponse('Unable to create cart', Cart.name)
		}
	}

	/**
	 * Add product to card
	 * @param cartId
	 * @param productId
	 */
	async calculatePrice(cartId: string): Promise<SuccessResponse | ErrorResponse> {
		try {
			let shipping_cost = this.configService.get<string>('SHIPPING_COST') || 0
			let cart = await this.cartModel.findOne({ _id: cartId })
			if (!cart) {
				return new ErrorResponse('Cart is not exists.')
			}
			for ( let item of cart.items ) {
				let product = await this.productModel.findOne({ _id: item?._id })
				if (!product) {
					return new ErrorResponse('Product is not exists.')
				}
				let calc = new ProductCostCalculator(+shipping_cost)
				product.final_price = calc.calculateCost(product.type, null, product.price)
			}
			return new SuccessResponse(cart)
		} catch (error) {
			return new ErrorResponse('Unable to create cart', Cart.name)
		}
	}

}
