import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProductType } from './product.schema';

export class CreateProductDto {
    @IsNotEmpty()
	@ApiProperty()
    sku: string;

    @IsNotEmpty()
	@ApiProperty()
    title: string;

    @IsNotEmpty()
	@ApiProperty()
    description: string;

    @IsNotEmpty()
	@ApiProperty()
    type: ProductType;

    @IsNotEmpty()
	@ApiProperty()
    price: string;
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
	@ApiProperty()
    sku: string;

    @IsString()
    @IsOptional()
	@ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
	@ApiProperty()
    description: string;

    @IsString()
    @IsOptional()
	@ApiProperty()
    type: ProductType;

    @IsString()
    @IsOptional()
	@ApiProperty()
    price: string;

    @IsString()
    @IsOptional()
	@ApiProperty()
    updatedAt: string;
}
