import { Component, OnInit ,ChangeDetectorRef,OnDestroy,ChangeDetectionStrategy ,NgZone  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { interval, Subject } from 'rxjs';
import { takeWhile, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivityMonitorService } from './activity-monitor.service';
import { AuthService } from 'src/app/auth/services/auth.service';




@Component({
  selector: 'app-quiz-simulation',
  templateUrl: './quiz-simulation.component.html',
  styleUrls: ['./quiz-simulation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush ,// Add this line
  

})
export class QuizSimulationComponent implements OnInit,OnDestroy {
  quizId: string | null = null;
  quizData: any;
  timer: number = 0;
  timeLeft: number = 0;
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswers: { [key: string]: string[] | undefined } = {};
  private timerSubscription: Subscription | undefined;
  CompanyId: string | null = null;



  constructor(private route: ActivatedRoute, private http: HttpClient,    private cdr: ChangeDetectorRef,
    private ngZone: NgZone ,private router: Router,private activityMonitorService: ActivityMonitorService,private authService: AuthService,) {}

  ngOnInit(): void {
    
    this.quizId = this.route.snapshot.paramMap.get('id')!;
    this.fetchQuizData();
    this.activityMonitorService.activity$.subscribe(activityType => {
      if (activityType === 'automatic-quiz-submission') {
        this.submitAnswers(); // Call your quiz submission function here
      }
    });
  }

  fetchQuizData() {
    const quizUrl = `http://localhost:3000/quizzes/${this.quizId}`;
    this.http.get<any>(quizUrl).subscribe((data) => {
      console.log('QUIZ DATA', data);
      
      this.quizData = data.data; 
      this.CompanyId = this.quizData.IdUser;
      this.timer = this.quizData.timer;
      this.timeLeft = this.timer * 60;
      console.log('CompanyId', this.CompanyId);
      

      this.startTimer();

      for (const questionId of this.quizData.questions) {
        this.fetchQuestionData(questionId);
      }
    });
  }
  fetchQuestionData(questionId: string) {
    const questionUrl = `http://localhost:3000/questions/${questionId}`;
    this.http.get<any>(questionUrl).subscribe((data) => {
      console.log('QUESTION DATA', data);
      const questionWithCorrectOptions = {
        ...data,
        correctOptions: data.correctOptions || [] // Make sure correctOptions exists and is an array
      };
      this.questions.push(questionWithCorrectOptions);
    });
  }

  startTimer() {
    this.ngZone.runOutsideAngular(() => {
      console.log('Timer started');
      this.timerSubscription = interval(1000)
        .pipe(
          takeWhile(() => this.timeLeft > 0),
          finalize(() => {
            console.log('Time expired');
            this.submitAnswers(); // Automatically submit the quiz when time expires
          })
        )
        .subscribe(() => {
          console.log('Time Left:', this.timeLeft);
          this.timeLeft--;
          this.cdr.detectChanges(); // Manually trigger change detection
        });
    });
  }
  

  formatTimeLeftM(timeLeft: number): string {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  
    return `${minutes}`;
  }
  

  formatTimeLeftS(timeLeft: number): string {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  
    return `${seconds < 10 ? '0' : ''}${seconds}`;
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  //----------------------------------------------
  
  

  // ...

  submitAnswers() {
    const loggedInUserId = this.authService.getLoggedInUserId();
  
    if (!loggedInUserId) {
      console.error('User is not logged in.');
      return;
    }
    console.log('loggedInUserId:', loggedInUserId);
  
    this.http.get<any>(`http://localhost:3000/auth/getUserById/${loggedInUserId}`).subscribe(
      (userData) => {
        console.log('API Response:', userData);

        console.log('User Data:', userData);
  
        if (!userData) {
          console.error('User data is undefined.');
          return;
        }
        console.log('User Data:', userData);
  
        let correctCount = 0;
  
        const reportData: any = { // Define reportData as any
          userId: userData._id,
          username: userData.username,
          email: userData.email,
          quizId: this.quizId,
          quizTitle: this.quizData.title,
          quizDescription: this.quizData.description,
          totalQuestions: this.questions.length,
          correctAnswersCount: correctCount,
          totalScore: (correctCount / this.questions.length) * 100,
          questionResponses: [], // Define questionResponses as any[]
          quizStartTime: new Date(),
          quizEndTime: new Date(),
          CompanyId: this.quizData.IdUser,

        };
  
        this.questions.forEach((question) => {
          const selectedOptions = this.selectedAnswers[question._id] || [];

                // Check if any correct option is selected
                const isCorrect = selectedOptions.some(optionId => {
                  const selectedOption = question.options.find((option: any) => option._id === optionId);
                  return selectedOption && selectedOption.isCorrect;
                });

                if (isCorrect) {
                  correctCount++;
                }




       
          reportData.questionResponses.push({
            questionId: question._id,
    questionText: question.questionText,
    selectedOptions: selectedOptions,
    correctOptions: question.correctOptions,
    isCorrect: isCorrect, // Add the 'isCorrect' field here
            
          });
        });

        reportData.correctAnswersCount = correctCount; // Update correctAnswersCount after looping
reportData.totalScore = (correctCount / this.questions.length) * 100; // Calculate totalScore as a percentage

  
        console.log('Report Data:', reportData);
  
        this.http.post('http://localhost:3000/reports', reportData).subscribe(
          (response) => {
            console.log('Report created:', response);
            this.router.navigate(['/dashboardConsultor/loading']);
            setTimeout(() => {
              this.router.navigate(['/dashboardConsultor/results'], {
                queryParams: {
                  correctCount: correctCount,
                  totalQuestions: this.questions.length,
                },
              });
            }, 5000);
          },
          (error) => {
            console.error('Error creating report:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  

areSelectedOptionsCorrect(question: any): boolean {
  const selectedOptions = this.selectedAnswers[question._id] || [];
  
  // Check if all correct options are selected and no incorrect options are selected
  return (
    selectedOptions.length === question.correctOptions.length &&
    selectedOptions.every(optionId => question.correctOptions.includes(optionId))
  );
}

// ...



















































  

  arraysEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  
  
  // Helper function to check if two arrays are equal
 
  

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  selectAnswer(optionId: string) {
    const currentQuestionId = this.questions[this.currentQuestionIndex]._id;
    if (!this.selectedAnswers[currentQuestionId]) {
      this.selectedAnswers[currentQuestionId] = [];
    }
    this.selectedAnswers[currentQuestionId]?.push(optionId); // Use optional chaining here
  }

  getSelectedAnswer(optionId: string): boolean {
    const currentQuestionId = this.questions[this.currentQuestionIndex]._id;
    const selectedOptions = this.selectedAnswers[currentQuestionId];
  
    if (this.questions[this.currentQuestionIndex].type === 'single-choice') {
      return selectedOptions?.includes(optionId) || false;
    } else if (this.questions[this.currentQuestionIndex].type === 'multiple-choice') {
      return selectedOptions ? selectedOptions.includes(optionId) : false;
    }
  
    return false;
  }
  
  
  
  

  toggleOption(optionId: string) {
    const currentQuestionId = this.questions[this.currentQuestionIndex]._id;
  
    if (!this.selectedAnswers[currentQuestionId]) {
      this.selectedAnswers[currentQuestionId] = [];
    }
  
    const selectedOptions = this.selectedAnswers[currentQuestionId];
  
    if (selectedOptions) {
      const index = selectedOptions.indexOf(optionId);
      if (index !== -1) {
        selectedOptions.splice(index, 1); // Unselect the option
      } else {
        selectedOptions.push(optionId); // Select the option
      }
    }
  }
  
  
  isSelected(optionId: string): boolean {
    const currentQuestionId = this.questions[this.currentQuestionIndex]._id;
    const selectedOptions = this.selectedAnswers[currentQuestionId] || [];
    return selectedOptions.includes(optionId);
  }
  
  



}
