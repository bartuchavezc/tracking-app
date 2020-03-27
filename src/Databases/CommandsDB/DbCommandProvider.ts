import { DbCommandConnection } from './DbCommandConnection';

export const DbCommandProvider = {
    provide: 'COMMAND_DB_CONNECTION',
    useClass: DbCommandConnection
}