import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalDto } from './create-animal.dto';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {
    animal_type_id?: string;
    photo?: string;
    unique_id?: string;
}
