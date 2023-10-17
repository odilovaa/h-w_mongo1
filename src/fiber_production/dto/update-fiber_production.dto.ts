import { PartialType } from '@nestjs/mapped-types';
import { CreateFiberProductionDto } from './create-fiber_production.dto';

export class UpdateFiberProductionDto extends PartialType(CreateFiberProductionDto) {
    fiber_yield?: string;
    shearing_schedule?: string;
    fiber_qualitly?: string;
    animal_id?: string;
}
