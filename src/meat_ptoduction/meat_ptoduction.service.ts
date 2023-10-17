import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeatPtoductionDto } from './dto/create-meat_ptoduction.dto';
import { UpdateMeatPtoductionDto } from './dto/update-meat_ptoduction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';
import { Model } from 'mongoose';
import { MeatPtoduction, MeatPtoductionDocument } from './schemas/meat_ptoduction.schema';

@Injectable()
export class MeatPtoductionService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(MeatPtoduction.name) private meatPtoductionModel: Model<MeatPtoductionDocument>,

  ){}

  async create(createMeatPtoductionDto: CreateMeatPtoductionDto) {
    const { animal_id } = createMeatPtoductionDto;


    const animal = await this.animalModel.findById(animal_id);
    if (!animal) {
      throw new BadRequestException('Bunday animal yoq');
    }

    const meatPtoduction = await this.meatPtoductionModel.create(createMeatPtoductionDto);
    animal.meat_productions.push(meatPtoduction);
    await animal.save()
    return meatPtoduction;
  }

  findAll() {
    return this.meatPtoductionModel.find();
  }

  async findOne(id: string) {
    return ((await this.meatPtoductionModel.findById(id).exec()));
  }

  async update(id: string, updateMeatPtoductionDto: UpdateMeatPtoductionDto) {
    const existingmeatproduction = await this.animalModel
    .findByIdAndUpdate(id, updateMeatPtoductionDto, { new: true})
    .exec();
    if(!existingmeatproduction) {
      throw new NotFoundException(`meatproduction #${id} not found`);
    }
    return existingmeatproduction;
  }

  remove(id: string) {
    return this.meatPtoductionModel.findByIdAndDelete(id);
  }
}
