import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-result-reports',
  templateUrl: './result-reports.component.html',
  styleUrls: ['./result-reports.component.scss']
})
export class ResultReportsComponent implements OnInit {
  reports: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports() {
    const loggedInUserId = this.authService.getLoggedInUserId();

    if (!loggedInUserId) {
      console.error('User is not logged in.');
      return;
    }

    // Replace this with the appropriate API endpoint for fetching reports by companyId
    const apiUrl = `http://localhost:3000/reports/company/${loggedInUserId}`;

    this.http.get<any[]>(apiUrl).subscribe(
      (reports) => {
        this.reports = reports;
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }
}