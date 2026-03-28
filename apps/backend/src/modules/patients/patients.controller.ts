import { Body, Controller, Get, Post } from '@nestjs/common';

interface CreatePatientPayload {
  fullName: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
}

@Controller('patients')
export class PatientsController {
  @Get()
  findAll() {
    return {
      message: 'Patients endpoint scaffolded',
      data: [],
    };
  }

  @Post()
  create(@Body() payload: CreatePatientPayload) {
    return {
      message: 'Create patient placeholder',
      payload,
    };
  }
}
