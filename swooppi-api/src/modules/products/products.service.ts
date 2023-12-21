import { BadRequestException, ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductCategory } from './dto/create-product-category.dto';
import { CategoryID } from '@/common/utils/categoryId.utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts, ProductCategories, Products } from '@/config/entities/index.entities';
import { ResponseUtils } from '@/common/utils/response.utils';
import { Timestamp } from '@/common/utils/timestamp.utils';
import { S3ClientService } from '../s3-client/s3-client.service';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Accounts)
    private accountRepository: Repository<Accounts>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(ProductCategories)
    private productCategoriesRepository: Repository<ProductCategories>,
    private s3Client: S3ClientService,
  ) { }

  async uploadProduct(id: string,
    { name, description, ingredients, category_id, default_price, sales_price, required_options }: CreateProductDto,
    file: Express.Multer.File): Promise<any> {

    const user = await this.accountRepository.findOne({
      where: {
        id
      }
    })

    if (user.user_type !== 'vendor') throw new BadRequestException(ResponseUtils.serverResponse(false, HttpStatus.BAD_REQUEST, 'Only vendors can upload a product'))

    const categories = await this.productCategoriesRepository.findOne({
      where: {
        id: category_id
      }
    })

    if (!categories) throw new BadRequestException(ResponseUtils.serverResponse(false, HttpStatus.BAD_REQUEST, 'Invalid product category'))

    const created_at = await Timestamp.getCurrentTimestamp()

    let bucketName = 'swooppi-images'

    const current_time = new Date().getTime()
    let key = `${file.fieldname}_${current_time}`

    let productImg = await this.s3Client.uploadFile(bucketName, key, file.buffer, file.mimetype)

    const data: any = {
      vendor_id: id,
      name,
      description,
      ingredients,
      category_id,
      default_price,
      sales_price,
      product_image: {
        filename: productImg.key,
        url: productImg.location
      },
      required_options,
      created_at
    }

    await this.productsRepository.insert(data)

    return ResponseUtils.serverResponse(true, HttpStatus.CREATED, 'Product uploaded successfully')
  }

  async getAllProducts(): Promise<any> {
    const products = await this.productsRepository.find()
    return ResponseUtils.serverResponse(true, HttpStatus.OK, 'Products fetched successfully', products)
  }

  async getProductById(product_id: string): Promise<any> {
    const product = await this.productsRepository.findOne({
      where: {
        id: product_id
      }
    })

    return ResponseUtils.serverResponse(true, HttpStatus.OK, 'Product fetched successfully', product)
  }

  async getProductByCatgory(query: ProductQueryDto): Promise<any> {
    const { category_id } = query
    const products = await this.productsRepository.find({
      where: {
        category_id
      }
    })
    return ResponseUtils.serverResponse(true, HttpStatus.OK, 'Products fetched successfully', products)
  }

  async createProductCategory({ name }: CreateProductCategory): Promise<any> {
    const catgeories = await this.productCategoriesRepository.find()

    catgeories.forEach(catgeory => {
      if (catgeory.name === name) {
        throw new ConflictException(ResponseUtils.serverResponse(false, HttpStatus.CONFLICT, 'Product category name already exist'))
      }
    })

    const id = await CategoryID.generateId(name)
    await this.productCategoriesRepository.insert({ id, name })

    return ResponseUtils.serverResponse(true, HttpStatus.CREATED, 'Product catgeory created successfully')
  }

  async getAllProductCategories(): Promise<any> {

    const categories = await this.productCategoriesRepository.find()

    return ResponseUtils.serverResponse(true, HttpStatus.OK, 'Product Categories fetched successfully', categories)
  }
}
