import { Module } from '@nestjs/common';
import { MojarService } from './mojar.service';
import { MojarController } from './mojar.controller';
import { Mojar } from './entities/mojar.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Mojar])],
  controllers: [MojarController],
  providers: [MojarService],
  exports: [MojarService],
})
export class MojarModule {}
