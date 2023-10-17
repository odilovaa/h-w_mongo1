import { PartialType } from '@nestjs/mapped-types';
import { CreateMeatPtoductionDto } from './create-meat_ptoduction.dto';

export class UpdateMeatPtoductionDto extends PartialType(CreateMeatPtoductionDto) {
    meat_yield?: string;
    slaughter_date?: Date;
    shearing_schedule?: string;
    animal_id?: string;
}
