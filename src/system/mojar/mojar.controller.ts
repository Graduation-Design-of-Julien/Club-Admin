import { Controller, Post, Body } from '@nestjs/common';
import { MojarService } from './mojar.service';
import { CreateMojarDto } from './dto/create-mojar.dto';
import { UpdateMojarDto } from './dto/update-mojar.dto';
import { DeleteMojarDto } from './dto/delete-mojar.dto';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('mojar')
export class MojarController {
  constructor(private readonly mojarService: MojarService) {}

  @Post('create')
  async create(@Body() createMojarDto: CreateMojarDto) {
    return this.mojarService.createMojar(createMojarDto);
  }

  @Post('update')
  async update(@Body() updateMojarDto: UpdateMojarDto) {
    return this.mojarService.updateMojar(updateMojarDto);
  }

  @Post('get')
  @Public()
  async get() {
    return this.mojarService.getAllMojars();
  }

  @Post('delete')
  async delete(@Body() deleteMojarDto: DeleteMojarDto) {
    return this.mojarService.deleteMojar(deleteMojarDto);
  }
}
