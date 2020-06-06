import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MannagementModule } from './Mannagement/Mannagement.module'

@Module({
    imports: [
        MannagementModule,
        ConfigModule.forRoot({ isGlobal: true })
    ]
})
export class ServerModule { }