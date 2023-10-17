import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFiberProductionDto } from './dto/create-fiber_production.dto';
import { UpdateFiberProductionDto } from './dto/update-fiber_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';
import { Model } from 'mongoose';
import { FiberProduction, FiberProductionDocument } from './schemas/fiber_production.schema';

@Injectable()
export class FiberProductionService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(FiberProduction.name) private fiberProductionModel: Model<FiberProductionDocument>,

  ){}

  async create(createFiberProductionDto: CreateFiberProductionDto) {
    const { animal_id } = createFiberProductionDto;


    const animal = await this.animalModel.findById(animal_id);
    if (!animal) {
      throw new BadRequestException('Bunday animal yoq');
    }

    const fiberProduction = await this.fiberProductionModel.create(createFiberProductionDto);
    animal.fiberProductions.push(fiberProduction);
    await animal.save()
    return fiberProduction;
  }

  findAll() {
    return this.fiberProductionModel.find();
  }

  async findOne(id: string) {
    return ((await this.fiberProductionModel.findById(id).exec()));
  }

  async update(id: string, updateFiberProductionDto: UpdateFiberProductionDto) {
    const existingfiberProduction = await this.animalModel
    .findByIdAndUpdate(id, updateFiberProductionDto, { new: true})
    .exec();
    if(!existingfiberProduction) {
      throw new NotFoundException(`fiberProduction #${id} not found`);
    }
    return existingfiberProduction;
  }

  remove(id: string) {
    return this.fiberProductionModel.findByIdAndDelete(id);
  }
}
