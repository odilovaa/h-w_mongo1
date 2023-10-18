import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoDto } from './create-info.dto';

export class UpdateInfoDto extends PartialType(CreateInfoDto) {
    weight?: string;
    hight?: string;
    color?: string;
    breed?: string;
    gender?: string;
    birth_of_acquisition?: string;
    block_id?: string;
    animal_id?: string;
    parent_id?: string;
}
