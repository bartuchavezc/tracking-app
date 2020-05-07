import { ConsoleLogger } from "./ConsoleLogger";

export const LoggerProvider = {
    provide: "LoggerProvider",
    useClass: ConsoleLogger
}