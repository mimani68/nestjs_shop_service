import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Product } from 'src/product/product.schema';

export class CreateCartDto {
    @IsNotEmpty()
    @ApiProperty()
    @Prop()
    description: string;

    @IsNotEmpty()
    @ApiProperty()
    @Prop()
    items: Product[];

    @IsNotEmpty()
    @ApiProperty()
    @Prop()
    status: "active" | "inactive";
}
