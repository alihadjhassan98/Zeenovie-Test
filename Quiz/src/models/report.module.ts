// report.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from '../models/report.model';
import { ReportService } from '../services/report.service';
import { ReportController } from '../controllers/report.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
