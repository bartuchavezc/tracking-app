import { MongooseDB } from './MongooseDB'

export const DatabaseProviders = [
    {
        provide: 'STORE_DB_CONNECTOR',
        useClass: MongooseDB
    }
]