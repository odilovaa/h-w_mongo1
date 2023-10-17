import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type FiberProductionDocument = HydratedDocument<FiberProduction>

@Schema()
export class FiberProduction {
    @Prop({ required: true})
    fiber_yield: string;

    @Prop({ required: true})
    shearing_schedule: string;

    @Prop({ required: true})
    fiber_qualitly: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
    animal_id: mongoose.Schema.Types.ObjectId;
}

export const FiberProductionSchema = SchemaFactory.createForClass(FiberProduction)
