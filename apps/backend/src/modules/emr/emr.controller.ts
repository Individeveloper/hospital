import { Controller, Get } from '@nestjs/common';

@Controller('emr')
export class EmrController {
  @Get()
  findAll() {
    return {
      message: 'EMR endpoint scaffolded',
      data: [],
    };
  }
}
