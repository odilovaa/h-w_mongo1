import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type VaccinationHistoryDocument = HydratedDocument<VaccinationHistory>

@Schema()
export class VaccinationHistory {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
    animal_id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vccine'})
    vaccine_type_id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true})
    vaccinated_date: Date;

    @Prop({ required: true})
    next_vaccination_date: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker'})
    worker_id: mongoose.Schema.Types.ObjectId;
}

export const VaccinatinHistorySchema = SchemaFactory.createForClass(VaccinationHistory)
