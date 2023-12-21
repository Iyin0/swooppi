import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from '@/config/entities/index.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Accounts)
    private usersRepository: Repository<Accounts>,
  ) { }

  async getUserByEmail(email: String): Promise<any> {
    const user = await this.usersRepository.query(
      `select id, first_name, last_name, email, user_type, password from accounts where email='${email}'`);
    return user
  }
}
