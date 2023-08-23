import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {
  correctCount: number = 0;
  totalQuestions: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve the route parameters
    this.route.queryParams.subscribe(params => {
      this.correctCount = +params['correctCount'];
      this.totalQuestions = +params['totalQuestions'];
    });
  }
}
