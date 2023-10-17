import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type MilkProductionDocument = HydratedDocument<MilkProduction>

@Schema()
export class MilkProduction {
    @Prop({ required: true})
    milk_yield: string;

    @Prop({ required: true})
    milk_schedule: string;

    @Prop({ required: true})
    milk_qualitly: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
    animal_id: mongoose.Schema.Types.ObjectId;
}

export const MilkProductionSchema = SchemaFactory.createForClass(MilkProduction)
