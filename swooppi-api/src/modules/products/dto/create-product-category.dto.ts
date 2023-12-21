import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductCategory {
    @IsNotEmpty({ message: 'Category name is required' })
    @IsString()
    name: string;
}