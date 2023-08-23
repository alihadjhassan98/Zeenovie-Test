// report.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportDto } from '../dto/report.dto';
import { ReportService } from '../services/report.service';

@Controller('reports')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @MessagePattern({ cmd: 'createReport' })
    async createReport(@Payload() reportDto: ReportDto): Promise<any> {
        console.log('Microservice - Request to create report:', reportDto);
        const createdReport = await this.reportService.createReport(reportDto);
        console.log('Microservice - Report created:', createdReport);
        return { message: 'Report created successfully', data: createdReport };
    }

    @MessagePattern({ cmd: 'getReportsByUserId' })
    async getReportsByUserId(@Payload() userId: string): Promise<any> {
        console.log('Microservice - Request to get reports by userId:', userId);
        const reports = await this.reportService.getReportsByUserId(userId);
        console.log('Microservice - Reports by userId:', reports);
        return reports;
    }

    @MessagePattern({ cmd: 'getReportsByQuizId' })
    async getReportsByQuizId(@Payload() quizId: string): Promise<any> {
        console.log('Microservice - Request to get reports by quizId:', quizId);
        const reports = await this.reportService.getReportsByQuizId(quizId);
        console.log('Microservice - Reports by quizId:', reports);
        return reports;
    }

    @MessagePattern({ cmd: 'getReportById' })
    async getReportById(@Payload() reportId: string): Promise<any> {
        console.log('Microservice - Request to get report by ID:', reportId);
        const report = await this.reportService.getReportById(reportId);
        console.log('Microservice - Report by ID:', report);
        return report;
    }

    @MessagePattern({ cmd: 'getAllReports' })
    async getAllReports(): Promise<any> {
        console.log('Microservice - Request to get all reports');
        const reports = await this.reportService.getAllReports();
        console.log('Microservice - All reports:', reports);
        return reports;
    }

    @MessagePattern({ cmd: 'updateReport' })
    async updateReport(@Payload() payload: { reportId: string, reportData: ReportDto }): Promise<any> {
        console.log('Microservice - Request to update report:', payload);
        const updatedReport = await this.reportService.updateReport(payload.reportId, payload.reportData);
        console.log('Microservice - Updated report:', updatedReport);
        return updatedReport;
    }

    @MessagePattern({ cmd: 'deleteReport' })
    async deleteReport(@Payload() reportId: string): Promise<any> {
        console.log('Microservice - Request to delete report:', reportId);
        const deletedReport = await this.reportService.deleteReport(reportId);
        console.log('Microservice - Deleted report:', deletedReport);
        return deletedReport;
    }


    @MessagePattern({ cmd: 'getReportsByCompanyId' })
    async getReportsByCompanyId(@Payload() companyId: string): Promise<any> {
      console.log('Microservice - Request to get reports by companyId:', companyId);
      const reports = await this.reportService.getReportsByCompanyId(companyId);
      console.log('Microservice - Reports by companyId:', reports);
      return reports;
    }
}
