import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { RecordsOfFeeding } from "../../records_of_feeding/schemas/records_of_feeding.schema";

export type FeedingDocument = HydratedDocument<Feeding>

@Schema()
export class Feeding {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
    animal_id: mongoose.Schema.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Worker'})
    worker_id: mongoose.Schema.Types.ObjectId;

    @Prop({required: true})
    feeding_schedual: string;

    @Prop({required: true})
    types_of_feed: string;

    @Prop({required: true})
    dietary: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'RecordsOfFeeding'}]})
    recordsOfFeedings: RecordsOfFeeding[]
}

export const FeedingSchema = SchemaFactory.createForClass(Feeding)
