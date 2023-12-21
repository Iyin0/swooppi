import { entities } from "@/config/entities/index.entities";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB.HOST'),
        port: configService.get<number>('DB.PORT'),
        username: configService.get<string>('DB.USER'),
        password: configService.get<string>('DB.PASSWORD'),
        database: configService.get<string>('DB.NAME'),
        entities: entities,
        synchronize: false,
    })
}