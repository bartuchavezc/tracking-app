import { Module } from "@nestjs/common";
import { MannagementModules } from "./MannagementModules";

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