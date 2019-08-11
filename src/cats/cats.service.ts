import {Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {Cat} from './interfaces/cat.interface';
import {CatCreateRs} from './rs/cat-create-rs';
import {CatFindRq} from './rq/cat-find-rq';
import {CatCreateRq} from './rq/cat-create-rq';

@Injectable()
export class CatsService {
  constructor(@Inject('CAT_MODEL') private readonly catModel: Model<Cat>) {}

  async create(catCreateRq: CatCreateRq): Promise<CatCreateRs> {
    const createdCat = new this.catModel(catCreateRq);
    createdCat.save();
    return new CatCreateRs(createdCat.name, `${createdCat.name} created successfully`);
  }

  async findOne(catFindRq: CatFindRq): Promise<Cat> {
    return this.catModel.find({name: catFindRq.name});
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }
}
