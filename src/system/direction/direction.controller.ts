import { Controller, Post, Body } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { DeleteDirectionDto } from './dto/delete-direction.dto';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('direction')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Post('create')
  async create(@Body() createDirectionDto: CreateDirectionDto) {
    return this.directionService.createDirection(createDirectionDto);
  }

  @Post('update')
  async update(@Body() updateDirectionDto: UpdateDirectionDto) {
    return this.directionService.updateDirection(updateDirectionDto);
  }

  @Post('get')
  @Public()
  async get() {
    return this.directionService.getAllDirections();
  }

  @Post('delete')
  async delete(@Body() deleteDirectionDto: DeleteDirectionDto) {
    return this.directionService.deleteDirection(deleteDirectionDto);
  }
}
