import { v4 as uuidV4 } from 'uuid'

export class GeneratedUuid {

    static __invoke(): string{
        return uuidV4()
    }

}