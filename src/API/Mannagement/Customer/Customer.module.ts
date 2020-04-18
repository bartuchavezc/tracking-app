//nnestjs
import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CqrsModule, CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'

//Controllers
import { CustomerControllers } from './Controllers/';

//comand handler
import { CustomerCreateCommandHanlder } from './Sources/Command/Handlers/CustomerCreateCommandHandler';
import { CustomerUpdateCommandHanlder } from './Sources/Command/Handlers/CustomerUpdateCommandHanlder'

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/Databases/Database.module';

/*********************************************************************
 *                        IMPORTS PROVIDERS                          *
 *********************************************************************/

//*    service providers
import { CustomerServiceProvider } from 'src/APP/Mannagement/Customer/Application/Services/CustomerServiceProvider';

import { AllCustomerQueryHandler } from './Sources/Query/Handler/AllCustomerQueryHanlder';
import { EventCustomerMongoRepository } from 'src/APP/Mannagement/Customer/Infraestructure/EventStore/Mongodb/Repository/EventCustomerMongoRepository';
import { OneCustomerQueryHandler } from './Sources/Query/Handler/OneCustomerQueryHandler';

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
        {
            provide: 'CustomerStoreRepository',
            useClass: EventCustomerMongoRepository
        },
        ...CustomerServiceProvider ,
        //command handlers providers
        CustomerCreateCommandHanlder,
        CustomerUpdateCommandHanlder,
        /**
         * Customer query handlers
         */
        AllCustomerQueryHandler,
        OneCustomerQueryHandler,
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
            CustomerCreateCommandHanlder,
            CustomerUpdateCommandHanlder
        ]);

        this.query$.register([
            AllCustomerQueryHandler,
            OneCustomerQueryHandler
        ]);
        
        this.event$.register([]);
    }

}