import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalTypeDto } from './create-animal_type.dto';

export class UpdateAnimalTypeDto extends PartialType(CreateAnimalTypeDto) {
    type_name?: string;
    description?: string;
}
