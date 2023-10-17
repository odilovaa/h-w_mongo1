import { PartialType } from '@nestjs/mapped-types';
import { CreateMilkProductionDto } from './create-milk_production.dto';

export class UpdateMilkProductionDto extends PartialType(CreateMilkProductionDto) {
    milk_yield?: string;
    milk_schedule?: string;
    milk_qualitly?: string;
    animal_id?: string;
}
