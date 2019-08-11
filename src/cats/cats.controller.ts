import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatFindRq } from './rq/cat-find-rq';
import { CatCreateRs } from './rs/cat-create-rs';
import { CatCreateRq } from './rq/cat-create-rq';
import { Cat } from './interfaces/cat.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() catCreateRq: CatCreateRq): Promise<CatCreateRs> {
    return this.catsService.create(catCreateRq);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('findall')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('findone')
  async findOne(@Body() catFindRq: CatFindRq): Promise<Cat> {
    return this.catsService.findOne(catFindRq);
  }
}
