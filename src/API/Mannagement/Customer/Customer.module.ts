//nnestjs
import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CqrsModule, CommandBus, EventBus } from '@nestjs/cqrs'

//Controllers
import { CustomerControllers } from './Controllers/';

//comand handler
import { CustomerCreateCommandHanlder } from './Commands/Handlers/CustomerCreateCommandHandler';
import { CustomerUpdateCommandHanlder } from './Commands/Handlers/CustomerUpdateCommandHanlder'

//event handler
import { CustomerCreatedEventHanlder } from './Events/Handlers/CustomerCreatedEventHanlder';

//customer event store repository
import { CustomerStoreMongooseRepository } from 'src/APP/Mannagement/Customer/Infraestructure/EventStore/Mongoose/CustomerStoreMongooseRepository';

import { ConfigModule } from '@nestjs/config';

//customer application services
import { CustomerCreator } from 'src/APP/Mannagement/Customer/Application/Create/CustomerCreator';
import { CustomerChangeNameService } from 'src/APP/Mannagement/Customer/Application/Update/CustomerChangeNameService';
import { CustomerChangeContactService } from 'src/APP/Mannagement/Customer/Application/Update/CustomerChangeContactService';

import { DatabaseModule } from 'src/Databases/Database.module';

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
            useClass: CustomerStoreMongooseRepository
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
        /**
         * Customer Command handlers
         */
        CustomerCreateCommandHanlder,
        CustomerUpdateCommandHanlder,
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
        private readonly event$: EventBus
    ) { }

    async onModuleInit(){
        
        this.command$.register([
            CustomerCreateCommandHanlder
        ]);
        
        this.event$.register([
            CustomerCreatedEventHanlder
        ]);
    }

}