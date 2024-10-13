import { Module } from '@nestjs/common';
import { HomeDetailsService } from './home-details.service';
import { HomeDetailsController } from './home-details.controller';

@Module({
  controllers: [HomeDetailsController],
  providers: [HomeDetailsService],
})
export class HomeDetailsModule {}
