import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type MeatPtoductionDocument = HydratedDocument<MeatPtoduction>

@Schema()
export class MeatPtoduction {
    @Prop({ required: true})
    meat_yield: string;

    @Prop({ required: true})
    slaughter_date: Date;

    @Prop({ required: true})
    shearing_schedule: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
    animal_id: mongoose.Schema.Types.ObjectId;
}

export const MeatPtoductionSchema = SchemaFactory.createForClass(MeatPtoduction)
