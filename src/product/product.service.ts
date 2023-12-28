import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { ProductEntity } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepository: Repository<ProductEntity>
	) {}

	/**
	 * @param searchKeyword
	 */
	async getProductList(searchKeyword: string): Promise<ProductEntity[]> {
		const where = searchKeyword ? [{ nameFa: Like(`%${searchKeyword}%`) }, { nameEn: Like(`%${searchKeyword}%`) }] : [];

		const productes = await this.productRepository.find({ where: where });
		if (!productes) {
			throw new NotFoundException({});
		}

		return productes;
	}

	/**
	 * Create product
	 * @param dto
	 */
	async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
		// Generate code id
		let code = 100;
		code = 1000;
		const { nameEn, nameFa } = dto;
		return await this.productRepository.save({
			nameEn,
			nameFa,
			code
		}).catch((error) => {
			if (error.code === 'ER_DUP_ENTRY') {
				throw new BadRequestException(error.message);
			}
			throw error;
		});
	}

	/**
	 * Update existing product
	 * @param dto
	 */
	async update(dto: UpdateProductDto): Promise<any> {
		const { id, nameEn, nameFa } = dto;
		const updateModel: { [k: string]: any } = {};
		if (nameEn) {
			updateModel.nameEn = nameEn;
		}
		if (nameFa) {
			updateModel.nameFa = nameFa;
		}
		await this.productRepository.save({ id }, updateModel);
		return await this.productRepository.findOneBy({
			id: id
		});
	}
}
