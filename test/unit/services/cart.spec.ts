import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';

import { Product } from 'src/product/product.schema';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/cart.schema';

// Mock the Cart and Product models
const cartModelMock = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  updateOne: jest.fn(),
};

const productModelMock = {
  findOne: jest.fn(),
};

describe('CartService', () => {
  let cartService: CartService;
  let configService: ConfigService;
  let cartModel: Model<Cart>;
  let productModel: Model<Product>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CartService,
        ConfigService,
        { provide: Model, useValue: cartModelMock },
        { provide: Model, useValue: productModelMock },
      ],
    }).compile();

    cartService = moduleRef.get<CartService>(CartService);
    configService = moduleRef.get<ConfigService>(ConfigService);
    cartModel = moduleRef.get<Model<Cart>>(Model);
    productModel = moduleRef.get<Model<Product>>(Model);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Write your unit tests here
  it('should get cart by id', async () => {
    // Mock the cartModel.findOne method
    // @ts-ignore
    cartModel.findOne.mockReturnValueOnce({ _id: 'cartId' });

    const result = await cartService.getCartById('cartId');

    expect(result).toEqual({ _id: 'cartId' });
    expect(cartModel.findOne).toHaveBeenCalledWith({ _id: 'cartId' });
  });

  it('should return error if cart does not exist', async () => {
    // Mock the cartModel.findOne method
    // @ts-ignore
    cartModel.findOne.mockReturnValueOnce(null);

    const result = await cartService.getCartById('cartId');

    expect(result).toEqual({
      message: 'The cart is empty',
      entity: 'Cart',
    });
    expect(cartModel.findOne).toHaveBeenCalledWith({ _id: 'cartId' });
  });

  // Write more unit tests for other methods
});
