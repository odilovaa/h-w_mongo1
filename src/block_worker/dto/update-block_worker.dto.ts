import { PartialType } from '@nestjs/mapped-types';
import { CreateBlockWorkerDto } from './create-block_worker.dto';

export class UpdateBlockWorkerDto extends PartialType(CreateBlockWorkerDto) {}
