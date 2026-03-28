import { Body, Controller, Get, Post } from '@nestjs/common';

interface CreateAppointmentPayload {
  patientId: string;
  doctorId: string;
  scheduleId: string;
  appointmentTime: string;
}

@Controller('appointments')
export class AppointmentsController {
  @Get()
  findAll() {
    return {
      message: 'Appointments endpoint scaffolded',
      data: [],
    };
  }

  @Post()
  create(@Body() payload: CreateAppointmentPayload) {
    return {
      message: 'Create appointment placeholder',
      payload,
    };
  }
}
