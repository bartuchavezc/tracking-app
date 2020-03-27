import { AppConfig } from "../../../Shared/app.config";

import { Controller, Get } from "@nestjs/common";

@Controller(`${AppConfig.MainRoute}/customer`)
export class CustomerQueryController {

    @Get()
    __invoke(): string {
        return 'Hello world from query controller on -> /mannagement/customer';
    }

}