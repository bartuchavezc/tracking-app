import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'

import { DatabaseProviders } from './DatabaseProviders'

@Module({
    imports: [ConfigModule],
    providers: [
        ...DatabaseProviders,
        {
            provide: 'config_service',
            useClass: ConfigService
        }
    ],
    exports: [...DatabaseProviders]
})
export class DatabaseModule {}