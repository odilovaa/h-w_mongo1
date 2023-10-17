import { Module } from '@nestjs/common';
import { RecordOfIlnessService } from './record_of_ilness.service';
import { RecordOfIlnessController } from './record_of_ilness.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordOfIlness, RecordOfIlnessSchema } from './schemas/record_of_ilness.schema';
import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';
import { Animal, AnimalSchema } from '../animal/schemas/animal.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: RecordOfIlness.name, schema: RecordOfIlnessSchema},
    { name: Worker.name, schema: WorkerSchema},
    { name: Animal.name, schema: AnimalSchema},
  ])],
  controllers: [RecordOfIlnessController],
  providers: [RecordOfIlnessService],
})
export class RecordOfIlnessModule {}
