import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { apiPrefix } from 'src/common/utils/routes.utils';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from '@/common/decorators/setMetaData.pipe';

@Controller(`${apiPrefix}accounts`)
@Public()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post('/auth/signup')
  async signup(@Body() createAccountDto: CreateAccountDto): Promise<any> {
    return await this.accountsService.signup(createAccountDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req: any): Promise<any> {
    return await this.accountsService.login(req.user);
  }
}
