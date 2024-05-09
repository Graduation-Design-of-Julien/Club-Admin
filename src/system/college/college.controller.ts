import { Controller, Post, Body } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { DeleteCollegeDto } from './dto/delete-college.dto';

@Controller('college')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @Post('create')
  async create(@Body() createCollegeDto: CreateCollegeDto) {
    return this.collegeService.createCollege(createCollegeDto);
  }

  @Post('update')
  async update(@Body() updateCollegeDto: UpdateCollegeDto) {
    return this.collegeService.updateCollege(updateCollegeDto);
  }

  @Post('get')
  async get() {
    return this.collegeService.getAllColleges();
  }

  @Post('delete')
  async delete(@Body() deleteCollegeDto: DeleteCollegeDto) {
    return this.collegeService.deleteCollege(deleteCollegeDto);
  }
}
