import { NestOServiceCreateCommandHandler } from "./NestOServiceCreateCommandHandler";
import { NestOServiceUpdateCommandHandler } from "./NestOServiceUpdateCommandHanlder";

export const OServiceCommandHandlerProviders = [
    NestOServiceCreateCommandHandler,
    NestOServiceUpdateCommandHandler
]