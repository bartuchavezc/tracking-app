import { Controller, Get } from "@nestjs/common";
import { WebController } from "../../Shared/application/nest/WebController";

@Controller("services")
export class OServiceQueryController extends WebController {

    @Get()
    __invoke(): String {
        return "Owner Services"
    }

}