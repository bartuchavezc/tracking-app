import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

//Modules
import { CustomerModule } from './Mannagement/Customer/Customer.module';
@Module({
    imports: [ CustomerModule, ConfigModule.forRoot({isGlobal: true}) ]
})
export class ServerModule {}