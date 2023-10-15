import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type Block_workerDocument = HydratedDocument<Block_worker>

@Schema()
export class Block_worker {
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Worker'}]})
    worker_id: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Block'}]})
    block_id: mongoose.Schema.Types.ObjectId;
}

export const Block_workerSchema = SchemaFactory.createForClass(Block_worker)
