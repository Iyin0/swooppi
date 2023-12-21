import { ResponseUtils } from '@/common/utils/response.utils';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3ClientService {
    private readonly s3Client = new S3Client({
        region: this.configService.get<string>('AWS_S3_REGION')
    })

    constructor(private readonly configService: ConfigService) { }

    async uploadFile(Bucket: string, Key: string, Body: Buffer, ContentType: string) {
        try {
            await this.s3Client.send(
                new PutObjectCommand({
                    Bucket,
                    Key,
                    Body,
                    ContentType,
                    ACL: 'public-read'
                })
            )
            return {
                location: `https://${Bucket}.s3.amazonaws.com/${Key}`,
                key: Key
            }
        } catch (error) {
            throw new InternalServerErrorException(ResponseUtils.serverResponse(false, HttpStatus.INTERNAL_SERVER_ERROR, 'Error uploading Image. Try again'))
        }
    }

    async deleteFile(Bucket: string, Key: string) {
        try {
            await this.s3Client.send(
                new DeleteObjectCommand({
                    Bucket,
                    Key
                })
            )
        } catch (error) {
            throw new InternalServerErrorException(ResponseUtils.serverResponse(false, HttpStatus.INTERNAL_SERVER_ERROR, 'Error deleting Image. Try again'))
        }
    }
}
