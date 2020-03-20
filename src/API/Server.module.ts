import { Module } from '@nestjs/common'

//Modules
import { CustomerModule } from './Mannagement/Customer/Customer.module';

@Module({
    imports: [CustomerModule]
})
export class ServerModule {}