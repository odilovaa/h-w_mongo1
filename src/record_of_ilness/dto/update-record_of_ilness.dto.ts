import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordOfIlnessDto } from './create-record_of_ilness.dto';

export class UpdateRecordOfIlnessDto extends PartialType(CreateRecordOfIlnessDto) {
    ilness_type?: string;
    animal_id?: string;
    disease_date?: Date;
    medicines?: string;
    treatment_date?: Date;
    ilness_photo?: string;
    worker_id?: string;
}
