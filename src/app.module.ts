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
import { RecordOfIlnessModule } from './record_of_ilness/record_of_ilness.module';
import { MeatPtoductionModule } from './meat_ptoduction/meat_ptoduction.module';
import { MilkProductionModule } from './milk_production/milk_production.module';
import { InfoModule } from './info/info.module';
import { RecordsOfFeedingModule } from './records_of_feeding/records_of_feeding.module';
import { FeedingModule } from './feeding/feeding.module';
import { FiberProductionModule } from './fiber_production/fiber_production.module';
import { MilkProductionModule } from './milk_production/milk_production.module';

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
    VaccinationHistoryModule,
    RecordOfIlnessModule,
    MeatPtoductionModule,
    MilkProductionModule,
    FiberProductionModule,
    FeedingModule,
    RecordsOfFeedingModule,
    InfoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
