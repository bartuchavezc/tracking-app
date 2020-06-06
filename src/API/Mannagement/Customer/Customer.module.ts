import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CqrsModule, CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from 'src/Databases/Database.module';

//Controllers
import { CustomerControllers } from './Controllers/';

/*********************************************************************
 *                        IMPORTS PROVIDERS                          *
 *********************************************************************/

//  Service providers
import { CustomerServiceProvider } from 'src/APP/Mannagement/Customer/Application/Services/CustomerServiceProvider';

//  Repository providers
import { CustomerRepositoryProvider } from 'src/APP/Mannagement/Customer/Infraestructure/Persistence/CustomerRepositoryProvider';

//  Hanlder providers
import { CustomerCommandHandlerProviders } from './Sources/Command/Handlers';
import { CustomerQueryHandlerProviders } from './Sources/Query/Handler';
import { LoggerProvider } from 'src/APP/Shared/Logger';
import { ValidatorModule } from 'src/API/Validator/Validator.module';

@Module({
    imports: [
        DatabaseModule,
        ValidatorModule,
        CqrsModule,
        ConfigModule
    ],
    controllers: [
        ...CustomerControllers
    ],
    providers: [
        ...CustomerRepositoryProvider,
        ...CustomerServiceProvider,
        ...CustomerCommandHandlerProviders,
        ...CustomerQueryHandlerProviders,
        LoggerProvider
    ]
})
export class CustomerModule implements OnModuleInit {

    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus
    ) { }

    async onModuleInit() {
        
        this.command$.register([
            ...CustomerCommandHandlerProviders
        ]);

        this.query$.register([
            ...CustomerQueryHandlerProviders
        ]);

        this.event$.register([]);
    }

}