import { Module } from "@nestjs/common";
import { CqrsModule, EventBus, QueryBus, CommandBus } from "@nestjs/cqrs";
import { DatabaseModule } from "src/Databases/Database.module";
import { ConfigModule } from "@nestjs/config";
import { TocControllersProvider } from "./Controllers";
import { TocServicesProvider } from "src/APP/Mannagement/TypesOfCargo/Application/Services";
import { TocCommandHandlersProvider } from "./Sources/Command/Hanlder";
import { TocRepositoryProvider } from "src/APP/Mannagement/TypesOfCargo/Infraestructure/Persistence/TocRepositoryProvider";
import { ModuleRef } from "@nestjs/core";
import { LoggerProvider } from "src/APP/Shared/Domain/Logger";
import { TocQueryHandlerProviders } from "./Sources/Query/Handler";

@Module({
    imports: [
        CqrsModule,
        DatabaseModule,
        ConfigModule
    ],
    controllers: [
        ...TocControllersProvider
    ],
    providers: [
        ...TocServicesProvider,
        ...TocCommandHandlersProvider,
        ...TocQueryHandlerProviders,
        ...TocRepositoryProvider,
        LoggerProvider
    ]
})
export class TypeOfCargoModule {

    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus,
        private readonly query$: QueryBus,
        private readonly event$: EventBus
    ) { }

    async onModuleInit() {

        this.command$.register([
            ...TocCommandHandlersProvider
        ]);

        this.query$.register([
            ...TocQueryHandlerProviders
        ]);

        this.event$.register([]);
    }

}