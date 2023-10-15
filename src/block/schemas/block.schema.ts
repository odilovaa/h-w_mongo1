import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Block_worker } from "../../block_worker/schemas/block_worker.schema";


export type BlockDocument = HydratedDocument<Block>

@Schema()
export class Block {
    @Prop({ required: true })
    number: number;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Block_worker'}]})
    block_workers: Block_worker[];
}

export const BlockSchema = SchemaFactory.createForClass(Block)
