import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalTypeDto } from './dto/create-animal_type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalType, AnimalTypeDocument } from './schemas/animal_type.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnimalTypeService {
  constructor(
    @InjectModel(AnimalType.name) private animalTypeModel: Model<AnimalTypeDocument>
  ){}
  create(createAnimalTypeDto: CreateAnimalTypeDto) {
    return this.animalTypeModel.create(createAnimalTypeDto);
  } 

  findAll() {
    return this.animalTypeModel.find().populate('animals');
  }

  async findOne(id: string) {
    return (await this.animalTypeModel.findById(id)).populate('animals');
  }

  async update(id: string, updateAnimalTypeDto: UpdateAnimalTypeDto) {
    const existinganimalType = await this.animalTypeModel
    .findByIdAndUpdate(id, updateAnimalTypeDto, { new: true})
    .exec();
    if(!existinganimalType) {
      throw new NotFoundException(`Animal type #${id} not found`);
    }
    return existinganimalType;
  }

  async remove(id: string) {
    return this.animalTypeModel.findByIdAndDelete(id);
  }
}