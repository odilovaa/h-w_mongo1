import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type RecordOfIlnessDocument = HydratedDocument<RecordOfIlness>

@Schema()
export class RecordOfIlness {
    @Prop({ required: true})
    ilness_type: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Animal' })
    animal_id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true})
    disease_date: Date;

    @Prop({ required: true})
    medicines: string;

    @Prop({ required: true})
    treatment_date: Date;

    @Prop()
    ilness_photo: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
    worker_id: mongoose.Schema.Types.ObjectId;

}

export const RecordOfIlnessSchema = SchemaFactory.createForClass(RecordOfIlness)
