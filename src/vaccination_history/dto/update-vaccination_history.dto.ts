import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccinationHistoryDto } from './create-vaccination_history.dto';

export class UpdateVaccinationHistoryDto extends PartialType(CreateVaccinationHistoryDto) {
    animal_id?: string;
    vaccine_type_id?: string;
    vaccinated_date?: Date;
    next_vaccination_date?: Date;
    worker_id?: string;
}
