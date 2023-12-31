import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { Product } from 'src/product/product.schema';

@Schema()
export class Cart {
    
    // @IsOptional()
    // @ApiProperty()
    // @Prop()
    _id: any;

    @IsOptional()
    @ApiProperty()
    @Prop()
    description: string;

    @IsOptional()
    @ApiProperty()
    @Prop()
    items: string[];

    @IsNotEmpty()
    @ApiProperty()
    @Prop()
    status: "active" | "inactive";

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

export const CartSchema = SchemaFactory.createForClass(Cart);
