import { Module } from '@nestjs/common';
import { BlockWorkerService } from './block_worker.service';
import { BlockWorkerController } from './block_worker.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';
import { Block, BlockSchema } from '../block/schemas/block.schema';
import { Block_worker, Block_workerSchema } from './schemas/block_worker.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Block_worker.name, schema: Block_workerSchema},
    { name: Worker.name, schema: WorkerSchema},
    { name: Block.name, schema: BlockSchema},
  ])],
  controllers: [BlockWorkerController],
  providers: [BlockWorkerService],
})
export class BlockWorkerModule {}
