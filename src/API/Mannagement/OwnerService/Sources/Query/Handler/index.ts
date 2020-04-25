import { NestOServiceAllQueryHanlder } from "./NestOServiceAllQueryHandler";
import { NestOServiceCriteriaQueryHandler } from "./NestOServiceCriteriaQueryHandler"

export const OServiceQueryHandlerProviders = [
    NestOServiceAllQueryHanlder,
    NestOServiceCriteriaQueryHandler
]