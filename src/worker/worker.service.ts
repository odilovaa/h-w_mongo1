import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Worker, WorkerDocument } from './schemas/worker.schema';
import { Speciality, SpecialityDocument } from '../speciality/schemas/speciality.schema';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>,
    @InjectModel(Speciality.name) private specialityModel: Model<SpecialityDocument>
  ){}

  async create(createWorkerDto: CreateWorkerDto) {
    const { speciality_id } = createWorkerDto;

    const spec = await this.specialityModel.findById(speciality_id);
    if (!spec) {
      throw new BadRequestException('Bunday mutaxassis yoq');
    }

    const worker = await this.workerModel.create(createWorkerDto);
    spec.workers.push(worker);
    await spec.save()
    return worker;
  }

  findAll() {
    return this.workerModel.find().populate('block_workers').populate('vaccinationHistories');
  }

  findOne(id: number) {
    return `This action returns a #${id} worker`;
  }

  update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return `This action updates a #${id} worker`;
  }

  remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}
