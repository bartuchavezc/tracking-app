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
import { CustomerRepositoryProviders } from 'src/APP/Mannagement/Customer/Infraestructure/EventStore/Mongodb/Repository';

//  Hanlder providers
import { CustomerCommandHandlerProviders } from './Sources/Command/Handlers';
import { CustomerQueryHandlerProviders } from './Sources/Query/Handler';

@Module({
    imports: [
        DatabaseModule,
        CqrsModule,
        ConfigModule
    ],
    controllers: [
        ...CustomerControllers
    ],
    providers: [
        ...CustomerRepositoryProviders,
        ...CustomerServiceProvider ,
        ...CustomerCommandHandlerProviders,
        ...CustomerQueryHandlerProviders
    ]
})
export class CustomerModule implements OnModuleInit {

    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus
    ) { }

    async onModuleInit(){
        
        this.command$.register([
            ...CustomerCommandHandlerProviders
        ]);

        this.query$.register([
            ...CustomerQueryHandlerProviders
        ]);
        
        this.event$.register([]);
    }

}