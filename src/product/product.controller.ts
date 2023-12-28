import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { CreateProductDto, ProductDto, UpdateProductDto } from './product.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get(':id')
	@ApiCreatedResponse({ type: ProductDto })
	async getPaymentSource(@Param('id') id: number): Promise<ProductEntity> {
		return Promise.resolve({
			code: 0,
			id: 0,
			nameEn: "",
			nameFa: ""
		});
	}

	@Get('')
	@ApiCreatedResponse({ type: ProductDto })
	@ApiQuery({
		name: 'searchKeyword',
		required: false,
		description: 'Search with name'
	})
	async getPaymentSources(@Query('searchKeyword') searchKeyword): Promise<ProductEntity[]> {
		return this.productService.getProductList(searchKeyword);
	}

	@Post()
	@ApiCreatedResponse({ type: ProductDto })
	async createPaymentSource(@Body() dto: CreateProductDto) {
		return this.productService.createProduct(dto);
	}

	@Put()
	@ApiCreatedResponse({ type: UpdateProductDto })
	async updatePaymentSource(@Body() dto: UpdateProductDto) {
		return this.productService.update(dto);
	}

	@Delete(':id')
	async deletePaymentSource(@Param('id') id: number): Promise<any> {
		return Promise.resolve()
	}
}
