import { Module } from '@nestjs/common';
import { VaccinationHistoryService } from './vaccination_history.service';
import { VaccinationHistoryController } from './vaccination_history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VaccinatinHistorySchema, VaccinationHistory } from './schemas/vaccination_history.schema';
import { Vaccine, VaccineSchema } from '../vaccine/schemas/vaccine.schema';
import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';
import { Animal, AnimalSchema } from '../animal/schemas/animal.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: VaccinationHistory.name, schema: VaccinatinHistorySchema},
    { name: Vaccine.name, schema: VaccineSchema},
    { name: Worker.name, schema: WorkerSchema},
    { name: Animal.name, schema: AnimalSchema}
  ])
  ],
  controllers: [VaccinationHistoryController],
  providers: [VaccinationHistoryService],
})
export class VaccinationHistoryModule {}
