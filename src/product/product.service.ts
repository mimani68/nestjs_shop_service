import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.schema';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { EntityError } from 'src/class/error/entity';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name)
		private readonly productModel: Model<Product>
	) { }

	async getProductById(id: string): Promise<Product | EntityError> {
		try {
			const product = await this.productModel.findOne({ _id: id }).exec();
			if (!product) {
				return new EntityError('The product is empty', Product.name)
			}
			return product;
		} catch (error) {
			return new EntityError('The product is empty', Product.name)
		}
	}

	async getProductList(): Promise<Product[] | EntityError> {
		try {
			const products = await this.productModel.find().exec();
			if (!products) {
				return new EntityError('The product list is empty', Product.name)
			}
			return products;
		} catch (error) {
			return new EntityError('The product list is empty', Product.name)
		}
	}

	/**
	 * Create product
	 * @param newProduct
	 */
	async createProduct(newProduct: CreateProductDto): Promise<Product | EntityError> {
		try {
			const newProductObject = new Product()
			newProductObject.sku = newProduct.sku
			newProductObject.title = newProduct.title
			newProductObject.description = newProduct.description
			newProductObject.type = newProduct.type
			newProductObject.createdAt = new Date().toISOString()
			return await this.productModel.create(newProduct)
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
			return await this.productModel.findOne({
				_id: id
			});
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
				return {
					message: "Deletion done.",
					data: temp
				}
			} else {
				return {
					message: "The relevant item is not exists."
				}
			}
		} catch (error) {
			return new EntityError('Unable to delete product.', Product.name)
		}
	}
}
