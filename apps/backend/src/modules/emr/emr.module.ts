import { Module } from '@nestjs/common';
import { EmrController } from './emr.controller';

@Module({
  controllers: [EmrController],
})
export class EmrModule {}
