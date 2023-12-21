import { toNumber } from "@/common/helper/cast.helper";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class AddToCartDto {
    @IsNotEmpty({ message: 'Product ID is required' })
    @IsString()
    product_id: string;

    @IsNotEmpty({ message: 'Product ID is required' })
    @Transform((({ value }) => toNumber(value, { default: 1, min: 1 })))
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsObject()
    required_options: any
}
