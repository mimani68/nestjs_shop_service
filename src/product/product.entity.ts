import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ProductEntity {
    @Prop()
    id: number;

    @Prop()
    code: number;

    @Prop()
    nameEn: string;

    @Prop()
    nameFa: string;
}

export type ProductDocument = HydratedDocument<ProductEntity>;
export const ProductSchema = SchemaFactory.createForClass(ProductEntity);