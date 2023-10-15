import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Animal } from "../../animal/schemas/animal.schema";

export type AnimalTypeDocument = HydratedDocument<AnimalType>

@Schema()
export class AnimalType {
    @Prop({ required: true})
    type_name: string;

    @Prop({ required: true})
    description: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal'}]})
    animals: Animal[];
}

export const AnimalTypeSchema = SchemaFactory.createForClass(AnimalType)
