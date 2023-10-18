import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { VaccinationHistory } from "../../vaccination_history/schemas/vaccination_history.schema";
import { RecordOfIlness } from "../../record_of_ilness/schemas/record_of_ilness.schema";
import { MeatPtoduction } from "../../meat_ptoduction/schemas/meat_ptoduction.schema";
import { FiberProduction } from "../../fiber_production/schemas/fiber_production.schema";
import { MilkProduction } from "../../milk_production/schemas/milk_production.schema";
import { Feeding } from "../../feeding/schemas/feeding.schema";
import { Info } from "../../info/schemas/info.schema";


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

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RecordOfIlness'}]})
    recordOfIlnesses: RecordOfIlness[]

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MeatPtoduction'}]})
    meat_productions: MeatPtoduction[]

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FiberProduction'}]})
    fiberProductions: FiberProduction[]

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MilkProduction'}]})
    milkProductions: MilkProduction[]

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feeding'}]})
    feedings: Feeding[]

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Info'}]})
    infos: Info[]

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Info'}]})
    child_infos: Info[]
}

export const AnimalSchema = SchemaFactory.createForClass(Animal)



