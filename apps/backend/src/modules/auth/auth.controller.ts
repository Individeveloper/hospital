import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('config')
  getAuthConfig() {
    return {
      provider: 'microsoft-entra-id',
      status: 'placeholder',
    };
  }
}
