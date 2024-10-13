import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeDetailDto } from './create-home-detail.dto';

export class UpdateHomeDetailDto extends PartialType(CreateHomeDetailDto) {}
