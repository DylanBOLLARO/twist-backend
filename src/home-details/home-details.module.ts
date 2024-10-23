import { Module } from '@nestjs/common'
import { HomeDetailsService } from './home-details.service'
import { HomeDetailsController } from './home-details.controller'
import { AtStrategy, RtStrategy } from 'src/auth/strategies'
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [JwtModule.register({})],
    controllers: [HomeDetailsController],
    providers: [HomeDetailsService, AtStrategy, RtStrategy],
})
export class HomeDetailsModule {}
