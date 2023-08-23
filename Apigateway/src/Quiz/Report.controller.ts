import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post,Delete, Put } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ReportDto } from "./dto/report.dto";

@Controller('reports')
export class ReportController {
    constructor(@Inject('REPORT_SERVICE') private readonly reportService: ClientProxy) {}
    


    @Get('test')
    test(): string {
      return 'Test endpoint is working';
    }

    @Post()
    async createReport(@Body() reportData: ReportDto): Promise<any> {
        try {
            console.log('API Gateway - Request to create report:', reportData); // Add this line
            const createdReport = await this.reportService.send({ cmd: 'createReport' }, reportData).toPromise();
            console.log('API Gateway - Response from microservice:', createdReport); // Add this line
            return { message: 'Report created successfully', data: createdReport };
        } catch (error) {
            console.error('API Gateway - Error creating report:', error); // Add this line
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }


    @Get()
    async getAllReports(): Promise<any> {
        try {
            const reports = await this.reportService.send({ cmd: 'getAllReports' }, {}).toPromise();
            return reports;
        } catch (error) {
            console.error('API Gateway - Error getting all reports:', error);
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Get(':reportId')
    async getReportById(@Param('reportId') reportId: string): Promise<any> {
        try {
            const report = await this.reportService.send({ cmd: 'getReportById' }, reportId).toPromise();
            return report;
        } catch (error) {
            console.error('API Gateway - Error getting report by ID:', error);
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Put(':reportId')
    async updateReport(@Param('reportId') reportId: string, @Body() reportData: ReportDto): Promise<any> {
        try {
            const updatedReport = await this.reportService.send({ cmd: 'updateReport' }, { reportId, reportData }).toPromise();
            return updatedReport;
        } catch (error) {
            console.error('API Gateway - Error updating report:', error);
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':reportId')
    async deleteReport(@Param('reportId') reportId: string): Promise<any> {
        try {
            const deletedReport = await this.reportService.send({ cmd: 'deleteReport' }, reportId).toPromise();
            return deletedReport;
        } catch (error) {
            console.error('API Gateway - Error deleting report:', error);
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }


    @Get('company/:companyId')
  async getReportsByCompanyId(@Param('companyId') companyId: string): Promise<any> {
    try {
      const reports = await this.reportService.send({ cmd: 'getReportsByCompanyId' }, companyId).toPromise();
      return reports;
    } catch (error) {
      console.error('API Gateway - Error getting reports by companyId:', error);
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }
    


    @Get('user/:userId')
    async getReportsByUserId(@Param('userId') userId: string): Promise<any> {
        try {
            const reports = await this.reportService.send({ cmd: 'getReportsByUserId' }, userId).toPromise();
            return reports;
        } catch (error) {
            console.error('API Gateway - Error getting reports by userId:', error);
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Get('quiz/:quizId')
    async getReportsByQuizId(@Param('quizId') quizId: string): Promise<any> {
        try {
            const reports = await this.reportService.send({ cmd: 'getReportsByQuizId' }, quizId).toPromise();
            return reports;
        } catch (error) {
            console.error('API Gateway - Error getting reports by quizId:', error);
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

    // ...
}
