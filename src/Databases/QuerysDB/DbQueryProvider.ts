import { DbQueryConnection } from './DbQueryConnection';

export const DbQueryProvider = {
    provide: 'QUERY_DB_CONNECTION',
    useClass: DbQueryConnection 
};