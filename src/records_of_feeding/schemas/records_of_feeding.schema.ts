import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type RecordsOfFeedingDocument = HydratedDocument<RecordsOfFeeding>

@Schema()
export class RecordsOfFeeding {
    @Prop({ required: true})
    date: Date;

    @Prop({ required: true})
    consumption: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Feeding'})
    feeding_id: mongoose.Schema.Types.ObjectId;
}

export const RecordsOfFeedingSchema = SchemaFactory.createForClass(RecordsOfFeeding)
