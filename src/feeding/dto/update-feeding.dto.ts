import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedingDto } from './create-feeding.dto';

export class UpdateFeedingDto extends PartialType(CreateFeedingDto) {
    animal_id?: string;
    worker_id?: string;
    feeding_schedual?: string;
    types_of_feed?: string;
    dietary?: string;
}
