//nnestjs
import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CqrsModule, CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'

//Controllers
import { CustomerControllers } from './Controllers/';

//comand handler
import { CustomerCreateCommandHanlder } from './Commands/Handlers/CustomerCreateCommandHandler';
import { CustomerUpdateCommandHanlder } from './Commands/Handlers/CustomerUpdateCommandHanlder'

//event handler
import { CustomerCreatedEventHanlder } from './Events/Handlers/CustomerCreatedEventHanlder';

import { ConfigModule } from '@nestjs/config';

//customer application services
import { CustomerCreator } from 'src/APP/Mannagement/Customer/Application/Create/CustomerCreator';
import { CustomerChangeNameService } from 'src/APP/Mannagement/Customer/Application/Update/CustomerChangeNameService';
import { CustomerChangeContactService } from 'src/APP/Mannagement/Customer/Application/Update/CustomerChangeContactService';

import { DatabaseModule } from 'src/Databases/Database.module';
import { AllCustomerQueryHandler } from './Query/Handler/AllCustomerQueryHanlder';
import { SearchAllCustomersService } from 'src/APP/Mannagement/Customer/Application/SearchAll/SearchAllCustomersService';
import { EventCustomerMongoRepository } from 'src/APP/Mannagement/Customer/Infraestructure/EventStore/Mongodb/Repository/EventCustomerMongoRepository';

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
        {
            provide: 'CustomerCreator',
            useClass: CustomerCreator
        },
        {
            provide: "CustomerChangeNameService",
            useClass: CustomerChangeNameService
        },
        {
            provide: "CustomerChangeContactService",
            useClass: CustomerChangeContactService
        },
        {
            provide: "SearchAllCustomersService",
            useClass: SearchAllCustomersService
        },
        /**
         * Customer Command handlers
         */
        CustomerCreateCommandHanlder,
        CustomerUpdateCommandHanlder,
        /**
         * Customer query handlers
         */
        AllCustomerQueryHandler,
        /**
         * Customer Event handler
         */
        CustomerCreatedEventHanlder
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
        ]);
        
        this.event$.register([
            CustomerCreatedEventHanlder
        ]);
    }

}