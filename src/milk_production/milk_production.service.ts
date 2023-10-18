import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMilkProductionDto } from './dto/create-milk_production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';
import { Model } from 'mongoose';
import { MilkProduction, MilkProductionDocument } from './schemas/milk_production.schema';

@Injectable()
export class MilkProductionService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(MilkProduction.name) private milkProductionModel: Model<MilkProductionDocument>,

  ){}

  async create(createMilkProductionDto: CreateMilkProductionDto) {
    const { animal_id } = createMilkProductionDto;


    const animal = await this.animalModel.findById(animal_id);
    if (!animal) {
      throw new BadRequestException('Bunday animal yoq');
    }

    const milkProduction = await this.milkProductionModel.create(createMilkProductionDto);
    animal.milkProductions.push(milkProduction);
    await animal.save()
    return milkProduction;
  }

  findAll() {
    return this.milkProductionModel.find();
  }

  async findOne(id: string) {
    return ((await this.milkProductionModel.findById(id).exec()));
  }

  async update(id: string, updateMilkProductionDto: UpdateMilkProductionDto) {
    const existingMilkProduction = await this.milkProductionModel
    .findByIdAndUpdate(id, updateMilkProductionDto, { new: true})
    .exec();
    if(!existingMilkProduction) {
      throw new NotFoundException(`MilkProduction #${id} not found`);
    }
    return existingMilkProduction;
  }

  remove(id: string) {
    return this.milkProductionModel.findByIdAndDelete(id);
  }
}
