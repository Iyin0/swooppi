import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartItems, Products } from '@/config/entities/index.entities';
import { Repository } from 'typeorm';
import { ResponseUtils } from '@/common/utils/response.utils';
import { Timestamp } from '@/common/utils/timestamp.utils';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItems)
    private cartItemsRepository: Repository<CartItems>,
  ) { }

  async addToCart(id: string, { product_id, quantity, required_options }: AddToCartDto): Promise<any> {
    const product = await this.productsRepository.findOne({
      where: { id: product_id }
    })

    if (!product) throw new BadRequestException(ResponseUtils.serverResponse(false, HttpStatus.BAD_REQUEST, 'Product does not exist'))
    if (quantity < 1) throw new BadRequestException(ResponseUtils.serverResponse(false, HttpStatus.BAD_REQUEST, 'Product quantity must be at least 1'))

    const userCart = await this.cartRepository.findOne({ where: { user_id: id } })

    const cartProduct = await this.cartItemsRepository.findOne({ where: { product_id } })

    if (cartProduct && cartProduct.required_options === required_options) {
      await this.cartItemsRepository.update(cartProduct.id, { quantity: cartProduct.quantity + quantity })
    } else {
      const created_at = await Timestamp.getCurrentTimestamp()

      const cartItem = {
        cart_id: userCart.id,
        product_id,
        quantity,
        required_options,
        created_at
      }

      await this.cartItemsRepository.insert(cartItem)
    }


    return ResponseUtils.serverResponse(true, HttpStatus.CREATED, 'Product added to cart');
  }

  async getAllCartItems(id: string): Promise<any> {
    const cart = await this.cartRepository.findOne({ where: { user_id: id } })

    // const cartItems = await this.cartItemsRepository.find({ where: { cart_id: cart.id } })
    const cartItems = await this.cartItemsRepository.query(
      `SELECT 
      cart_item.id, 
      cart_item.quantity, 
      cart_item.required_options, 
      cart_item.created_at,
      (
          SELECT JSON_OBJECT(
              'vendor_id', p.vendor_id,
              'name', p.name,
              'description', p.description,
              'ingredients', p.ingredients,
              'category', c.name,
              'default_price', p.default_price,
              'sales_price', p.sales_price,
              'product_image', p.product_image,
              'required_options', p.required_options,
              'created_at', p.created_at, 
              'updated_at', p.updated_at
          )
          FROM products p
          JOIN product_categories c ON p.category_id = c.id
          WHERE p.id = cart_item.product_id
              ) AS product
          FROM
              cart_items cart_item
          WHERE
              cart_item.cart_id = "${cart.id}"
          ORDER BY
              cart_item.created_at DESC;
      `
    )
    return ResponseUtils.serverResponse(true, HttpStatus.CREATED, 'Cart items fetched successfully', cartItems);
  }


  async updateCart(id: string, item_id: string, { quantity }: UpdateCartDto): Promise<any> {
    const userCart = await this.cartRepository.findOne({ where: { user_id: id } })

    const cartProduct = await this.cartItemsRepository.findOne({ where: { id: item_id } })

    if (!cartProduct) throw new BadRequestException(ResponseUtils.serverResponse(false, HttpStatus.BAD_REQUEST, 'Product is not in your cart'))

    if (cartProduct.cart_id !== userCart.id) {
      throw new BadRequestException(ResponseUtils.serverResponse(false, HttpStatus.BAD_REQUEST, 'Product is not in your cart'))
    }

    if (quantity < 0) throw new BadRequestException(ResponseUtils.serverResponse(false, HttpStatus.BAD_REQUEST, 'Product quantity cannot be less than 0'))

    if (quantity === 0) await this.removeCartItem(id, item_id)
    else await this.cartItemsRepository.update(cartProduct.id, { quantity })

    return ResponseUtils.serverResponse(true, HttpStatus.CREATED, 'Cart items updated successfully');
  }

  async removeCartItem(id: string, item_id: string): Promise<any> {
    console.log(item_id)
    const userCart = await this.cartRepository.findOne({ where: { user_id: id } })
    const cartProduct = await this.cartItemsRepository.findOne({ where: { id: item_id } })
    if (!cartProduct) throw new BadRequestException(ResponseUtils.serverResponse(false, HttpStatus.BAD_REQUEST, 'Product is not in your cart'))

    if (cartProduct.cart_id !== userCart.id) {
      throw new BadRequestException(ResponseUtils.serverResponse(false, HttpStatus.BAD_REQUEST, 'Product is not in your cart'))
    }

    await this.cartItemsRepository.delete(item_id)
    return ResponseUtils.serverResponse(true, HttpStatus.CREATED, 'Cart items deleted successfully');
  }
}
