import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule, CommandBus, QueryBus, EventBus } from "@nestjs/cqrs";
import { OServiceControllers } from "./Controllers";
import { DatabaseModule } from "src/Databases/Database.module";
import { OServiceServicesProvider } from "src/APP/Mannagement/OwnerService/Application/Service";
import { OServiceCommandHandlerProviders } from "./Sources/Command/Handler";
import { ModuleRef } from "@nestjs/core";
import { OServiceQueryHandlerProviders } from "./Sources/Query/Handler";
import { LoggerProvider } from "src/APP/Shared/Logger";
import { OwnerServiceRepositoryProvider } from "src/APP/Mannagement/OwnerService/Infraestructure/Persistence/OwnerServiceRepositoryProvider";
import { ValidatorModule } from "src/API/Validator/Validator.module";

@Module({
    imports: [
        CqrsModule,
        ValidatorModule,
        DatabaseModule,
        ConfigModule
    ],
    controllers: [
        ...OServiceControllers
    ],
    providers: [
        ...OServiceServicesProvider,
        ...OServiceCommandHandlerProviders,
        ...OServiceQueryHandlerProviders,
        OwnerServiceRepositoryProvider,
        LoggerProvider
    ]
})
export class OwnerServiceModule {

    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus
    ) { }

    async onModuleInit() {

        this.command$.register([
            ...OServiceCommandHandlerProviders
        ]);

        this.query$.register([
            ...OServiceQueryHandlerProviders
        ]);

        this.event$.register([]);
    }
}