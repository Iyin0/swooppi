import { toNumber } from "@/common/helper/cast.helper";
import { Transform, } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";


export class CreateProductDto {
    @IsNotEmpty({ message: 'Product name is required' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'Product description is required' })
    @IsString()
    description: string;

    @IsNotEmpty({ message: 'Product Ingredients is required' })
    @IsString()
    ingredients: string;

    @IsNotEmpty({ message: 'Product Category ID is required' })
    @IsString()
    category_id: string;

    @IsNotEmpty({ message: 'Product default price is required' })
    @Transform((({ value }) => toNumber(value, { default: 1, min: 1 })))
    @IsNumber()
    default_price: string;

    @Transform((({ value }) => toNumber(value, { default: 1, min: 1 })))
    @IsNumber()
    sales_price: number;

    @IsOptional()
    @IsObject()
    required_options: any

    @IsOptional()
    product_image: any
}
