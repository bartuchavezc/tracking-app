import { NestOServiceAllQueryHanlder } from "./NestOServiceAllQueryHandler";
import { NestOServiceCriteriaQueryHandler } from "./NestOServiceCriteriaQueryHandler"
import { NestOneOServiceQueryHanlder } from "./NestOneOServiceQueryHandler";

export const OServiceQueryHandlerProviders = [
    NestOServiceAllQueryHanlder,
    NestOServiceCriteriaQueryHandler,
    NestOneOServiceQueryHanlder
]