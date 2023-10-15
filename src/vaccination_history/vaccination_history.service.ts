import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccinationHistoryDto } from './dto/create-vaccination_history.dto';
import { UpdateVaccinationHistoryDto } from './dto/update-vaccination_history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from '../animal/schemas/animal.schema';
import { Model } from 'mongoose';
import { Vaccine, VaccineDocument } from '../vaccine/schemas/vaccine.schema';
import { VaccinationHistory, VaccinationHistoryDocument } from './schemas/vaccination_history.schema';
import { Worker, WorkerDocument } from '../worker/schemas/worker.schema';

@Injectable()
export class VaccinationHistoryService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(Vaccine.name) private vaccineModel: Model<VaccineDocument>,
    @InjectModel(VaccinationHistory.name) private vaccinationHistoryModel: Model<VaccinationHistoryDocument>,
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>

  ){}

  async create(createVaccinationHistoryDto: CreateVaccinationHistoryDto) {
    const { animal_id } = createVaccinationHistoryDto;
    const { vaccine_type_id } = createVaccinationHistoryDto;
    const { worker_id } = createVaccinationHistoryDto;


    const animal = await this.animalModel.findById(animal_id);
    if (!animal) {
      throw new BadRequestException('Bunday animal yoq');
    }

    const vaccine_type = await this.vaccineModel.findById(vaccine_type_id);
    if (!vaccine_type) {
      throw new BadRequestException('Bunday vaccine_type yoq');
    }

    const worker = await this.workerModel.findById(worker_id);
    if (!worker) {
      throw new BadRequestException('Bunday worker yoq');
    }

    const vaccinationHistory = await this.vaccinationHistoryModel.create(createVaccinationHistoryDto);
    console.log(1);
    console.log(animal.vaccinationHistories);
    animal.vaccinationHistories.push(vaccinationHistory);
    await animal.save()
    vaccine_type.vaccinationHistories.push(vaccinationHistory);
    await vaccine_type.save()
    worker.vaccinationHistories.push(vaccinationHistory);
    await worker.save()
    console.log(2);
    return vaccinationHistory;
  }

  findAll() {
    return this.vaccinationHistoryModel.find();
  }

  async findOne(id: string) {
    return ((await this.vaccinationHistoryModel.findById(id).exec()));
  }

  async update(id: string, updateVaccinationHistoryDto: UpdateVaccinationHistoryDto) {
    const existingvaccinationHistory = await this.animalModel
    .findByIdAndUpdate(id, updateVaccinationHistoryDto, { new: true})
    .exec();
    if(!existingvaccinationHistory) {
      throw new NotFoundException(`VaccinationHistory #${id} not found`);
    }
    return existingvaccinationHistory;
  }

  remove(id: string) {
    return this.vaccinationHistoryModel.findByIdAndDelete(id);
  }
}
