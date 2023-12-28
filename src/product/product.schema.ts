import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SkuGenerator } from 'src/class/sku/generator';

export type ProductType = "POD" | "Digital" | "Physical"

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
    color: string;

    @IsNotEmpty()
    @ApiProperty()
    @Prop()
    size: string;

    @IsNotEmpty()
    @ApiProperty()
    @Prop()
    images: ProductImage[];

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

export class ProductImage {
    small: string;
    hq: string;
    isDefault: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre('save', function (next) {
    if (!Array.isArray(this.sku)) {
        const skuBuilder = new SkuGenerator(this.sku, this.type, this.size, this.color)
        this.sku = skuBuilder.generateCode()
    }
    next();
});