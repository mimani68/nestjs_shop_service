import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from 'src/product/product.schema';
import { SuccessResponse } from 'src/class/response/success';
import { Cart } from 'src/cart/cart.schema';
import { CartService } from 'src/cart/cart.service';
import { ErrorResponse } from 'src/class/error/entity';

const mockCart = (): Cart => ({
    _id: "",
    description: "Example application",
    status: "active",
    items: [],
    createdAt: new Date().toISOString(),
    deletedAt: null,
    deletionReason: '',
    updatedAt: '',
});
const mockProduct = (): Product => ({
    _id: "",
    description: "Example application",
    color: "red",
    images: [{
      hq: "https://address.com/public/image-hq-1.jpg",
      lq: "https://address.com/public/image-hq-1.jpg", 
      isDefault: true
    }],
    currency: "usd",
    final_price: 0,
    price: 100, 
    size: "",
    sku: "",
    title: "",
    type: "Digital",
    updatedAt: "",
    createdAt: "",
    deletedAt: "",
    deletionReason: "",
});

describe('CartService', () => {
    let service: CartService;
    let cartModel: Model<Cart>;
    let productModel: Model<Product>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CartService,
                ConfigService,
                {
                    provide: getModelToken(Cart.name),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockCart()),
                        constructor: jest.fn().mockResolvedValue(mockCart()),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        create: jest.fn(),
                        remove: jest.fn(),
                        exec: jest.fn(),
                    }
                },
                {
                    provide: getModelToken(Product.name),
                    useValue: {
                        new: jest.fn().mockResolvedValue(mockProduct()),
                        constructor: jest.fn().mockResolvedValue(mockProduct()),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        create: jest.fn(),
                        remove: jest.fn(),
                        exec: jest.fn(),
                    }
                },
            ],
        }).compile();

        service = moduleRef.get<CartService>(CartService);
        cartModel = moduleRef.get<Model<Cart>>(getModelToken(Cart.name));
        productModel = moduleRef.get<Model<Product>>(getModelToken(Product.name));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a SuccessResponse for getCartById with a valid cart', async () => {
        // Mock the findOne method with a sample cart
        const cart = { _id: '12345678' };
        jest.spyOn(cartModel, 'findOne').mockResolvedValue(cart);

        const result: any = await service.getCartById('12345678');

        expect(result).toBeInstanceOf(SuccessResponse);
        expect(result.success).toBe(true);
        expect(result.data).toBe(cart);
    });

    it('should return an ErrorResponse for getCartById with an invalid cart', async () => {
        jest.spyOn(cartModel, 'findOne').mockResolvedValue(null);

        const result: any = await service.getCartById('12345678');

        expect(result).toBeInstanceOf(ErrorResponse);
        expect(result.success).toBe(false);
        expect(result.message).toBe('The cart is empty');
    });

    // Add more test cases for other functions in the CartService
});