import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vaccine, VaccineDocument } from './schemas/vaccine.schema';
import { Model } from 'mongoose';

@Injectable()
export class VaccineService {
  constructor(
    @InjectModel(Vaccine.name) private vaccineModel: Model<VaccineDocument>
  ){}
  create(createVaccineDto: CreateVaccineDto) {
    return this.vaccineModel.create(createVaccineDto);
  } 

  findAll() {
    return this.vaccineModel.find().populate('vaccinationHistories');
  }

  async findOne(id: string) {
    return (await this.vaccineModel.findById(id)).populate('vaccinationHistories');
  }

  async update(id: string, updateVaccineDto: UpdateVaccineDto) {
    const existingvaccine = await this.vaccineModel
    .findByIdAndUpdate(id, updateVaccineDto, { new: true})
    .exec();
    if(!existingvaccine) {
      throw new NotFoundException(`Vaccine #${id} not found`);
    }
    return existingvaccine;
  }

  async remove(id: string) {
    return this.vaccineModel.findByIdAndDelete(id);
  }
}
