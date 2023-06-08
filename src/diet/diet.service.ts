import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DietEntity } from '../entities/diet.entity';

@Injectable()
export class DietService {
  constructor(
    @InjectRepository(DietEntity)
    private dietRepository: Repository<DietEntity>,
  ) {}
}
