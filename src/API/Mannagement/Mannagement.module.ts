import { Module } from "@nestjs/common";
import { MannagementModules } from "./MannagementModules";
import { LoggerProvider } from "src/APP/Shared/Domain/Logger";

@Module({
    imports: [
        ...MannagementModules
    ],
    exports: [
        ...MannagementModules
    ]
})
export class MannagementModule {

}