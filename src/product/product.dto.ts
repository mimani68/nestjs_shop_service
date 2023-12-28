import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductDto {
	@IsNotEmpty()
	@ApiProperty()
	readonly id: number;

	@IsNotEmpty()
	@ApiProperty()
	readonly nameEn: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly nameFa: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly code: number;
}

export class CreateProductDto {
	@IsNotEmpty()
	@ApiProperty()
	readonly nameEn: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly nameFa: string;
}

export class UpdateProductDto {
	@IsNotEmpty()
	@ApiProperty()
	readonly id: number;

	@IsNotEmpty()
	@ApiProperty()
	readonly nameEn: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly nameFa: string;
}
