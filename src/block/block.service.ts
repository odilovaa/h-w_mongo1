import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Block, BlockDocument } from './schemas/block.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(Block.name) private blockModel: Model<BlockDocument>
  ){}

  create(createBlockDto: CreateBlockDto) {
    return this.blockModel.create(createBlockDto);
  }

  findAll() {
    return this.blockModel.find().populate('block_workers');
  }

  findOne(id: number) {
    return `This action returns a #${id} block`;
  }

  update(id: number, updateBlockDto: UpdateBlockDto) {
    return `This action updates a #${id} block`;
  }

  remove(id: number) {
    return `This action removes a #${id} block`;
  }
}
