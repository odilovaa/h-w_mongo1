import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Block_worker } from "../../block_worker/schemas/block_worker.schema";
import { VaccinationHistory } from "../../vaccination_history/schemas/vaccination_history.schema";
import { RecordOfIlness } from "../../record_of_ilness/schemas/record_of_ilness.schema";
import { Feeding } from "../../feeding/schemas/feeding.schema";

export type WorkerDocument = HydratedDocument<Worker>

@Schema({ versionKey: false})
export class Worker {
    @Prop({ required: true})
    name: string;

    @Prop()
    age: number;

    @Prop()
    experience: number;

    @Prop({ unique: true})
    phone_number: string;

    @Prop({ unique: true})
    username: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Speciality'})
    speciality_id: mongoose.Schema.Types.ObjectId;

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Block_worker'}]})
    block_workers: Block_worker[];

    @Prop()
    description: string;

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VaccinationHistory'}]})
    vaccinationHistories: VaccinationHistory[]

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RecordOfIlness'}]})
    recordOfIlnesses: RecordOfIlness[]

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feeding'}]})
    feedings: Feeding[]
}

export const WorkerSchema = SchemaFactory.createForClass(Worker)
