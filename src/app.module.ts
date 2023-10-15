import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { SpecialityModule } from './speciality/speciality.module';
import { WorkerModule } from './worker/worker.module';
import { BlockModule } from './block/block.module';
import { BlockWorkerModule } from './block_worker/block_worker.module';
import { AnimalTypeModule } from './animal_type/animal_type.module';
import { AnimalModule } from './animal/animal.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { VaccinationHistoryModule } from './vaccination_history/vaccination_history.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminModule,
    SpecialityModule,
    WorkerModule,
    BlockModule,
    BlockWorkerModule,
    AnimalTypeModule,
    AnimalModule,
    VaccineModule,
    VaccinationHistoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
