import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';
import { Model } from 'mongoose';
import { Worker, WorkerDocument } from '../worker/schemas/worker.schema';
import { Feeding, FeedingDocument } from './schemas/feeding.schema';

@Injectable()
export class FeedingService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(Feeding.name) private feedingModel: Model<FeedingDocument>,
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>

  ){}

  async create(createFeedingDto: CreateFeedingDto) {
    const { animal_id } = createFeedingDto;
    const { worker_id } = createFeedingDto;


    const animal = await this.animalModel.findById(animal_id);
    if (!animal) {
      throw new BadRequestException('Bunday animal yoq');
    }

    const worker = await this.workerModel.findById(worker_id);
    if (!worker) {
      throw new BadRequestException('Bunday worker yoq');
    }

    const feeding = await this.feedingModel.create(createFeedingDto);
    animal.feedings.push(feeding);
    await animal.save()
    worker.feedings.push(feeding);
    await worker.save()
    return feeding;
  }

  findAll() {
    return this.feedingModel.find();
  }

  async findOne(id: string) {
    return ((await this.feedingModel.findById(id).exec()));
  }

  async update(id: string, updateFeedingDto: UpdateFeedingDto) {
    const existingFeeding = await this.feedingModel
    .findByIdAndUpdate(id, updateFeedingDto, { new: true})
    .exec();
    if(!existingFeeding) {
      throw new NotFoundException(`Feeding #${id} not found`);
    }
    return existingFeeding;
  }

  remove(id: string) {
    return this.feedingModel.findByIdAndDelete(id);
  }
}
