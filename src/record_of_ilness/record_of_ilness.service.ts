import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordOfIlnessDto } from './dto/create-record_of_ilness.dto';
import { UpdateRecordOfIlnessDto } from './dto/update-record_of_ilness.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';
import { Model } from 'mongoose';
import { Worker, WorkerDocument } from '../worker/schemas/worker.schema';
import { RecordOfIlness, RecordOfIlnessDocument } from './schemas/record_of_ilness.schema';

@Injectable()
export class RecordOfIlnessService {
  constructor(
    @InjectModel(RecordOfIlness.name) private recordOfIlnessModel: Model<RecordOfIlnessDocument>,
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>

  ){}

  async create(createRecordOfIlnessDto: CreateRecordOfIlnessDto) {
    const { animal_id } = createRecordOfIlnessDto;
    const { worker_id } = createRecordOfIlnessDto;


    const animal = await this.animalModel.findById(animal_id);
    if (!animal) {
      throw new BadRequestException('Bunday animal yoq');
    }

    const worker = await this.workerModel.findById(worker_id);
    if (!worker) {
      throw new BadRequestException('Bunday worker yoq');
    }

    const recordOfIlness = await this.recordOfIlnessModel.create(createRecordOfIlnessDto);
    animal.recordOfIlnesses.push(recordOfIlness);
    await animal.save()
    worker.recordOfIlnesses.push(recordOfIlness);
    await worker.save()
    console.log(2);
    return recordOfIlness;
  }

  findAll() {
    return this.recordOfIlnessModel.find();
  }

  async findOne(id: string) {
    return ((await this.recordOfIlnessModel.findById(id).exec()));
  }

  async update(id: string, updateRecordOfIlnessDto: UpdateRecordOfIlnessDto) {
    const existingrecordOfIlness = await this.animalModel
    .findByIdAndUpdate(id, updateRecordOfIlnessDto, { new: true})
    .exec();
    if(!existingrecordOfIlness) {
      throw new NotFoundException(`RecordOfIlness #${id} not found`);
    }
    return existingrecordOfIlness;
  }

  remove(id: string) {
    return this.recordOfIlnessModel.findByIdAndDelete(id);
  }
}
