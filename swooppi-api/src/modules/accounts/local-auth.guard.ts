import { BadRequestException, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { ResponseUtils } from '@/common/utils/response.utils';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>()
        const response = context.switchToHttp().getResponse<Response>()

        const body = plainToClass(UpdateAccountDto, request.body)

        const errors = await validate(body)

        const errorMessages = errors.flatMap(({ constraints }) => Object.values(constraints))

        if (errorMessages.length > 0) {
            throw new BadRequestException(ResponseUtils.serverResponse(false, HttpStatus.BAD_REQUEST, errorMessages))
        }

        return super.canActivate(context) as boolean | Promise<boolean>;
    }
}