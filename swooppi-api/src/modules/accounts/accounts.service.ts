import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Bcrypt } from 'src/common/utils/bcrypt.utils';
import { ResponseUtils } from 'src/common/utils/response.utils';
import { Timestamp } from 'src/common/utils/timestamp.utils';
import { UserService } from '../user/user.service';
import { Accounts, Cart } from '@/config/entities/index.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountsService {

  constructor(
    @InjectRepository(Accounts)
    private accountRepository: Repository<Accounts>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async signup({ first_name, last_name, email, password, user_type }: CreateAccountDto): Promise<any> {

    const user = await this.userService.getUserByEmail(email)

    // if user has exisitng account
    if (user[0]) throw new ConflictException(ResponseUtils.serverResponse(false, HttpStatus.CONFLICT, 'User has an existing account'))

    // if user does not have existing account
    const salt = await Bcrypt.generateSalt()
    const hashedPassword = await Bcrypt.generateHash(password, salt)
    const created_at = await Timestamp.getCurrentTimestamp()

    const data: any = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      user_type,
      created_at
    }

    await this.accountRepository.insert(data)
    if (user_type === 'customer') await this.cartRepository.insert({ user_id: data.id })
    return ResponseUtils.serverResponse(true, HttpStatus.CREATED, 'Account created successfully');
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };

    const data = {
      ...user,
      token: this.jwtService.sign(payload),
    }
    return ResponseUtils.serverResponse(true, HttpStatus.OK, 'User Logged in successfully', data);
  }

  async validateUser({ email, password }: UpdateAccountDto): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (!user[0]) {
      throw new NotFoundException(
        ResponseUtils.serverResponse(false, HttpStatus.NOT_FOUND, 'User Email or password incorrect')
      );
    }

    const matches = await Bcrypt.verifyMatch(password, user[0].password)
    if (!matches) {
      throw new BadRequestException(
        ResponseUtils.serverResponse(false, HttpStatus.BAD_REQUEST, 'User Email or password incorrect')
      );
    }

    const data = {
      id: user[0].id,
      email: user[0].email,
      first_name: user[0].first_name,
      last_name: user[0].last_name,
      user_type: user[0].user_type,
    }

    return data
  }

}
