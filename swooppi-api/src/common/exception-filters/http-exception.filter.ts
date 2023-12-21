import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        let message: string;

        if (typeof exception.getResponse() === 'object') {
            // If the response is an object, try to access the 'message' property
            message = (exception.getResponse() as any).message || 'Internal server error';
        } else {
            // If the response is not an object, use it as the message
            message = exception.getResponse() as string;
        }


        response
            .status(status)
            .json({
                message,
                statusCode: status,
                success: false,
                // timestamp: new Date().toISOString(),
                // path: request.url,
            });
    }
}