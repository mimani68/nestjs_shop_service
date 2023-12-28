import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type ProductType = "pod" | "digital" | "physical"

@Schema()
export class Product {
    // @IsNotEmpty()
	// @ApiProperty()
    // @Prop()
    // _id: string;

    @IsNotEmpty()
	@ApiProperty()
    @Prop()
    sku: string;

    @IsNotEmpty()
	@ApiProperty()
    @Prop()
    title: string;

    @IsNotEmpty()
	@ApiProperty()
    @Prop()
    description: string;

    @IsNotEmpty()
	@ApiProperty()
    @Prop()
    type: ProductType;

    @IsNotEmpty()
	@ApiProperty()
    @Prop()
    price: string;

    @IsNotEmpty()
	@ApiProperty()
    @Prop()
    createdAt: string;

    @IsOptional()
	@ApiProperty()
    @Prop()
    updatedAt: string;

    @IsOptional()
	@ApiProperty()
    @Prop()
    deletedAt: string;

    @IsOptional()
	@ApiProperty()
    @Prop()
    deletionReason: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);