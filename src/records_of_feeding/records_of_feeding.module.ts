import { Module } from '@nestjs/common';
import { RecordsOfFeedingService } from './records_of_feeding.service';
import { RecordsOfFeedingController } from './records_of_feeding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordsOfFeeding, RecordsOfFeedingSchema } from './schemas/records_of_feeding.schema';
import { Feeding, FeedingSchema } from '../feeding/schemas/feeding.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: RecordsOfFeeding.name, schema: RecordsOfFeedingSchema},
    { name: Feeding.name, schema: FeedingSchema}
  ])],
  controllers: [RecordsOfFeedingController],
  providers: [RecordsOfFeedingService],
})
export class RecordsOfFeedingModule {}
