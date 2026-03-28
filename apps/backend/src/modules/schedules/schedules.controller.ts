import { Controller, Get } from '@nestjs/common';

@Controller('schedules')
export class SchedulesController {
  @Get()
  findAll() {
    return {
      message: 'Schedules endpoint scaffolded',
      data: [],
    };
  }
}
