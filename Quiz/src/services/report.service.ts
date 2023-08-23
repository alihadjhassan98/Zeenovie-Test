import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from '../models/report.model';
import { ReportDto } from '../dto/report.dto';

@Injectable()
export class ReportService {
  constructor(@InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>) {}

  async createReport(reportDto: ReportDto): Promise<Report> {
    const createdReport = new this.reportModel(reportDto);
    return createdReport.save();
  }

  async getAllReports(): Promise<Report[]> {
    return this.reportModel.find().exec();
  }

  async getReportById(reportId: string): Promise<Report> {
    return this.reportModel.findById(reportId).exec();
  }

  async updateReport(reportId: string, reportData: ReportDto): Promise<Report> {
    return this.reportModel.findByIdAndUpdate(reportId, reportData, { new: true }).exec();
  }

  async deleteReport(reportId: string): Promise<Report> {
    return this.reportModel.findByIdAndDelete(reportId).exec();
  }

  async getReportsByUserId(userId: string): Promise<Report[]> {
    return this.reportModel.find({ userId }).exec();
  }

  async getReportsByQuizId(quizId: string): Promise<Report[]> {
    return this.reportModel.find({ quizId }).exec();
  }


  async getReportsByCompanyId(CompanyId: string): Promise<Report[]> {
  return this.reportModel.find({ CompanyId }).exec();
}
  // Add more methods as needed
}
