import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type InfoDocument = HydratedDocument<Info>

@Schema()
export class Info {
    @Prop({ required: true})
    weight: string;

    @Prop({ required: true})
    hight: string;

    @Prop({ required: true})
    color: string;

    @Prop({ required: true})
    breed: string;

    @Prop({ required: true})
    gender: string;

    @Prop({ required: true})
    birth_of_acquisition: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Block'})
    block_id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
    animal_id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal'})
    parent_id: string;
}

export const InfoSchema = SchemaFactory.createForClass(Info)