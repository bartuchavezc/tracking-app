//nnestjs
import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CqrsModule, CommandBus, EventBus } from '@nestjs/cqrs'

//Controllers
import { CustomerControllers } from './Controllers/';

//comand handler
import { CustomerCreateCommandHanlder } from './Commands/Handlers/CustomerCreateCommandHandler';

//event handler
import { CustomerCreatedEventHanlder } from './Events/Handlers/CustomerCreatedEventHanlder';

//customer event store repository
import { CustomerStoreMongooseRepository } from 'src/APP/Mannagement/Customer/Infraestructure/EventStore/Mongoose/CustomerStoreMongooseRepository';

import { ConfigModule } from '@nestjs/config';

//customer addapters
import { CustomerCreator } from 'src/APP/Mannagement/Customer/Application/Create/CustomerCreator';
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
        /**
         * Customer Command handler
         */
        CustomerCreateCommandHanlder,
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