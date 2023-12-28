import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.schema';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { EntityError } from 'src/class/error/entity';
import { SuccessResponse } from 'src/class/response/success';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name)
		private readonly productModel: Model<Product>
	) { }

	async getProductById(id: string): Promise<SuccessResponse | EntityError> {
		try {
			const product = await this.productModel.findOne({ _id: id }).exec();
			if (!product) {
				return new EntityError('The product is empty', Product.name)
			}
			return new SuccessResponse(product)
		} catch (error) {
			return new EntityError('The product is empty', Product.name)
		}
	}

	async getProductList(): Promise<SuccessResponse | EntityError> {
		try {
			const products = await this.productModel.find().exec();
			if (!products) {
				return new EntityError('The product list is empty', Product.name)
			}
			return new SuccessResponse(products)
		} catch (error) {
			return new EntityError('The product list is empty', Product.name)
		}
	}

	/**
	 * Create product
	 * @param newProduct
	 */
	async createProduct(newProduct: CreateProductDto): Promise<SuccessResponse | EntityError> {
		try {
			const newProductObject = new Product()
			newProductObject.sku = newProduct.sku
			newProductObject.title = newProduct.title
			newProductObject.description = newProduct.description
			newProductObject.type = newProduct.type
			newProductObject.createdAt = new Date().toISOString()
			let data = await this.productModel.create(newProduct)
			return new SuccessResponse(data)
		} catch (error) {
			return new EntityError('Unable to create product', Product.name)
		}
	}

	/**
	 * Update existing product
	 * @param dto
	 */
	async update(id: string, updateModel: UpdateProductDto): Promise<any> {
		try {
			updateModel.updatedAt = new Date().toISOString()
			await this.productModel.updateOne({ _id: id }, updateModel).exec();
			let data = await this.productModel.findOne({
				_id: id
			});
			return new SuccessResponse(data)
		} catch (error) {
			return new EntityError('Unable to update product.', Product.name)
		}
	}

	async delete(id: string): Promise<any> {
		try {
			let temp = await this.productModel.findOne({
				_id: id
			});
			await this.productModel.deleteOne({ _id: id });
			if (temp) {
				return new SuccessResponse(temp)
			} else {
				return new EntityError("The relevant item is not exists.", Product.name)
			}
		} catch (error) {
			return new EntityError('Unable to delete product.', Product.name)
		}
	}
}
