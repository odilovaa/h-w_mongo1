import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlockWorkerDto } from './dto/create-block_worker.dto';
import { UpdateBlockWorkerDto } from './dto/update-block_worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Block, BlockDocument } from '../block/schemas/block.schema';
import { Worker, WorkerDocument } from '../worker/schemas/worker.schema';
import { Model } from 'mongoose';
import { Block_worker, Block_workerDocument } from './schemas/block_worker.schema';

@Injectable()
export class BlockWorkerService {
  constructor(
    @InjectModel(Block_worker.name) private block_workerModel: Model<Block_workerDocument>,
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>,
    @InjectModel(Block.name) private blockModel: Model<BlockDocument>,
  ){}

  async create(createBlockWorkerDto: CreateBlockWorkerDto) {
    const { worker_id } = createBlockWorkerDto;
    const { block_id } = createBlockWorkerDto;


    const worker = await this.workerModel.findById(worker_id);
    if (!worker) {
      throw new BadRequestException('Bunday worker yoq');
    }

    const block = await this.blockModel.findById(block_id);
    if (!block) {
      throw new BadRequestException('Bunday block yoq');
    }
    
    const block_worker = await this.block_workerModel.create(createBlockWorkerDto);
    worker.block_workers.push(block_worker);
    block.block_workers.push(block_worker);
    await worker.save()
    await block.save()
    return block_worker;
  }

  findAll() {
    return `This action returns all blockWorker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blockWorker`;
  }

  update(id: number, updateBlockWorkerDto: UpdateBlockWorkerDto) {
    return `This action updates a #${id} blockWorker`;
  }

  remove(id: number) {
    return `This action removes a #${id} blockWorker`;
  }
}
