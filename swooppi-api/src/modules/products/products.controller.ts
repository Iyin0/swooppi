import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Request, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Query, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductCategory } from './dto/create-product-category.dto';
import { apiPrefix } from '@/common/utils/routes.utils';
import { Public } from '@/common/decorators/setMetaData.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductQueryDto } from './dto/product-query.dto';

@Controller(`${apiPrefix}products`)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('product_image'))
  uploadProduct(
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
      ],
    }),) file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @Request() req: any
  ) {
    const { id } = req.user
    return this.productsService.uploadProduct(id, createProductDto, file);
  }

  @Public()
  @Get('/all')
  async getAllProducts(): Promise<any> {
    return await this.productsService.getAllProducts()
  }

  @Public()
  @Get('/query')
  async getProductByCatgory(@Query() query: ProductQueryDto): Promise<any> {
    return await this.productsService.getProductByCatgory(query)
  }

  @Post('/category')
  async createProductCategory(@Body() createProductCategory: CreateProductCategory): Promise<any> {
    return await this.productsService.createProductCategory(createProductCategory);
  }

  @Public()
  @Get('/category')
  async getAllProductCategories(): Promise<any> {
    return await this.productsService.getAllProductCategories();
  }

  @Public()
  @Get('/:id')
  async getProductById(@Param() params: any): Promise<any> {
    const { id } = params
    return await this.productsService.getProductById(id)
  }
}
