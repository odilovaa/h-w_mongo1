import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from './schemas/animal.schema';
import { AnimalType, AnimalTypeSchema } from '../animal_type/schemas/animal_type.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Animal.name, schema: AnimalSchema},
    { name: AnimalType.name, schema: AnimalTypeSchema}
  ])
  ],
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AnimalModule {}
