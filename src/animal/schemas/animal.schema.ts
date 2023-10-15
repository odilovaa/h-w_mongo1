import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { VaccinationHistory } from "../../vaccination_history/schemas/vaccination_history.schema";


export type AnimalDocument = HydratedDocument<Animal>

@Schema()
export class Animal {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AnimalType'})
    animal_type_id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true})
    photo: string;

    @Prop({ unique: true})
    unique_id: string;

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VaccinationHistory'}]})
    vaccinationHistories: VaccinationHistory[]
}

export const AnimalSchema = SchemaFactory.createForClass(Animal)



