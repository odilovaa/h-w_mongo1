import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { VaccinationHistory } from "../../vaccination_history/schemas/vaccination_history.schema";

export type VaccineDocument = HydratedDocument<Vaccine>

@Schema()
export class Vaccine {
    @Prop({ required: true})
    vaccine_type: string;

    @Prop({ required: true})
    vaccine_name: string;

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VaccinationHistory'}]})
    vaccinationHistories: VaccinationHistory[]
}

export const VaccineSchema  = SchemaFactory.createForClass(Vaccine)
