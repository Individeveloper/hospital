import { Controller, Get } from '@nestjs/common';

@Controller('audit-logs')
export class AuditController {
  @Get()
  findAll() {
    return {
      message: 'Audit logs endpoint scaffolded',
      data: [],
    };
  }
}
