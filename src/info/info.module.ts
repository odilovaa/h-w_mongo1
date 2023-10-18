import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Info, InfoSchema } from './schemas/info.schema';
import { Animal, AnimalSchema } from '../animal/schemas/animal.schema';
import { Block, BlockSchema } from '../block/schemas/block.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Info.name, schema: InfoSchema},
    { name: Animal.name, schema: AnimalSchema},
    { name: Block.name, schema: BlockSchema},
  ])
  ],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
