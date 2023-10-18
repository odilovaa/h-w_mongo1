import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block, BlockDocument } from '../block/schemas/block.schema';
import { Info, InfoDocument } from './schemas/info.schema';

@Injectable()
export class InfoService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(Block.name) private blockModel: Model<BlockDocument>,
    @InjectModel(Info.name) private infoModel: Model<InfoDocument>,

  ){}

  async create(createInfoDto: CreateInfoDto) {
    const { animal_id } = createInfoDto;
    const { parent_id } = createInfoDto;
    const { block_id } = createInfoDto;


    const animal = await this.animalModel.findById(animal_id);
    if (!animal) {
      throw new BadRequestException('Bunday animal yoq');
    }

    const parent = await this.animalModel.findById(parent_id);
    if (!parent) {
      throw new BadRequestException('Bunday parent yoq');
    }

    const block = await this.blockModel.findById(block_id);
    if (!block) {
      throw new BadRequestException('Bunday worker yoq');
    }

    const info = await this.infoModel.create(createInfoDto);
    animal.infos.push(info);
    await animal.save()
    parent.child_infos.push(info);
    await parent.save()
    block.infos.push(info);
    await block.save()
    return info;
  }

  findAll() {
    return this.infoModel.find();
  }

  async findOne(id: string) {
    return ((await this.infoModel.findById(id).exec()));
  }

  async update(id: string, updateInfoDto: UpdateInfoDto) {
    const existinginfo = await this.infoModel
    .findByIdAndUpdate(id, UpdateInfoDto, { new: true})
    .exec();
    if(!existinginfo) {
      throw new NotFoundException(`info #${id} not found`);
    }
    return existinginfo;
  }

  remove(id: string) {
    return this.infoModel.findByIdAndDelete(id);
  }
}
