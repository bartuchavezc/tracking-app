import { Port } from "./Port";

export interface PortWriteRepository {
    save(port: Port, event: String): Promise<unknown>
}