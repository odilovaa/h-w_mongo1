import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordsOfFeedingDto } from './dto/create-records_of_feeding.dto';
import { UpdateRecordsOfFeedingDto } from './dto/update-records_of_feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Feeding, FeedingDocument } from '../feeding/schemas/feeding.schema';
import { Model } from 'mongoose';
import { RecordsOfFeeding, RecordsOfFeedingDocument } from './schemas/records_of_feeding.schema';

@Injectable()
export class RecordsOfFeedingService {
  constructor(
    @InjectModel(Feeding.name) private feedingModel: Model<FeedingDocument>,
    @InjectModel(RecordsOfFeeding.name) private recordsOfFeedingsModel: Model<RecordsOfFeedingDocument>,

  ){}

  async create(createRecordsOfFeedingDto: CreateRecordsOfFeedingDto) {
    const { feeding_id } = createRecordsOfFeedingDto;


    const feeding = await this.feedingModel.findById(feeding_id);
    if (!feeding) {
      throw new BadRequestException('Bunday feeding yoq');
    }

    const recordsOfFeeding = await this.recordsOfFeedingsModel.create(createRecordsOfFeedingDto);
    feeding.recordsOfFeedings.push(recordsOfFeeding);
    await feeding.save()
    return recordsOfFeeding;
  }

  findAll() {
    return this.recordsOfFeedingsModel.find();
  }

  async findOne(id: string) {
    return ((await this.recordsOfFeedingsModel.findById(id).exec()));
  }

  async update(id: string, updateRecordsOfFeedingDto: UpdateRecordsOfFeedingDto) {
    const existingrecordsOfFeeding = await this.recordsOfFeedingsModel
    .findByIdAndUpdate(id, updateRecordsOfFeedingDto, { new: true})
    .exec();
    if(!existingrecordsOfFeeding) {
      throw new NotFoundException(`recordsOfFeeding #${id} not found`);
    }
    return existingrecordsOfFeeding;
  }

  remove(id: string) {
    return this.recordsOfFeedingsModel.findByIdAndDelete(id);
  }
}
