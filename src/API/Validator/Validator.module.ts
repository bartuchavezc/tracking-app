import { ValidatorProviders } from "src/APP/Shared/Validator/Domain/ValidatorProviders";
import { ValidationServiceProvider } from "src/APP/Shared/Validator/Service/ValidationServiceProvider";
import { Module } from "@nestjs/common";

@Module({
    providers: [
        ...ValidatorProviders,
        ...ValidationServiceProvider
    ],
    exports: [
        ...ValidationServiceProvider
    ]
})
export class ValidatorModule {

}