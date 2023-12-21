import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { apiPrefix } from '@/common/utils/routes.utils';

@Controller(`${apiPrefix}cart`)
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  async addToCart(@Body() createCartDto: AddToCartDto, @Request() req: any): Promise<any> {
    const { id } = req.user
    return await this.cartService.addToCart(id, createCartDto);
  }

  @Get()
  async getAllCartItems(@Request() req: any): Promise<any> {
    const { id } = req.user
    return await this.cartService.getAllCartItems(id);
  }

  @Patch('/:item_id')
  async update(@Param('item_id') item_id: string, @Body() updateCartDto: UpdateCartDto, @Request() req: any): Promise<any> {
    const { id } = req.user
    return await this.cartService.updateCart(id, item_id, updateCartDto);
  }

  @Delete('/:item_id')
  remove(@Param('item_id') item_id: string, @Request() req: any) {
    const { id } = req.user
    return this.cartService.removeCartItem(id, item_id);
  }
}
