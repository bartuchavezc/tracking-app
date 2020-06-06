import { Module } from "@nestjs/common";
import { MannagementModules } from "./MannagementModules";

@Module({
    imports: [
        ...MannagementModules
    ]
})
export class MannagementModule {

}