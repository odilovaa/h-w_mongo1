import { Module } from '@nestjs/common';
import { MeatPtoductionService } from './meat_ptoduction.service';
import { MeatPtoductionController } from './meat_ptoduction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeatPtoduction, MeatPtoductionSchema } from './schemas/meat_ptoduction.schema';
import { Animal, AnimalSchema } from '../animal/schemas/animal.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: MeatPtoduction.name, schema: MeatPtoductionSchema},
    { name: Animal.name, schema: AnimalSchema},
  ])],
  controllers: [MeatPtoductionController],
  providers: [MeatPtoductionService],
})
export class MeatPtoductionModule {}
