import { TocsQueryHandler } from "./TocsQueryHandler";
import { SearchTocsByCriteriaQueryHanlder } from "./SearchTocsByCriteriaQueryHandler";
import { SearchOneTypeOfCargoQueryHandler } from "./NestSearchOneTypeOfCargoQueryHanlder";

export const TocQueryHandlerProviders = [
    TocsQueryHandler,
    SearchTocsByCriteriaQueryHanlder,
    SearchOneTypeOfCargoQueryHandler
]