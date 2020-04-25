import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule, CommandBus, QueryBus, EventBus } from "@nestjs/cqrs";
import { OServiceControllers } from "./Controllers";
import { OServiceRepositoryProviders } from "src/APP/Mannagement/OwnerService/Infraestructure/Persistence/Mongoose/Repository";
import { DatabaseModule } from "src/Databases/Database.module";
import { OServiceServicesProvider } from "src/APP/Mannagement/OwnerService/Application/Service";
import { OServiceCommandHandlerProviders } from "./Sources/Command/Handler";
import { ModuleRef } from "@nestjs/core";
import { OServiceQueryHandlerProviders } from "./Sources/Query/Handler";

@Module({
    imports: [
        CqrsModule,
        DatabaseModule,
        ConfigModule
    ],
    controllers: [
        ...OServiceControllers
    ],
    providers: [
        ...OServiceRepositoryProviders,
        ...OServiceServicesProvider,
        ...OServiceCommandHandlerProviders,
        ...OServiceQueryHandlerProviders
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