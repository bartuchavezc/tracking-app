import { Module } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { CommandBus, QueryBus, EventBus, CqrsModule } from "@nestjs/cqrs";
import { PortFinderEndpoint } from "./Controllers/PortFinderController";
import { ValidatorModule } from "src/API/Validator/Validator.module";
import { LoggerProvider } from "src/APP/Shared/Logger";
import { PortServiceProviders } from "src/APP/Mannagement/Port/Application/Service/PortServiceProviders";
import { GeocodeServiceProvider } from "src/APP/Mannagement/Port/Infraestructure/GeocodingAPI/GeocodeServiceProvider";
import { PortQueryHandlerProviders } from "./Querys/PortQueryHandlerProviders";
import { PortRepositoryProviders } from "src/APP/Mannagement/Port/Infraestructure/Persistence/PortRepositoryProviders";
import { DatabaseModule } from "src/Databases/Database.module";
import { ConfigModule } from "@nestjs/config";
import { PortSaveServiceProvider } from "src/APP/Mannagement/Port/Domain/Services/Save/PortSaveServiceProviders";

@Module({
    imports: [
        CqrsModule,
        ValidatorModule,
        DatabaseModule,
        ConfigModule
    ],
    controllers: [
        PortFinderEndpoint
    ],
    providers: [
        ...PortServiceProviders,
        ...GeocodeServiceProvider,
        ...PortRepositoryProviders,
        ...PortQueryHandlerProviders,
        ...PortSaveServiceProvider,
        LoggerProvider
    ]
})
export class PortModule {

    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus,
        private readonly query$: QueryBus
    ) { }

    async onModuleInit() {
        this.query$.register([
            ...PortQueryHandlerProviders
        ]);
    }

}