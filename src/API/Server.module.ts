import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

//Modules
import { CustomerModule } from './Mannagement/Customer/Customer.module';
import { MannagementModules } from './Mannagement/MannagementModules';
@Module({
    imports: [ 
        ...MannagementModules, 
        ConfigModule.forRoot({isGlobal: true}) ]
})
export class ServerModule {}