import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { ProductService } from './product.service';
import { Product } from './product.schema';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { EntityError } from 'src/class/error/entity';

@ApiTags('product')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get(':id')
	@ApiCreatedResponse({ type: Product })
	async getSingleProduct(@Param('id') id: string): Promise<Product|EntityError> {
		return this.productService.getProductById(id);
	}

	@Get('')
	@ApiCreatedResponse({ type: Product })
	async getProducts(): Promise<Product[]|EntityError> {
		return this.productService.getProductList();
	}

	@Post()
	@ApiCreatedResponse({ type: Product })
	async createNewProduct(@Body() dto: CreateProductDto) {
		return this.productService.createProduct(dto);
	}

	@Patch(':id')
	@ApiCreatedResponse({ type: UpdateProductDto })
	async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
		return this.productService.update(id, dto);
	}

	@Delete(':id')
	async deleteProduct(@Param('id') id: string): Promise<any> {
		return this.productService.delete(id);
	}
}
