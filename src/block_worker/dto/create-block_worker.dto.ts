import mongoose from "mongoose";

export class CreateBlockWorkerDto {
    worker_id: mongoose.Schema.Types.ObjectId;
    block_id: mongoose.Schema.Types.ObjectId;
}
