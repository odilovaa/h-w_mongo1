import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeatPtoductionService } from './meat_ptoduction.service';
import { CreateMeatPtoductionDto } from './dto/create-meat_ptoduction.dto';
import { UpdateMeatPtoductionDto } from './dto/update-meat_ptoduction.dto';

@Controller('meat-ptoduction')
export class MeatPtoductionController {
  constructor(private readonly meatPtoductionService: MeatPtoductionService) {}

  @Post()
  create(@Body() createMeatPtoductionDto: CreateMeatPtoductionDto) {
    return this.meatPtoductionService.create(createMeatPtoductionDto);
  }

  @Get()
  findAll() {
    return this.meatPtoductionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meatPtoductionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeatPtoductionDto: UpdateMeatPtoductionDto) {
    return this.meatPtoductionService.update(id, updateMeatPtoductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meatPtoductionService.remove(id);
  }
}
