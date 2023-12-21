import { IsOptional, IsString } from "class-validator"

export class ProductQueryDto {

    @IsString()
    @IsOptional()
    category_id: string
}