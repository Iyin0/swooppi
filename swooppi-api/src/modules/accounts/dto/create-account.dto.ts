import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { IsUserType } from "src/common/decorators/user_type.pipe";

export class CreateAccountDto {
    @IsNotEmpty({ message: 'First name is required' })
    @IsString()
    first_name: string;

    @IsNotEmpty({ message: 'Last name is required' })
    @IsString()
    last_name: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Email address is required' })
    @IsString()
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
        { message: 'Password not strong enough. Password must contain at least one lowercase, one uppercae, one number and one special character' })
    password: string;

    @IsNotEmpty({ message: 'User type is required' })
    @IsString()
    @IsUserType()
    user_type: string;
}
