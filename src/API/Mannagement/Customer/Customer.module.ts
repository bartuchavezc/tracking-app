//nnestjs
import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CqrsModule, CommandBus, EventBus } from '@nestjs/cqrs'


//Controllers
import { CustomerControllers } from './Controllers/';

//repository
import { TypeOrmCustomerCommandRepository } from 'src/app/Mannagement/Customer/Infraestructure/Persistence/TypeORM/TypeOrmCustomerCommandRepository';

//comand handler
import { CustomerCreateCommandHanlder } from './Commands/Handlers/CustomerCreateCommandHandler';

//event handler
import { CustomerCreatedEventHanlder } from './Events/Handlers/CustomerCreatedEventHanlder';

//customer addapters
import { CustomerCreator } from 'src/app/Mannagement/Customer/Application/Create/CustomerCreator';

@Module({
    imports: [
        CqrsModule
    ],
    controllers: [
        ...CustomerControllers
    ],
    providers: [
        {
            provide: 'CustomerCommandRepository',
            useClass: TypeOrmCustomerCommandRepository
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