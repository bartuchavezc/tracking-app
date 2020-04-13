import { StoreConnector } from './Connection';

export const dbStoreProvider = {
    provide: 'STORE_DB_CONNECTOR',
    useClass: StoreConnector
};