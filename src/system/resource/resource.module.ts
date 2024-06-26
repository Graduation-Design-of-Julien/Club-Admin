import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { ResourceType } from './entities/resuorce.type.entity';
import { ResourceBorrow } from './entities/resource.borrow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, ResourceType, ResourceBorrow])],
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}
