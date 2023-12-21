import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private accountService: AccountsService) {
        super({ usernameField: 'email' });
    }

    async validate(username: string, password: string): Promise<any> {
        const loginDto = { email: username, password: password };
        return await this.accountService.validateUser(loginDto);
    }
}