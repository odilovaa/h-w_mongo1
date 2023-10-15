import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from './schemas/animal.schema';
import { Model } from 'mongoose';
import { AnimalType, AnimalTypeDocument } from '../animal_type/schemas/animal_type.schema';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(AnimalType.name) private animalTypeModel: Model<AnimalTypeDocument>
  ){}

  async create(createAnimalDto: CreateAnimalDto) {
    const { animal_type_id } = createAnimalDto;

    const animal_type = await this.animalTypeModel.findById(animal_type_id);
    if (!animal_type) {
      throw new BadRequestException('Bunday animal_type yoq');
    }

    const animal = await this.animalModel.create(createAnimalDto);
    animal_type.animals.push(animal);
    await animal_type.save()
    return animal;
  }

  findAll() {
    return this.animalModel.find().populate('vaccinationHistories');
  }

  async findOne(id: string) {
    return ((await this.animalModel.findById(id).populate('vaccinationHistories')));
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    const existinganimal = await this.animalModel
    .findByIdAndUpdate(id, updateAnimalDto, { new: true})
    .exec();
    if(!existinganimal) {
      throw new NotFoundException(`Animal #${id} not found`);
    }
    return existinganimal;
  }

  remove(id: string) {
    return this.animalModel.findByIdAndDelete(id);
  }
}
