import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlockWorkerService } from './block_worker.service';
import { CreateBlockWorkerDto } from './dto/create-block_worker.dto';
import { UpdateBlockWorkerDto } from './dto/update-block_worker.dto';

@Controller('block-worker')
export class BlockWorkerController {
  constructor(private readonly blockWorkerService: BlockWorkerService) {}

  @Post()
  create(@Body() createBlockWorkerDto: CreateBlockWorkerDto) {
    return this.blockWorkerService.create(createBlockWorkerDto);
  }

  @Get()
  findAll() {
    return this.blockWorkerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockWorkerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlockWorkerDto: UpdateBlockWorkerDto) {
    return this.blockWorkerService.update(+id, updateBlockWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockWorkerService.remove(+id);
  }
}
